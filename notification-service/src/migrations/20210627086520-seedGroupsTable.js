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
        },
        {
          id: 4,
          name: "Group4",
        },
        {
          id: 5,
          name: "Group5",
        },
        {
          id: 6,
          name: "Group6",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
