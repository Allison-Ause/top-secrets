const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    console.log('authenticate cookie:', cookie);
    if (!cookie) throw new Error('Sign in to view');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    console.log('user from authenticate:', user);
    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
