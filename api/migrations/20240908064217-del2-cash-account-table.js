'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // `user_id` カラムを削除する操作
    await queryInterface.removeColumn('cash_account', 'user_id');
  },


  down: async (queryInterface, Sequelize) => {
  }
};
