const { StatusCodes } = require("http-status-codes");
const adviserService = require("../services/adviser.service");
const { logger } = require("../utils/logger");

/**
 * Controller: Fetch all advisers with optional filtering by town.
 */
const getAll = async (req, res) => {
  try {
    const advisers = await adviserService.getAll(req.query);
    return res.status(StatusCodes.OK).send(advisers);
  } catch (error) {
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching advisers");
  }
};

/**
 * Controller: Fetch a single adviser by ID.
 */
const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing adviser ID.");
    }

    const adviser = await adviserService.getOne(id);
    return res.status(StatusCodes.OK).send(adviser);
  } catch (error) {
    logger.error(error);
    if (error.message === "Adviser not found") {
      return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error retrieving adviser");
  }
};

/**
 * Controller: Create a new adviser from request body data.
 */
const create = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing field(s)");
    }
    await adviserService.create(req.body);
    return res.status(StatusCodes.CREATED).send("Adviser created");
  } catch (error) {
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Creation failed");
  }
};

/**
 * Controller: Upload and attach an image to an adviser.
 */
const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("No adviser ID provided.");
    }

    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).send("No file uploaded.");
    }

    await adviserService.addImage(id, file);
    return res.status(StatusCodes.CREATED).send("File attached successfully.");
  } catch (error) {
    logger.error(error);
    if (error.message === "Adviser not found") {
      return res.status(StatusCodes.NOT_FOUND).send(error.message);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Server error: ${error.message}`);
  }
};

module.exports = { getAll, getOne, create, addImage };
