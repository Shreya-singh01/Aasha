const mongoose = require('mongoose');

const redZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Zone name is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  riskLevel: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: [true, 'Risk level is required']
  },
  lastReport: {
    type: String,
    default: 'Unknown'
  },
  activeCases: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required']
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required']
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RedZone', redZoneSchema,'redzones');
