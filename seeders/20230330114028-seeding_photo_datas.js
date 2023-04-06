"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "Photo 1",
          caption: "Caption 1",
          image_url: "https://picsum.photos/200/300",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Photo 2",
          caption: "Caption 2",
          image_url: "https://picsum.photos/200/300",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Photo 3",
          caption: "Caption 3",
          image_url: "https://picsum.photos/200/300",
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
