'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Passkeyとの1対多のリレーションを設定
      User.hasMany(models.Passkey, {
        foreignKey: 'user_id',
        as: 'passkeys' // 任意のエイリアス
      });
    }
  }
  
  User.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });

  return User;
};
