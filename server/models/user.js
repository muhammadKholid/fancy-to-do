'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {
    //
  }

  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    { sequelize }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};

