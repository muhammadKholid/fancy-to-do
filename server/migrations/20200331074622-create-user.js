'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint('Users', ['email'], {
          type: 'unique',
        })
      )
      .then(() =>
        queryInterface.addConstraint('Users', ['username'], {
          type: 'unique',
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};

