const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const uploader = require("../utils/multer-config");

// Middleware to handle single image upload using Multer
const singleFileUploaderMiddleware = (req, res, next) => {
  // Configure Multer to accept a single file with the field name "image"
  const singleFileUploader = uploader.single("image");

  // Call the Multer middleware and handle possible errors
  singleFileUploader(req, res, (error) => {
    // Handle Multer-specific errors
    if (error instanceof multer.MulterError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
    // Handle general or unknown errors
    else if (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }

    // If no error occurred, proceed to the next middleware or route handler
    next();
  });
};

module.exports = singleFileUploaderMiddleware;
