const { logger } = require("./utils/logger");
const express = require("express");
const morgan = require("morgan");
const connectToDatabase = require("./database");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

//Routes
const orderRoutes = require("./routes/order.routes");
const adviserRoutes = require("./routes/adviser.routes");
const agencyRoutes = require("./routes/agency.routes");
const tripRoutes = require("./routes/trips.routes.js");
const authRoutes = require("./routes/auth.routes");

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

//connect to database
connectToDatabase();

//Endpoints
app.use("/orders", orderRoutes);
app.use("/advisers", adviserRoutes);
app.use("/agencies", agencyRoutes);
app.use("/trips", tripRoutes);
app.use("/auth", authRoutes);

//Catch all
app.use((req, res) => {
  return res.status(404).send("Page not found");
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
