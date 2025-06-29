const { body, param, query } = require('express-validator');

// Validation for creating survivor story
const validateCreateSurvivorStory = [
  body('rescueDate')
    .notEmpty()
    .withMessage('Rescue date is required')
    .isISO8601()
    .withMessage('Rescue date must be a valid date')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date > now) {
        throw new Error('Rescue date cannot be in the future');
      }
      return true;
    }),
  
  body('location')
    .notEmpty()
    .withMessage('Location is required')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Location must be between 1 and 200 characters'),
  
  body('exploitationType')
    .notEmpty()
    .withMessage('Exploitation type is required')
    .isIn(['sex', 'labor'])
    .withMessage('Exploitation type must be either "sex" or "labor"'),
  
  body('duration')
    .notEmpty()
    .withMessage('Duration of exploitation is required')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Duration must be between 1 and 100 characters'),
  
  body('currentStatus')
    .notEmpty()
    .withMessage('Current status is required')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Current status must be between 1 and 500 characters'),
  
  body('aspirations')
    .notEmpty()
    .withMessage('Future aspirations are required')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Aspirations must be between 1 and 1000 characters'),
  
  body('livingConditions')
    .notEmpty()
    .withMessage('Current living conditions are required')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Living conditions must be between 1 and 1000 characters'),
  
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 0, max: 120 })
    .withMessage('Age must be between 0 and 120'),
  
  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Female', 'Male', 'Non-binary', 'Other'])
    .withMessage('Gender must be one of: Female, Male, Non-binary, Other'),
  
  body('source')
    .notEmpty()
    .withMessage('Source is required')
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Source must be between 1 and 300 characters')
];

// Validation for updating survivor story
const validateUpdateSurvivorStory = [
  param('id')
    .isMongoId()
    .withMessage('Invalid story ID'),
  
  body('rescueDate')
    .optional()
    .isISO8601()
    .withMessage('Rescue date must be a valid date')
    .custom((value) => {
      if (value) {
        const date = new Date(value);
        const now = new Date();
        if (date > now) {
          throw new Error('Rescue date cannot be in the future');
        }
      }
      return true;
    }),
  
  body('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Location must be between 1 and 200 characters'),
  
  body('exploitationType')
    .optional()
    .isIn(['sex', 'labor'])
    .withMessage('Exploitation type must be either "sex" or "labor"'),
  
  body('duration')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Duration must be between 1 and 100 characters'),
  
  body('currentStatus')
    .optional()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Current status must be between 1 and 500 characters'),
  
  body('aspirations')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Aspirations must be between 1 and 1000 characters'),
  
  body('livingConditions')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Living conditions must be between 1 and 1000 characters'),
  
  body('age')
    .optional()
    .isInt({ min: 0, max: 120 })
    .withMessage('Age must be between 0 and 120'),
  
  body('gender')
    .optional()
    .isIn(['Female', 'Male', 'Non-binary', 'Other'])
    .withMessage('Gender must be one of: Female, Male, Non-binary, Other'),
  
  body('source')
    .optional()
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Source must be between 1 and 300 characters')
];

// Validation for query parameters
const validateQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('filterType')
    .optional()
    .isIn(['all', 'sex', 'labor'])
    .withMessage('Filter type must be all, sex, or labor'),
  
  query('sortBy')
    .optional()
    .isIn(['rescueDate', 'age', 'location', 'createdAt'])
    .withMessage('Sort by must be rescueDate, age, location, or createdAt'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

// Validation for search parameters
const validateSearchParams = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  
  query('type')
    .optional()
    .isIn(['all', 'sex', 'labor'])
    .withMessage('Type must be all, sex, or labor'),
  
  query('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location filter must be between 1 and 100 characters'),
  
  query('ageRange')
    .optional()
    .matches(/^\d+(-\d+)?$/)
    .withMessage('Age range must be in format: number or number-number')
];

// Validation for ID parameter
const validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid story ID')
];

module.exports = {
  validateCreateSurvivorStory,
  validateUpdateSurvivorStory,
  validateQueryParams,
  validateSearchParams,
  validateId
}; 