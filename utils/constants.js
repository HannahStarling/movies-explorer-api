const rateLimit = require('express-rate-limit');

const ERROR_MESSAGES = {
  BAD_REQUEST: 'Неверно переданы данные',
  NOT_FOUND: 'Страница по указанному маршруту не найдена',
  INTERNAL: 'На сервере произошла ошибка',
  ID: 'Неверный id',
  URL: 'Неправильный формат ссылки',
  EMAIL_CONFLICT: 'Пользователь с таким email уже существует',
  MOVIE_CONFLICT: 'Фильм уже в избранном',
  AUTH: 'Вы ввели неправильный логин или пароль',
  UNAUTHORIZED:
    'При авторизации произошла ошибка. Переданный токен некорректен',
  FORBIDDEN: 'Недостаточно прав для совершения действия',
  PROFILE_UPDATE: 'При обновлении профиля произошла ошибка',
  REGISTRATION: 'При регистрации пользователя произошла ошибка',
  LIMIT: 'Превышено количество запросов достуных для одного аккаунта, повторите попытку позже',
  CORS: 'Not allowed by CORS',
};

const {
  MONGO_DATA_BASE = 'mongodb://localhost:27017/moviesdb-dev',
  NODE_ENV = 'development',
  JWT_SECRET = 'brillian-secret-key',
  PORT = 3000,
} = process.env;
const DATA_BASE = MONGO_DATA_BASE || 'mongodb://mongo/moviesdb';

const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'brillian-secret-key';
const JWT_CONFIG = {
  key: JWT_KEY,
  expires: {
    expiresIn: '7d',
  },
};

const ALLOWED_CORS = ['http://localhost:3001', 'https://localhost:3001'];

const CORS_OPTIONS = {
  credentials: true,
  origin(origin, callback) {
    if (ALLOWED_CORS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(ERROR_MESSAGES.CORS));
    }
  },
};

const LIMITER = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: ERROR_MESSAGES.LIMIT,
});

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

module.exports = {
  LIMITER,
  CORS_OPTIONS,
  ERROR_MESSAGES,
  DATA_BASE,
  LOGGER,
  COOKIE_CONFIG,
  JWT_CONFIG,
  PORT,
};
