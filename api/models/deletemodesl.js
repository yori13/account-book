const { sequelize } = require('../models');

(async () => {
  try {
    // テーブルを直接 DROP
    await sequelize.getQueryInterface().dropTable('credit_account');
    await sequelize.getQueryInterface().dropTable('credit_detail');
    await sequelize.getQueryInterface().dropTable('credit_category');

    console.log('テーブルを削除しました');
  } catch (error) {
    console.error('テーブル削除エラー:', error);
  } finally {
    await sequelize.close();
  }
})();
