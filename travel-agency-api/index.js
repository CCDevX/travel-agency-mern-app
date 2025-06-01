const express = require("express");
//Config
const port = 3000;

//Init app
const app = express();

//Endpoints
app.use("/", (req, res) => {
  return res.status(200).send("ok");
});

//Catch all
app.use((req, res) => {
  return res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
