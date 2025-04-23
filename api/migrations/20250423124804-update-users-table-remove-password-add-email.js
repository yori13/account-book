'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // password カラム削除
    await queryInterface.removeColumn('users', 'password');

    // email カラム追加
    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    // email カラム削除
    await queryInterface.removeColumn('users', 'email');

    // password カラム復元
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
