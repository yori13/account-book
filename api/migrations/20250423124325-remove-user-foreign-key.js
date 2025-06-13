'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 例: 外部キー制約の削除
    await queryInterface.removeConstraint('credit_account', 'credit_account_ibfk_1');
  },

  down: async (queryInterface, Sequelize) => {
    // rollback用に必要であれば constraint を再追加
    await queryInterface.addConstraint('credit_account', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'credit_account_user_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE'
    });
  }
};
