'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Passkey extends Model {
    static associate(models) {
      // Userとの1対1のリレーションを設定
      Passkey.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user' // 任意のエイリアス
      });
    }
  }
  
  Passkey.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    credential_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    public_key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sign_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    transports: {
      type: DataTypes.STRING,
    },
    last_used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Passkey',
  });

  return Passkey;
};
