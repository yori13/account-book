'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_category', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      category_name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credit_category');
  }
};
