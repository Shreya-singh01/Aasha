const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

// Import models
const Victim = require('./models/Victim');

// Additional sample data for victims
const additionalVictims = [
  {
    basicInfo: {
      name: "Amit Kumar",
      age: 16,
      gender: "male",
      nationality: "Indian",
      identificationNumber: "IND2024002",
      contactNumber: null,
      emergencyContact: {
        name: "Sunita Kumar",
        relationship: "Mother",
        phone: "+91-9876543214"
      }
    },
    location: {
      currentLocation: "Delhi, Delhi",
      coordinates: {
        latitude: 28.7041,
        longitude: 77.1025
      },
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "110001",
      lastKnownLocation: "Patna, Bihar",
      traffickingRoute: ["Patna", "Delhi", "Mumbai"]
    },
    traffickingDetails: {
      type: "labor_trafficking",
      subType: "Child labor in factories",
      recruitmentMethod: "family_member",
      duration: {
        startDate: new Date("2023-12-01"),
        endDate: new Date("2024-02-15"),
        estimatedDuration: "2.5 months"
      },
      perpetrators: [{
        name: "Ramesh Singh",
        relationship: "Uncle",
        description: "Promised good job and education",
        contactInfo: "+91-9876543215"
      }],
      exploitationDetails: {
        workType: "Factory work",
        workingConditions: "12-hour shifts, dangerous machinery, no safety equipment",
        payment: {
          amount: 2000,
          currency: "INR",
          frequency: "monthly"
        },
        livingConditions: "Crowded dormitory with 20 other workers",
        restrictions: ["no education", "no contact with family", "forced overtime"]
      }
    },
    caseStatus: {
      status: "in_care",
      rescueDate: new Date("2024-02-15"),
      rescueLocation: "Delhi, Delhi",
      rescueMethod: "NGO intervention",
      caseNumber: "CASE2024002",
      assignedOfficer: {
        name: "Inspector Rahul Verma",
        badgeNumber: "DEL001",
        contact: "+91-9876543216"
      }
    },
    ngoAssignment: {
      ngoId: null,
      ngoName: "Child Rescue Foundation",
      assignedDate: new Date("2024-02-16"),
      assignedBy: "Inspector Rahul Verma",
      caseManager: {
        name: "Dr. Priya Gupta",
        contact: "+91-9876543217",
        email: "priya.gupta@childrescue.org"
      },
      servicesProvided: []
    },
    criticality: {
      level: "medium",
      factors: [{
        factor: "Child labor trauma",
        severity: "medium",
        description: "Psychological impact of forced labor"
      }],
      immediateNeeds: ["Education", "Family reunification", "Psychological support"],
      riskAssessment: {
        riskLevel: "medium",
        riskFactors: ["Return to trafficking", "Educational gap"],
        lastAssessment: new Date("2024-02-16")
      }
    },
    medicalInfo: {
      healthStatus: "good",
      injuries: [],
      medicalConditions: [],
      medications: [],
      lastMedicalCheck: new Date("2024-02-16"),
      requiresImmediateCare: false
    },
    evidence: {
      photos: [],
      documents: [],
      witnessStatements: [{
        witnessName: "Factory worker",
        statement: "Saw child working in dangerous conditions",
        date: new Date("2024-02-14"),
        contactInfo: "Anonymous"
      }],
      policeReports: [],
      medicalReports: []
    },
    source: {
      reportId: null,
      reportedBy: {
        name: "Anonymous",
        contact: "Website form",
        relationship: "Reporter"
      },
      reportDate: new Date("2024-02-14")
    },
    privacy: {
      isAnonymous: false,
      dataSharingConsent: true,
      restrictedAccess: true,
      accessLevel: "confidential"
    },
    timeline: [{
      date: new Date("2024-02-14"),
      event: "Victim record created",
      description: "Initial victim record created from website report",
      updatedBy: "system",
      category: "report"
    }],
    createdBy: "system",
    isActive: true
  },
  {
    basicInfo: {
      name: "Fatima Begum",
      age: 28,
      gender: "female",
      nationality: "Indian",
      identificationNumber: "IND2024003",
      contactNumber: "+91-9876543218",
      emergencyContact: {
        name: "Ahmed Khan",
        relationship: "Husband",
        phone: "+91-9876543219"
      }
    },
    location: {
      currentLocation: "Hyderabad, Telangana",
      coordinates: {
        latitude: 17.3850,
        longitude: 78.4867
      },
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      zipCode: "500001",
      lastKnownLocation: "Bangalore, Karnataka",
      traffickingRoute: ["Bangalore", "Hyderabad", "Mumbai"]
    },
    traffickingDetails: {
      type: "domestic_servitude",
      subType: "Forced domestic work",
      recruitmentMethod: "deception",
      duration: {
        startDate: new Date("2023-10-01"),
        endDate: new Date("2024-01-30"),
        estimatedDuration: "4 months"
      },
      perpetrators: [{
        name: "Mrs. Mehta",
        relationship: "Employer",
        description: "Promised good salary and working conditions",
        contactInfo: "+91-9876543220"
      }],
      exploitationDetails: {
        workType: "Domestic work",
        workingConditions: "18-hour work days, no breaks, verbal abuse",
        payment: {
          amount: 5000,
          currency: "INR",
          frequency: "monthly"
        },
        livingConditions: "Small storage room, no proper facilities",
        restrictions: ["no phone access", "no family contact", "no days off"]
      }
    },
    caseStatus: {
      status: "rescued",
      rescueDate: new Date("2024-01-30"),
      rescueLocation: "Hyderabad, Telangana",
      rescueMethod: "Police intervention",
      caseNumber: "CASE2024003",
      assignedOfficer: {
        name: "Inspector Lakshmi Reddy",
        badgeNumber: "HYD001",
        contact: "+91-9876543221"
      }
    },
    ngoAssignment: {
      ngoId: null,
      ngoName: "Women Empowerment Network",
      assignedDate: new Date("2024-01-31"),
      assignedBy: "Inspector Lakshmi Reddy",
      caseManager: {
        name: "Ms. Anjali Rao",
        contact: "+91-9876543222",
        email: "anjali.rao@womenempower.org"
      },
      servicesProvided: []
    },
    criticality: {
      level: "low",
      factors: [{
        factor: "Emotional trauma",
        severity: "low",
        description: "Minor psychological impact"
      }],
      immediateNeeds: ["Legal support", "Family reunification"],
      riskAssessment: {
        riskLevel: "low",
        riskFactors: ["Financial vulnerability"],
        lastAssessment: new Date("2024-01-31")
      }
    },
    medicalInfo: {
      healthStatus: "good",
      injuries: [],
      medicalConditions: [],
      medications: [],
      lastMedicalCheck: new Date("2024-01-31"),
      requiresImmediateCare: false
    },
    evidence: {
      photos: [],
      documents: [],
      witnessStatements: [{
        witnessName: "Neighbor",
        statement: "Heard verbal abuse and saw long working hours",
        date: new Date("2024-01-29"),
        contactInfo: "Anonymous"
      }],
      policeReports: [],
      medicalReports: []
    },
    source: {
      reportId: null,
      reportedBy: {
        name: "Anonymous",
        contact: "Website form",
        relationship: "Reporter"
      },
      reportDate: new Date("2024-01-29")
    },
    privacy: {
      isAnonymous: false,
      dataSharingConsent: true,
      restrictedAccess: false,
      accessLevel: "restricted"
    },
    timeline: [{
      date: new Date("2024-01-29"),
      event: "Victim record created",
      description: "Initial victim record created from website report",
      updatedBy: "system",
      category: "report"
    }],
    createdBy: "system",
    isActive: true
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Add more victims to the database
const addMoreVictims = async () => {
  try {
    console.log('Starting to add more victims...');

    // Insert additional victims one by one
    const insertedVictims = [];
    for (const victimData of additionalVictims) {
      try {
        const victim = new Victim(victimData);
        const savedVictim = await victim.save();
        insertedVictims.push(savedVictim);
        console.log(`Successfully inserted victim: ${savedVictim.basicInfo.name}`);
      } catch (error) {
        console.error(`Error inserting victim ${victimData.basicInfo.name}:`, error.message);
      }
    }

    console.log(`Successfully inserted ${insertedVictims.length} additional victim records`);

    // Get total count
    const totalVictims = await Victim.countDocuments({ isActive: true });
    console.log(`Total victims in database: ${totalVictims}`);

    // Display summary
    console.log('\n=== ADDITIONAL VICTIMS ADDED SUCCESSFULLY ===');
    console.log(`Additional victims created: ${insertedVictims.length}`);
    
    console.log('\nNew Victim Details:');
    insertedVictims.forEach((victim, index) => {
      console.log(`${index + 1}. ${victim.basicInfo.name} (${victim.basicInfo.age} years, ${victim.basicInfo.gender})`);
      console.log(`   Location: ${victim.location.currentLocation}`);
      console.log(`   Trafficking Type: ${victim.traffickingDetails.type}`);
      console.log(`   Criticality: ${victim.criticality.level}`);
      console.log(`   Status: ${victim.caseStatus.status}`);
      console.log(`   NGO Assigned: ${victim.ngoAssignment.ngoName || 'Not assigned'}`);
      console.log('');
    });

    console.log('Additional victims added successfully!');
    console.log('You can now view this data in your MongoDB Atlas dashboard.');

  } catch (error) {
    console.error('Error adding victims:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

// Run the seeding
const runSeeding = async () => {
  await connectDB();
  await addMoreVictims();
};

// Execute if this file is run directly
if (require.main === module) {
  runSeeding();
}

module.exports = { addMoreVictims, additionalVictims }; 