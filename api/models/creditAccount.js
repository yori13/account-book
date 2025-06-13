'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class creditAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  creditAccount.init({
    date: DataTypes.DATEONLY,
    credit_gasoline_price: DataTypes.INTEGER,
    credit_phone_price: DataTypes.INTEGER,
    credit_uniform_price: DataTypes.INTEGER,
    credit_material_price: DataTypes.INTEGER,
    credit_etc_price: DataTypes.INTEGER,
    credit_other_price: DataTypes.INTEGER,
    category_other_detail: DataTypes.TEXT,
    user_code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'creditAccount',
  });
  return creditAccount;
};