const mongoose = require('mongoose');

const victimSchema = new mongoose.Schema({
  // Basic Victim Information
  basicInfo: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'unknown'],
      required: true
    },
    nationality: {
      type: String,
      trim: true
    },
    identificationNumber: {
      type: String,
      unique: true,
      sparse: true
    },
    contactNumber: String,
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    }
  },

  // Location Information
  location: {
    currentLocation: {
      type: String,
      required: true,
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    city: String,
    state: String,
    country: String,
    zipCode: String,
    lastKnownLocation: String,
    traffickingRoute: [String] // Array of locations in trafficking route
  },

  // Trafficking Information
  traffickingDetails: {
    type: {
      type: String,
      enum: ['sex_trafficking', 'labor_trafficking', 'organ_trafficking', 'child_trafficking', 'domestic_servitude', 'forced_marriage', 'other'],
      required: true
    },
    subType: String, // More specific classification
    recruitmentMethod: {
      type: String,
      enum: ['deception', 'force', 'coercion', 'abduction', 'family_member', 'online', 'other']
    },
    duration: {
      startDate: Date,
      endDate: Date,
      estimatedDuration: String // e.g., "6 months", "2 years"
    },
    perpetrators: [{
      name: String,
      relationship: String,
      description: String,
      contactInfo: String
    }],
    exploitationDetails: {
      workType: String,
      workingConditions: String,
      payment: {
        amount: Number,
        currency: String,
        frequency: String
      },
      livingConditions: String,
      restrictions: [String] // e.g., ["no phone", "no ID", "locked doors"]
    }
  },

  // Case Management
  caseStatus: {
    status: {
      type: String,
      enum: ['reported', 'investigating', 'rescued', 'in_care', 'rehabilitated', 'repatriated', 'closed'],
      default: 'reported'
    },
    rescueDate: Date,
    rescueLocation: String,
    rescueMethod: String,
    caseNumber: {
      type: String,
      unique: true,
      sparse: true
    },
    assignedOfficer: {
      name: String,
      badgeNumber: String,
      contact: String
    }
  },

  // NGO Assignment
  ngoAssignment: {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NGO'
    },
    ngoName: String,
    assignedDate: Date,
    assignedBy: String,
    caseManager: {
      name: String,
      contact: String,
      email: String
    },
    servicesProvided: [{
      type: String,
      enum: ['shelter', 'medical', 'psychological', 'legal', 'education', 'vocational', 'repatriation', 'other'],
      description: String,
      startDate: Date,
      endDate: Date,
      status: {
        type: String,
        enum: ['planned', 'in_progress', 'completed', 'cancelled']
      }
    }]
  },

  // Criticality Assessment
  criticality: {
    level: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true,
      default: 'medium'
    },
    factors: [{
      factor: String,
      severity: {
        type: String,
        enum: ['low', 'medium', 'high']
      },
      description: String
    }],
    immediateNeeds: [String],
    riskAssessment: {
      riskLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'extreme']
      },
      riskFactors: [String],
      lastAssessment: Date
    }
  },

  // Medical Information
  medicalInfo: {
    healthStatus: {
      type: String,
      enum: ['good', 'fair', 'poor', 'critical', 'unknown']
    },
    injuries: [{
      type: String,
      severity: String,
      treatment: String,
      date: Date
    }],
    medicalConditions: [String],
    medications: [String],
    lastMedicalCheck: Date,
    requiresImmediateCare: {
      type: Boolean,
      default: false
    }
  },

  // Evidence and Documentation
  evidence: {
    photos: [String], // File URLs
    documents: [String], // File URLs
    witnessStatements: [{
      witnessName: String,
      statement: String,
      date: Date,
      contactInfo: String
    }],
    policeReports: [String], // File URLs
    medicalReports: [String] // File URLs
  },

  // Timeline and Updates
  timeline: [{
    date: {
      type: Date,
      default: Date.now
    },
    event: String,
    description: String,
    updatedBy: String,
    category: {
      type: String,
      enum: ['report', 'investigation', 'rescue', 'medical', 'legal', 'ngo', 'other']
    }
  }],

  // Privacy and Security
  privacy: {
    isAnonymous: {
      type: Boolean,
      default: false
    },
    dataSharingConsent: {
      type: Boolean,
      default: false
    },
    restrictedAccess: {
      type: Boolean,
      default: false
    },
    accessLevel: {
      type: String,
      enum: ['public', 'restricted', 'confidential', 'top_secret'],
      default: 'restricted'
    }
  },

  // Metadata
  source: {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report'
    },
    reportedBy: {
      name: String,
      contact: String,
      relationship: String
    },
    reportDate: {
      type: Date,
      default: Date.now
    }
  },

  // System fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: String,
  updatedBy: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
victimSchema.index({ 'basicInfo.name': 1 });
victimSchema.index({ 'location.currentLocation': 1 });
victimSchema.index({ 'traffickingDetails.type': 1 });
victimSchema.index({ 'caseStatus.status': 1 });
victimSchema.index({ 'criticality.level': 1 });
victimSchema.index({ 'ngoAssignment.ngoId': 1 });
victimSchema.index({ createdAt: -1 });
victimSchema.index({ 'source.reportId': 1 });

// Pre-save middleware to update the updatedAt field
victimSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for age calculation
victimSchema.virtual('ageGroup').get(function() {
  const age = this.basicInfo.age;
  if (age < 18) return 'minor';
  if (age < 25) return 'young_adult';
  if (age < 40) return 'adult';
  return 'senior';
});

// Method to add timeline entry
victimSchema.methods.addTimelineEntry = function(event, description, updatedBy, category = 'other') {
  this.timeline.push({
    date: new Date(),
    event,
    description,
    updatedBy,
    category
  });
  return this.save();
};

// Method to update case status
victimSchema.methods.updateCaseStatus = function(newStatus, updatedBy, additionalInfo = '') {
  this.caseStatus.status = newStatus;
  this.addTimelineEntry(
    `Case status updated to ${newStatus}`,
    additionalInfo || `Status changed to ${newStatus}`,
    updatedBy,
    'case'
  );
  return this.save();
};

// Static method to get victims by criticality level
victimSchema.statics.getByCriticality = function(level) {
  return this.find({ 'criticality.level': level, isActive: true });
};

// Static method to get victims by NGO
victimSchema.statics.getByNGO = function(ngoId) {
  return this.find({ 'ngoAssignment.ngoId': ngoId, isActive: true });
};

// Static method to get victims by trafficking type
victimSchema.statics.getByTraffickingType = function(type) {
  return this.find({ 'traffickingDetails.type': type, isActive: true });
};

module.exports = mongoose.model('Victim', victimSchema); 