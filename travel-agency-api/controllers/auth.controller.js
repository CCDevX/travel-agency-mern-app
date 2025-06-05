const { StatusCodes } = require("http-status-codes");
const authService = require("../services/auth.service");
const { logger } = require("../utils/logger");

/**
 * Controller: Handle user registration.
 */
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check for missing required fields
    if (!username || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing field(s)");
    }

    await authService.register({ username, email, password, role });
    return res.status(StatusCodes.CREATED).send("User registered");
  } catch (error) {
    logger.error(`Error in user registration: ${error.message}`);
    if (error.message === "User already exists") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("You are already registered");
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("An error occurred during registration");
  }
};

/**
 * Controller: Handle user login and token generation.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing field(s)");
    }

    const result = await authService.login({ email, password });

    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    logger.error(`Error in user login: ${error.message}`);
    if (error.message === "Invalid credentials") {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials");
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("An error occurred during login");
  }
};

module.exports = { register, login };
