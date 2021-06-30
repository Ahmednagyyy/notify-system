"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user_groups",
      [
        {
          userId: 1,
          groupId: 1,
        },
        {
          userId: 1,
          groupId: 2,
        },
        {
          userId: 2,
          groupId: 2,
        },
        {
          userId: 2,
          groupId: 3,
        },
        {
          userId: 3,
          groupId: 2,
        },
        {
          userId: 4,
          groupId: 3,
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
