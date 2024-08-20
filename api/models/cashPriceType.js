// models/cashPriceType.js
module.exports = (sequelize, DataTypes) => {
  const CashPriceType = sequelize.define('CashPriceType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    price_type: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'cash_price_type',
    timestamps: false
  });

  return CashPriceType;
};
