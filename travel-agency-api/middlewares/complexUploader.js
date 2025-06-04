const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const uploader = require("../utils/multer-config");

// Middleware to handle multiple image uploads using Multer
const multipleFilesUploaderMiddleware = (req, res, next) => {
  // Configure Multer to accept up to 10 files with the field name "images"
  const multipleFileUploader = uploader.array("images", 10);

  // Call the Multer middleware and handle potential errors
  multipleFileUploader(req, res, (error) => {
    // Handle Multer-specific errors (e.g. too many files, invalid types, size limits)
    if (error instanceof multer.MulterError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
    // Handle general or unknown errors
    else if (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }

    next();
  });
};

module.exports = multipleFilesUploaderMiddleware;
