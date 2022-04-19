const authRoutes = require('express').Router();
const { signin, createUser, signout } = require('../controllers/users');

authRoutes.post('/signup', createUser);
authRoutes.post('/signin', signin);
authRoutes.delete('/signout', signout); // POST??

module.exports = authRoutes;
