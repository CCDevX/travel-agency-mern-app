const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { logger } = require("../utils/logger");

// Middleware to authenticate requests using a JWT token
const authenticateMiddleware = async (req, res, next) => {
  try {
    // Extract the 'authorization' header
    const authHeader = req.header("authorization");

    // If no token is provided, return an error
    if (!authHeader) {
      return res.status(StatusCodes.BAD_REQUEST).send("Authentication failed");
    }

    // Extract the token from the "Bearer <token>" format
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = authHeader.split(" ")[1];

    // Verify the token and extract the payload (usually contains the user ID)
    const userByToken = jwt.verify(token, jwtSecretKey);

    // Retrieve the user from the database using the ID from the token
    // Exclude sensitive fields like password, version key, and updatedAt
    const userInDB = await User.findById(userByToken.id).select(
      "-password -__v -updatedAt"
    );

    // Attach the user object to the request for later use
    req.user = userInDB;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    logger.error(error);
    // Token has expired (the "exp" timestamp has passed)
    if (error.name === "TokenExpiredError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: "Token expired" });
    }

    // Token is invalid (e.g., malformed, wrong signature, etc.)
    if (error.name === "JsonWebTokenError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: "Invalied Token" });
    }

    // Any other unexpected error (e.g., database failure)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Authentication failed");
  }
};

module.exports = { authenticateMiddleware };
