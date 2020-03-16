const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const indexRoute = require("./routes/index-route");
const aboutRoute = require("./routes/about-route");
const pingController = require("./controllers/ping-controller");
const loginController = require("./controllers/login-controller");

const app = express();

mongoose
  .connect(
    "mongodb+srv://wilsongodoi:wilsongodoi@cluster0-aqmca.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(() => console.log("erro"));

const corsOptions = { origin: "http://127.0.0.1:4200" };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/api/loja/ping", pingController);
app.use("/about", aboutRoute);
app.use("/api/loja/login", loginController);

app.listen(8080, () => {
  console.log("Express server is runnning...");
});

module.exports = app;
