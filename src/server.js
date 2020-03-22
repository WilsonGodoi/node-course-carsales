const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("./config");
const userController = require("./controllers/user-controller");

const app = express();

mongoose.connect(config.connectionUrlDatabase, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", _ => {
  console.log("Database connected:", config.connectionUrlDatabase);
});
db.on("error", err => {
  console.error("Database connection error:", err);
});

app.use(cors(config.corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(config.apiPort, () => {
  console.log(`Express server is listening on port ${config.apiPort}...`);
});

userController.createAdmin();

module.exports = app;
