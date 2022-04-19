const userRouter = require('express').Router();

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateUser);

module.exports = userRouter;
