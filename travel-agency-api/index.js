const { logger } = require("./utils/logger");
const express = require("express");
const morgan = require("morgan");
const connectToDatabase = require("./database");
const orderRoutes = require("./routes/order.routes");

//Config
const port = 3000;

//Init app
const app = express();
app.use(morgan("dev"));

//connect to database
connectToDatabase();

//Endpoints
app.use("/orders", orderRoutes);

//Catch all
app.use((req, res) => {
  return res.status(404).send("Page not found");
});

//Heartbeat
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
