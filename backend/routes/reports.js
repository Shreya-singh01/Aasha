const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Report = require('../models/Report');

const router = express.Router();

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Use disk storage to save files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// @route   POST /api/reports/submit
// @desc    Submit a report with optional file uploads
router.post('/submit', upload.array('evidence'), async (req, res) => {
  try {
    const {
      incidentType,
      location,
      date,
      time,
      description,
      victimCount,
      perpetratorCount,
      urgency,
      additionalNotes,
      contactInfo
    } = req.body;

    // Check and parse contactInfo JSON safely
    let parsedContact = {};
    try {
      parsedContact = JSON.parse(contactInfo);
    } catch (err) {
      console.error('⚠️ Invalid contactInfo JSON:', contactInfo);
      return res.status(400).json({ error: 'Invalid contactInfo format' });
    }

    // Get filenames of uploaded evidence
    const evidence = req.files.map(file => file.filename);

    const report = new Report({
      incidentType,
      location,
      date,
      time,
      description,
      victimCount,
      perpetratorCount,
      urgency,
      contactInfo: parsedContact,
      evidence,
      additionalNotes
      // Do NOT set assignedTo or status here; let Mongoose defaults apply
    });

    await report.save();

    res.status(201).json({
      message: '✅ Report submitted successfully',
      reportId: report._id
    });

  } catch (err) {
    console.error('❌ Error saving report:', err);
    res.status(500).json({ error: 'Something went wrong while submitting the report!' });
  }
});

// @route   GET /api/reports
// @desc    Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    console.error('❌ Error fetching reports:', err);
    res.status(500).json({ error: 'Something went wrong while fetching reports!' });
  }
});

// NOTE: If you change the Report schema, restart the backend to apply new defaults.

module.exports = router;

