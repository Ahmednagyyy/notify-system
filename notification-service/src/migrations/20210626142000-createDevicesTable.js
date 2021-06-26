'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('devices', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        os: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        model: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('devices');
  }
};
