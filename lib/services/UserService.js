const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    console.log('password hash is:', passwordHash);

    const user = await User.insert({
      email,
      passwordHash,
    });
    console.log('user in Service:', user);
    return user;
  }
};
