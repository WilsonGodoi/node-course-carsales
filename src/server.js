const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const userController = require('./controllers/user-controller');

const app = express();

mongoose.connect(config.connectionUrlDatabase, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Database connected:', config.connectionUrlDatabase);
});
db.on('error', err => {
  // eslint-disable-next-line no-console
  console.error('Database connection error:', err);
});

app.use(cors(config.corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/user-routes')(app);
require('./routes/login-routes')(app);
require('./routes/logout-routes')(app);
require('./routes/ping-routes')(app);
require('./routes/brand-routes')(app);
require('./routes/vehicle-routes')(app);

app.listen(config.apiPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server is listening on port ${config.apiPort}...`);
});

userController.createAdmin();

module.exports = app;
