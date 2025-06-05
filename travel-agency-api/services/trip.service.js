const Trip = require("../models/trip");
const { categoryCodes, tags } = require("../helpers/data");
const path = require("path");
const fs = require("fs").promises;

/**
 * Fetch all trips based on filters from the query parameters.
 */
const getAllTrips = async (filters) => {
  const query = {};

  if (filters.region && filters.region !== "0") {
    query.region = parseInt(filters.region);
  }

  if (filters.duration && filters.duration !== "0") {
    query.duration = parseInt(filters.duration);
  }

  if (filters.town) {
    query.town = { $regex: filters.town, $options: "i" };
  }

  if (filters.price) {
    query.adultPrice = { $lte: filters.price };
  }

  if (filters.category && filters.category !== "0") {
    const category = categoryCodes.find(
      (cat) => cat.code === parseInt(filters.category)
    );
    if (category) query.category = category.name;
  }

  if (filters.tags && filters.tags !== "0") {
    const tag = tags.find((tag) => tag.code === parseInt(filters.tags));
    if (tag) query.tags = tag.name;
  }

  return await Trip.find(query);
};

/**
 * Fetch all bestseller trips.
 */
const getBestsellers = async () => {
  return await Trip.find({ tags: "bestseller" });
};

/**
 * Create a new trip.
 */
const createTrip = async (tripData) => {
  return await Trip.create(tripData);
};

/**
 * Retrieve a single trip by ID.
 */
const getTripById = async (id) => {
  return await Trip.findById(id);
};

/**
 * Update a trip by ID.
 */
const updateTripById = async (id, updates) => {
  return await Trip.findByIdAndUpdate(id, updates, { new: true });
};

/**
 * Delete a single trip by ID.
 */
const deleteTripById = async (id) => {
  return await Trip.findByIdAndDelete(id);
};

/**
 * Delete all trips in the collection.
 */
const deleteAllTrips = async () => {
  return await Trip.deleteMany();
};

/**
 * Attach uploaded image files to a trip.
 */
const addTripImages = async (tripId, files) => {
  const trip = await Trip.findById(tripId);
  if (!trip) {
    throw new Error("Trip not found");
  }

  await Promise.all(
    files.map(async (file) => {
      const uploadPath = path.join(
        __dirname,
        "../public/images/trips",
        tripId,
        file.originalname
      );

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, file.buffer);
      trip.images.push(file.originalname);
    })
  );

  await trip.save();
};

module.exports = {
  getAllTrips,
  getBestsellers,
  createTrip,
  getTripById,
  updateTripById,
  deleteTripById,
  deleteAllTrips,
  addTripImages,
};
