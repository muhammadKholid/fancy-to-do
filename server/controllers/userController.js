const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkPass = require('../helpers/checkPass');
const axios = require('axios');

class Controller {
  static register(req, res, next) {
    const newUser = req.body;
    console.log(newUser);
    User.create({
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
    })
      .then((data) => {
        res.status(201).json({ message: 'Berhasil terdaftar', data: data });
      })
      .catch((err) => {
        if (err.errors[0].message) {
          next(err);
        } else {
          next(err);
        }
      });
  }

  static login(req, res, next) {
    const findUser = req.body;
    console.log(findUser);
    User.findOne({
      where: {
        username: findUser.username,
      },
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'data not found' });
        } else {
          const check = checkPass(findUser.password, data.password);
          console.log(check);
          if (checkPass(findUser.password, data.password)) {
            const token = jwt.sign(
              {
                userId: data.id,
                username: data.username,
              },
              process.env.JWTSECRETS
            );
            res.status(200).json({ message: 'Anda berhasil login', token: token });
          } else {
            res.status(400).json({ message: 'Bad request' });
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static getQuote(req, res, next) {
    axios({
      method: 'GET',
      url: 'https://quotes.rest/qod',
    })
      .then(({ data }) => {
        res.status(200).json(data.contents.quotes);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getHolidays(req, res, next) {
    axios({
      method: 'GET',
      url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY_CALENDAR}&country=ID&year=2020`,
    })
      .then(({ data }) => {
        res.status(200).json(data.response.holidays);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
