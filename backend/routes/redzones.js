const express = require('express');
const router = express.Router();
const RedZone = require('../models/RedZone');

// @desc    Get all red zones
// @route   GET /api/red-zones
router.get('/', async (req, res) => {
  try {
    const zones = await RedZone.find();
    res.status(200).json({ success: true, data: zones });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// @desc    Get red zone statistics
// @route   GET /api/red-zones/stats
router.get('/stats', async (req, res) => {
  try {
    const totalZones = await RedZone.countDocuments();
    const highRiskZones = await RedZone.countDocuments({ riskLevel: 'high' });
    const mediumRiskZones = await RedZone.countDocuments({ riskLevel: 'medium' });
    const lowRiskZones = await RedZone.countDocuments({ riskLevel: 'low' });
    
    // Calculate total active cases
    const zones = await RedZone.find();
    const totalActiveCases = zones.reduce((sum, zone) => sum + zone.activeCases, 0);
    
    // Get recent reports (zones with lastReport within 24 hours)
    const recentReports = zones.filter(zone => {
      const lastReport = zone.lastReport;
      if (lastReport.includes('hour') || lastReport.includes('day')) {
        return true; // Simplified logic for demo
      }
      return false;
    }).length;

    res.status(200).json({
      success: true,
      data: {
        totalZones,
        highRiskZones,
        mediumRiskZones,
        lowRiskZones,
        totalActiveCases,
        recentReports
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// @desc    Create a new red zone
// @route   POST /api/red-zones
router.post('/', async (req, res) => {
  try {
    const zone = await RedZone.create(req.body);
    res.status(201).json({ success: true, data: zone });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Data', error: error.message });
  }
});

// @desc    Update a red zone
// @route   PUT /api/red-zones/:id
router.put('/:id', async (req, res) => {
  try {
    const zone = await RedZone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!zone) {
      return res.status(404).json({ success: false, message: 'Red zone not found' });
    }
    res.status(200).json({ success: true, data: zone });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating red zone', error: error.message });
  }
});

// @desc    Delete a red zone
// @route   DELETE /api/red-zones/:id
router.delete('/:id', async (req, res) => {
  try {
    const zone = await RedZone.findByIdAndDelete(req.params.id);
    if (!zone) {
      return res.status(404).json({ success: false, message: 'Red zone not found' });
    }
    res.status(200).json({ success: true, message: 'Red zone deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting red zone', error: error.message });
  }
});

module.exports = router;
