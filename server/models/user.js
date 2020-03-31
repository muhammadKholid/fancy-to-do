'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {
    //
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Username tidak boleh kosong',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: 6,
            msg: 'Password harus lebih dari 6 character',
          },
          notEmpty: {
            msg: 'Password tidak boleh kosong',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: {
            msg: 'Email tidak boleh kosong',
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: (User, options) => {
          console.log('masuk hooks');
          console.log(User.password);
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(User.password, salt);
          User.password = hash;
        },
      },
      sequelize,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};
