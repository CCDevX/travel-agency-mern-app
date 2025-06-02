const { StatusCodes } = require("http-status-codes");
const Order = require("../models/order");
const { logger } = require("../utils/logger");

const getAllByUser = async (req, res) => {
  try {
    // Extract the authenticated user's email from the request object
    const { email } = req.user;

    // Find all orders that belong to this email and populate the associated trip details
    const orders = await Order.find({ email }).populate("trip");

    // Respond with the list of orders and a 200 OK status
    return res.status(StatusCodes.OK).send(orders);
  } catch (error) {
    // Log the error for debugging purposes
    logger.error(error);

    // Return a 500 Internal Server Error if something goes wrong
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching orders");
  }
};

module.exports = { getAllByUser };
