const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRoutes = require('./auth');
const { auth } = require('../middlewars/auth');

router.use(authRoutes);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
