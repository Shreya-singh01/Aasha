const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const Victim = require('./models/Victim');
const NGO = require('./models/NGO');
const Report = require('./models/Report');
const SurvivorStory = require('./models/SurvivorStory');

const connectDB = require('./config/database');

const sampleData = {
  ngos: [
    {
      name: "Helping Hands",
      type: "rescue",
      location: { city: "Delhi", locality: "Saket", pincode: "110017" },
      contact: { phone: ["9876543210"], email: ["helpinghands@ngo.org"] },
      assignedTasks: [],
      availability: true,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 5,
          currentCases: 0,
          availableSlots: 5
        }
      }
    },
    {
      name: "Care and Share",
      type: "rehabilitation",
      location: { city: "Mumbai", locality: "Andheri West", pincode: "400053" },
      contact: { phone: ["9123456780"], email: ["care@ngo.org"] },
      assignedTasks: [],
      availability: true,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 4,
          currentCases: 1,
          availableSlots: 3
        }
      }
    },
    {
      name: "Udaan Foundation",
      type: "legal",
      location: { city: "Bangalore", locality: "Koramangala", pincode: "560034" },
      contact: { phone: ["9988776655"], email: ["udaan@ngo.org"] },
      assignedTasks: ["report_101"],
      availability: false,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 6,
          currentCases: 0,
          availableSlots: 6
        }
      }
    },
    {
      name: "Seva Trust",
      type: "medical",
      location: { city: "Chennai", locality: "Adyar", pincode: "600020" },
      contact: { phone: ["9871203344"], email: ["seva@ngo.org"] },
      assignedTasks: [],
      availability: true,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 3,
          currentCases: 0,
          availableSlots: 3
        }
      }
    },
    {
      name: "Jeevan Jyoti",
      type: "education",
      location: { city: "Kolkata", locality: "Salt Lake", pincode: "700064" },
      contact: { phone: ["9765432100"], email: ["jeevan@ngo.org"] },
      assignedTasks: [],
      availability: true,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 8,
          currentCases: 2,
          availableSlots: 6
        }
      }
    },
    {
      name: "Nayi Disha",
      type: "advocacy",
      location: { city: "Hyderabad", locality: "Banjara Hills", pincode: "500034" },
      contact: { phone: ["9812345678"], email: ["nayi@ngo.org"] },
      assignedTasks: ["report_103", "report_107"],
      availability: false,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 5,
          currentCases: 3,
          availableSlots: 0
        }
      }
    },
    {
      name: "Asha Kiran",
      type: "comprehensive",
      location: { city: "Pune", locality: "Kothrud", pincode: "411038" },
      contact: { phone: ["8800554433"], email: ["asha@ngo.org"] },
      assignedTasks: [],
      availability: true,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 7,
          currentCases: 3,
          availableSlots: 4
        }
      }
    },
    {
      name: "Sahyog India",
      type: "rescue",
      location: { city: "Ahmedabad", locality: "Navrangpura", pincode: "380009" },
      contact: { phone: ["7896541230"], email: ["sahyog@ngo.org"] },
      assignedTasks: [],
      availability: true,
      operational: {
        isActive: true,
        capacity: {
          maxCases: 6,
          currentCases: 2,
          availableSlots: 4
        }
      }
    }
  ],  
  victims: [
    {
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
      }
    },
    {
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
      }
    },
    {
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
      }
    },
    {
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
      }
    },
    {
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
      }
    },
    {
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
      }
    },
    {
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
      }
    },
    {
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
      }
    }
  ],
  reports: [
    {
      incidentType: "victim_sighting",
      location: "Mumbai red-light district",
      date: "2024-06-19",
      time: "14:30",
      description: "Suspicious activity observed in red-light district. Young girl appears distressed and under duress.",
      victimCount: 1,
      perpetratorCount: 2,
      urgency: "high",
      contactInfo: { anonymous: true }
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
      contactInfo: { anonymous: true }
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
      contactInfo: { anonymous: true }
    },
    {
      incidentType: "child_trafficking",
      location: "Chennai rural area",
      date: "2024-09-14",
      time: "11:20",
      description: "Young girl forced into marriage with much older man. Family reports missing child.",
      victimCount: 1,
      perpetratorCount: 2,
      urgency: "critical",
      contactInfo: { anonymous: false, name: "Family member" }
    },
    {
      incidentType: "organ_trafficking",
      location: "Hyderabad medical facility",
      date: "2024-10-19",
      time: "20:30",
      description: "Suspicious medical procedures being performed. Patient appears to be under duress.",
      victimCount: 1,
      perpetratorCount: 3,
      urgency: "critical",
      contactInfo: { anonymous: true }
    },
    {
      incidentType: "online_exploitation",
      location: "Pune residential area",
      date: "2024-11-09",
      time: "15:00",
      description: "Online exploitation suspected. Young woman forced to perform on camera.",
      victimCount: 1,
      perpetratorCount: 1,
      urgency: "high",
      contactInfo: { anonymous: true }
    },
    {
      incidentType: "labor_trafficking",
      location: "Ahmedabad textile factory",
      date: "2024-12-04",
      time: "08:00",
      description: "Dangerous working conditions observed. Workers appear to be under duress.",
      victimCount: 5,
      perpetratorCount: 2,
      urgency: "medium",
      contactInfo: { anonymous: true }
    },
    {
      incidentType: "sex_trafficking",
      location: "Kolkata brothel area",
      date: "2024-12-19",
      time: "22:15",
      description: "Brothel raid reveals multiple victims. One woman appears severely injured.",
      victimCount: 3,
      perpetratorCount: 4,
      urgency: "critical",
      contactInfo: { anonymous: true }
    }
  ],
  survivorStories: [
    {
      rescueDate: new Date('2023-12-15'),
      location: 'Mumbai, Maharashtra, India',
      exploitationType: 'sex',
      duration: '2 years',
      currentStatus: 'Recovering in government safe house, receiving counseling and vocational training.',
      aspirations: 'Wants to become a social worker to help other survivors, dreams of opening a small business.',
      livingConditions: 'Currently in a safe house with other survivors, has access to basic amenities and support.',
      age: 24,
      gender: 'Female',
      source: 'NGO Rescue Foundation',
      isActive: true
    },
    {
      rescueDate: new Date('2024-01-10'),
      location: 'Delhi, India',
      exploitationType: 'labor',
      duration: '1 year',
      currentStatus: 'Working part-time and attending school, supported by local NGO.',
      aspirations: 'Aims to become a teacher and advocate for child labor prevention.',
      livingConditions: 'Living with extended family, supported by community programs.',
      age: 17,
      gender: 'Male',
      source: 'Community Report',
      isActive: true
    },
    {
      rescueDate: new Date('2022-08-05'),
      location: 'Kolkata, West Bengal, India',
      exploitationType: 'sex',
      duration: '6 months',
      currentStatus: 'Enrolled in a rehabilitation program, learning new skills.',
      aspirations: 'Wants to become a counselor for at-risk youth.',
      livingConditions: 'Staying at a rehabilitation center, receiving therapy and education.',
      age: 19,
      gender: 'Female',
      source: 'Police Rescue',
      isActive: true
    },
    {
      rescueDate: new Date('2023-03-22'),
      location: 'Chennai, Tamil Nadu, India',
      exploitationType: 'labor',
      duration: '3 years',
      currentStatus: 'Reunited with family, attending vocational training.',
      aspirations: 'Hopes to start a tailoring business and support siblings.',
      livingConditions: 'Living with family, supported by local NGO.',
      age: 21,
      gender: 'Male',
      source: "NGO Women's Safety Alliance",
      isActive: true
    },
    {
      rescueDate: new Date('2023-09-18'),
      location: 'Lucknow, Uttar Pradesh, India',
      exploitationType: 'labor',
      duration: '8 months',
      currentStatus: 'Attending skill development workshops and working part-time at a local store.',
      aspirations: 'Wants to become a chef and open a small restaurant to support her family.',
      livingConditions: 'Living in a community shelter with access to food and education.',
      age: 20,
      gender: 'Female',
      source: 'Local NGO Outreach',
      isActive: true
    }
  ]
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Victim.deleteMany({});
    await NGO.deleteMany({});
    await Report.deleteMany({});
    await SurvivorStory.deleteMany({});
    
    // Insert NGOs
    const ngos = await NGO.insertMany(sampleData.ngos);
    console.log(`Created ${ngos.length} NGOs`);
    
    // Insert Reports
    const reports = await Report.insertMany(sampleData.reports);
    console.log(`Created ${reports.length} Reports`);
    
    // Insert Survivor Stories
    const survivorStories = await SurvivorStory.insertMany(sampleData.survivorStories);
    console.log(`Created ${survivorStories.length} Survivor Stories`);
    
    // Insert Victims with NGO assignments
    const victimsWithNGOs = sampleData.victims.map((victim, index) => {
      let ngoIndex = 0;
      if (victim.traffickingDetails.type === "sex_trafficking" || victim.traffickingDetails.type === "child_trafficking") {
        ngoIndex = 0; // Rescue Foundation
      } else if (victim.traffickingDetails.type === "labor_trafficking") {
        ngoIndex = 1; // Freedom Network
      } else if (victim.basicInfo.age < 18) {
        ngoIndex = 2; // Child Protection Initiative
      } else {
        ngoIndex = 3; // Women's Safety Alliance
      }
      
      return {
        ...victim,
        ngoAssignment: {
          ngoId: ngos[ngoIndex]._id,
          ngoName: ngos[ngoIndex].name,
          assignedDate: new Date(),
          assignedBy: "System",
          caseManager: {
            name: "Case Manager",
            contact: ngos[ngoIndex].contact.phone[0],
            email: ngos[ngoIndex].contact.email[0]
          }
        },
        source: {
          reportId: reports[index]._id,
          reportedBy: {
            name: reports[index].contactInfo.name || "Anonymous",
            contact: "Unknown",
            relationship: "Witness"
          },
          reportDate: new Date(reports[index].date)
        },
        timeline: [
          {
            date: new Date(),
            event: "Victim record created",
            description: "Initial victim record created from report",
            updatedBy: "System",
            category: "report"
          }
        ]
      };
    });
    
    const victims = await Victim.insertMany(victimsWithNGOs);
    console.log(`Created ${victims.length} Victims`);
    
    console.log('\n=== DATABASE SEEDED SUCCESSFULLY ===');
    console.log(`✅ ${ngos.length} NGOs created`);
    console.log(`✅ ${reports.length} Reports created`);
    console.log(`✅ ${survivorStories.length} Survivor Stories created`);
    console.log(`✅ ${victims.length} Victims created`);
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