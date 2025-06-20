const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const connectToDatabase = require("../database");
const { logger } = require("../utils/logger");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware: Logging HTTP requests
app.use(morgan("dev"));

// Middleware: Secure HTTP headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Middleware: Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("trust proxy", 1); // Allows vercel headers

// Middleware: Serve static files from /public
// app.use(express.static("public"));

// Rate Limiting: Prevent abuse by limiting repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      status: StatusCodes.TOO_MANY_REQUESTS,
      error: "Too many requests",
    });
  },
});
app.use(limiter);

// CORS Configuration
const allowedOrigins = [
  "https://travel-agency-ccdevx.netlify.app/",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Forwarded-For"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware: Serve static files from /public avec headers CORS personnalisés
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      const origin = res.req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      }
    },
  })
);

// Connect to MongoDB
connectToDatabase();

// Route Modules
app.use("/orders", require("../routes/order.routes"));
app.use("/advisers", require("../routes/adviser.routes"));
app.use("/agencies", require("../routes/agency.routes"));
app.use("/trips", require("../routes/trips.routes"));
app.use("/auth", require("../routes/auth.routes"));
app.use("/profile", require("../routes/profile.routes"));
app.use("/create-checkout-session", require("../routes/checkout.routes"));

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Page not found");
});

// Start the server
app.listen(port, () => {
  logger.info(` Server is running on port ${port}`);
});
