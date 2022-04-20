const cookieParser = require('cookie-parser');
const express = require('express');
const { connect } = require('mongoose');
const { errorHandler } = require('./middlewars/errorHandler');
const { requestsLogger, errorsLogger } = require('./middlewars/logger');
const router = require('./routes');
const { PORT, DATA_BASE } = require('./utils/constants');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestsLogger);
app.use(router);
app.use(errorsLogger);
app.use(errorHandler);

const start = async () => {
  await connect(DATA_BASE);
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
