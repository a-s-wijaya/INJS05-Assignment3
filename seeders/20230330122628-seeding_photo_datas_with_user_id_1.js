"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "Foto pertama milik user 1",
          caption: "Ini adalah foto pertama milik user 1",
          image_url: "https://picsum.photos/200/300",
          UserId: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Foto kedua milik user 1",
          caption: "Ini adalah foto kedua milik user 1",
          image_url: "https://picsum.photos/200/300",
          UserId: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Foto ketiga milik user 1",
          caption: "Ini adalah foto ketiga milik user 1",
          image_url: "https://picsum.photos/200/300",
          UserId: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
