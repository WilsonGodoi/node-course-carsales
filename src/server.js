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

const userRoutes = require('./routes/user-routes');
const loginRoutes = require('./routes/login-routes');
const pingRoutes = require('./routes/ping-routes');
const brandRoutes = require('./routes/brand-routes');

app.use(userRoutes);
app.use(loginRoutes);
app.use(pingRoutes);
app.use(brandRoutes);

app.listen(config.apiPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server is listening on port ${config.apiPort}...`);
});

userController.createAdmin();

module.exports = app;
