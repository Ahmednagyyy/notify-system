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
