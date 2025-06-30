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

  // ✅ Location block to support seeding and querying
  location: {
    city: String,
    locality: String,
    pincode: String
  },

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
    coverageArea: [String],
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

  performance: {
    totalCasesHandled: {
      type: Number,
      default: 0
    },
    successRate: Number,
    averageResponseTime: Number,
    averageRecoveryTime: Number,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },

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

  documents: {
    registrationCertificate: String,
    taxExemption: String,
    annualReports: [String],
    policies: [String],
    photos: [String]
  },

  assignedTasks: [String],

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
}, { timestamps: true });

ngoSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

ngoSchema.methods.canAcceptCase = function () {
  return this.operational?.isActive &&
    this.operational.capacity.currentCases < this.operational.capacity.maxCases;
};

ngoSchema.methods.addCase = function () {
  if (this.canAcceptCase()) {
    this.operational.capacity.currentCases += 1;
    this.operational.capacity.availableSlots =
      this.operational.capacity.maxCases - this.operational.capacity.currentCases;
    return this.save();
  }
  throw new Error('NGO cannot accept more cases');
};

ngoSchema.methods.removeCase = function () {
  if (this.operational.capacity.currentCases > 0) {
    this.operational.capacity.currentCases -= 1;
    this.operational.capacity.availableSlots =
      this.operational.capacity.maxCases - this.operational.capacity.currentCases;
    return this.save();
  }
  throw new Error('No cases to remove');
};

ngoSchema.statics.findByLocation = function (location) {
  return this.find({
    'operational.isActive': true,
    'location.city': { $regex: location, $options: 'i' }
  });
};

ngoSchema.statics.findWithCapacity = function () {
  return this.find({
    'operational.isActive': true,
    $expr: {
      $lt: ['$operational.capacity.currentCases', '$operational.capacity.maxCases']
    }
  });
};

module.exports = mongoose.model('NGO', ngoSchema);
