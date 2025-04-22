'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_account', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      credit_gasoline_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      credit_phone_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      credit_uniform_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      credit_material_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      credit_etc_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      credit_other_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_other_detail: {
        type: Sequelize.TEXT
      },
      user_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down:async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credit_account');
  }
};
