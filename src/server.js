const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose
  .connect(
    "mongodb+srv://wilsongodoi:wilsongodoi@cluster0-aqmca.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(() => console.error("Erro ao se conectar no banco de dados!"));

const corsOptions = { origin: "http://127.0.0.1:4200" };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

const port = 8080;

app.listen(port, () => {
  console.log(`Express server is runnning on port ${port}...`);
});

module.exports = app;
