const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRoutes = require('./auth');
const { auth } = require('../middlewars/auth');
const { handleNotFound } = require('./notFound');

router.use('/api', authRoutes);
router.use('/api/users', auth, userRouter);
router.use('/api/movies', auth, movieRouter);
router.use('/*', handleNotFound);

module.exports = router;
