// migrations/YYYYMMDDHHmmss-create-cash-account.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cash_account', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      item_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cash_item',
          key: 'id'
        },
        allowNull: false
      },
      memo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price_type_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cash_price_type',
          key: 'id'
        },
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tax: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cash_account');
  }
};
