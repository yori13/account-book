// migrations/YYYYMMDDHHmmss-add-user-code-to-cash-account.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cash_account', 'user_code', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cash_account', 'user_code');
  }
};
