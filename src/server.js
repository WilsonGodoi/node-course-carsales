const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const User = require("./models/User");

const app = express();

const url = "mongodb://127.0.0.1:27017/car-sales";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", _ => {
  console.log("Database connected:", url);
});
db.on("error", err => {
  console.error("Database connection error:", err);
});

User.create({
  login: "admin",
  name: "admin",
  password: "admin",
  type: "ADMINISTRADOR",
  active: true
});

const corsOptions = { origin: "http://127.0.0.1:4200" };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

const port = 8080;

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}...`);
});

module.exports = app;
