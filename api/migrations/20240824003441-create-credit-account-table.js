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
        type: Sequelize.DATE,
        allowNull: false
      },
      category_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'credit_category',
          key: 'id'
        }
      },
      category_detail_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'credit_detail',
          key: 'id'
        }
      },
      user_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  },

  down:async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credit_account');
  }
};
