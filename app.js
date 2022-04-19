const express = require('express');
const { connect } = require('mongoose');
const router = require('./routes');
const { PORT } = require('./utils/constants');

const app = express();
app.use(router);

const start = async () => {
  await connect('mongodb://localhost:27017/moviesdb');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
