const mongoose = require('mongoose');

const survivorStorySchema = new mongoose.Schema({
  rescueDate: {
    type: Date,
    required: [true, 'Rescue date is required'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Rescue date cannot be in the future'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  exploitationType: {
    type: String,
    required: [true, 'Exploitation type is required'],
    enum: {
      values: ['sex', 'labor'],
      message: 'Exploitation type must be either "sex" or "labor"'
    }
  },
  duration: {
    type: String,
    required: [true, 'Duration of exploitation is required'],
    trim: true,
    maxlength: [100, 'Duration cannot exceed 100 characters']
  },
  currentStatus: {
    type: String,
    required: [true, 'Current status is required'],
    trim: true,
    maxlength: [500, 'Current status cannot exceed 500 characters']
  },
  aspirations: {
    type: String,
    required: [true, 'Future aspirations are required'],
    trim: true,
    maxlength: [1000, 'Aspirations cannot exceed 1000 characters']
  },
  livingConditions: {
    type: String,
    required: [true, 'Current living conditions are required'],
    trim: true,
    maxlength: [1000, 'Living conditions cannot exceed 1000 characters']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Female', 'Male', 'Non-binary', 'Other'],
      message: 'Gender must be one of: Female, Male, Non-binary, Other'
    }
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true,
    maxlength: [300, 'Source cannot exceed 300 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted rescue date
survivorStorySchema.virtual('formattedRescueDate').get(function() {
  return this.rescueDate.toLocaleDateString();
});

// Virtual for age group
survivorStorySchema.virtual('ageGroup').get(function() {
  if (this.age < 18) return 'Minor';
  if (this.age < 25) return 'Young Adult';
  if (this.age < 35) return 'Adult';
  return 'Older Adult';
});

// Index for better query performance
survivorStorySchema.index({ exploitationType: 1, location: 1 });
survivorStorySchema.index({ rescueDate: -1 });
survivorStorySchema.index({ isActive: 1 });

// Pre-save middleware to ensure data consistency
survivorStorySchema.pre('save', function(next) {
  // Ensure location is properly formatted
  if (this.location) {
    this.location = this.location.trim();
  }
  
  // Ensure text fields are properly trimmed
  if (this.currentStatus) {
    this.currentStatus = this.currentStatus.trim();
  }
  
  if (this.aspirations) {
    this.aspirations = this.aspirations.trim();
  }
  
  if (this.livingConditions) {
    this.livingConditions = this.livingConditions.trim();
  }
  
  if (this.source) {
    this.source = this.source.trim();
  }
  
  next();
});

// Static method to get statistics
survivorStorySchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalStories: { $sum: 1 },
        sexTrafficking: {
          $sum: { $cond: [{ $eq: ['$exploitationType', 'sex'] }, 1, 0] }
        },
        laborTrafficking: {
          $sum: { $cond: [{ $eq: ['$exploitationType', 'labor'] }, 1, 0] }
        },
        averageAge: { $avg: '$age' },
        recentStories: {
          $sum: {
            $cond: [
              { $gte: ['$rescueDate', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] },
              1,
              0
            ]
          }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalStories: 0,
    sexTrafficking: 0,
    laborTrafficking: 0,
    averageAge: 0,
    recentStories: 0
  };
};

// Instance method to get formatted data
survivorStorySchema.methods.toPublicJSON = function() {
  const story = this.toObject();
  return {
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
    formattedRescueDate: story.formattedRescueDate,
    ageGroup: story.ageGroup,
    createdAt: story.createdAt,
    updatedAt: story.updatedAt
  };
};

module.exports = mongoose.model('SurvivorStory', survivorStorySchema); 