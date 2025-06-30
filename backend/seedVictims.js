const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// Import the Victim model
const Victim = require('./models/Victim');

// Sample victim data for website reports
const sampleVictims = [
  {
    basicInfo: {
      name: "Priya Sharma",
      age: 24,
      gender: "female",
      nationality: "Indian",
      identificationNumber: "VIC001",
      contactNumber: "+91-9876543210"
    },
    location: {
      currentLocation: "Mumbai, Maharashtra",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India"
    },
    traffickingDetails: {
      type: "sex_trafficking",
      subType: "Brothel-based exploitation",
      recruitmentMethod: "deception"
    },
    caseStatus: {
      status: "reported",
      caseNumber: "CASE001"
    },
    ngoAssignment: {
      ngoName: "Aasha Foundation",
      assignedDate: new Date(),
      assignedBy: "Website Report"
    },
    criticality: {
      level: "high",
      immediateNeeds: ["Emergency shelter", "Medical attention", "Legal assistance"]
    },
    source: {
      reportedBy: {
        name: "Anonymous",
        contact: "Website Report",
        relationship: "Concerned citizen"
      },
      reportDate: new Date()
    }
  },
  {
    basicInfo: {
      name: "Amit Kumar",
      age: 19,
      gender: "male",
      nationality: "Indian",
      identificationNumber: "VIC002",
      contactNumber: "+91-9876543213"
    },
    location: {
      currentLocation: "Delhi, NCR",
      city: "Delhi",
      state: "Delhi",
      country: "India"
    },
    traffickingDetails: {
      type: "labor_trafficking",
      subType: "Construction work",
      recruitmentMethod: "force"
    },
    caseStatus: {
      status: "investigating",
      caseNumber: "CASE002"
    },
    ngoAssignment: {
      ngoName: "Rescue Mission India",
      assignedDate: new Date(),
      assignedBy: "Website Report"
    },
    criticality: {
      level: "medium",
      immediateNeeds: ["Legal assistance", "Safe exit plan"]
    },
    source: {
      reportedBy: {
        name: "Anonymous",
        contact: "Website Report",
        relationship: "Witness"
      },
      reportDate: new Date()
    }
  },
  {
    basicInfo: {
      name: "Lakshmi Devi",
      age: 16,
      gender: "female",
      nationality: "Indian",
      identificationNumber: "VIC003",
      contactNumber: "+91-9876543215"
    },
    location: {
      currentLocation: "Chennai, Tamil Nadu",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India"
    },
    traffickingDetails: {
      type: "child_trafficking",
      subType: "Domestic servitude",
      recruitmentMethod: "family_member"
    },
    caseStatus: {
      status: "rescued",
      caseNumber: "CASE003",
      rescueDate: new Date('2024-05-15'),
      rescueLocation: "Chennai, Tamil Nadu"
    },
    ngoAssignment: {
      ngoName: "Child Protection Society",
      assignedDate: new Date('2024-05-15'),
      assignedBy: "Website Report"
    },
    criticality: {
      level: "critical",
      immediateNeeds: ["Child protection", "Education", "Psychological support"]
    },
    source: {
      reportedBy: {
        name: "Anonymous",
        contact: "Website Report",
        relationship: "Neighbor"
      },
      reportDate: new Date('2024-05-10')
    }
  }
];

// Connect to MongoDB and seed data
const seedVictims = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing victims (optional - remove this if you want to keep existing data)
    await Victim.deleteMany({});
    console.log('Cleared existing victims data');

    // Insert sample victims
    const insertedVictims = await Victim.insertMany(sampleVictims);
    console.log(`Successfully seeded ${insertedVictims.length} victims`);

    // Display summary
    console.log('\n=== Victim Database Summary ===');
    console.log(`Total victims: ${insertedVictims.length}`);
    
    // Group by trafficking type
    const traffickingTypes = {};
    insertedVictims.forEach(victim => {
      const type = victim.traffickingDetails.type;
      traffickingTypes[type] = (traffickingTypes[type] || 0) + 1;
    });
    
    console.log('\nTrafficking Types:');
    Object.entries(traffickingTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    // Group by criticality level
    const criticalityLevels = {};
    insertedVictims.forEach(victim => {
      const level = victim.criticality.level;
      criticalityLevels[level] = (criticalityLevels[level] || 0) + 1;
    });
    
    console.log('\nCriticality Levels:');
    Object.entries(criticalityLevels).forEach(([level, count]) => {
      console.log(`  ${level}: ${count}`);
    });

    // Group by NGO assignment status
    const ngoAssignments = {};
    insertedVictims.forEach(victim => {
      const ngo = victim.ngoAssignment.ngoName || 'Unassigned';
      ngoAssignments[ngo] = (ngoAssignments[ngo] || 0) + 1;
    });
    
    console.log('\nNGO Assignments:');
    Object.entries(ngoAssignments).forEach(([ngo, count]) => {
      console.log(`  ${ngo}: ${count}`);
    });

    console.log('\nVictim database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding victims:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Run the seeding function
seedVictims(); 