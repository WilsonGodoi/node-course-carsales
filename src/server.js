const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const userController = require('./controllers/user-controller');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger-docs');

const app = express();

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect(config.connectionUrlDatabase, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected:', config.connectionUrlDatabase))
  .catch(error => console.error('Database connection error:', error));

app.use(cors(config.corsOptions));
app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: false }));

app.use((error, req, res, next) => {
  if (error.message === 'request entity too large') {
    return res.status(413).json({ message: 'Requisição maior que 100KB' });
  } else {
    next();
  }
});

require('./routes/user-routes')(app);
require('./routes/login-routes')(app);
require('./routes/logout-routes')(app);
require('./routes/ping-routes')(app);
require('./routes/brand-routes')(app);
require('./routes/vehicle-routes')(app);
require('./routes/customer-routes')(app);
require('./routes/sale-routes')(app);

app.listen(config.apiPort, () =>
  console.log(`Express server is listening on port ${config.apiPort}...`)
);

userController.createAdmin();

module.exports = app;
