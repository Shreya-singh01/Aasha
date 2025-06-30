const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  incidentType: String,
  location: String,
  date: String,
  time: String,
  description: String,
  victimCount: Number,
  perpetratorCount: Number,
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent', 'critical']
  },
  contactInfo: {
    name: String,
    phone: String,
    email: String,
    anonymous: Boolean
  },
  evidence: [String], // file URLs or names
  additionalNotes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
