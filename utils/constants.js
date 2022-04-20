const { NODE_ENV, JWT_SECRET, PORT = 3001 } = process.env;
const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'brillian-secret-key';
const JWT_CONFIG = {
  key: JWT_KEY,
  expires: {
    expiresIn: '7d',
  },
};
const COOKIE_CONFIG = {
  expires: new Date(Date.now() + 7 * 24 * 3600000),
  httpOnly: true,
  sameSite: true,
};

const LOGGER = {
  DIRNAME: 'logs',
  ERROR_FILENAME: 'error.log',
  REQUEST_FILENAME: 'request.log',
};

const DATA_BASE = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  DATA_BASE,
  LOGGER,
  COOKIE_CONFIG,
  JWT_CONFIG,
  PORT,
};
