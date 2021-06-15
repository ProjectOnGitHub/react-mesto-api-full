const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const routes = require('./routes');
const NotFoundError = require('./errors/NotFoundError');

dotenv.config();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(routes);
app.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});
app.listen(PORT, () => {

});
