const authRoutes = require('express').Router();
const { signin, createUser, signout } = require('../controllers/users');
const { validateUser, validateLoginUser } = require('../validation/validation');

authRoutes.post('/signup', validateUser, createUser);
authRoutes.post('/signin', validateLoginUser, signin);
authRoutes.delete('/signout', signout);

module.exports = authRoutes;
