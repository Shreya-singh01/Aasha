const SurvivorStory = require('../models/SurvivorStory');
const { validationResult } = require('express-validator');

// @desc    Get all survivor stories
// @route   GET /api/survivor-stories
// @access  Public
const getAllSurvivorStories = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      filterType = 'all',
      sortBy = 'rescueDate',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = { isActive: true };
    
    // Search functionality
    if (search) {
      query.$or = [
        { location: { $regex: search, $options: 'i' } },
        { aspirations: { $regex: search, $options: 'i' } },
        { currentStatus: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by exploitation type
    if (filterType !== 'all') {
      query.exploitationType = filterType;
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const stories = await SurvivorStory.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const total = await SurvivorStory.countDocuments(query);

    // Format response
    const formattedStories = stories.map(story => ({
      id: story._id,
      rescueDate: story.rescueDate,
      location: story.location,
      exploitationType: story.exploitationType,
      duration: story.duration,
      currentStatus: story.currentStatus,
      aspirations: story.aspirations,
      livingConditions: story.livingConditions,
      age: story.age,
      gender: story.gender,
      source: story.source,
      formattedRescueDate: new Date(story.rescueDate).toLocaleDateString(),
      createdAt: story.createdAt,
      updatedAt: story.updatedAt
    }));

    res.status(200).json({
      success: true,
      data: formattedStories,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching survivor stories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching survivor stories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single survivor story
// @route   GET /api/survivor-stories/:id
// @access  Public
const getSurvivorStory = async (req, res) => {
  try {
    const story = await SurvivorStory.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).lean();

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Survivor story not found'
      });
    }

    res.status(200).json({
      success: true,
      data: story.toPublicJSON()
    });
  } catch (error) {
    console.error('Error fetching survivor story:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching survivor story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create new survivor story
// @route   POST /api/survivor-stories
// @access  Private (Admin only)
const createSurvivorStory = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      rescueDate,
      location,
      exploitationType,
      duration,
      currentStatus,
      aspirations,
      livingConditions,
      age,
      gender,
      source
    } = req.body;

    // Create new survivor story
    const newStory = new SurvivorStory({
      rescueDate: new Date(rescueDate),
      location,
      exploitationType,
      duration,
      currentStatus,
      aspirations,
      livingConditions,
      age: parseInt(age),
      gender,
      source,
      createdBy: req.user?.id || '000000000000000000000000' // Dummy ObjectId for testing
    });

    const savedStory = await newStory.save();

    res.status(201).json({
      success: true,
      message: 'Survivor story created successfully',
      data: savedStory.toPublicJSON()
    });
  } catch (error) {
    console.error('Error creating survivor story:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating survivor story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update survivor story
// @route   PUT /api/survivor-stories/:id
// @access  Private (Admin only)
const updateSurvivorStory = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const story = await SurvivorStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Survivor story not found'
      });
    }

    // Update fields
    const updateFields = req.body;
    
    // Convert rescueDate to Date object if provided
    if (updateFields.rescueDate) {
      updateFields.rescueDate = new Date(updateFields.rescueDate);
    }
    
    // Convert age to number if provided
    if (updateFields.age) {
      updateFields.age = parseInt(updateFields.age);
    }

    const updatedStory = await SurvivorStory.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).lean();

    res.status(200).json({
      success: true,
      message: 'Survivor story updated successfully',
      data: updatedStory.toPublicJSON()
    });
  } catch (error) {
    console.error('Error updating survivor story:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating survivor story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete survivor story (soft delete)
// @route   DELETE /api/survivor-stories/:id
// @access  Private (Admin only)
const deleteSurvivorStory = async (req, res) => {
  try {
    const story = await SurvivorStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Survivor story not found'
      });
    }

    // Soft delete by setting isActive to false
    story.isActive = false;
    await story.save();

    res.status(200).json({
      success: true,
      message: 'Survivor story deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting survivor story:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting survivor story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get survivor stories statistics
// @route   GET /api/survivor-stories/stats
// @access  Public
const getSurvivorStoriesStats = async (req, res) => {
  try {
    const stats = await SurvivorStory.getStatistics();
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching survivor stories statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Search survivor stories
// @route   GET /api/survivor-stories/search
// @access  Public
const searchSurvivorStories = async (req, res) => {
  try {
    const { q, type, location, ageRange } = req.query;
    
    let query = { isActive: true };
    
    // Text search
    if (q) {
      query.$or = [
        { location: { $regex: q, $options: 'i' } },
        { aspirations: { $regex: q, $options: 'i' } },
        { currentStatus: { $regex: q, $options: 'i' } },
        { source: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Filter by exploitation type
    if (type && type !== 'all') {
      query.exploitationType = type;
    }
    
    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Filter by age range
    if (ageRange) {
      const [min, max] = ageRange.split('-').map(Number);
      if (min && max) {
        query.age = { $gte: min, $lte: max };
      } else if (min) {
        query.age = { $gte: min };
      } else if (max) {
        query.age = { $lte: max };
      }
    }
    
    const stories = await SurvivorStory.find(query)
      .sort({ rescueDate: -1 })
      .lean();
    
    const formattedStories = stories.map(story => ({
      id: story._id,
      rescueDate: story.rescueDate,
      location: story.location,
      exploitationType: story.exploitationType,
      duration: story.duration,
      currentStatus: story.currentStatus,
      aspirations: story.aspirations,
      livingConditions: story.livingConditions,
      age: story.age,
      gender: story.gender,
      source: story.source,
      formattedRescueDate: new Date(story.rescueDate).toLocaleDateString(),
      createdAt: story.createdAt,
      updatedAt: story.updatedAt
    }));
    
    res.status(200).json({
      success: true,
      data: formattedStories,
      total: formattedStories.length
    });
  } catch (error) {
    console.error('Error searching survivor stories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching survivor stories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getAllSurvivorStories,
  getSurvivorStory,
  createSurvivorStory,
  updateSurvivorStory,
  deleteSurvivorStory,
  getSurvivorStoriesStats,
  searchSurvivorStories
}; 