const express = require('express');
const router = express.Router();
const victimController = require('../controllers/victimController');

// Create a new victim
router.post('/', victimController.createVictim);

// Get all victims
router.get('/', victimController.getVictims);

// Get a single victim by ID
router.get('/:id', victimController.getVictimById);

// Update a victim
router.put('/:id', victimController.updateVictim);

// Delete (soft) a victim
router.delete('/:id', victimController.deleteVictim);

// Assign NGO to victim
router.patch('/:id/assign-ngo', victimController.assignNGO);

module.exports = router; 