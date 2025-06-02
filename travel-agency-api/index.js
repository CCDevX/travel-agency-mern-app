const { logger } = require("./utils/logger");
const express = require("express");
const morgan = require("morgan");
const connectToDatabase = require("./database");
const bodyParser = require("body-parser");
//Routes
const orderRoutes = require("./routes/order.routes");
const adviserRoutes = require("./routes/adviser.routes");
const agencyRoutes = require("./routes/agency.routes");
const tripRoute = require("./routes/trips.routes.js");

//Config
const port = 3000;

//Init app
const app = express();
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//connect to database
connectToDatabase();

//Endpoints
app.use("/orders", orderRoutes);
app.use("/advisers", adviserRoutes);
app.use("/agencies", agencyRoutes);

//Catch all
app.use((req, res) => {
  return res.status(404).send("Page not found");
});

//Heartbeat
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
