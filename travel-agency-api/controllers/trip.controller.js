const { StatusCodes } = require("http-status-codes");
const Trip = require("../models/trip");
const { categoryCodes, tags } = require("../helpers/data");
const path = require("path");
const { logger } = require("../utils/logger");
const fs = require("fs").promises;

const getAll = async (req, res) => {
  // Extract query parameters from the request
  const params = req.query;

  // Prepare an object to store query filters
  let formattedParams = {};

  // Filter by region if the value is not "0"
  if (params.region && params.region !== "0") {
    formattedParams.region = parseInt(params.region);
  }

  // Filter by duration if the value is not "0"
  if (params.duration && params.duration !== "0") {
    formattedParams.duration = parseInt(params.duration);
  }

  // Filter by town name (case-insensitive partial match)
  if (params.town) {
    formattedParams.town = { $regex: params.town, $options: "i" };
  }

  // Filter by maximum price
  if (params.price) {
    formattedParams.adultPrice = { $lte: params.price };
  }

  // Filter by category name based on a numeric code
  if (params.category && params.category !== "0") {
    const category = categoryCodes.find(
      (cat) => cat.code === parseInt(params.category)
    );
    if (category) {
      formattedParams.category = category.name;
    }
  }

  // Filter by tag name based on a numeric code
  if (params.tags && params.tags !== "0") {
    const tag = tags.find((tag) => tag.code === parseInt(params.tags));
    if (tag) {
      formattedParams.tags = tag.name;
    }
  }

  try {
    // Search for trips that match the formatted filters
    const trips = await Trip.find(formattedParams);

    // Return the result with a 200 OK status
    return res.status(StatusCodes.OK).send(trips);
  } catch (error) {
    // Log any errors and return a 500 error response
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching trips");
  }
};

const getAllBestsellers = async (req, res) => {
  try {
    // Find all trips where the "tags" array includes "bestseller"
    const trips = await Trip.find({ tags: "bestseller" });

    // Send the list of matching trips with a 200 OK status
    return res.status(StatusCodes.OK).send(trips);
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching bestsellers");
  }
};

const create = async (req, res) => {
  try {
    const { title } = req.body;

    // If 'title' is missing, return a 400 Bad Request
    if (!title) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing field(s)");
    }

    // Create a new Trip document in the database using the request body
    const trip = await Trip.create(req.body);

    // Return a 201 Created response with a success message and the created trip
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Trip created", trip });
  } catch (error) {
    logger.error(error);

    // Return a 500 Internal Server Error if something goes wrong
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Creation failed");
  }
};

const getOne = async (req, res) => {
  // Extract the ID from the route parameters
  const id = req.params.id;

  // If no ID is provided, return a 400 Bad Request error
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No ID provided");
  }

  try {
    // Attempt to find the trip by its ID in the database
    const trip = await Trip.findById(id);

    // If no trip is found, return a 400 Bad Request error
    if (!trip) {
      return res.status(StatusCodes.BAD_REQUEST).send("No match");
    }

    // If the trip is found, return it with a 200 OK status
    return res.status(StatusCodes.OK).send(trip);
  } catch (error) {
    // If an error occurs (e.g. invalid ID format), log it and return a 500 error
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while retrieving the trip");
  }
};

const patchOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No ID provided");
  }

  try {
    // Attempt to update the trip with the provided data
    // The 'new: true' option ensures the updated document is returned
    const trip = await Trip.findByIdAndUpdate(id, req.body, { new: true });

    // If no matching trip is found, return a 404 Not Found response
    if (!trip) {
      return res.status(StatusCodes.NOT_FOUND).send("No resource found");
    }

    // Return the updated trip with a 200 OK status
    return res.status(StatusCodes.OK).send(trip);
  } catch (error) {
    // Log any error and return a 500 Internal Server Error response
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while patching the trip");
  }
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No ID provided");
  }

  try {
    // Try to delete the trip by its ID
    const trip = await Trip.findByIdAndDelete(id);

    // If no matching trip is found, return a 404 Not Found response
    if (!trip) {
      return res.status(StatusCodes.NOT_FOUND).send("Nothing to delete");
    }

    // Return the deleted trip with a 200 OK status
    return res.status(StatusCodes.OK).send(trip);
  } catch (error) {
    // Log any error and return a 500 Internal Server Error response
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while deleting the trip");
  }
};

const deleteAll = async (req, res) => {
  try {
    const result = await Trip.deleteMany();

    // If no documents were deleted, return a 404 Not Found response
    if (result.deletedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("Nothing to delete");
    }

    // If deletion was successful, return a 200 OK status with a success message
    return res.status(StatusCodes.OK).send("All deleted");
  } catch (error) {
    // Log any error and return a 500 Internal Server Error response
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while deleting the trips");
  }
};

const addImages = async (req, res) => {
  const { id } = req.params;
  const files = req.files;

  // Stop if no trip ID is provided
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No id provided. Failure.");
  }

  // Fetch the trip from the database using the provided ID
  let trip;
  try {
    trip = await Trip.findById(id);
    if (!trip) {
      return res.status(StatusCodes.NOT_FOUND).send("No trip found. Failure.");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching trip. Failure.");
  }

  // Stop if there are no uploaded files or no trip found
  if (!files || files.length === 0 || Object.keys(trip).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).send("No upload/trip. Failure.");
  }

  // Save each image to the filesystem and update the trip's image list
  try {
    await Promise.all(
      files.map(async (file) => {
        // Build the path where the image will be saved
        const uploadPath = path.join(
          __dirname,
          "../public/images/trips",
          id,
          file.originalname
        );

        // Ensure the target directory exists
        const directory = path.dirname(uploadPath);
        await fs.mkdir(directory, { recursive: true });

        // Write the file to the filesystem
        await fs.writeFile(uploadPath, file.buffer);

        // Add the image filename to the trip's image list
        trip.images.push(file.originalname);
      })
    );

    // Save the updated trip document
    await trip.save();

    return res
      .status(StatusCodes.CREATED)
      .send("File(s) attached successfully.");
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Server error : ${error}`);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  getAllBestsellers,
  patchOne,
  deleteOne,
  deleteAll,
  addImages,
};
