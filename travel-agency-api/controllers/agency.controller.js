const StatusCodes = require("http-status-codes");
const Agency = require("../models/agency");
const path = require("path");
const { logger } = require("../utils/logger");
const fs = require("fs").promises;

const getAll = async (req, res) => {
  try {
    // Retrieve all agency documents from the database
    const agencies = await Agency.find();

    // Return the list of agencies with a 200 OK status
    return res.status(StatusCodes.OK).send(agencies);
  } catch (error) {
    logger.error(error);

    // Return a 500 Internal Server Error response
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching agencies");
  }
};

const create = async (req, res) => {
  try {
    // Create a new agency document using the data from the request body
    const agencies = await Agency.create(req.body);

    // Return a 201 Created response with a success message
    return res.status(StatusCodes.CREATED).send("Agency created");
  } catch (error) {
    logger.error(error);

    // Return a 500 Internal Server Error if the creation fails
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Creation failed");
  }
};

const getOne = async (req, res) => {
  try {
    // Extract the agency ID from the request URL parameters
    const { id } = req.params;

    // Find the agency by its ID
    const agency = await Agency.findById(id);

    // If no agency is found, return a 400 Bad Request with a message
    if (!agency) {
      return res.status(StatusCodes.BAD_REQUEST).send("No match");
    }

    // Return the agency with a 200 OK status
    return res.status(StatusCodes.OK).send(agency);
  } catch (error) {
    logger.error(error);

    // Return a 500 Internal Server Error if the query fails
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error fetching agency");
  }
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  // Check if the ID is provided in the request URL
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No id provided. Failure.");
  }

  // Try to find the agency in the database by ID
  let agency;
  try {
    agency = await Agency.findById(id);

    // If the agency does not exist, return a 404
    if (!agency) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("No agency found. Failure.");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching agency. Failure.");
  }

  // If no file is uploaded, return a 400
  if (!file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("No file uploaded. Failure.");
  }

  // Define the upload path for the image: /public/images/agencies/:id/filename.jpg
  try {
    const uploadPath = path.join(
      __dirname,
      "../public/images/agencies",
      id,
      file.originalname
    );

    // Ensure the directory exists, create it recursively if necessary
    const directory = path.dirname(uploadPath);
    await fs.mkdir(directory, { recursive: true });

    // Save the uploaded file to the defined path
    await fs.writeFile(uploadPath, file.buffer);

    // Update the agency's photo field with the file name
    agency.photo = file.originalname;
    await agency.save();

    // Return a success response
    return res.status(StatusCodes.CREATED).send("File attached successfully.");
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Server error: ${error}`);
  }
};

module.exports = { create, getAll, getOne, addImage };
