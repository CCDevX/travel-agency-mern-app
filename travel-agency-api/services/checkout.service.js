require("dotenv").config();
const Stripe = require("stripe");
const Trip = require("../models/trip");
const Order = require("../models/order");
const { hotelTax } = require("../helpers/data");

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

/**
 * Service: Create Stripe session and optionally save the order.
 * @param {Object} order - Order data (name, dates, etc.)
 * @param {Array} items - Array of trip items
 * @param {Object} token - User token or empty for guests
 * @returns {Promise<string>} Stripe session URL
 */
const createStripeSession = async (order, items, token) => {
  // Retrieve the trip (assuming one trip per order)
  const trip = await Trip.findById(items[0].id);
  if (!trip) {
    throw new Error("Trip not found.");
  }

  // Build line items for Stripe session
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: trip.title,
      },
      unit_amount:
        trip.adultPrice * item.adults + trip.youngPrice * item.kids + hotelTax,
    },
    quantity: item.quantity,
  }));

  // Create the Stripe session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url:
      process.env.NODE_ENV === "production"
        ? `${process.env.CLIENT_URL_PROD}/checkout-success`
        : `${process.env.CLIENT_URL_LOCAL}/checkout-success`,
    cancel_url:
      process.env.NODE_ENV === "production"
        ? `${process.env.CLIENT_URL_PROD}/checkout`
        : `${process.env.CLIENT_URL_LOCAL}/checkout`,
  });

  // Save the order locally (guest or logged in)
  const finalOrder = {
    ...order,
    email: token?.token ? order.email : "guest@guest.com",
  };

  await Order.create(finalOrder);

  return session.url;
};

module.exports = { createStripeSession };
