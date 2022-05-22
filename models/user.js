const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../errors/ApiError');
const { ERROR_MESSAGES } = require('../utils/constants');

const { EMAIL, AUTH } = ERROR_MESSAGES;

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
    message: EMAIL,
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
    return Promise.reject(ApiError.badRequest(AUTH));
  }
  return bcrypt.compare(password, user.password).then((matched) => {
    if (!matched) {
      return Promise.reject(ApiError.badRequest(AUTH));
    }
    return user;
  });
};

module.exports = model('user', userSchema);
