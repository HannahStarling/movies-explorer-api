const express = require('express');
const { connect } = require('mongoose');
const { PORT } = require('./utils/constants');

const app = express();

const start = async () => {
  await connect('mongodb://localhost:27017/moviesdb');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
