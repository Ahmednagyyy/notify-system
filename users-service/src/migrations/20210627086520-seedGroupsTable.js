"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "groups",
      [
        {
          id: 1,
          name: "Group1",
        },
        {
          id: 2,
          name: "Group2",
        },
        {
          id: 3,
          name: "Group3",
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
