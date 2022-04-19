const cookieParser = require('cookie-parser');
const express = require('express');
const { connect } = require('mongoose');
const { errorHandler } = require('./middlewars/errorHandler');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const router = require('./routes');
const { PORT } = require('./utils/constants');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use('/api', router);
app.use(errorLogger);
app.use(errorHandler);

const start = async () => {
  await connect('mongodb://localhost:27017/moviesdb');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
