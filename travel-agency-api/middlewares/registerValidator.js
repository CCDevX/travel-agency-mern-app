const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

// Middleware for validating the registration form fields
const validateRegister = [
  // Validate username: must be alphanumeric and between 3 and 30 characters
  body("username")
    .isAlphanumeric()
    .withMessage("Must be alphanumeric")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be min 3 characters and max 30"),

  // Validate email: must be a valid email format
  body("email").isEmail().withMessage("Should be a correct email"),

  // Validate password: must be at least 4 characters
  body("password").isLength({ min: 4 }).withMessage("At least 4 characters"),

  // Final middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);

    // If there are validation errors, return a 400 response with error details
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    // If validation passes, continue to the next middleware or route handler
    next();
  },
];

module.exports = validateRegister;
