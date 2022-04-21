const userRouter = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const { validateUserInfo } = require('../validation/validation');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUserInfo, updateUser);

module.exports = userRouter;
