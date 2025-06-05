const { StatusCodes } = require("http-status-codes");
const { hotelTax } = require("../helpers/data");
const Trip = require("../models/trip");
const Order = require("../models/order");
const Stripe = require("stripe");
const { logger } = require("../utils/logger");

const createStripeSession = async (req, res) => {
  try {
    // Initialize Stripe with secret key
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

    const order = req.body.order;
    const items = req.body.items;
    const token = req.body.token;

    logger.info("All items received from client:", items);
    // Retrieve the trip being purchased from the database
    const foundTrip = await Trip.findById(items[0].id);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => {
        logger.info(`Item at index ${index}:`, item);
        logger.info("Adults:", item.adults, "Kids:", item.kids);
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: foundTrip.title, // Use the trip title as product name
            },
            unit_amount:
              foundTrip.adultPrice * items[0].adults + // Total price for adults
              foundTrip.youngPrice * items[0].kids + // Total price for kids
              hotelTax, // Additional tax
          },
          quantity: item.quantity,
        };
      }),
      // Define success and cancel URLs depending on the environment
      success_url:
        process.env.NODE_ENV === "production"
          ? `${process.env.CLIENT_URL_PROD}/checkout-success`
          : `${process.env.CLIENT_URL_LOCAL}/checkout-success`,
      cancel_url:
        process.env.NODE_ENV === "production"
          ? `${process.env.CLIENT_URL_PROD}/checkout`
          : `${process.env.CLIENT_URL_LOCAL}/checkout`,
    });

    // In production, order creation should happen after successful payment
    // See Stripe's recommended way via webhook: https://docs.stripe.com/checkout/fulfillment#create-event-handler

    // Create order in the database
    if (!token.token) {
      // If the user is a guest (not logged in), use a default email
      await Order.create({ ...order, email: "guest@guest.com" });
    } else {
      // If user is logged in, use provided order data
      await Order.create(order);
    }

    // Respond with the Stripe Checkout session URL
    return res.status(StatusCodes.OK).json({ url: session.url });
  } catch (error) {
    logger.error(error);
    // Handle any error and respond with a server error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = { createStripeSession };
