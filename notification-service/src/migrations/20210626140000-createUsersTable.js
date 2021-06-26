'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        phone: {
          allowNull: false,
          type: Sequelize.STRING
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        notificationEnabled: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};
