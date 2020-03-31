const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkPass = require('../helpers/checkPass');

class Controller {
  static register(req, res) {
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
          res.status(400).json({ message: 'Bad request' });
        } else {
          res.status(500).json({ message: 'Internal server error' });
        }
      });
  }

  static login(req, res) {
    const findUser = req.body;
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
              'rahasia illahi'
            );
            res.status(200).json({ message: 'Anda berhasil login', token: token });
          } else {
            res.status(400).json({ message: 'Bad request' });
            // throw createError(400);
          }
        }
      })
      .catch((err) => {
        // next(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  }
}

module.exports = Controller;
