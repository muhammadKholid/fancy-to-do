'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model {
    //
  }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'title tidak boleh kosong',
          },
        },
      },
      descriptions: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'description tidak boleh kosong',
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Date tidak boleh kosong',
          },
          isAfter: {
            args: date.toISOString().slice(0, 10),
            msg: 'Tidak boleh hari sebelum dari hari ini!',
          },
          isBefore: {
            args: '2020-12-30',
            msg: 'Tahun ini aja bolehnya',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Date tidak boleh kosong',
          },
        },
      },
    },
    { sequelize }
  );
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User);
  };
  return Todo;
};

