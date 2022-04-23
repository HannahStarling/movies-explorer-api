const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRoutes = require('./auth');
const { auth } = require('../middlewars/auth');
const { handleNotFound } = require('./notFound');

router.use('/api', authRoutes);
router.use(auth);
router.use('/api/users', userRouter);
router.use('/api/movies', movieRouter);
router.use('/*', handleNotFound);

module.exports = router;
