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

    const ngo3 = await NGO.create({
      name: "Child Protection Initiative",
      type: "comprehensive",
      focusAreas: ["child_trafficking", "forced_marriage"],
      contact: {
        address: { city: "Bangalore", country: "India" },
        phone: ["+91-80-98765432"],
        email: ["info@childprotection.org"]
      },
      operational: {
        isActive: true,
        capacity: { maxCases: 50, currentCases: 20 }
      }
    });

    const ngo4 = await NGO.create({
      name: "Women's Safety Alliance",
      type: "advocacy",
      focusAreas: ["sex_trafficking", "domestic_servitude"],
      contact: {
        address: { city: "Chennai", country: "India" },
        phone: ["+91-44-12345678"],
        email: ["contact@womensafety.org"]
      },
      operational: {
        isActive: true,
        capacity: { maxCases: 60, currentCases: 25 }
      }
    });

    console.log('Created 4 NGOs');

    // Create Reports
    const report1 = await Report.create({
      incidentType: "victim_sighting",
      location: "Mumbai red-light district",
      date: "2024-06-19",
      time: "14:30",
      description: "Suspicious activity observed in red-light district",
      victimCount: 1,
      perpetratorCount: 2,
      urgency: "high",
      contactInfo: { anonymous: true }
    });

    const report2 = await Report.create({
      incidentType: "labor_trafficking",
      location: "Delhi construction site",
      date: "2024-07-15",
      time: "09:15",
      description: "Minor observed working on construction site",
      victimCount: 1,
      perpetratorCount: 1,
      urgency: "medium",
      contactInfo: { anonymous: true }
    });

    const report3 = await Report.create({
      incidentType: "suspicious_activity",
      location: "Bangalore residential area",
      date: "2024-08-09",
      time: "16:45",
      description: "Domestic worker appears to be working under suspicious conditions",
      victimCount: 1,
      perpetratorCount: 3,
      urgency: "medium",
      contactInfo: { anonymous: true }
    });

    const report4 = await Report.create({
      incidentType: "child_trafficking",
      location: "Chennai rural area",
      date: "2024-09-14",
      time: "11:20",
      description: "Young girl forced into marriage with much older man",
      victimCount: 1,
      perpetratorCount: 2,
      urgency: "critical",
      contactInfo: { anonymous: false, name: "Family member" }
    });

    const report5 = await Report.create({
      incidentType: "organ_trafficking",
      location: "Hyderabad medical facility",
      date: "2024-10-19",
      time: "20:30",
      description: "Suspicious medical procedures being performed",
      victimCount: 1,
      perpetratorCount: 3,
      urgency: "critical",
      contactInfo: { anonymous: true }
    });

    const report6 = await Report.create({
      incidentType: "online_exploitation",
      location: "Pune residential area",
      date: "2024-11-09",
      time: "15:00",
      description: "Online exploitation suspected",
      victimCount: 1,
      perpetratorCount: 1,
      urgency: "high",
      contactInfo: { anonymous: true }
    });

    const report7 = await Report.create({
      incidentType: "labor_trafficking",
      location: "Ahmedabad textile factory",
      date: "2024-12-04",
      time: "08:00",
      description: "Dangerous working conditions observed",
      victimCount: 5,
      perpetratorCount: 2,
      urgency: "medium",
      contactInfo: { anonymous: true }
    });

    const report8 = await Report.create({
      incidentType: "sex_trafficking",
      location: "Kolkata brothel area",
      date: "2024-12-19",
      time: "22:15",
      description: "Brothel raid reveals multiple victims",
      victimCount: 3,
      perpetratorCount: 4,
      urgency: "critical",
      contactInfo: { anonymous: true }
    });

    console.log('Created 8 Reports');

    // Create Victims
    const victim1 = await Victim.create({
      basicInfo: {
        name: "Priya Patel",
        age: 19,
        gender: "female",
        nationality: "Indian",
        identificationNumber: "VIC001",
        contactNumber: "+91-9876543210"
      },
      location: {
        currentLocation: "Mumbai, Maharashtra",
        coordinates: { latitude: 19.0760, longitude: 72.8777 },
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
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
        exploitationDetails: {
          workType: "Forced prostitution",
          workingConditions: "Extremely poor, confined to small rooms",
          restrictions: ["no phone", "no ID", "locked doors"]
        }
      },
      caseStatus: {
        status: "rescued",
        rescueDate: new Date("2024-06-20"),
        rescueLocation: "Mumbai red-light district",
        caseNumber: "CASE001"
      },
      ngoAssignment: {
        ngoId: ngo1._id,
        ngoName: ngo1.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "high",
        factors: [
          { factor: "Severe trauma", severity: "high" },
          { factor: "Family separation", severity: "medium" }
        ],
        immediateNeeds: ["Medical care", "Psychological support"]
      },
      medicalInfo: {
        healthStatus: "poor",
        injuries: [{
          type: "Physical abuse",
          severity: "moderate",
          treatment: "Ongoing medical care",
          date: new Date("2024-06-22")
        }],
        medicalConditions: ["Malnutrition", "STI", "Depression"],
        requiresImmediateCare: true
      },
      source: {
        reportId: report1._id,
        reportedBy: {
          name: "Anonymous",
          contact: "Unknown",
          relationship: "Witness"
        },
        reportDate: new Date("2024-06-19")
      }
    });

    const victim2 = await Victim.create({
      basicInfo: {
        name: "Amit Kumar",
        age: 16,
        gender: "male",
        nationality: "Indian",
        identificationNumber: "VIC002",
        contactNumber: "+91-8765432109"
      },
      location: {
        currentLocation: "Delhi, India",
        coordinates: { latitude: 28.7041, longitude: 77.1025 },
        city: "Delhi",
        state: "Delhi",
        country: "India",
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
        exploitationDetails: {
          workType: "Construction labor",
          workingConditions: "Dangerous, long hours, no safety equipment",
          restrictions: ["no phone", "no ID", "no freedom of movement"]
        }
      },
      caseStatus: {
        status: "investigating",
        caseNumber: "CASE002"
      },
      ngoAssignment: {
        ngoId: ngo2._id,
        ngoName: ngo2.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "medium",
        factors: [
          { factor: "Minor victim", severity: "high" },
          { factor: "Family involvement", severity: "medium" }
        ],
        immediateNeeds: ["Safe shelter", "Family reunification"]
      },
      medicalInfo: {
        healthStatus: "fair",
        injuries: [{
          type: "Work-related injuries",
          severity: "mild",
          treatment: "Basic medical care",
          date: new Date("2024-07-16")
        }],
        medicalConditions: ["Malnutrition", "Fatigue"]
      },
      source: {
        reportId: report2._id,
        reportedBy: {
          name: "Anonymous",
          contact: "Unknown",
          relationship: "Witness"
        },
        reportDate: new Date("2024-07-15")
      }
    });

    const victim3 = await Victim.create({
      basicInfo: {
        name: "Fatima Begum",
        age: 25,
        gender: "female",
        nationality: "Indian",
        identificationNumber: "VIC003",
        contactNumber: "+91-7654321098"
      },
      location: {
        currentLocation: "Bangalore, Karnataka",
        coordinates: { latitude: 12.9716, longitude: 77.5946 },
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
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
        exploitationDetails: {
          workType: "Domestic work",
          workingConditions: "Long hours, no breaks, verbal abuse",
          restrictions: ["no phone", "no freedom", "no contact with family"]
        }
      },
      caseStatus: {
        status: "in_care",
        rescueDate: new Date("2024-08-10"),
        caseNumber: "CASE003"
      },
      ngoAssignment: {
        ngoId: ngo4._id,
        ngoName: ngo4.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "medium",
        factors: [
          { factor: "Psychological trauma", severity: "medium" },
          { factor: "Financial dependency", severity: "low" }
        ],
        immediateNeeds: ["Psychological support", "Vocational training"]
      },
      medicalInfo: {
        healthStatus: "good",
        injuries: [],
        medicalConditions: ["Mild depression"]
      },
      source: {
        reportId: report3._id,
        reportedBy: {
          name: "Anonymous",
          contact: "Unknown",
          relationship: "Witness"
        },
        reportDate: new Date("2024-08-09")
      }
    });

    const victim4 = await Victim.create({
      basicInfo: {
        name: "Lakshmi Devi",
        age: 14,
        gender: "female",
        nationality: "Indian",
        identificationNumber: "VIC004",
        contactNumber: "+91-6543210987"
      },
      location: {
        currentLocation: "Chennai, Tamil Nadu",
        coordinates: { latitude: 13.0827, longitude: 80.2707 },
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India",
        traffickingRoute: ["Rural Tamil Nadu", "Chennai", "Bangalore"]
      },
      traffickingDetails: {
        type: "child_trafficking",
        subType: "forced_marriage",
        recruitmentMethod: "family_member",
        duration: {
          startDate: new Date("2024-04-01"),
          endDate: new Date("2024-09-15"),
          estimatedDuration: "5.5 months"
        },
        exploitationDetails: {
          workType: "Forced marriage and domestic work",
          workingConditions: "Forced marriage to older man, domestic servitude",
          restrictions: ["no education", "no contact with family", "forced marriage"]
        }
      },
      caseStatus: {
        status: "rescued",
        rescueDate: new Date("2024-09-15"),
        caseNumber: "CASE004"
      },
      ngoAssignment: {
        ngoId: ngo3._id,
        ngoName: ngo3.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "critical",
        factors: [
          { factor: "Minor victim", severity: "high" },
          { factor: "Forced marriage", severity: "high" },
          { factor: "Education deprivation", severity: "high" }
        ],
        immediateNeeds: ["Medical care", "Education support", "Legal assistance"]
      },
      medicalInfo: {
        healthStatus: "poor",
        injuries: [{
          type: "Physical abuse",
          severity: "severe",
          treatment: "Emergency medical care",
          date: new Date("2024-09-15")
        }],
        medicalConditions: ["Pregnancy", "Malnutrition", "Trauma"],
        requiresImmediateCare: true
      },
      source: {
        reportId: report4._id,
        reportedBy: {
          name: "Family member",
          contact: "Unknown",
          relationship: "Family"
        },
        reportDate: new Date("2024-09-14")
      }
    });

    const victim5 = await Victim.create({
      basicInfo: {
        name: "Rajesh Singh",
        age: 22,
        gender: "male",
        nationality: "Indian",
        identificationNumber: "VIC005",
        contactNumber: "+91-5432109876"
      },
      location: {
        currentLocation: "Hyderabad, Telangana",
        coordinates: { latitude: 17.3850, longitude: 78.4867 },
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        traffickingRoute: ["Rural Telangana", "Hyderabad", "Mumbai"]
      },
      traffickingDetails: {
        type: "organ_trafficking",
        subType: "kidney_trafficking",
        recruitmentMethod: "deception",
        duration: {
          startDate: new Date("2024-05-01"),
          endDate: new Date("2024-10-20"),
          estimatedDuration: "5.5 months"
        },
        exploitationDetails: {
          workType: "Forced organ donation",
          workingConditions: "Medical exploitation, forced surgery",
          restrictions: ["medical confinement", "no contact with family", "forced surgery"]
        }
      },
      caseStatus: {
        status: "rescued",
        rescueDate: new Date("2024-10-20"),
        caseNumber: "CASE005"
      },
      ngoAssignment: {
        ngoId: ngo1._id,
        ngoName: ngo1.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "critical",
        factors: [
          { factor: "Medical exploitation", severity: "high" },
          { factor: "Organ removal", severity: "high" },
          { factor: "Life-threatening", severity: "high" }
        ],
        immediateNeeds: ["Emergency medical care", "Surgical follow-up", "Psychological support"]
      },
      medicalInfo: {
        healthStatus: "critical",
        injuries: [{
          type: "Surgical removal of kidney",
          severity: "severe",
          treatment: "Post-surgical care and monitoring",
          date: new Date("2024-10-20")
        }],
        medicalConditions: ["Post-surgical complications", "Infection", "Severe trauma"],
        requiresImmediateCare: true
      },
      source: {
        reportId: report5._id,
        reportedBy: {
          name: "Anonymous",
          contact: "Unknown",
          relationship: "Witness"
        },
        reportDate: new Date("2024-10-19")
      }
    });

    const victim6 = await Victim.create({
      basicInfo: {
        name: "Sunita Yadav",
        age: 28,
        gender: "female",
        nationality: "Indian",
        identificationNumber: "VIC006",
        contactNumber: "+91-4321098765"
      },
      location: {
        currentLocation: "Pune, Maharashtra",
        coordinates: { latitude: 18.5204, longitude: 73.8567 },
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        traffickingRoute: ["Rural Maharashtra", "Pune", "Mumbai"]
      },
      traffickingDetails: {
        type: "sex_trafficking",
        subType: "online_exploitation",
        recruitmentMethod: "online",
        duration: {
          startDate: new Date("2024-06-01"),
          endDate: new Date("2024-11-10"),
          estimatedDuration: "5 months"
        },
        exploitationDetails: {
          workType: "Online sex work and live streaming",
          workingConditions: "Forced online exploitation, 24/7 monitoring",
          restrictions: ["constant surveillance", "forced online work", "no privacy"]
        }
      },
      caseStatus: {
        status: "investigating",
        caseNumber: "CASE006"
      },
      ngoAssignment: {
        ngoId: ngo1._id,
        ngoName: ngo1.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "high",
        factors: [
          { factor: "Online exploitation", severity: "high" },
          { factor: "Digital evidence", severity: "medium" },
          { factor: "Psychological trauma", severity: "high" }
        ],
        immediateNeeds: ["Digital safety", "Psychological support", "Legal assistance"]
      },
      medicalInfo: {
        healthStatus: "fair",
        injuries: [],
        medicalConditions: ["Anxiety", "Depression", "Sleep disorders"]
      },
      source: {
        reportId: report6._id,
        reportedBy: {
          name: "Anonymous",
          contact: "Unknown",
          relationship: "Witness"
        },
        reportDate: new Date("2024-11-09")
      }
    });

    const victim7 = await Victim.create({
      basicInfo: {
        name: "Vikram Malhotra",
        age: 18,
        gender: "male",
        nationality: "Indian",
        identificationNumber: "VIC007",
        contactNumber: "+91-3210987654"
      },
      location: {
        currentLocation: "Ahmedabad, Gujarat",
        coordinates: { latitude: 23.0225, longitude: 72.5714 },
        city: "Ahmedabad",
        state: "Gujarat",
        country: "India",
        traffickingRoute: ["Rural Gujarat", "Ahmedabad", "Mumbai"]
      },
      traffickingDetails: {
        type: "labor_trafficking",
        subType: "textile_industry",
        recruitmentMethod: "deception",
        duration: {
          startDate: new Date("2024-07-01"),
          endDate: new Date("2024-12-05"),
          estimatedDuration: "5 months"
        },
        exploitationDetails: {
          workType: "Textile factory work",
          workingConditions: "Dangerous machinery, long hours, poor ventilation",
          restrictions: ["no safety equipment", "no breaks", "debt bondage"]
        }
      },
      caseStatus: {
        status: "rescued",
        rescueDate: new Date("2024-12-05"),
        caseNumber: "CASE007"
      },
      ngoAssignment: {
        ngoId: ngo2._id,
        ngoName: ngo2.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "medium",
        factors: [
          { factor: "Industrial accidents", severity: "medium" },
          { factor: "Debt bondage", severity: "medium" },
          { factor: "Health hazards", severity: "medium" }
        ],
        immediateNeeds: ["Medical care", "Debt relief", "Vocational training"]
      },
      medicalInfo: {
        healthStatus: "fair",
        injuries: [{
          type: "Industrial accident",
          severity: "moderate",
          treatment: "Medical care and rehabilitation",
          date: new Date("2024-12-05")
        }],
        medicalConditions: ["Respiratory issues", "Hearing loss"]
      },
      source: {
        reportId: report7._id,
        reportedBy: {
          name: "Anonymous",
          contact: "Unknown",
          relationship: "Witness"
        },
        reportDate: new Date("2024-12-04")
      }
    });

    const victim8 = await Victim.create({
      basicInfo: {
        name: "Meera Sharma",
        age: 31,
        gender: "female",
        nationality: "Indian",
        identificationNumber: "VIC008",
        contactNumber: "+91-2109876543"
      },
      location: {
        currentLocation: "Kolkata, West Bengal",
        coordinates: { latitude: 22.5726, longitude: 88.3639 },
        city: "Kolkata",
        state: "West Bengal",
        country: "India",
        traffickingRoute: ["Rural West Bengal", "Kolkata", "Mumbai"]
      },
      traffickingDetails: {
        type: "sex_trafficking",
        subType: "brothel_exploitation",
        recruitmentMethod: "abduction",
        duration: {
          startDate: new Date("2024-08-01"),
          endDate: new Date("2024-12-20"),
          estimatedDuration: "4.5 months"
        },
        exploitationDetails: {
          workType: "Brothel exploitation",
          workingConditions: "Forced prostitution, physical violence",
          restrictions: ["no escape", "constant surveillance", "physical abuse"]
        }
      },
      caseStatus: {
        status: "in_care",
        rescueDate: new Date("2024-12-20"),
        caseNumber: "CASE008"
      },
      ngoAssignment: {
        ngoId: ngo1._id,
        ngoName: ngo1.name,
        assignedDate: new Date(),
        assignedBy: "System"
      },
      criticality: {
        level: "high",
        factors: [
          { factor: "Severe physical abuse", severity: "high" },
          { factor: "Psychological trauma", severity: "high" },
          { factor: "Health risks", severity: "high" }
        ],
        immediateNeeds: ["Medical care", "Psychological support", "Safe shelter"]
      },
      medicalInfo: {
        healthStatus: "poor",
        injuries: [{
          type: "Physical abuse",
          severity: "severe",
          treatment: "Emergency medical care",
          date: new Date("2024-12-20")
        }],
        medicalConditions: ["STI", "PTSD", "Depression"],
        requiresImmediateCare: true
      },
      source: {
        reportId: report8._id,
        reportedBy: {
          name: "Anonymous",
          contact: "Unknown",
          relationship: "Witness"
        },
        reportDate: new Date("2024-12-19")
      }
    });

    console.log('Created 8 Victims');
    
    console.log('\n=== DATABASE SEEDED SUCCESSFULLY ===');
    console.log('✅ 4 NGOs created');
    console.log('✅ 8 Reports created');
    console.log('✅ 8 Victims created');
    console.log('\nVictim Cases Created:');
    console.log('1. Priya Patel (19 years) - sex_trafficking - high criticality');
    console.log('2. Amit Kumar (16 years) - labor_trafficking - medium criticality');
    console.log('3. Fatima Begum (25 years) - domestic_servitude - medium criticality');
    console.log('4. Lakshmi Devi (14 years) - child_trafficking - critical criticality');
    console.log('5. Rajesh Singh (22 years) - organ_trafficking - critical criticality');
    console.log('6. Sunita Yadav (28 years) - sex_trafficking - high criticality');
    console.log('7. Vikram Malhotra (18 years) - labor_trafficking - medium criticality');
    console.log('8. Meera Sharma (31 years) - sex_trafficking - high criticality');
    console.log('\nYou can now view this data in your MongoDB Atlas dashboard!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 