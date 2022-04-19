const { NODE_ENV, JWT_SECRET, PORT = 3001 } = process.env;
const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'brillian-secret-key';
const jwtConfig = {
  key: jwtKey,
  expires: {
    expiresIn: '7d',
  },
};
const cookieConfig = {
  expires: new Date(Date.now() + 7 * 24 * 3600000),
  httpOnly: true,
  sameSite: true,
};

module.exports = {
  cookieConfig,
  jwtConfig,
  PORT,
};
