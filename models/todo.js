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
        allowNul: false,
        validate: {
          notNull: true,
          notEmpty: {
            msg: 'title tidak boleh kosong',
          },
        },
      },
      descriptions: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: {
            msg: 'description tidak boleh kosong',
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: {
            msg: 'status tidak boleh kosong',
          },
        },
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: true,
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
  };
  return Todo;
};

