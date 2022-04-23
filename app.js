require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connect } = require('mongoose');
const { errorHandler } = require('./middlewars/errorHandler');
const { requestsLogger, errorsLogger } = require('./middlewars/logger');
const router = require('./routes');
const {
  PORT,
  MONGO_DATA_BASE,
  CORS_OPTIONS,
  LIMITER,
} = require('./utils/constants');

const app = express();
app.use(requestsLogger);
app.use(LIMITER);
app.use(cors(CORS_OPTIONS));
app.options('*', cors());
app.use(helmet()); // Content-Security-Policy
app.use(cookieParser());
app.use(express.json());

app.use(router);
app.use(errorsLogger);
app.use(errorHandler);

const start = async () => {
  await connect(MONGO_DATA_BASE);
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
