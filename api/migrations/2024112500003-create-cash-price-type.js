// migrations/YYYYMMDDHHmmss-create-cash-price-type.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cash_price_type', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      price_type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cash_price_type');
  }
};
