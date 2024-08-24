// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const db = {
  sequelize,
  Sequelize,
  cashItem: require('./cashItem')(sequelize, DataTypes),
  cashPriceType: require('./cashPriceType')(sequelize, DataTypes),
  cashAccount: require('./cashAccount')(sequelize, DataTypes),
  user:require('./user')(sequelize,DataTypes),
  creditDetail: require('./creditDetail')(sequelize, DataTypes),
  creditCategory: require('./creditCategory')(sequelize, DataTypes),
  creditAccount: require('./creditAccount')(sequelize, DataTypes)
};

module.exports = db;
