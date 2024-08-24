module.exports = (sequelize, DataTypes) => {
  const CashDetail = sequelize.define('CashDetail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    credit_detail: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },{
    tableName:'credit_detail',
    taimestamps: false
  });
  return CashDetail; 
};
