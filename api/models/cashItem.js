// models/cashPriceType.js
module.exports = (sequelize, DataTypes) => {
  const CashItem = sequelize.define('CashItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    item_name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'cash_item',
    timestamps: false
  });

  return CashItem;
};
