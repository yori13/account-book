const express = require('express');
const router = express.Router();
const { creditAccount, sequelize } = require('../models');

router.post('/', async (req, res) => {
  const t = await sequelize.transaction(); // トランザクションの開始

  try {
    const entries = req.body;
    const key = Object.keys(entries).slice(0, 6);
    const creditData = Object.values(entries).slice(0, 6);

    console.log(key);
    console.log(creditData);
    console.log(entries);

    const updateData = key.map((id, index) => ({
      id,
      value: creditData[index],
    }));

    console.log(updateData);

    // 各データを更新 (トランザクションを適用)
    await Promise.all(
      updateData.map(({ id, value }) =>
        creditAccount.update(
          { credit_price: value }, // 更新する値
          { where: { id }, transaction: t } // トランザクションを指定
        )
      )
    );

    await t.commit(); // トランザクションのコミット
    res.json({ message: 'Update successful' });
  } catch (error) {
    await t.rollback(); // エラー発生時にロールバック
    console.error('Transaction failed:', error);
    res.status(500).json({ message: 'Update failed', error });
  }
});

module.exports = router;
