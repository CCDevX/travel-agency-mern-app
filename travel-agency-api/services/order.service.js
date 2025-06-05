const Order = require("../models/order");

/**
 * Service: Retrieve all orders for a specific user.
 * @param {string} email - The email of the authenticated user
 * @returns {Promise<Array>} - List of orders with populated trip data
 */
const getAllByUser = async (email) => {
  return await Order.find({ email }).populate("trip");
};

module.exports = { getAllByUser };
