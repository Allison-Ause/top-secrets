const { Router } = require('express');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Successful Login!' });
    } catch (err) {
      next(err);
    }
  })
  .delete('/sessions', async (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Successfully Logged Out!' });
    } catch (err) {
      next(err);
    }
  });
