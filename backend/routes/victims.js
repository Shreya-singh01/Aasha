const express = require('express');
const router = express.Router();
const victimController = require('../controllers/victimController');

// Create a new victim
router.post('/', victimController.createVictim);

// Get all victims
router.get('/', victimController.getVictims);

// Stats endpoint (must come before /:id route)
router.get('/stats', victimController.getVictimStats);

// Analytics endpoints (must come before /:id route)
router.get('/analytics/cases-over-time', victimController.getCasesOverTime);
router.get('/analytics/by-location', victimController.getCasesByLocation);
router.get('/analytics/age-distribution', victimController.getAgeDistribution);
router.get('/analytics/gender-distribution', victimController.getGenderDistribution);
router.get('/analytics/by-ngo', victimController.getCasesByNGO);
router.get('/analytics/by-criticality', victimController.getCasesByCriticality);
router.get('/analytics/by-recruitment', victimController.getCasesByRecruitment);
router.get('/analytics/by-nationality', victimController.getCasesByNationality);

// Get a single victim by ID
router.get('/:id', victimController.getVictimById);

// Update a victim
router.put('/:id', victimController.updateVictim);

// Delete (soft) a victim
router.delete('/:id', victimController.deleteVictim);

// Assign NGO to victim
router.patch('/:id/assign-ngo', victimController.assignNGO);

module.exports = router; 