const User = require('../models/user');

const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user._id);
    return userInfo
      ? res.status(200).send(userInfo)
      : next(new Error('Пользователь не найден'));
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    );
    return user
      ? res.status(200).send({ name: user.name, email: user.email })
      : next(new Error('Пользователь не найден'));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserInfo,
  updateUser,
};
