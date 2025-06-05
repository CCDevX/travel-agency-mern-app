const { StatusCodes } = require("http-status-codes");
const tripService = require("../services/trip.service");
const { logger } = require("../utils/logger");

/**
 * Controller: Fetch all trips with optional filters.
 */
const getAll = async (req, res) => {
  try {
    const trips = await tripService.getAllTrips(req.query);
    return res.status(StatusCodes.OK).json(trips);
  } catch (error) {
    logger.error(`Error fetching trips: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve trips." });
  }
};

/**
 * Controller: Fetch all bestseller trips.
 */
const getAllBestsellers = async (req, res) => {
  try {
    const trips = await tripService.getBestsellers();
    return res.status(StatusCodes.OK).json(trips);
  } catch (error) {
    logger.error(`Error fetching bestsellers: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve bestseller trips." });
  }
};

/**
 * Controller: Create a new trip.
 */
const create = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing required field: title" });
    }

    const trip = await tripService.createTrip(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Trip created successfully", trip });
  } catch (error) {
    logger.error(`Error creating trip: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Trip creation failed." });
  }
};

/**
 * Controller: Retrieve a trip by ID.
 */
const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No ID provided" });
  }

  try {
    const trip = await tripService.getTripById(id);

    if (!trip) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Trip not found" });
    }

    return res.status(StatusCodes.OK).json(trip);
  } catch (error) {
    logger.error(`Error retrieving trip: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve trip." });
  }
};

/**
 * Controller: Update a trip by ID.
 */
const patchOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No ID provided" });
  }

  try {
    const updatedTrip = await tripService.updateTripById(id, req.body);

    if (!updatedTrip) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Trip not found" });
    }

    return res.status(StatusCodes.OK).json(updatedTrip);
  } catch (error) {
    logger.error(`Error updating trip: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Trip update failed." });
  }
};

/**
 * Controller: Delete a trip by ID.
 */
const deleteOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No ID provided" });
  }

  try {
    const deletedTrip = await tripService.deleteTripById(id);

    if (!deletedTrip) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Trip not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Trip deleted successfully", deletedTrip });
  } catch (error) {
    logger.error(`Error deleting trip: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Trip deletion failed." });
  }
};

/**
 * Controller: Delete all trips.
 */
const deleteAll = async (req, res) => {
  try {
    const result = await tripService.deleteAllTrips();

    if (result.deletedCount === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No trips to delete" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "All trips deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting all trips: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete all trips." });
  }
};

/**
 * Controller: Add uploaded images to a trip.
 */
const addImages = async (req, res) => {
  const { id } = req.params;
  const files = req.files;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No trip ID provided" });
  }

  if (!files || files.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No files uploaded" });
  }

  try {
    await tripService.addTripImages(id, files);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Images added successfully" });
  } catch (error) {
    logger.error(`Error adding images: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to add images to trip." });
  }
};

module.exports = {
  getAll,
  getAllBestsellers,
  create,
  getOne,
  patchOne,
  deleteOne,
  deleteAll,
  addImages,
};
