const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const Employer = require('../models/Employer');
const RegisteredUser = require('../models/RegisteredUser');
const MergeSplit = require('../models/MergeSplit');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database'); // Adjust the path as necessary

router.post('/admin/:action/:email', async (req, res) => {
    try {
        const { email, action } = req.params;
        console.log(email, action);

        const user = await RegisteredUser.findOne({ where: { verifiedEmail: email } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (action === 'grant' || action === 'revoke') {
            user.isAdmin = action === 'grant' ? 1 : 0;
        } else {
            return res.status(400).json({ success: false, message: 'Invalid action' });
        }

        await user.save();

        res.status(200).json({ success: true, message: `User ${action === 'grant' ? 'promoted' : 'revoked'} admin successfully` });
    } catch (err) {
        console.error(`Error ${action === 'grant' ? 'promoting' : 'revoking'} user admin:`, err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/:action/:company1/:company2/:name', async (req, res) => {
    try {
        const { action, company1, company2, name } = req.params;
        const { address, industry } = req.body;

        const [result1, result2] = await Promise.all([
            Employer.findOne({ where: { companyName: company1 } }),
            Employer.findOne({ where: { companyName: company2 } }),
        ]);

        if (!result1 || !result2) {
            return res.status(404).json({ success: false, message: 'One or both companies not found' });
        }

        const company1Children = await Employer.findAll({ where: { parentCompany: company1 } });
        const company2Children = await Employer.findAll({ where: { parentCompany: company2 } });

        let newParentCompany;
        if (action === 'merge') {
            newParentCompany = name === 'retain' ? company1 : name;
        } else if (action === 'split') {
            newParentCompany = name;
        } else {
            return res.status(400).json({ success: false, message: 'Invalid action' });
        }

        const updateChildren = async (children, parentCompany) => {
            await Promise.all(children.map(async (child) => {
                child.parentCompany = parentCompany;
                child.hasMerged = 1;
                await child.save();
            }));
        };

        await updateChildren(company1Children, newParentCompany);
        await updateChildren(company2Children, newParentCompany);

        result1.parentCompany = newParentCompany;
        result1.hasMerged = 1;
        await result1.save();

        result2.parentCompany = newParentCompany;
        result2.hasMerged = 1;
        await result2.save();

        const uniqueIdentifier = uuidv4();
        const eventType = action === 'merge' ? 'Merger' : 'Split';

        await MergeSplit.create({
            eventType,
            eventDate: new Date(),
            partCompany1: result1.companyName,
            partCompany2: result2.companyName,
            wholeCompany: newParentCompany,
            company1Children: company1Children.map(child => child.companyName).join('; '),
            company2Children: company2Children.map(child => child.companyName).join('; '),            
            eventID: uniqueIdentifier
        });

        const newEmployerId = uuidv4();
        await Employer.create({
            employerID: newEmployerId,
            companyName: newParentCompany,
            headquartersAddress: address,
            industry: industry,
            incorporationDate: new Date(),
            hasMerged: 0,
        });

        const responseData = {
            success: true,
            message: `${eventType} completed successfully`,
            newName: newParentCompany,
            company1Children: company1Children.map(child => child.companyName),
            company2Children: company2Children.map(child => child.companyName),
            newEmployerId: newEmployerId
        };

        res.status(200).json(responseData);
    } catch (err) {
        console.error('Merge request failed: ', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/split/:company1', async (req, res) => {
    let transaction;
    try {
        const { company1 } = req.params;
        transaction = await sequelize.transaction();

        const mergeSplitEntry = await MergeSplit.findOne({
            where: { wholeCompany: company1 },
            transaction: transaction
        });

        if (!mergeSplitEntry) {
            await transaction.rollback();
            return res.status(404).json({ success: false, message: 'Merged company not found in mergeSplit table.' });
        }

        const updateChildrenCompany = async (childrenNames, newParent) => {
            const children = childrenNames.split(';').map(name => name.trim());
            await Employer.update(
                { parentCompany: newParent, hasMerged: 0 },
                { where: { companyName: { [Op.in]: children } }, transaction: transaction }
            );
        };

        if (mergeSplitEntry.company1Children) {
            await updateChildrenCompany(mergeSplitEntry.company1Children, mergeSplitEntry.partCompany1);
        }
        if (mergeSplitEntry.company2Children) {
            await updateChildrenCompany(mergeSplitEntry.company2Children, mergeSplitEntry.partCompany2);
        }

        await Employer.update(
            { parentCompany: null, hasMerged: 0 },
            { where: { companyName: mergeSplitEntry.partCompany1 }, transaction: transaction }
        );
        await Employer.update(
            { parentCompany: null, hasMerged: 0 },
            { where: { companyName: mergeSplitEntry.partCompany2 }, transaction: transaction }
        );

        await Employer.destroy({
            where: { companyName: company1 },
            transaction: transaction
        });

        const splitRecord = {
            eventType: 'Split',
            eventDate: new Date(),
            partCompany1: mergeSplitEntry.partCompany1,
            partCompany2: mergeSplitEntry.partCompany2,
            wholeCompany: company1,
            company1Children: mergeSplitEntry.company1Children,
            company2Children: mergeSplitEntry.company2Children,
            eventID: uuidv4()
        };
        await MergeSplit.create(splitRecord, { transaction: transaction });

        await transaction.commit();

        const responseData = {
            success: true,
            message: 'Split operation completed successfully',
            company1ChildrenUpdated: mergeSplitEntry.company1Children.split(';').join(': '),
            company2ChildrenUpdated: mergeSplitEntry.company2Children.split(';').join(': '),
            splitRecord: splitRecord
        };

        res.status(200).json(responseData);
    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error('Error handling split: ', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.post('/addEmployer', async (req, res) => {
    const { companyName, headquartersAddress, parentCompany, industry, hasMerged, incorporationDate, dissolutionDate } = req.body;
    try {
        // Check if the employer already exists
        const existingEmployer = await Employer.findOne({ where: { companyName: companyName } });
        if (existingEmployer) {
            return res.status(400).json({ success: false, message: 'Employer already exists' });
        }

        const uniqueIdentifier = uuidv4(); // Generate a unique identifier

        // Create a new Employer with the same uniqueIdentifier
        const employer = await Employer.create({
            employerID: uniqueIdentifier,
            companyName: companyName,
            headquartersAddress: headquartersAddress,
            parentCompany: parentCompany,
            hasEmployed: null,
            industry: industry,
            hasMerged: hasMerged,
            incorporationDate: incorporationDate,
            dissolutionDate: dissolutionDate
        });
        return res.status(200).json({ success: true, message: 'Employer added successfully' });
    }
    catch (err) {
        console.error('Error adding employer:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }


});




module.exports = router;
