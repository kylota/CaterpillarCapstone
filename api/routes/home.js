var express = require('express');
const router = express.Router();
const Employer = require('../models/Employer.js');

/* GET home page. */
router.get("/", async (req, res) => {

    try {
        const Employers = await Employer.findAll();
        res.json(Employers);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;