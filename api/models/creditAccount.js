module.exports = (sequelize, DataTypes) =>{
  const CreditAccount = sequelize.define('CreditAccount',{
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date:{
      type:DataTypes.DATEONLY,
      allowNull: false
    },
    credit_price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    credit_category_code:{
      type:DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'credit_category',
        key:'id'
      }
    },
    credit_detail_code:{
      type:DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:'credit_detail',
        key:'id'
      }
    },
    user_code:{
      type:DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'user',
        key:'id'
      }
    }
  },{
    tableName: 'credit_account',
    timestamps: false
  });
  return CreditAccount;
}