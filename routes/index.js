const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRoutes = require('./auth');
const { auth } = require('../middlewars/auth');
const { handleNotFound } = require('./notFound');

router.use(authRoutes);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use(handleNotFound);

module.exports = router;
