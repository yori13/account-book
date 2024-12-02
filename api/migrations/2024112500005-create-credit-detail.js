'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_detail', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });
  },

  down:async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credit_detail');
  }
};
