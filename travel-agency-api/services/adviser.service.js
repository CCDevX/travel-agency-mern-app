const Adviser = require("../models/adviser");
const fs = require("fs").promises;
const path = require("path");

/**
 * Service: Retrieve all advisers with optional town-based filtering.
 * @param {Object} params - Query parameters from the client
 * @returns {Promise<Array>} List of advisers
 */
const getAll = async (params) => {
  const filters = {};
  if (params.town) {
    filters.tags = { $regex: params.town, $options: "i" };
  }
  return Adviser.find(filters);
};

/**
 * Service: Retrieve a single adviser by ID.
 * @param {string} id - Adviser ID
 * @returns {Promise<Object>} Adviser document
 * @throws {Error} If no adviser is found
 */
const getOne = async (id) => {
  const adviser = await Adviser.findById(id);
  if (!adviser) {
    throw new Error("Adviser not found");
  }
  return adviser;
};

/**
 * Service: Create a new adviser document in the database.
 * @param {Object} data - Adviser data from request body
 * @returns {Promise<Object>} Created adviser
 */
const create = async (data) => {
  return Adviser.create(data);
};

/**
 * Service: Save an image to disk and attach it to an adviser document.
 * @param {string} id - Adviser ID
 * @param {Object} file - File object from multer
 * @throws {Error} If adviser is not found
 */
const addImage = async (id, file) => {
  const adviser = await Adviser.findById(id);
  if (!adviser) {
    throw new Error("Adviser not found");
  }

  const uploadPath = path.join(
    __dirname,
    "../public/images/advisers",
    id,
    file.originalname
  );

  const directory = path.dirname(uploadPath);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(uploadPath, file.buffer);

  adviser.image = file.originalname;
  await adviser.save();
};

module.exports = { getAll, getOne, create, addImage };
