"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "devices",
      [
        {
          id: 1,
          model: "Huawei y9",
          phone: "+201012345678",
          os: "Android",
          token: "xxxxxx-xxxxxx-xxxxxx-xxxxxx1",
        },
        {
          id: 2,
          model: "Iphone 11",
          os: "iOS",
          phone: "+201112345678",
          token: "xxxxxx-xxxxxx-xxxxxx-xxxxxx2",
        },
        {
          id: 3,
          model: "Samsung Galaxy Note 10",
          os: "Android",
          phone: "+201212345678",
          token: "xxxxxx-xxxxxx-xxxxxx-xxxxxx3",
        },
        {
          id: 4,
          model: "true",
          os: "Iphone 12",
          phone: "+201512345678",
          token: "xxxxxx-xxxxxx-xxxxxx-xxxxxx4",
        },
        {
          id: 5,
          model: "Google Pixel 4a",
          os: "Android",
          phone: "+201612345678",
          token: "xxxxxx-xxxxxx-xxxxxx-xxxxxx5",
        },
        {
          id: 6,
          model: "true",
          os: "Iphone 11 Pro",
          phone: "+201712345678",
          token: "xxxxxx-xxxxxx-xxxxxx-xxxxxx6",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
