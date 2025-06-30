const mongoose = require('mongoose');
const RedZone = require('./models/RedZone');
require('dotenv').config({ path: './config.env' });

const connectDB = require('./config/database');

const seedData = [
  {
    name: "Kamathipura",
    location: "Mumbai, Maharashtra",
    riskLevel: "high",
    lastReport: "2 hours ago",
    activeCases: 12,
    description: "Known red-light area with multiple reports of trafficking activity. High concentration of vulnerable populations and frequent suspicious activities reported.",
    coordinates: { lat: 18.9679, lng: 72.8258 }
  },
  {
    name: "GB Road",
    location: "Delhi",
    riskLevel: "high",
    lastReport: "1 day ago",
    activeCases: 8,
    description: "Frequent reports of suspicious and illegal activities. Major transit hub with high risk of human trafficking operations.",
    coordinates: { lat: 28.6480, lng: 77.2245 }
  },
  {
    name: "Howrah Station Area",
    location: "Kolkata, West Bengal",
    riskLevel: "medium",
    lastReport: "3 days ago",
    activeCases: 5,
    description: "Transit hub with vulnerable population at risk. Railway station area with high foot traffic and reported trafficking incidents.",
    coordinates: { lat: 22.5832, lng: 88.3420 }
  },
  {
    name: "Secunderabad Railway Station",
    location: "Hyderabad, Telangana",
    riskLevel: "medium",
    lastReport: "1 week ago",
    activeCases: 3,
    description: "Reported movement of trafficked individuals. Major railway junction with multiple reports of suspicious activities.",
    coordinates: { lat: 17.4399, lng: 78.4983 }
  },
  {
    name: "Majestic Bus Stand",
    location: "Bangalore, Karnataka",
    riskLevel: "high",
    lastReport: "6 hours ago",
    activeCases: 7,
    description: "Bus terminal area with high risk of trafficking. Multiple reports of missing persons and suspicious activities.",
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    name: "Chennai Central Station",
    location: "Chennai, Tamil Nadu",
    riskLevel: "medium",
    lastReport: "2 days ago",
    activeCases: 4,
    description: "Railway station area with reported trafficking activities. High foot traffic and vulnerable populations.",
    coordinates: { lat: 13.0827, lng: 80.2707 }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await RedZone.deleteMany({});
    console.log('Cleared existing red zone data');
    
    // Insert seed data
    const result = await RedZone.insertMany(seedData);
    console.log(`Successfully seeded ${result.length} red zones`);
    
    // Display seeded data
    console.log('\nSeeded Red Zones:');
    result.forEach(zone => {
      console.log(`- ${zone.name} (${zone.location}) - Risk: ${zone.riskLevel}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 