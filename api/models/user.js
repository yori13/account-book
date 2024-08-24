module.exports = (sequelize, DataTypes) =>{
  const Users = sequelize.define('Users',{
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_name:{
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    password:{
      type: DataTypes.VARCHAR,
      allowNull:false
    }
  },{
    tableName:'users',
    timestamps:false
  });
  return Users;
}