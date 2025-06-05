const Agency = require("../models/agency");
const fs = require("fs").promises;
const path = require("path");

/**
 * Service: Retrieve all agencies from the database.
 * @returns {Promise<Array>} List of agencies
 */
const getAll = async () => {
  return Agency.find();
};

/**
 * Service: Retrieve a single agency by its ID.
 * @param {string} id - The agency ID
 * @returns {Promise<Object>} The agency document
 * @throws {Error} If no agency is found
 */
const getOne = async (id) => {
  const agency = await Agency.findById(id);
  if (!agency) {
    throw new Error("Agency not found");
  }
  return agency;
};

/**
 * Service: Create a new agency document.
 * @param {Object} data - The agency data from the request body
 * @returns {Promise<Object>} Created agency document
 */
const create = async (data) => {
  return Agency.create(data);
};

/**
 * Service: Upload an image file and link it to an agency.
 * @param {string} id - The agency ID
 * @param {Object} file - The uploaded file object from multer
 * @throws {Error} If the agency is not found
 */
const addImage = async (id, file) => {
  const agency = await Agency.findById(id);
  if (!agency) {
    throw new Error("Agency not found");
  }

  const uploadPath = path.join(
    __dirname,
    "../public/images/agencies",
    id,
    file.originalname
  );

  const directory = path.dirname(uploadPath);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(uploadPath, file.buffer);

  agency.photo = file.originalname;
  await agency.save();
};

module.exports = { getAll, getOne, create, addImage };
