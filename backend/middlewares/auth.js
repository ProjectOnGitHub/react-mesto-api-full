const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UnauthorizedError = require('../errors/UnauthorizedError');

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
