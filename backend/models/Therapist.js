const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: String,
  email: String,
  institution: String,
  specialization: String,
  availability: String,
  languages: [String],
  preferred_mode: String,
  consent: Boolean,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Therapist', therapistSchema, 'therapists'); 