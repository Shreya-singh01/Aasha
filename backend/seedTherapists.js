const mongoose = require('mongoose');
const Therapist = require('./models/Therapist');
require('dotenv').config({ path: './config.env' });
const connectDB = require('./config/database');

const seedData = [
  { name: "Drishti Mehra", email: "drishti.mehra@demo.edu.in", institution: "DU (Psychology)", specialization: "Trauma Counseling", availability: "Mon/Wed/Fri - 4-6 PM", languages: ["Hindi", "English"], preferred_mode: "Online", consent: true, notes: "Focuses on female trauma cases" },
  { name: "Rajeev Kumar", email: "rajeev.kumar@demo.edu.in", institution: "BHU", specialization: "Child Psychology", availability: "Tue/Thu - 10 AM - 12 PM", languages: ["Hindi"], preferred_mode: "Both", consent: true, notes: "Available for group therapy" },
  { name: "Sneha Patel", email: "sneha.patel@demo.edu.in", institution: "TISS Mumbai", specialization: "Clinical Psychology", availability: "Daily - 6-8 PM", languages: ["English", "Gujarati"], preferred_mode: "Online", consent: true, notes: "Trained in CBT" },
  { name: "Ananya Verma", email: "ananya.verma@demo.edu.in", institution: "NIMHANS Bangalore", specialization: "PTSD & Recovery", availability: "Sat/Sun - 3-6 PM", languages: ["Hindi", "English"], preferred_mode: "In-person", consent: true, notes: "Available for NGO tie-ups" },
  { name: "Faizan Siddiqui", email: "faizan.siddiqui@demo.edu.in", institution: "Jamia Millia Islamia", specialization: "Behavioral Therapy", availability: "Mon-Sat - 9-11 AM", languages: ["Urdu", "English"], preferred_mode: "Online", consent: true, notes: "Islamic counseling experience" },
  { name: "Ayesha Khan", email: "ayesha.khan@demo.edu.in", institution: "Amity University", specialization: "Cognitive Psychology", availability: "Tue/Thu - 5-7 PM", languages: ["Hindi", "English"], preferred_mode: "Online", consent: true, notes: "Accepts student cases" },
  { name: "Kiran Joshi", email: "kiran.joshi@demo.edu.in", institution: "IGNOU", specialization: "Rehabilitation Therapy", availability: "Weekends - 12-2 PM", languages: ["Hindi"], preferred_mode: "Both", consent: true, notes: "Specialized in rehabilitation" },
  { name: "Ritika Sinha", email: "ritika.sinha@demo.edu.in", institution: "University of Hyderabad", specialization: "Social Work & Therapy", availability: "Daily - 10 AM - 12 PM", languages: ["Hindi", "Bengali"], preferred_mode: "Online", consent: true, notes: "Works with NGOs" },
  { name: "Aditya Nair", email: "aditya.nair@demo.edu.in", institution: "Christ University, Bengaluru", specialization: "Grief Counseling", availability: "Mon/Wed - 2-4 PM", languages: ["English", "Tamil"], preferred_mode: "In-person", consent: true, notes: "Open to on-site sessions" },
  { name: "Mansi Batra", email: "mansi.batra@demo.edu.in", institution: "Lady Shri Ram College", specialization: "Psychology (Honors)", availability: "Flexible - Appointment only", languages: ["Hindi", "English"], preferred_mode: "Online", consent: true, notes: "Good with adolescents" }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Therapist.deleteMany({});
    const result = await Therapist.insertMany(seedData);
    console.log(`Seeded ${result.length} therapists.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding therapists:', error);
    process.exit(1);
  }
};

seedDatabase(); 