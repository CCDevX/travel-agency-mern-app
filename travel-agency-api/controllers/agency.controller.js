const { StatusCodes } = require("http-status-codes");
const agencyService = require("../services/agency.service");
const { logger } = require("../utils/logger");

/**
 * Controller: Get all agencies.
 */
const getAll = async (req, res) => {
  try {
    const agencies = await agencyService.getAll();
    return res.status(StatusCodes.OK).send(agencies);
  } catch (error) {
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching agencies");
  }
};

/**
 * Controller: Get one agency by ID.
 */
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing agency ID.");
    }

    const agency = await agencyService.getOne(id);
    return res.status(StatusCodes.OK).send(agency);
  } catch (error) {
    logger.error(error);
    if (error.message === "Agency not found") {
      return res.status(StatusCodes.BAD_REQUEST).send("No match");
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error fetching agency");
  }
};

/**
 * Controller: Create a new agency.
 */
const create = async (req, res) => {
  try {
    await agencyService.create(req.body);
    return res.status(StatusCodes.CREATED).send("Agency created");
  } catch (error) {
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Creation failed");
  }
};

/**
 * Controller: Upload and attach an image to an agency.
 */
const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send("No ID provided.");
    }

    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).send("No file uploaded.");
    }

    await agencyService.addImage(id, file);
    return res.status(StatusCodes.CREATED).send("File attached successfully.");
  } catch (error) {
    logger.error(error);
    if (error.message === "Agency not found") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("No agency found. Failure.");
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Server error: ${error.message}`);
  }
};

module.exports = { getAll, getOne, create, addImage };
