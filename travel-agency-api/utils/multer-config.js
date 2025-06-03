const multer = require("multer");

const uploader = multer({
  // Store files in memory (no disk storage)
  storage: multer.memoryStorage(),

  // Set a maximum file size limit: 10 MB
  limits: { fileSize: 10 * 1024 * 1024 },

  // File filter to allow only image uploads
  fileFilter: (req, file, cb) => {
    // Accept the file if its MIME type starts with "image/"
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      // Reject the file and return an error
      cb(new Error("Only images are accepted"));
    }
  },
});

module.exports = uploader;
