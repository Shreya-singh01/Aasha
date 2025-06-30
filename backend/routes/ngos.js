const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO');

// GET /api/ngos?city=&locality=&pincode=&location=&available=true
router.get('/', async (req, res) => {
  const { city, locality, pincode, location, available } = req.query;
  const filter = {};

  if (city) filter['location.city'] = { $regex: city, $options: 'i' };
  if (locality) filter['location.locality'] = { $regex: locality, $options: 'i' };
  if (pincode) filter['location.pincode'] = pincode;
  
  // Add support for free-form location string
  // if (location) {
  //   filter.$or = [
  //     { 'location.city': { $regex: location, $options: 'i' } },
  //     { 'location.locality': { $regex: location, $options: 'i' } }
  //   ];
  // }

  if (location) {
    const words = location.split(/\s|,|-/).filter(Boolean);
    filter.$or = [
      ...words.map(word => ({ 'location.city': { $regex: word, $options: 'i' } })),
      ...words.map(word => ({ 'location.locality': { $regex: word, $options: 'i' } }))
    ];
  }

  if (available === 'true') {
    filter['operational.isActive'] = true;
    filter.$expr = {
      $lt: ['$operational.capacity.currentCases', '$operational.capacity.maxCases']
    };
  }

  try {
    const ngos = await NGO.find(filter);
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NGOs' });
  }
});

// POST /api/ngos/:id/assign-task
router.post('/:id/assign-task', async (req, res) => {
  const { id } = req.params;
  const { taskId } = req.body;

  try {
    // 1. Find the NGO
    const ngo = await NGO.findById(id);
    if (!ngo) return res.status(404).json({ error: 'NGO not found' });

    // 2. Check NGO capacity
    if (!ngo.canAcceptCase()) {
      return res.status(400).json({ error: 'NGO is at full capacity or inactive' });
    }

    // 3. Update NGO: add task and increment case count
    ngo.assignedTasks.push(taskId);
    await ngo.addCase(); // will update capacity

    // 4. Update the Report: set assignedTo and status
    const Report = require('../models/Report'); // Import here to avoid circular dependency
    const report = await Report.findById(taskId);
    if (report) {
      report.assignedTo = ngo.name; // or ngo._id if you prefer
      report.status = 'team assigned'; // set status to 'team assigned'
      await report.save();
    }

    // 5. Respond with updated NGO and report
    res.json({ message: '✅ Task assigned', ngo, report });
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign task' });
  }
});

module.exports = router;
