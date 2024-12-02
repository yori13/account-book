// migrations/YYYYMMDDHHmmss-create-cash-item.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cash_item', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cash_item');
  }
};
