// models/cashAccount.js
module.exports = (sequelize, DataTypes) => {
  const CashAccount = sequelize.define('CashAccount', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    item_code: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cash_item',
        key: 'id'
      }
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price_type_code: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cash_price_type',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tax: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_code:{
      type:DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      allowNull: false
    }
  }, {
    tableName: 'cash_account',
    timestamps: false
  });

  return CashAccount;
};
