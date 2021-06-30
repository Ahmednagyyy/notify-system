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
          userId: 2,
          groupId: 2,
        },
        {
          userId: 4,
          groupId: 3,
        },
        {
          userId: 3,
          groupId: 4,
        },
        {
          userId: 3,
          groupId: 5,
        },
        {
          userId: 4,
          groupId: 6,
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
