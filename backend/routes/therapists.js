const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const nodemailer = require('nodemailer');

// GET /api/therapists?specialization=...
router.get('/', async (req, res) => {
  try {
    const { specialization } = req.query;
    let query = {};
    if (specialization && specialization !== 'all') {
      query.specialization = specialization;
    }
    const therapists = await Therapist.find(query);
    res.status(200).json({ success: true, data: therapists });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST /api/therapists (for seeding)
router.post('/', async (req, res) => {
  try {
    const therapist = await Therapist.create(req.body);
    res.status(201).json({ success: true, data: therapist });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Data', error: error.message });
  }
});

// POST /api/therapists/:id/schedule
router.post('/:id/schedule', async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    if (!therapist) {
      return res.status(404).json({ success: false, message: 'Therapist not found' });
    }
    // For demo: pick the first available slot from availability string
    const slot = therapist.availability.split('-')[0].trim();
    // Generate a dummy meet link
    const meetLink = `https://meet.jit.si/therapist-${therapist._id}-${Date.now()}`;

    // Send email using nodemailer
    // Configure your SMTP or Gmail credentials in config.env
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: therapist.email,
      subject: `New Therapy Session Scheduled` ,
      text: `Hi ${therapist.name},\n\nA new therapy session has been scheduled.\n\nMeet Link: ${meetLink}\nTime: ${therapist.availability}\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, meetLink, message: 'Meet link sent to therapist.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error scheduling meet', error: error.message });
  }
});

module.exports = router; 