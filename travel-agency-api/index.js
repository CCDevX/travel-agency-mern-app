const { logger } = require("./utils/logger");
const express = require("express");
const morgan = require("morgan");
const connectToDatabase = require("./database");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

//Routes
const orderRoutes = require("./routes/order.routes");
const adviserRoutes = require("./routes/adviser.routes");
const agencyRoutes = require("./routes/agency.routes");
const tripRoutes = require("./routes/trips.routes.js");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const checkoutRoutes = require("./routes/checkout.routes");
//Config
const port = 3000;

//Init app
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(helmet());

// Rate limiting configuration for Express app

const limitOptions = {
  // Set the time window to 15 minutes (in milliseconds)
  windowMs: 15 * 60 * 1000,

  // Allow up to 100 requests per IP address within the 15-minute window
  max: 100,

  // Custom handler triggered when the request limit is exceeded
  handler: (req, res) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      status: 429,
      error: "Too many requests",
    });
  },

  // Use standardized rate limit headers (RFC-compliant)

  standardHeaders: true,

  // Disable legacy headers (X-RateLimit-*)
  legacyHeaders: false,
};

// Apply rate limiting globally to all routes
app.use(rateLimit(limitOptions));

// CORS configuration

// List of allowed client origins (production and local development)
const allowedOrigins = [
  "https://production-site.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

// Full CORS options object
const corsOptions = {
  // Dynamically check if the request's origin is in the allowed list
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If the origin is allowed or origin is undefined, accept the request
      callback(null, true);
    } else {
      // Reject the request with an error if origin is not allowed
      callback(new Error("Not allowed by CORS"));
    }
  },

  // Restrict allowed HTTP methods
  methods: ["GET", "POST", "PATCH", "DELETE"],

  // Only allow requests with these headers
  allowedHeaders: ["Content-Type", "Authorization", "X-Forwarded-For"],

  // Enable sending cookies and credentials
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to database
connectToDatabase();

// Endpoints
app.use("/orders", orderRoutes);
app.use("/advisers", adviserRoutes);
app.use("/agencies", agencyRoutes);
app.use("/trips", tripRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/create-checkout-session", checkoutRoutes);

//Catch all
app.use((req, res) => {
  return res.status(404).send("Page not found");
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
