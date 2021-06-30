"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          notificationEnabled: true,
          name: "Ahmed Mohamed",
        },
        {
          id: 2,
          notificationEnabled: false,
          name: "Mostafa Mohamed",
        },
        {
          id: 3,
          notificationEnabled: true,
          name: "Mahmoud Mohamed",
        },
        {
          id: 4,
          notificationEnabled: true,
          name: "Omar Mohamed",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
