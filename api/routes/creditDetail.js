const express = require('express');
const router = express.Router();
const { creditDetail, sequelize } = require('../models');

router.post('/', async (req, res) => {
  // トランザクションの開始
  const t = await sequelize.transaction();
  try {
    console.log("詳細登録処理開始");
    const detail = req.body.detail; // リクエストボディから "detail" を取得

    // データベースへの挿入
    const newDetail = await creditDetail.create(
      { detail: detail ? detail : "特になし" },
      { transaction: t }
    );

    const creditDetailId = newDetail.id;
    console.log('test::' + creditDetailId);

    // トランザクションのコミット
    await t.commit();
    console.log("詳細登録処理終了");

    // 成功レスポンスを返す
    res.status(201).json({ id: creditDetailId });
  } catch (error) {
    // トランザクションのロールバック
    await t.rollback();
    console.error('Error inserting creditDetail:', error.message);
    res.status(500).send(`Error inserting creditDetail: ${error.message}`);
  }
});

module.exports = router;
