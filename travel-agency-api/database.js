const mongoose = require("mongoose");
const { logger } = require("./utils/logger");

const mongoUriAtlas = ``;
const mongoUriLocalhost = `mongodb://localhost:27017/hexa-trip`;

let mongoUri = ``;

const connectToDatabase = async () => {
  if (process.env.NODE_ENV === "production") {
    mongoUri = mongoUriAtlas;
  } else {
    mongoUri = mongoUriLocalhost;
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: "hexa-trip",
      tls: process.env.NODE_ENV === "production",
    });
    logger.info("Connection with db successful");
  } catch (error) {
    logger.error("Error during db connection", error);
  }
};

module.exports = connectToDatabase;
