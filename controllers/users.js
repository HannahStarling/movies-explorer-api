const bcrypt = require('bcryptjs');
const { jwt } = require('jsonwebtoken');
const User = require('../models/user');
const { jwtConfig, cookieConfig } = require('../utils/constants');

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { key, expires } = jwtConfig;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, key, expires);
    return user ? res
      .cookie('jwt', token, cookieConfig)
      .status(200)
      .send({ message: 'Авторизация прошла успешно!' }) : next(new Error('unauthorized error'));
  } catch (error) {
    return next(error);
  }
};

const signout = async (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Пользователь успешно ' });
  next();
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;

    const hash = await bcrypt
      .hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    return user ? res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }) : next(new Error('Пользователь не найден'));
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      return next(new Error(
        'badRequest Введены некорректные данные, невозможно создать пользователя, проверьте имя, описание и аватар на валидность.',
      ));
    }
    if (error.code === 11000) {
      return next(new Error('conflict: Пользователь уже зарегестрирован.'));
    }
    return next(new Error('iternal'));
  }
};

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
      },
    );
    return user
      ? res.status(200).send({ name: user.name, email: user.email })
      : next(new Error('Пользователь не найден'));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getUserInfo,
  updateUser,
  signin,
  signout,
};
