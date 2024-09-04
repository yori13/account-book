module.exports = (sequelize, DataTypes) =>{
  const CreditCategory = sequelize.define('CreditCategory',{
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    category_name:{
      type:DataTypes.STRING,
      allowNull: false
    }
  },{
    tableName: 'credit_category',
    timestamps: false
  });
  return CreditCategory;
}