const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger } = require("../utils/logger");

const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if required fields are present
    if (!username || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing field(s)");
    }

    // Check if a user with the same email already exists in the database
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Registration failed : You are already registered");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      username,
      email,
      password: hashedPassword,
      role,
    };

    await User.create(user);

    // Send a 201 Created response on successful registration
    return res.status(StatusCodes.CREATED).send("User registered");
  } catch (error) {
    // Log and return server error if something goes wrong
    logger.error(`Error in user registration : ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("An error occurred during registration");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If required fields are missing, return a 400 Bad Request
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send("Missing field(s)");
    }

    const foundUser = await User.findOne({ email });

    // If no user is found, return a 401 Unauthorized
    if (!foundUser) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials");
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials");
    }

    // Generate a JWT token if credentials are valid
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
      jwtSecretKey,
      { expiresIn: "1h" } // Token is valid for 1 hour
    );

    // Remove sensitive fields (password and __v) before sending user data
    const { password: _, __v, ...userWithoutSensitiveData } = foundUser._doc;

    // Send back the user data and token
    return res
      .status(StatusCodes.OK)
      .send({ user: userWithoutSensitiveData, token });
  } catch (error) {
    // Log and return a 500 Internal Server Error in case of unexpected failure
    logger.error(`Error in user login : ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("An error occurred during login");
  }
};

module.exports = { register, login };
