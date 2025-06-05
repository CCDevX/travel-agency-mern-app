// Load environment variables
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectToDatabase = require("./database");
const { logger } = require("./utils/logger");

// Config
const corsOptions = require("./config/cors.config");
const rateLimiter = require("./config/rateLimiter.config");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase();

// Middleware: Logs HTTP requests
app.use(morgan("dev"));

// Middleware: Security headers
app.use(helmet());

// Middleware: Rate limiting
app.use(rateLimiter);

// Middleware: CORS
app.use(cors(corsOptions));

// Middleware: Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware: Serve static files
app.use(express.static("public"));

// Routes
app.use("/orders", require("./routes/order.routes"));
app.use("/advisers", require("./routes/adviser.routes"));
app.use("/agencies", require("./routes/agency.routes"));
app.use("/trips", require("./routes/trips.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/profile", require("./routes/profile.routes"));
app.use("/create-checkout-session", require("./routes/checkout.routes"));

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
