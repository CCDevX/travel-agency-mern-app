const { StatusCodes } = require("http-status-codes");
const profileService = require("../services/profile.service");
const { logger } = require("../utils/logger");

/**
 * Controller: Return the authenticated user's profile.
 */
const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).send("User not authenticated");
  }

  const user = profileService.getProfile(req.user);
  return res.status(StatusCodes.OK).send(user);
};

/**
 * Controller: Update a user's profile by ID.
 */
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const requester = req.user;

  // Validate ID
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("No user ID provided.");
  }

  // Check that the requester is updating their own profile
  if (requester._id.toString() !== id && requester.role !== "admin") {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send("You can only update your own profile.");
  }

  // Optionally: Validate required fields or sanitize inputs
  if (data.email && !data.email.includes("@")) {
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid email address.");
  }

  try {
    const updatedUser = await profileService.updateProfile(id, data);
    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).send("User not found.");
    }
    return res.status(StatusCodes.OK).send(updatedUser);
  } catch (error) {
    logger.error(`Error updating profile: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Failed to update profile");
  }
};

/**
 * Controller: Delete the authenticated user's profile and related orders.
 */
const deleteProfile = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    logger.info("user  ", user);
    logger.info("id  ", id);
    // Check if the user is authenticated
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send("User not authenticated");
    }

    // Check if the user is allowed to delete this profile
    // Either admin, or deleting their own account
    if (user.role !== "admin" && user._id.toString() !== id) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send("You are not authorized to delete this profile");
    }

    await profileService.deleteProfile(id);
    return res.status(StatusCodes.OK).send("User profile deleted");
  } catch (error) {
    logger.error(`Error deleting profile: ${error.message}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Deletion failed");
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
