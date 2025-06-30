const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

// Import models
const Victim = require('./models/Victim');
const NGO = require('./models/NGO');
const Report = require('./models/Report');

// Connect to MongoDB
const connectDB = require('./config/database');

// Sample NGO data
const sampleNGOs = [
  {
    name: "Rescue Foundation",
    acronym: "RF",
    registrationNumber: "NGO001",
    type: "comprehensive",
    focusAreas: ["sex_trafficking", "child_trafficking"],
    contact: {
      address: {
        street: "123 Rescue Street",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        zipCode: "400001"
      },
      phone: ["+91-22-12345678"],
      email: ["info@rescuefoundation.org"],
      website: "www.rescuefoundation.org",
      emergencyContact: {
        name: "Dr. Priya Sharma",
        phone: "+91-9876543210",
        email: "emergency@rescuefoundation.org"
      }
    },
    operational: {
      isActive: true,
      establishedDate: new Date("2010-01-01"),
      operatingHours: {
        start: "24/7",
        end: "24/7",
        timezone: "IST"
      },
      coverageArea: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
      capacity: {
        maxCases: 100,
        currentCases: 45,
        availableSlots: 55
      }
    },
    services: [
      {
        type: "shelter",
        description: "Safe shelter for rescued victims",
        isAvailable: true,
        capacity: 50
      },
      {
        type: "medical",
        description: "Medical care and treatment",
        isAvailable: true,
        capacity: 30
      },
      {
        type: "psychological",
        description: "Counseling and therapy",
        isAvailable: true,
        capacity: 25
      },
      {
        type: "legal",
        description: "Legal assistance and representation",
        isAvailable: true,
        capacity: 20
      }
    ],
    staff: {
      totalStaff: 25,
      caseWorkers: 10,
      medicalStaff: 5,
      legalStaff: 3,
      volunteers: 7,
      keyPersonnel: [
        {
          name: "Dr. Priya Sharma",
          position: "Director",
          contact: "+91-9876543210",
          email: "priya@rescuefoundation.org"
        }
      ]
    },
    facilities: {
      shelterBeds: 50,
      medicalFacility: true,
      counselingRooms: 5,
      legalOffice: true,
      educationalFacility: true,
      securityMeasures: ["24/7 security", "CCTV cameras", "Secure entry"]
    },
    performance: {
      totalCasesHandled: 500,
      successRate: 85,
      averageResponseTime: 2,
      averageRecoveryTime: 180
    }
  },
  {
    name: "Freedom Network",
    acronym: "FN",
    registrationNumber: "NGO002",
    type: "rescue",
    focusAreas: ["labor_trafficking", "domestic_servitude"],
    contact: {
      address: {
        street: "456 Freedom Avenue",
        city: "Delhi",
        state: "Delhi",
        country: "India",
        zipCode: "110001"
      },
      phone: ["+91-11-87654321"],
      email: ["contact@freedomnetwork.org"],
      website: "www.freedomnetwork.org",
      emergencyContact: {
        name: "Rajesh Kumar",
        phone: "+91-8765432109",
        email: "emergency@freedomnetwork.org"
      }
    },
    operational: {
      isActive: true,
      establishedDate: new Date("2015-03-15"),
      operatingHours: {
        start: "06:00",
        end: "22:00",
        timezone: "IST"
      },
      coverageArea: ["Delhi", "Gurgaon", "Noida", "Faridabad"],
      capacity: {
        maxCases: 75,
        currentCases: 30,
        availableSlots: 45
      }
    },
    services: [
      {
        type: "emergency_response",
        description: "24/7 emergency rescue operations",
        isAvailable: true,
        capacity: 20
      },
      {
        type: "shelter",
        description: "Temporary shelter for rescued victims",
        isAvailable: true,
        capacity: 30
      },
      {
        type: "repatriation",
        description: "Assistance with repatriation",
        isAvailable: true,
        capacity: 15
      }
    ],
    staff: {
      totalStaff: 18,
      caseWorkers: 8,
      medicalStaff: 2,
      legalStaff: 2,
      volunteers: 6,
      keyPersonnel: [
        {
          name: "Rajesh Kumar",
          position: "Operations Manager",
          contact: "+91-8765432109",
          email: "rajesh@freedomnetwork.org"
        }
      ]
    },
    facilities: {
      shelterBeds: 30,
      medicalFacility: false,
      counselingRooms: 3,
      legalOffice: true,
      educationalFacility: false,
      securityMeasures: ["Security guards", "Alarm system"]
    },
    performance: {
      totalCasesHandled: 300,
      successRate: 78,
      averageResponseTime: 1.5,
      averageRecoveryTime: 120
    }
  }
];

// Sample victim data
const sampleVictims = [
  {
    basicInfo: {
      name: "Priya Patel",
      age: 19,
      gender: "female",
      nationality: "Indian",
      identificationNumber: "VIC001",
      contactNumber: "+91-9876543210",
      emergencyContact: {
        name: "Ramesh Patel",
        relationship: "Father",
        phone: "+91-8765432109"
      }
    },
    location: {
      currentLocation: "Mumbai, Maharashtra",
      coordinates: {
        latitude: 19.0760,
        longitude: 72.8777
      },
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400001",
      lastKnownLocation: "Kolkata, West Bengal",
      traffickingRoute: ["Kolkata", "Mumbai", "Delhi"]
    },
    traffickingDetails: {
      type: "sex_trafficking",
      subType: "forced_prostitution",
      recruitmentMethod: "deception",
      duration: {
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-20"),
        estimatedDuration: "5 months"
      },
      perpetrators: [
        {
          name: "Unknown",
          relationship: "Trafficker",
          description: "Middle-aged man, operates in red-light district",
          contactInfo: "Unknown"
        }
      ],
      exploitationDetails: {
        workType: "Forced prostitution",
        workingConditions: "Extremely poor, confined to small rooms",
        payment: {
          amount: 0,
          currency: "INR",
          frequency: "None"
        },
        livingConditions: "Crowded, unsanitary conditions",
        restrictions: ["no phone", "no ID", "locked doors", "no contact with family"]
      }
    },
    caseStatus: {
      status: "rescued",
      rescueDate: new Date("2024-06-20"),
      rescueLocation: "Mumbai red-light district",
      rescueMethod: "Police raid with NGO assistance",
      caseNumber: "CASE001",
      assignedOfficer: {
        name: "Inspector Meera Singh",
        badgeNumber: "MUM001",
        contact: "+91-9876543211"
      }
    },
    ngoAssignment: {
      ngoName: "Rescue Foundation",
      assignedDate: new Date("2024-06-21"),
      assignedBy: "Inspector Meera Singh",
      caseManager: {
        name: "Dr. Priya Sharma",
        contact: "+91-9876543210",
        email: "priya@rescuefoundation.org"
      },
      servicesProvided: [
        {
          type: "shelter",
          description: "Safe shelter accommodation",
          startDate: new Date("2024-06-21"),
          status: "in_progress"
        },
        {
          type: "medical",
          description: "Medical examination and treatment",
          startDate: new Date("2024-06-22"),
          status: "completed"
        },
        {
          type: "psychological",
          description: "Trauma counseling",
          startDate: new Date("2024-06-23"),
          status: "in_progress"
        }
      ]
    },
    criticality: {
      level: "high",
      factors: [
        {
          factor: "Severe trauma",
          severity: "high",
          description: "Experienced severe physical and psychological trauma"
        },
        {
          factor: "Family separation",
          severity: "medium",
          description: "Separated from family for 5 months"
        }
      ],
      immediateNeeds: ["Medical care", "Psychological support", "Family reunification"],
      riskAssessment: {
        riskLevel: "high",
        riskFactors: ["Suicide risk", "Re-trafficking risk"],
        lastAssessment: new Date("2024-06-25")
      }
    },
    medicalInfo: {
      healthStatus: "poor",
      injuries: [
        {
          type: "Physical abuse",
          severity: "moderate",
          treatment: "Ongoing medical care",
          date: new Date("2024-06-22")
        }
      ],
      medicalConditions: ["Malnutrition", "STI", "Depression"],
      medications: ["Antibiotics", "Antidepressants"],
      lastMedicalCheck: new Date("2024-06-25"),
      requiresImmediateCare: true
    },
    evidence: {
      photos: ["photo1.jpg", "photo2.jpg"],
      documents: ["medical_report.pdf", "police_report.pdf"],
      witnessStatements: [
        {
          witnessName: "Neighbor",
          statement: "Saw suspicious activity in the building",
          date: new Date("2024-06-19"),
          contactInfo: "Anonymous"
        }
      ],
      policeReports: ["police_report_001.pdf"],
      medicalReports: ["medical_report_001.pdf"]
    },
    timeline: [
      {
        date: new Date("2024-06-20"),
        event: "Victim rescued",
        description: "Rescued from red-light district during police raid",
        updatedBy: "Inspector Meera Singh",
        category: "rescue"
      },
      {
        date: new Date("2024-06-21"),
        event: "NGO assigned",
        description: "Assigned to Rescue Foundation for rehabilitation",
        updatedBy: "Inspector Meera Singh",
        category: "ngo"
      }
    ],
    privacy: {
      isAnonymous: false,
      dataSharingConsent: true,
      restrictedAccess: true,
      accessLevel: "confidential"
    },
    source: {
      reportedBy: {
        name: "Anonymous tip",
        contact: "Unknown",
        relationship: "Concerned citizen"
      },
      reportDate: new Date("2024-06-19")
    }
  },
  {
    basicInfo: {
      name: "Amit Kumar",
      age: 16,
      gender: "male",
      nationality: "Indian",
      identificationNumber: "VIC002",
      contactNumber: "+91-8765432109",
      emergencyContact: {
        name: "Sunita Kumar",
        relationship: "Mother",
        phone: "+91-7654321098"
      }
    },
    location: {
      currentLocation: "Delhi, India",
      coordinates: {
        latitude: 28.7041,
        longitude: 77.1025
      },
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "110001",
      lastKnownLocation: "Village in Bihar",
      traffickingRoute: ["Bihar", "Delhi", "Gurgaon"]
    },
    traffickingDetails: {
      type: "labor_trafficking",
      subType: "forced_labor",
      recruitmentMethod: "family_member",
      duration: {
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-07-15"),
        estimatedDuration: "4.5 months"
      },
      perpetrators: [
        {
          name: "Uncle",
          relationship: "Family member",
          description: "Promised good job but forced into labor",
          contactInfo: "Unknown"
        }
      ],
      exploitationDetails: {
        workType: "Construction labor",
        workingConditions: "Dangerous, long hours, no safety equipment",
        payment: {
          amount: 2000,
          currency: "INR",
          frequency: "monthly"
        },
        livingConditions: "Crowded dormitory, poor sanitation",
        restrictions: ["no phone", "no ID", "no freedom of movement"]
      }
    },
    caseStatus: {
      status: "investigating",
      caseNumber: "CASE002",
      assignedOfficer: {
        name: "Inspector Rajesh Kumar",
        badgeNumber: "DEL001",
        contact: "+91-8765432109"
      }
    },
    ngoAssignment: {
      ngoName: "Freedom Network",
      assignedDate: new Date("2024-07-16"),
      assignedBy: "Inspector Rajesh Kumar",
      caseManager: {
        name: "Rajesh Kumar",
        contact: "+91-8765432109",
        email: "rajesh@freedomnetwork.org"
      },
      servicesProvided: [
        {
          type: "shelter",
          description: "Temporary shelter",
          startDate: new Date("2024-07-16"),
          status: "in_progress"
        },
        {
          type: "repatriation",
          description: "Assistance with returning to family",
          startDate: new Date("2024-07-17"),
          status: "planned"
        }
      ]
    },
    criticality: {
      level: "medium",
      factors: [
        {
          factor: "Minor victim",
          severity: "high",
          description: "Underage victim of labor trafficking"
        },
        {
          factor: "Family involvement",
          severity: "medium",
          description: "Family member involved in trafficking"
        }
      ],
      immediateNeeds: ["Safe shelter", "Family reunification", "Education support"],
      riskAssessment: {
        riskLevel: "medium",
        riskFactors: ["Re-trafficking risk", "Family pressure"],
        lastAssessment: new Date("2024-07-16")
      }
    },
    medicalInfo: {
      healthStatus: "fair",
      injuries: [
        {
          type: "Work-related injuries",
          severity: "mild",
          treatment: "Basic medical care",
          date: new Date("2024-07-16")
        }
      ],
      medicalConditions: ["Malnutrition", "Fatigue"],
      medications: ["Vitamins", "Pain relievers"],
      lastMedicalCheck: new Date("2024-07-16"),
      requiresImmediateCare: false
    },
    evidence: {
      photos: ["work_site_photos.jpg"],
      documents: ["employment_contract.pdf"],
      witnessStatements: [
        {
          witnessName: "Co-worker",
          statement: "Saw minor working on construction site",
          date: new Date("2024-07-15"),
          contactInfo: "Anonymous"
        }
      ],
      policeReports: ["police_report_002.pdf"],
      medicalReports: ["medical_report_002.pdf"]
    },
    timeline: [
      {
        date: new Date("2024-07-15"),
        event: "Case reported",
        description: "Labor trafficking case reported by concerned citizen",
        updatedBy: "Inspector Rajesh Kumar",
        category: "report"
      },
      {
        date: new Date("2024-07-16"),
        event: "Victim rescued",
        description: "Rescued from construction site",
        updatedBy: "Inspector Rajesh Kumar",
        category: "rescue"
      }
    ],
    privacy: {
      isAnonymous: false,
      dataSharingConsent: true,
      restrictedAccess: true,
      accessLevel: "confidential"
    },
    source: {
      reportedBy: {
        name: "Concerned citizen",
        contact: "Anonymous",
        relationship: "Witness"
      },
      reportDate: new Date("2024-07-15")
    }
  },
  {
    basicInfo: {
      name: "Fatima Begum",
      age: 25,
      gender: "female",
      nationality: "Indian",
      identificationNumber: "VIC003",
      contactNumber: "+91-7654321098",
      emergencyContact: {
        name: "Ahmed Khan",
        relationship: "Brother",
        phone: "+91-6543210987"
      }
    },
    location: {
      currentLocation: "Bangalore, Karnataka",
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946
      },
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipCode: "560001",
      lastKnownLocation: "Hyderabad, Telangana",
      traffickingRoute: ["Hyderabad", "Bangalore", "Mumbai"]
    },
    traffickingDetails: {
      type: "domestic_servitude",
      subType: "forced_domestic_work",
      recruitmentMethod: "deception",
      duration: {
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-08-10"),
        estimatedDuration: "6 months"
      },
      perpetrators: [
        {
          name: "Employer family",
          relationship: "Employer",
          description: "Family that hired her as domestic help",
          contactInfo: "Unknown"
        }
      ],
      exploitationDetails: {
        workType: "Domestic work",
        workingConditions: "Long hours, no breaks, verbal abuse",
        payment: {
          amount: 5000,
          currency: "INR",
          frequency: "monthly"
        },
        livingConditions: "Small room, poor food",
        restrictions: ["no phone", "no freedom", "no contact with family"]
      }
    },
    caseStatus: {
      status: "in_care",
      rescueDate: new Date("2024-08-10"),
      rescueLocation: "Bangalore residence",
      rescueMethod: "NGO intervention",
      caseNumber: "CASE003",
      assignedOfficer: {
        name: "Inspector Lakshmi Devi",
        badgeNumber: "BLR001",
        contact: "+91-7654321098"
      }
    },
    ngoAssignment: {
      ngoName: "Rescue Foundation",
      assignedDate: new Date("2024-08-11"),
      assignedBy: "Inspector Lakshmi Devi",
      caseManager: {
        name: "Dr. Priya Sharma",
        contact: "+91-9876543210",
        email: "priya@rescuefoundation.org"
      },
      servicesProvided: [
        {
          type: "shelter",
          description: "Safe shelter accommodation",
          startDate: new Date("2024-08-11"),
          status: "in_progress"
        },
        {
          type: "psychological",
          description: "Trauma counseling",
          startDate: new Date("2024-08-12"),
          status: "in_progress"
        },
        {
          type: "vocational",
          description: "Skills training",
          startDate: new Date("2024-08-15"),
          status: "planned"
        }
      ]
    },
    criticality: {
      level: "medium",
      factors: [
        {
          factor: "Psychological trauma",
          severity: "medium",
          description: "Experienced verbal abuse and isolation"
        },
        {
          factor: "Financial dependency",
          severity: "low",
          description: "Needs financial independence"
        }
      ],
      immediateNeeds: ["Psychological support", "Vocational training", "Financial assistance"],
      riskAssessment: {
        riskLevel: "low",
        riskFactors: ["Economic vulnerability"],
        lastAssessment: new Date("2024-08-12")
      }
    },
    medicalInfo: {
      healthStatus: "good",
      injuries: [],
      medicalConditions: ["Mild depression"],
      medications: ["Antidepressants"],
      lastMedicalCheck: new Date("2024-08-12"),
      requiresImmediateCare: false
    },
    evidence: {
      photos: ["residence_photos.jpg"],
      documents: ["employment_contract.pdf"],
      witnessStatements: [
        {
          witnessName: "Neighbor",
          statement: "Heard verbal abuse from the residence",
          date: new Date("2024-08-09"),
          contactInfo: "Anonymous"
        }
      ],
      policeReports: ["police_report_003.pdf"],
      medicalReports: ["medical_report_003.pdf"]
    },
    timeline: [
      {
        date: new Date("2024-08-10"),
        event: "Victim rescued",
        description: "Rescued from domestic servitude situation",
        updatedBy: "Inspector Lakshmi Devi",
        category: "rescue"
      },
      {
        date: new Date("2024-08-11"),
        event: "NGO assigned",
        description: "Assigned to Rescue Foundation for rehabilitation",
        updatedBy: "Inspector Lakshmi Devi",
        category: "ngo"
      }
    ],
    privacy: {
      isAnonymous: false,
      dataSharingConsent: true,
      restrictedAccess: true,
      accessLevel: "confidential"
    },
    source: {
      reportedBy: {
        name: "Concerned neighbor",
        contact: "Anonymous",
        relationship: "Neighbor"
      },
      reportDate: new Date("2024-08-09")
    }
  }
];

// Sample reports data
const sampleReports = [
  {
    incidentType: "victim_sighting",
    location: "Mumbai red-light district",
    date: "2024-06-19",
    time: "14:30",
    description: "Suspicious activity observed in red-light district. Young girl appears distressed and under duress.",
    victimCount: 1,
    perpetratorCount: 2,
    urgency: "high",
    contactInfo: {
      name: "Anonymous",
      phone: "",
      email: "",
      anonymous: true
    },
    evidence: ["photo1.jpg"],
    additionalNotes: "Reported by concerned citizen"
  },
  {
    incidentType: "labor_trafficking",
    location: "Delhi construction site",
    date: "2024-07-15",
    time: "09:15",
    description: "Minor observed working on construction site. Appears to be underage and working under duress.",
    victimCount: 1,
    perpetratorCount: 1,
    urgency: "medium",
    contactInfo: {
      name: "Anonymous",
      phone: "",
      email: "",
      anonymous: true
    },
    evidence: ["photo2.jpg"],
    additionalNotes: "Reported by construction worker"
  },
  {
    incidentType: "suspicious_activity",
    location: "Bangalore residential area",
    date: "2024-08-09",
    time: "16:45",
    description: "Domestic worker appears to be working under suspicious conditions. No freedom of movement observed.",
    victimCount: 1,
    perpetratorCount: 3,
    urgency: "medium",
    contactInfo: {
      name: "Anonymous",
      phone: "",
      email: "",
      anonymous: true
    },
    evidence: ["photo3.jpg"],
    additionalNotes: "Reported by neighbor"
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    
    console.log('Clearing existing data...');
    await Victim.deleteMany({});
    await NGO.deleteMany({});
    await Report.deleteMany({});
    
    console.log('Seeding NGOs...');
    const ngos = await NGO.insertMany(sampleNGOs);
    console.log(`Created ${ngos.length} NGOs`);
    
    console.log('Seeding Reports...');
    const reports = await Report.insertMany(sampleReports);
    console.log(`Created ${reports.length} Reports`);
    
    console.log('Seeding Victims...');
    // Link victims to reports and NGOs
    const victimsWithLinks = sampleVictims.map((victim, index) => {
      if (index === 0) {
        // Priya Patel - assign to Rescue Foundation and link to first report
        return {
          ...victim,
          ngoAssignment: {
            ...victim.ngoAssignment,
            ngoId: ngos[0]._id
          },
          source: {
            ...victim.source,
            reportId: reports[0]._id
          }
        };
      } else if (index === 1) {
        // Amit Kumar - assign to Freedom Network and link to second report
        return {
          ...victim,
          ngoAssignment: {
            ...victim.ngoAssignment,
            ngoId: ngos[1]._id
          },
          source: {
            ...victim.source,
            reportId: reports[1]._id
          }
        };
      } else {
        // Fatima Begum - assign to Rescue Foundation and link to third report
        return {
          ...victim,
          ngoAssignment: {
            ...victim.ngoAssignment,
            ngoId: ngos[0]._id
          },
          source: {
            ...victim.source,
            reportId: reports[2]._id
          }
        };
      }
    });
    
    const victims = await Victim.insertMany(victimsWithLinks);
    console.log(`Created ${victims.length} Victims`);
    
    console.log('Database seeded successfully!');
    console.log('\nSample data created:');
    console.log(`- ${ngos.length} NGOs`);
    console.log(`- ${reports.length} Reports`);
    console.log(`- ${victims.length} Victims`);
    
    console.log('\nYou can now view this data in your MongoDB Atlas dashboard!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 