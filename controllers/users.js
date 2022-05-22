const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../errors/ApiError');
const User = require('../models/user');
const { JWT_CONFIG, COOKIE_CONFIG, ERROR_MESSAGES } = require('../utils/constants');

const { REGISTRATION, PROFILE_UPDATE } = ERROR_MESSAGES;

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { key, expires } = JWT_CONFIG;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, key, expires);
    return user
      ? res
        .cookie('jwt', token, COOKIE_CONFIG)
        .status(200)
        .send({ message: 'Авторизация прошла успешно!' })
      : next(ApiError.iternal());
  } catch (error) {
    return next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    return res.status(200).send({ message: 'Выход из аккаунта произошёл успешно!' });
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    return user
      ? res.status(200).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      })
      : next(ApiError.notFound());
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      return next(ApiError.badRequest(REGISTRATION));
    }
    if (error.code === 11000) {
      return next(ApiError.conflict());
    }
    return next(ApiError.iternal());
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user._id);
    return userInfo
      ? res.status(200).send(userInfo)
      : next(ApiError.notFound());
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
      },
    );
    return user
      ? res.status(200).send({ name: user.name, email: user.email })
      : next(ApiError.notFound());
  } catch (error) {
    const { name, code } = error;
    if (code === 11000) { return next(ApiError.conflict()); }
    return name === 'CastError' || name === 'ValidationError'
      ? next(ApiError.badRequest(PROFILE_UPDATE))
      : next(error);
  }
};

module.exports = {
  createUser,
  getUserInfo,
  updateUser,
  signin,
  signout,
};
