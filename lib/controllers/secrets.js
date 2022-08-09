const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secrets = require('../models/Secrets');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrets = await Secrets.getAll();
    res.json(secrets);
  } catch (err) {
    next(err);
  }
});
