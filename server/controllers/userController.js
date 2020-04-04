const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkPass = require('../helpers/checkPass');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        if (err.errors[0]) {
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
          throw new Error({ message: 'User not found' });
        } else {
          const check = checkPass(findUser.password, data.password);
          if (check) {
            const token = jwt.sign(
              {
                userId: data.id,
                username: data.username,
              },
              process.env.JWTSECRETS
            );
            res.status(200).json({ message: 'Anda berhasil login', token: token, data: data });
          } else {
            throw new Error({ message: 'Wrong password' });
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    const token = req.body.token;
    const newData = {};
    client
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((data) => {
        const payload = data.getPayload();
        newData.username = payload.name;
        newData.email = payload.email;
        newData.password = 'pass123';
        return User.findOne({
          where: {
            email: payload.email,
          },
        });
      })
      .then((userData) => {
        if (!userData) {
          throw new Error({ message: 'User not found' });
        } else {
          console.log(newData.password, userData.password);
          const check = checkPass(newData.password, userData.password);
          if (check) {
            const token = jwt.sign(
              {
                userId: userData.id,
                username: userData.username,
              },
              process.env.JWTSECRETS
            );
            res.status(200).json({ message: 'Anda berhasil login', token: token });
          } else {
            throw new Error({ message: 'wrong password' });
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
        let nama = data.response.holidays[0].name;
        let deskripsi = data.response.holidays[0].description;
        let tanggal = data.response.holidays[0].date.iso;
        let libur = { nama, deskripsi, tanggal };
        let semuaLibur = data.response.holidays;
        res.status(200).json(semuaLibur);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getImdb(req, res, next) {
    let title = req.params.title;
    axios({
      method: 'GET',
      url: `http://www.omdbapi.com/?apikey=2c714d2&t=${title}`,
    })
      .then((result) => {
        res.status(200).json(result.data);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
