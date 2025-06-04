const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Order = require("../models/order");
const { logger } = require("../utils/logger");

const getProfile = async (req, res) => {
  // Extract the authenticated user from the request object (injected by authentication middleware)
  const middlewareUser = req.user;

  // Respond with the user's profile and a 200 OK status
  return res.status(StatusCodes.OK).send(middlewareUser);
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // If no ID is provided, respond with a 400 Bad Request
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No adviser ID provided.");
  }

  try {
    // Attempt to update the user by ID with the provided data
    // { new: true } ensures the returned document is the updated one
    // Exclude sensitive fields like password and version key
    const user = await User.findByIdAndUpdate(id, data, { new: true }).select(
      "-password -__v"
    );

    // Return the updated user with a 200 OK status
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    logger.error(error); // Log the error for debugging

    // If an error occurs (e.g., invalid ID), respond with a 404 Not Found
    return res.status(StatusCodes.NOT_FOUND).send("No resource found");
  }
};

const deleteProfile = async (req, res) => {
  try {
    const middlewareUser = req.user;

    // Delete the user from the database using their ID
    await User.findByIdAndDelete(middlewareUser._id);

    // Delete all orders associated with the user's email
    await Order.deleteMany({ email: middlewareUser.email });

    // Respond with a success message and a 200 OK status
    return res.status(StatusCodes.OK).send("User profile deleted");
  } catch (error) {
    logger.error(error); // Log any error that occurs during the deletion process

    // Respond with a 404 Not Found if deletion fails
    return res.status(StatusCodes.NOT_FOUND).send("Deletion failed");
  }
};

module.exports = { getProfile, updateProfile, deleteProfile };
