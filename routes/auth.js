const authRoutes = require('express').Router();
const { signin, createUser, signout } = require('../controllers/users');
const { validateUser } = require('../validation/validation');

authRoutes.post('/signup', validateUser, createUser);
authRoutes.post('/signin', signin);
authRoutes.delete('/signout', signout); // POST??

module.exports = authRoutes;
