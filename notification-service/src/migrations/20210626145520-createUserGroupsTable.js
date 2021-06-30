'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user_groups', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'id',
            as: 'userId',
          },        
        },
        groupId: {
          type: Sequelize.INTEGER, 
          onDelete: 'CASCADE',
          references: {
            model: 'groups',
            key: 'id',
            as: 'groups',
          },       
           allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_groups');
  }
};
