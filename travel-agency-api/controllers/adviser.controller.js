const StatusCodes = require("http-status-codes");
const Adviser = require("../models/adviser");
const path = require("path");
const { logger } = require("../utils/logger");
const fs = require("fs").promises;

const getAll = async (req, res) => {
  try {
    const params = req.query;

    let formattedParams = {};

    // If a 'town' parameter is provided, filter advisers by matching 'tags' using a case-insensitive regex
    if (params.town) {
      formattedParams.tags = { $regex: params.town, $options: "i" };
    }

    // Fetch advisers from the database
    const advisers = await Adviser.find(formattedParams);

    // Return the list of advisers with a 200 OK status
    return res.status(StatusCodes.OK).send(advisers);
  } catch (error) {
    logger.error(error);

    // Return a 500 Internal Server Error response if something fails
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching advisers");
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const adviser = await Adviser.findById(id);

    // If no adviser is found, return a 400 Bad Request response
    if (!adviser) {
      return res.status(StatusCodes.BAD_REQUEST).send("Adviser not found");
    }

    // If the adviser exists, return it with a 200 OK status
    return res.status(StatusCodes.OK).send(adviser);
  } catch (error) {
    logger.error(error);

    // Return a 500 Internal Server Error response
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error retrieving adviser");
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if 'name' is missing; return a 400 Bad Request if so
    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing field(s)");
    }

    // Create a new Adviser document using the data from the request body
    await Adviser.create(req.body);

    // Return a 201 Created status with a success message
    return res.status(StatusCodes.CREATED).send("Adviser created");
  } catch (error) {
    logger.error(error);

    // Return a 500 Internal Server Error if creation fails
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Creation failed");
  }
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  // Exit early if no ID is provided in the request
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No adviser ID provided.");
  }

  // Try to find the adviser by ID in the database
  let adviser;
  try {
    adviser = await Adviser.findById(id);

    if (!adviser) {
      return res.status(StatusCodes.NOT_FOUND).send("Adviser not found.");
    }
  } catch (error) {
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching adviser.");
  }

  // If no file is attached in the request, return a 400 Bad Request
  if (!file) {
    return res.status(StatusCodes.BAD_REQUEST).send("No file uploaded.");
  }

  // Save the uploaded file to disk and update the adviser's image field
  try {
    // Construct the destination path for the image file
    const uploadPath = path.join(
      __dirname,
      "../public/images/advisers",
      id,
      file.originalname
    );

    // Ensure the directory exists
    const directory = path.dirname(uploadPath);
    await fs.mkdir(directory, { recursive: true });

    // Save the file to the target path
    await fs.writeFile(uploadPath, file.buffer);

    // Update the adviser's image field in the database
    adviser.image = file.originalname;
    await adviser.save();

    // Respond with success
    return res.status(StatusCodes.CREATED).send("File attached successfully.");
  } catch (error) {
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Server error: ${error.message}`);
  }
};

module.exports = { create, getAll, getOne, addImage };
