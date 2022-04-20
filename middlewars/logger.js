const winston = require('winston');
const { logger, errorLogger } = require('express-winston');
const { LOGGER } = require('../utils/constants');

const format = winston.format.json();
const { DIRNAME, ERROR_FILENAME, REQUEST_FILENAME } = LOGGER;

const requestsLogger = logger({
  transports: [
    new winston.transports.File({ DIRNAME, filename: ERROR_FILENAME }),
  ],
  format,
});

// логгер ошибок
const errorsLogger = errorLogger({
  transports: [
    new winston.transports.File({ DIRNAME, filename: REQUEST_FILENAME }),
  ],
  format,
});

module.exports = {
  requestsLogger,
  errorsLogger,
};
