const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

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
  try {
    const user = await this.findOne({ email }).select('+password');
    const matched = !user
      ? await Promise.reject(new Error('Вы ввели неправильный логин или пароль. '))
      : await bcrypt.compare(password, user.password);
    return !matched
      ? await Promise.reject(new Error('Вы ввели неправильный логин или пароль. '))
      : user;
  } catch (error) {
    return console.error(error);
  }
};

module.exports = model('user', userSchema);
