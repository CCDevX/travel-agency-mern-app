const User = require("../models/user");
const Order = require("../models/order");

/**
 * Service: Get the current authenticated user's profile.
 * @param {Object} user - The user object from the middleware
 * @returns {Object} - The user profile
 */
const getProfile = (user) => {
  return user;
};

/**
 * Service: Update a user's profile by ID.
 * @param {string} id - The user ID
 * @param {Object} data - The updated profile data
 * @returns {Promise<Object>} - The updated user (without password)
 */
const updateProfile = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-password -__v"
  );
};

/**
 * Service: Delete the user and their associated orders.
 * @param {Object} user - The user object from the middleware
 * @returns {Promise<void>}
 */
const deleteProfile = async (id) => {
  await User.findByIdAndDelete(id);
  await Order.deleteMany({ email: user.email });
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
