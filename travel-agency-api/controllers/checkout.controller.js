const { StatusCodes } = require("http-status-codes");
const checkoutService = require("../services/checkout.service");
const { logger } = require("../utils/logger");

/**
 * Controller: Create a Stripe Checkout session and save order.
 */
const createStripeSession = async (req, res) => {
  try {
    const { order, items, token } = req.body;

    // Validate input
    if (!order || !items || items.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Missing order or items.");
    }

    // Delegate session creation and order handling to the service
    const sessionUrl = await checkoutService.createStripeSession(
      order,
      items,
      token
    );

    return res.status(StatusCodes.OK).json({ url: sessionUrl });
  } catch (error) {
    logger.error(`Error in Stripe session creation: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = { createStripeSession };
