const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

/**
 * Service: Register a new user.
 * @param {Object} userData - { username, email, password, role }
 * @throws {Error} If the user already exists
 */
const register = async ({ username, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = {
    username,
    email,
    password: hashedPassword,
    role,
  };

  await User.create(user);
};

/**
 * Service: Authenticate user and return token + public data.
 * @param {Object} credentials - { email, password }
 * @returns {Object} - { user, token }
 * @throws {Error} If credentials are invalid
 */
const login = async ({ email, password }) => {
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    },
    jwtSecretKey,
    { expiresIn: "3h" }
  );

  // Remove sensitive fields from user object
  const { password: _, __v, ...userWithoutSensitiveData } = foundUser._doc;

  return { user: userWithoutSensitiveData, token };
};

module.exports = { register, login };
