const Victim = require('../models/Victim');
const NGO = require('../models/NGO');
const Report = require('../models/Report');

// @desc    Create a new victim record
// @route   POST /api/victims
// @access  Private
const createVictim = async (req, res) => {
  try {
    const {
      basicInfo,
      location,
      traffickingDetails,
      criticality,
      source,
      privacy
    } = req.body;

    // Validate required fields
    if (!basicInfo?.name || !basicInfo?.age || !basicInfo?.gender) {
      return res.status(400).json({
        success: false,
        message: 'Basic information (name, age, gender) is required'
      });
    }

    if (!location?.currentLocation) {
      return res.status(400).json({
        success: false,
        message: 'Current location is required'
      });
    }

    if (!traffickingDetails?.type) {
      return res.status(400).json({
        success: false,
        message: 'Trafficking type is required'
      });
    }

    // Create victim record
    const victim = new Victim({
      basicInfo,
      location,
      traffickingDetails,
      criticality: criticality || { level: 'medium' },
      source,
      privacy,
      createdBy: req.user?.id || 'system',
      timeline: [{
        event: 'Victim record created',
        description: 'Initial victim record created in database',
        updatedBy: req.user?.id || 'system',
        category: 'report'
      }]
    });

    await victim.save();

    res.status(201).json({
      success: true,
      message: 'Victim record created successfully',
      data: victim
    });

  } catch (error) {
    console.error('Error creating victim record:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating victim record',
      error: error.message
    });
  }
};

// @desc    Get all victims with pagination and filtering
// @route   GET /api/victims
// @access  Private
const getVictims = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      criticality,
      traffickingType,
      location,
      ngoId,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (status) filter['caseStatus.status'] = status;
    if (criticality) filter['criticality.level'] = criticality;
    if (traffickingType) filter['traffickingDetails.type'] = traffickingType;
    if (location) filter['location.currentLocation'] = { $regex: location, $options: 'i' };
    if (ngoId) filter['ngoAssignment.ngoId'] = ngoId;

    // Search functionality
    if (search) {
      filter.$or = [
        { 'basicInfo.name': { $regex: search, $options: 'i' } },
        { 'location.currentLocation': { $regex: search, $options: 'i' } },
        { 'caseStatus.caseNumber': { $regex: search, $options: 'i' } },
        { 'basicInfo.identificationNumber': { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const victims = await Victim.find(filter)
      .populate('ngoAssignment.ngoId', 'name acronym type')
      .populate('source.reportId', 'incidentType description')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Victim.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: victims,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error fetching victims:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching victims',
      error: error.message
    });
  }
};

// @desc    Get single victim by ID
// @route   GET /api/victims/:id
// @access  Private
const getVictimById = async (req, res) => {
  try {
    const victim = await Victim.findById(req.params.id)
      .populate('ngoAssignment.ngoId', 'name acronym type contact')
      .populate('source.reportId', 'incidentType description evidence')
      .select('-__v');

    if (!victim) {
      return res.status(404).json({
        success: false,
        message: 'Victim record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: victim
    });

  } catch (error) {
    console.error('Error fetching victim:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching victim',
      error: error.message
    });
  }
};

// @desc    Update victim record
// @route   PUT /api/victims/:id
// @access  Private
const updateVictim = async (req, res) => {
  try {
    const victim = await Victim.findById(req.params.id);

    if (!victim) {
      return res.status(404).json({
        success: false,
        message: 'Victim record not found'
      });
    }

    // Update fields
    const updatedVictim = await Victim.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user?.id || 'system',
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).populate('ngoAssignment.ngoId', 'name acronym type');

    // Add timeline entry
    await updatedVictim.addTimelineEntry(
      'Victim record updated',
      'Record information was modified',
      req.user?.id || 'system',
      'other'
    );

    res.status(200).json({
      success: true,
      message: 'Victim record updated successfully',
      data: updatedVictim
    });

  } catch (error) {
    console.error('Error updating victim:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating victim',
      error: error.message
    });
  }
};

// @desc    Delete victim record (soft delete)
// @route   DELETE /api/victims/:id
// @access  Private
const deleteVictim = async (req, res) => {
  try {
    const victim = await Victim.findById(req.params.id);

    if (!victim) {
      return res.status(404).json({
        success: false,
        message: 'Victim record not found'
      });
    }

    // Soft delete
    victim.isActive = false;
    victim.updatedBy = req.user?.id || 'system';
    await victim.save();

    // Add timeline entry
    await victim.addTimelineEntry(
      'Victim record deactivated',
      'Record was deactivated from active database',
      req.user?.id || 'system',
      'other'
    );

    res.status(200).json({
      success: true,
      message: 'Victim record deactivated successfully'
    });

  } catch (error) {
    console.error('Error deleting victim:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting victim',
      error: error.message
    });
  }
};

// @desc    Update case status
// @route   PATCH /api/victims/:id/status
// @access  Private
const updateCaseStatus = async (req, res) => {
  try {
    const { status, additionalInfo } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const victim = await Victim.findById(req.params.id);

    if (!victim) {
      return res.status(404).json({
        success: false,
        message: 'Victim record not found'
      });
    }

    await victim.updateCaseStatus(status, req.user?.id || 'system', additionalInfo);

    res.status(200).json({
      success: true,
      message: 'Case status updated successfully',
      data: victim
    });

  } catch (error) {
    console.error('Error updating case status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating case status',
      error: error.message
    });
  }
};

// @desc    Assign NGO to victim
// @route   PATCH /api/victims/:id/assign-ngo
// @access  Private
const assignNGO = async (req, res) => {
  try {
    const { ngoId, caseManager, services } = req.body;

    if (!ngoId) {
      return res.status(400).json({
        success: false,
        message: 'NGO ID is required'
      });
    }

    // Check if NGO exists and has capacity
    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    if (!ngo.canAcceptCase()) {
      return res.status(400).json({
        success: false,
        message: 'NGO does not have capacity to accept new cases'
      });
    }

    const victim = await Victim.findById(req.params.id);
    if (!victim) {
      return res.status(404).json({
        success: false,
        message: 'Victim record not found'
      });
    }

    // Update NGO assignment
    victim.ngoAssignment = {
      ngoId,
      ngoName: ngo.name,
      assignedDate: new Date(),
      assignedBy: req.user?.id || 'system',
      caseManager,
      servicesProvided: services || []
    };

    await victim.save();

    // Update NGO case count
    await ngo.addCase();

    // Add timeline entry
    await victim.addTimelineEntry(
      'NGO assigned',
      `Assigned to ${ngo.name}`,
      req.user?.id || 'system',
      'ngo'
    );

    res.status(200).json({
      success: true,
      message: 'NGO assigned successfully',
      data: victim
    });

  } catch (error) {
    console.error('Error assigning NGO:', error);
    res.status(500).json({
      success: false,
      message: 'Error assigning NGO',
      error: error.message
    });
  }
};

// @desc    Get victims by criticality level
// @route   GET /api/victims/criticality/:level
// @access  Private
const getVictimsByCriticality = async (req, res) => {
  try {
    const { level } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const victims = await Victim.getByCriticality(level)
      .populate('ngoAssignment.ngoId', 'name acronym')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Victim.countDocuments({ 'criticality.level': level, isActive: true });

    res.status(200).json({
      success: true,
      data: victims,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error fetching victims by criticality:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching victims by criticality',
      error: error.message
    });
  }
};

// @desc    Get victims by NGO
// @route   GET /api/victims/ngo/:ngoId
// @access  Private
const getVictimsByNGO = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const victims = await Victim.getByNGO(ngoId)
      .populate('source.reportId', 'incidentType description')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Victim.countDocuments({ 'ngoAssignment.ngoId': ngoId, isActive: true });

    res.status(200).json({
      success: true,
      data: victims,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error fetching victims by NGO:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching victims by NGO',
      error: error.message
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/victims/stats
// @access  Private
const getVictimStats = async (req, res) => {
  try {
    const [
      totalVictims,
      activeCases,
      rescuedCases,
      criticalCases,
      casesByType,
      casesByStatus,
      casesByCriticality,
      recentCases
    ] = await Promise.all([
      Victim.countDocuments({ isActive: true }),
      Victim.countDocuments({ 'caseStatus.status': { $in: ['reported', 'investigating'] }, isActive: true }),
      Victim.countDocuments({ 'caseStatus.status': { $in: ['rescued', 'in_care', 'rehabilitated'] }, isActive: true }),
      Victim.countDocuments({ 'criticality.level': 'critical', isActive: true }),
      Victim.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$traffickingDetails.type', count: { $sum: 1 } } }
      ]),
      Victim.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$caseStatus.status', count: { $sum: 1 } } }
      ]),
      Victim.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$criticality.level', count: { $sum: 1 } } }
      ]),
      Victim.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('basicInfo.name caseStatus.status criticality.level createdAt')
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalVictims,
        activeCases,
        rescuedCases,
        criticalCases,
        casesByType,
        casesByStatus,
        casesByCriticality,
        recentCases
      }
    });

  } catch (error) {
    console.error('Error fetching victim stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching victim stats',
      error: error.message
    });
  }
};

// @desc    Search victims
// @route   GET /api/victims/search
// @access  Private
const searchVictims = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const searchFilter = {
      isActive: true,
      $or: [
        { 'basicInfo.name': { $regex: q, $options: 'i' } },
        { 'location.currentLocation': { $regex: q, $options: 'i' } },
        { 'caseStatus.caseNumber': { $regex: q, $options: 'i' } },
        { 'basicInfo.identificationNumber': { $regex: q, $options: 'i' } },
        { 'traffickingDetails.type': { $regex: q, $options: 'i' } }
      ]
    };

    const victims = await Victim.find(searchFilter)
      .populate('ngoAssignment.ngoId', 'name acronym')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Victim.countDocuments(searchFilter);

    res.status(200).json({
      success: true,
      data: victims,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error searching victims:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching victims',
      error: error.message
    });
  }
};

// @desc    Get cases over time (monthly)
// @route   GET /api/victims/analytics/cases-over-time
const getCasesOverTime = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        count: { $sum: 1 }
      } },
      { $sort: { _id: 1 } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get cases by location (city)
// @route   GET /api/victims/analytics/by-location
const getCasesByLocation = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$location.city", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get age distribution
// @route   GET /api/victims/analytics/age-distribution
const getAgeDistribution = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $bucket: {
        groupBy: "$basicInfo.age",
        boundaries: [0, 12, 18, 25, 40, 60, 120],
        default: "Unknown",
        output: { count: { $sum: 1 } }
      } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get gender distribution
// @route   GET /api/victims/analytics/gender-distribution
const getGenderDistribution = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$basicInfo.gender", count: { $sum: 1 } } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get cases by NGO
// @route   GET /api/victims/analytics/by-ngo
const getCasesByNGO = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$ngoAssignment.ngoName", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get cases by criticality level
// @route   GET /api/victims/analytics/by-criticality
const getCasesByCriticality = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$criticality.level", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get cases by recruitment method
// @route   GET /api/victims/analytics/by-recruitment
const getCasesByRecruitment = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$traffickingDetails.recruitmentMethod", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get cases by nationality
// @route   GET /api/victims/analytics/by-nationality
const getCasesByNationality = async (req, res) => {
  try {
    const data = await Victim.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$basicInfo.nationality", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVictim,
  getVictims,
  getVictimById,
  updateVictim,
  deleteVictim,
  updateCaseStatus,
  assignNGO,
  getVictimsByCriticality,
  getVictimsByNGO,
  getVictimStats,
  searchVictims,
  getCasesOverTime,
  getCasesByLocation,
  getAgeDistribution,
  getGenderDistribution,
  getCasesByNGO,
  getCasesByCriticality,
  getCasesByRecruitment,
  getCasesByNationality,
}; 