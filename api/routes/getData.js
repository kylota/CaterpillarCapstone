const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');


const RegisteredUser = require('../models/RegisteredUser')
const Employee = require('../models/Employee');
const Employer = require('../models/Employer');
const employedInJobModel = require('../models/EmployedInJob');
const MergeSplit = require('../models/MergeSplit');

const { Sequelize } = require('sequelize');


router.get('/users', async (req, res) => {
  try {
    const users = await RegisteredUser.findAll({
      attributes: ['verifiedEmail', 'isAdmin'], // Include the 'isAdmin' attribute
    });

    // Check if users data exists
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: 'No users found' });
    }

    // Respond with the users' data, including admin status
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



router.get('/companies', async (req, res) => {
  try {
    const employers = await Employer.findAll({
      attributes: ['companyName', 'hasMerged', 'parentCompany'], // Include 'parentCompany' attribute
    });

    // Check if employers data exists
    if (!employers || employers.length === 0) {
      return res.status(404).json({ success: false, message: 'No companies found' });
    }

    // Respond with the employers data
    res.status(200).json({ success: true, data: employers });

  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.get('/companies/split', async (req, res) => {
  try {
    // Fetch all companies from the 'mergeSplit' table
    const splitCompanies = await MergeSplit.findAll({
      attributes: ['partCompany1', 'partCompany2', 'wholeCompany'],
    });

    // Check if splitCompanies data exists
    if (!splitCompanies || splitCompanies.length === 0) {
      return res.status(404).json({ success: false, message: 'No companies found' });
    }

    // Extract company names from the splitCompanies data
    const companyNames = splitCompanies.map(company => ({
      partCompany1: company.partCompany1,
      partCompany2: company.partCompany2,
      wholeCompany: company.wholeCompany
    }));

    // Respond with the company names
    res.status(200).json({ success: true, data: companyNames });
  } catch (err) {
    console.error('Error fetching split companies:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.get('/:employerID', async (req, res) => {
  try {
    const { employerID } = req.params;
    console.log("Received employerID:", employerID);

    // Find the employer by employerID and retrieve companyName
    const employerData = await Employer.findOne({
      where: { employerID: employerID },
      attributes: ['companyName', 'parentCompany', 'hasMerged'],
    });

    console.log("Employer data:", employerData);

    if (!employerData) {
      return res.status(404).json({ success: false, message: 'Employer not found' });
    }

    // Use companyName to find child companies
    const childrenCompanies = await Employer.findAll({
      where: { parentCompany: employerData.companyName },
      attributes: ['companyName'], // Add any other relevant attributes you need
    });

    // Convert the result to a list of company names
    const childrenCompanyNames = childrenCompanies.map(company => company.companyName);

    res.status(200).json({
      success: true,
      data: {
        companyName: employerData.companyName,
        parentCompany: employerData.parentCompany,
        hasMerged: employerData.hasMerged,
        childrenCompanies: childrenCompanyNames
      }
    });

  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



module.exports = router;
