const express = require('express');
const router = express.Router();
const RegisteredUser = require('../models/RegisteredUser.js');
const UnregisteredUser = require('../models/UnregisteredUser.js');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegisteredUser.findOne({ where: { verifiedEmail: email } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Email not found' });
    }

    if (user.password === password) {
      return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const uniqueIdentifier = uuidv4();

  try {
    const existingUser = await RegisteredUser.findOne({ where: { verifiedEmail: email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }

    await UnregisteredUser.create({
      submittedEmail: email,
      pendingUserPassword: password,
      uniqueIdentifier: uniqueIdentifier 
    });

    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: 'capstone-caterpillar@outlook.com',
        pass: '8!gIq2iatnbHMXms'
      }
    });

    const mailOptions = {
      from: 'capstone-caterpillar@outlook.com',
      to: email,
      subject: 'Registration Confirmation',
      html: `<p>Thank you for registering. Please confirm your email by clicking on the following link: <a href="http://localhost:9000/testAPI/confirm/${uniqueIdentifier}">Confirm Email</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send confirmation email' });
      } else {
        return res.status(200).json({ success: true, message: 'User registered successfully, confirmation email sent' });
      }
    });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/confirm/:uniqueIdentifier', async (req, res) => {
  console.log('Confirm route hit with uniqueIdentifier:', req.params.uniqueIdentifier); // Log when the route is hit

  try {
    console.log('Looking for unregistered user');
    const unregisteredUser = await UnregisteredUser.findOne({
      where: { uniqueIdentifier: req.params.uniqueIdentifier }
    });

    console.log('Unregistered user found:', unregisteredUser);
    if (!unregisteredUser) {
      return res.status(404).json({ success: false, message: 'Invalid or expired confirmation link' });
    }

    await UnregisteredUser.destroy({
      where: { uniqueIdentifier: req.params.uniqueIdentifier }
    });

    return res.status(200).json({ success: true, message: 'Account confirmed and user registered successfully' });
  } catch (err) {
    console.error('Error during confirmation:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
