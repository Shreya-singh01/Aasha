const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  // Basic NGO Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  acronym: String,
  registrationNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  type: {
    type: String,
    enum: ['rescue', 'rehabilitation', 'legal', 'medical', 'education', 'advocacy', 'comprehensive'],
    required: true
  },
  focusAreas: [{
    type: String,
    enum: ['sex_trafficking', 'labor_trafficking', 'child_trafficking', 'domestic_servitude', 'forced_marriage', 'organ_trafficking', 'other']
  }],

  // Contact Information
  contact: {
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    phone: [String],
    email: [String],
    website: String,
    emergencyContact: {
      name: String,
      phone: String,
      email: String
    }
  },

  // Operational Details
  operational: {
    isActive: {
      type: Boolean,
      default: true
    },
    establishedDate: Date,
    operatingHours: {
      start: String,
      end: String,
      timezone: String
    },
    coverageArea: [String], // Cities/states/countries they operate in
    capacity: {
      maxCases: Number,
      currentCases: {
        type: Number,
        default: 0
      },
      availableSlots: {
        type: Number,
        default: 0
      }
    }
  },

  // Services Offered
  services: [{
    type: {
      type: String,
      enum: ['shelter', 'medical', 'psychological', 'legal', 'education', 'vocational', 'repatriation', 'counseling', 'emergency_response', 'other']
    },
    description: String,
    isAvailable: {
      type: Boolean,
      default: true
    },
    capacity: Number,
    waitingList: {
      type: Boolean,
      default: false
    }
  }],

  // Staff Information
  staff: {
    totalStaff: Number,
    caseWorkers: Number,
    medicalStaff: Number,
    legalStaff: Number,
    volunteers: Number,
    keyPersonnel: [{
      name: String,
      position: String,
      contact: String,
      email: String
    }]
  },

  // Resources and Facilities
  facilities: {
    shelterBeds: Number,
    medicalFacility: {
      type: Boolean,
      default: false
    },
    counselingRooms: Number,
    legalOffice: {
      type: Boolean,
      default: false
    },
    educationalFacility: {
      type: Boolean,
      default: false
    },
    securityMeasures: [String]
  },

  // Performance Metrics
  performance: {
    totalCasesHandled: {
      type: Number,
      default: 0
    },
    successRate: Number, // Percentage
    averageResponseTime: Number, // in hours
    averageRecoveryTime: Number, // in days
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },

  // Partnerships and Networks
  partnerships: [{
    organization: String,
    type: String,
    description: String,
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  }],

  // Funding and Financial Information
  funding: {
    sources: [{
      source: String,
      amount: Number,
      currency: String,
      period: String
    }],
    annualBudget: {
      amount: Number,
      currency: String,
      year: Number
    },
    isTransparent: {
      type: Boolean,
      default: false
    }
  },

  // Certifications and Accreditations
  certifications: [{
    name: String,
    issuingAuthority: String,
    issueDate: Date,
    expiryDate: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  }],

  // Documentation
  documents: {
    registrationCertificate: String, // File URL
    taxExemption: String, // File URL
    annualReports: [String], // File URLs
    policies: [String], // File URLs
    photos: [String] // File URLs
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
  updatedBy: String
}, {
  timestamps: true
});

// Indexes for better query performance
ngoSchema.index({ name: 1 });
ngoSchema.index({ type: 1 });
ngoSchema.index({ 'operational.isActive': 1 });
ngoSchema.index({ 'operational.coverageArea': 1 });
ngoSchema.index({ 'focusAreas': 1 });
ngoSchema.index({ 'services.type': 1 });

// Pre-save middleware to update the updatedAt field
ngoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to check if NGO can accept new cases
ngoSchema.methods.canAcceptCase = function() {
  return this.operational.isActive && 
         this.operational.capacity.currentCases < this.operational.capacity.maxCases;
};

// Method to add a case
ngoSchema.methods.addCase = function() {
  if (this.canAcceptCase()) {
    this.operational.capacity.currentCases += 1;
    this.operational.capacity.availableSlots = 
      this.operational.capacity.maxCases - this.operational.capacity.currentCases;
    return this.save();
  }
  throw new Error('NGO cannot accept more cases');
};

// Method to remove a case
ngoSchema.methods.removeCase = function() {
  if (this.operational.capacity.currentCases > 0) {
    this.operational.capacity.currentCases -= 1;
    this.operational.capacity.availableSlots = 
      this.operational.capacity.maxCases - this.operational.capacity.currentCases;
    return this.save();
  }
  throw new Error('No cases to remove');
};

// Static method to find NGOs by service type
ngoSchema.statics.findByService = function(serviceType) {
  return this.find({
    'operational.isActive': true,
    'services.type': serviceType,
    'services.isAvailable': true
  });
};

// Static method to find NGOs by location
ngoSchema.statics.findByLocation = function(location) {
  return this.find({
    'operational.isActive': true,
    'operational.coverageArea': { $regex: location, $options: 'i' }
  });
};

// Static method to find NGOs with available capacity
ngoSchema.statics.findWithCapacity = function() {
  return this.find({
    'operational.isActive': true,
    $expr: {
      $lt: ['$operational.capacity.currentCases', '$operational.capacity.maxCases']
    }
  });
};

module.exports = mongoose.model('NGO', ngoSchema); 