const express = require('express');
const router = express.Router();
const {
  getAllSurvivorStories,
  getSurvivorStory,
  createSurvivorStory,
  updateSurvivorStory,
  deleteSurvivorStory,
  getSurvivorStoriesStats,
  searchSurvivorStories
} = require('../controllers/survivorStoryController');

const {
  validateCreateSurvivorStory,
  validateUpdateSurvivorStory,
  validateQueryParams,
  validateSearchParams,
  validateId
} = require('../middleware/validation');

// @route   GET /api/survivor-stories
// @desc    Get all survivor stories with pagination and filtering
// @access  Public
router.get('/', validateQueryParams, getAllSurvivorStories);

// @route   GET /api/survivor-stories/stats
// @desc    Get survivor stories statistics
// @access  Public
router.get('/stats', getSurvivorStoriesStats);

// @route   GET /api/survivor-stories/search
// @desc    Search survivor stories
// @access  Public
router.get('/search', validateSearchParams, searchSurvivorStories);

// @route   GET /api/survivor-stories/:id
// @desc    Get single survivor story
// @access  Public
router.get('/:id', validateId, getSurvivorStory);

// @route   POST /api/survivor-stories
// @desc    Create new survivor story
// @access  Private (Admin only)
router.post('/', validateCreateSurvivorStory, createSurvivorStory);

// @route   PUT /api/survivor-stories/:id
// @desc    Update survivor story
// @access  Private (Admin only)
router.put('/:id', validateId, validateUpdateSurvivorStory, updateSurvivorStory);

// @route   DELETE /api/survivor-stories/:id
// @desc    Delete survivor story (soft delete)
// @access  Private (Admin only)
router.delete('/:id', validateId, deleteSurvivorStory);

module.exports = router; 