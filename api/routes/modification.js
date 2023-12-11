const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');

router.post('/addEmployer', async (req, res) => {
    const employer = await Employer.create({
        companyName: companyName,
        headquartersAddress: headquartersAddress,
        descendentCompanies: descendentCompanies,
        predecessorCompanies: predecessorCompanies,
    });


});

module.exports = router;