const express = require('express');
const router = express.Router();
const { cashAccount } = require('../models');

router.post('/', async (req, res) => {
  try {
    const entries = req.body;

    // 受け取ったデータの構造を確認
    if (!Array.isArray(entries)) {
      return res.status(400).send('Invalid data format');
    }

    // データをループで処理
    const mappedEntries = entries.map(entry => ({
      date: entry.date,
      item_code: entry.itemCode,
      memo: entry.memo,
      price_type_code: entry.priceTypeCode,
      price: entry.price,
      tax: entry.tax,
      user_code: 1
    }));

    // データを一括で挿入
    await cashAccount.bulkCreate(mappedEntries);

    res.status(201).send('Data inserted successfully');
  } catch (error) {
    // 詳細なエラーメッセージをログに出力
    console.error('Error inserting data:', error.message);
    res.status(500).send(`Error inserting data: ${error.message}`);
  }
});

module.exports = router;
