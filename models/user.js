const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../errors/ApiError');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validator: isEmail,
    message: 'Невалидный email',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password,
) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return Promise.reject(ApiError.badRequest('Неправильные почта или пароль'));
  }
  const matched = bcrypt.compare(password, user.password);
  return !matched
    ? Promise.reject(ApiError.badRequest('Неправильные почта или пароль'))
    : user;
};

module.exports = model('user', userSchema);
