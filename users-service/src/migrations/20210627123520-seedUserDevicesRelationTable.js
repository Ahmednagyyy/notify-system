"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user_devices",
      [
        {
          userId: 1,
          deviceId: 1,
        },
        {
          userId: 2,
          deviceId: 2,
        },
        {
          userId: 2,
          deviceId: 3,
        },
        {
          userId: 3,
          deviceId: 4,
        },
        {
          userId: 3,
          deviceId: 5,
        },
        {
          userId: 4,
          deviceId: 6,
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
