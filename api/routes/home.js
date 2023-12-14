var express = require('express');
const router = express.Router();
const Employer = require('../models/Employer.js');
const { Op, literal } = require('sequelize');

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

router.post("/search", async (req, res) => {
  const { query } = req.body;
  try {
    const results = await Employer.findAll({
      where: {
        companyName: {
          [Op.like]: literal(`'%${query}%' COLLATE utf8mb4_general_ci`),
        },
      },
    })
    res.json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.post("/edit/:employerID", async (req, res) => {
  const employerID = req.params.employerID;
  const updatedData = req.body;

  try {
    const employer = await Employer.findByPk(employerID);

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    await employer.update(updatedData);

    res.status(200).json({ message: "Employer updated successfully" });
  } catch (error) {
    console.error("Error updating employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete('/delete/:employerID', async (req, res) => {
  const { employerID } = req.params;

  try {
    const employer = await Employer.findByPk(employerID);

    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' });
    }

    await employer.destroy();
    return res.status(200).json({ message: 'Employer deleted successfully' });
  } catch (error) {
    console.error('Error deleting employer:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;