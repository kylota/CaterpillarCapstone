var express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const Employer = require('../models/Employer');
const employedInJobModel = require('../models/employedInJob');

// Create an endpoint to get all data by employeeID
router.get('/:employeeID', async (req, res) => {
  try {
    const { employeeID } = req.params;

    // Find the employee by employeeID and retrieve firstName and lastName
    const employee = await Employee.findOne({
      where: { employeeID },
      attributes: ['firstName', 'lastName'],
    });

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const employedInJob = await employedInJobModel.findOne({
      where: { employeeID },
      attributes: ['jobTitle', 'withCompany'],
    });

    if (!employedInJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Since 'employer' can potentially be reassigned or declared conditionally, use 'let'
    let employer;

    // Find the employer by companyName and retrieve companyName
    employer = await Employer.findOne({
      where: { companyName: employedInJob.withCompany.trim() },
      attributes: ['companyName'],
    });

    if (!employer) {
      return res.status(404).json({ success: false, message: 'Employer not found' });
    }

    res.status(200).json({
      success: true,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employedInJob.jobTitle,
      companyName: employer.companyName,
    });

  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
