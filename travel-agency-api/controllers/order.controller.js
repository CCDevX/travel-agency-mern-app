const { StatusCodes } = require("http-status-codes");
const orderService = require("../services/order.service");
const { logger } = require("../utils/logger");

/**
 * Controller: Get all orders for the authenticated user.
 */
const getAllByUser = async (req, res) => {
  try {
    const { email } = req.user;

    // Delegate the logic to the service layer
    const orders = await orderService.getAllByUser(email);

    return res.status(StatusCodes.OK).send(orders);
  } catch (error) {
    logger.error(`Error fetching user orders: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while fetching orders");
  }
};

module.exports = { getAllByUser };
