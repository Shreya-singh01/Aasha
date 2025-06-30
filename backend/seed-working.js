const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const Victim = require('./models/Victim');
const NGO = require('./models/NGO');
const Report = require('./models/Report');

const connectDB = require('./config/database');

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    
    console.log('Clearing existing data...');
    await Victim.deleteMany({});
    await NGO.deleteMany({});
    await Report.deleteMany({});
    
    // Create NGOs
    const ngo1 = await NGO.create({
      name: "Rescue Foundation",
      type: "comprehensive",
      focusAreas: ["sex_trafficking", "child_trafficking"],
      contact: {
        address: { city: "Mumbai", country: "India" },
        phone: ["+91-22-12345678"],
        email: ["info@rescuefoundation.org"]
      },
      operational: {
        isActive: true,
        capacity: { maxCases: 100, currentCases: 45 }
      }
    });

    const ngo2 = await NGO.create({
      name: "Freedom Network",
      type: "rescue",
      focusAreas: ["labor_trafficking"],
      contact: {
        address: { city: "Delhi", country: "India" },
        phone: ["+91-11-87654321"],
        email: ["contact@freedomnetwork.org"]
      },
      operational: {
        isActive: true,
        capacity: { maxCases: 75, currentCases: 30 }
      }
    });

    console.log('Created 2 NGOs');

    // Create Reports
    const reports = [];
    for (let i = 1; i <= 8; i++) {
      const report = await Report.create({
        incidentType: i <= 3 ? "sex_trafficking" : i <= 5 ? "labor_trafficking" : "child_trafficking",
        location: `Location ${i}`,
        date: `2024-${String(i).padStart(2, '0')}-15`,
        time: "14:30",
        description: `Report description ${i}`,
        victimCount: 1,
        perpetratorCount: 2,
        urgency: i % 3 === 0 ? "high" : "medium",
        contactInfo: { anonymous: true }
      });
      reports.push(report);
    }

    console.log('Created 8 Reports');

    // Create Victims with minimal data to avoid validation issues
    const victims = [];
    const names = ["Priya Patel", "Amit Kumar", "Fatima Begum", "Lakshmi Devi", "Rajesh Singh", "Sunita Yadav", "Vikram Malhotra", "Meera Sharma"];
    const ages = [19, 16, 25, 14, 22, 28, 18, 31];
    const types = ["sex_trafficking", "labor_trafficking", "domestic_servitude", "child_trafficking", "organ_trafficking", "sex_trafficking", "labor_trafficking", "sex_trafficking"];
    const criticality = ["high", "medium", "medium", "critical", "critical", "high", "medium", "high"];

    for (let i = 0; i < 8; i++) {
      const victim = await Victim.create({
        basicInfo: {
          name: names[i],
          age: ages[i],
          gender: i % 2 === 0 ? "female" : "male",
          nationality: "Indian",
          identificationNumber: `VIC${String(i + 1).padStart(3, '0')}`,
          contactNumber: `+91-${String(9876543210 - i).slice(-10)}`
        },
        location: {
          currentLocation: `City ${i + 1}, State ${i + 1}`,
          city: `City ${i + 1}`,
          state: `State ${i + 1}`,
          country: "India"
        },
        traffickingDetails: {
          type: types[i],
          recruitmentMethod: "deception",
          duration: {
            startDate: new Date(`2024-${String(i + 1).padStart(2, '0')}-01`),
            estimatedDuration: `${i + 1} months`
          },
          exploitationDetails: {
            workType: "Forced work",
            workingConditions: "Poor conditions",
            restrictions: ["no phone", "no freedom"]
          }
        },
        caseStatus: {
          status: i % 3 === 0 ? "rescued" : "investigating",
          caseNumber: `CASE${String(i + 1).padStart(3, '0')}`
        },
        ngoAssignment: {
          ngoId: i % 2 === 0 ? ngo1._id : ngo2._id,
          ngoName: i % 2 === 0 ? ngo1.name : ngo2.name,
          assignedDate: new Date(),
          assignedBy: "System"
        },
        criticality: {
          level: criticality[i],
          factors: [
            { factor: "Trauma", severity: "medium" }
          ],
          immediateNeeds: ["Medical care", "Support"]
        },
        medicalInfo: {
          healthStatus: i % 3 === 0 ? "poor" : "fair",
          injuries: [], // Empty array to avoid validation issues
          medicalConditions: ["Stress", "Anxiety"]
        },
        source: {
          reportId: reports[i]._id,
          reportedBy: {
            name: "Anonymous",
            contact: "Unknown",
            relationship: "Witness"
          },
          reportDate: new Date(`2024-${String(i + 1).padStart(2, '0')}-15`)
        }
      });
      victims.push(victim);
    }

    console.log('Created 8 Victims');
    
    console.log('\n=== DATABASE SEEDED SUCCESSFULLY ===');
    console.log('✅ 2 NGOs created');
    console.log('✅ 8 Reports created');
    console.log('✅ 8 Victims created');
    console.log('\nVictim Cases Created:');
    victims.forEach((victim, index) => {
      console.log(`${index + 1}. ${victim.basicInfo.name} (${victim.basicInfo.age} years) - ${victim.traffickingDetails.type} - ${victim.criticality.level} criticality`);
    });
    console.log('\nYou can now view this data in your MongoDB Atlas dashboard!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 