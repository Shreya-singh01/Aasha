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
  assignedTo: String, // Name or ID of assigned NGO/team
  status: {
    type: String,
    enum: ['pending', 'assigned', 'under_investigation', 'resolved', 'false_alarm'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
