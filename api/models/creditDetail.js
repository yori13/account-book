module.exports = (sequelize, DataTypes) => {
  const CreditDetail = sequelize.define('CreditDetail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },{
    tableName:'credit_detail',
    timestamps: false
  });
  return CreditDetail; 
};
