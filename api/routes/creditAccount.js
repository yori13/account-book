const express = require('express');
const router = express.Router();
const { creditAccount, creditDetail, sequelize } = require('../models');

router.post('/', async (req, res) => {
  console.log("クレジット登録処理開始");
  const t = await sequelize.transaction();
  try {
    // 最新のcredit_detailを取得
    const latestDetail = await creditDetail.findOne({
      order: [['id', 'DESC']],
      limit: 1
    });

    const detailId = latestDetail.id; // 最新のcredit_detailのIDを取得
    // const { date, gasoline, phone, uniform, material, etc, other, detail } = req.body;
    const userCode = 1;  // 仮のユーザーコード
    const values = req.body.data;
    const date = values['date'];
    
    // 送信するデータの準備
    const sendData = [];
    const categories = [
      { value: values['gasoline'], categoryCode: 1 },
      { value: values['phone'], categoryCode: 2 },
      { value: values['uniform'], categoryCode: 3 },
      { value: values['material'], categoryCode: 4 },
      { value: values['etc'], categoryCode: 5 },
      { value: values['other'], categoryCode: 6}
    ];

    console.log(categories);
    // データが存在する場合に送信データを追加
    categories.forEach(item => {
      if (item.value) {
        sendData.push({
          date: date,
          credit_price: item.value,
          category_code: item.categoryCode,
          category_detail_code: detailId,
          user_code: userCode
        });
      }
    });

    console.log("送信するデータ:", sendData);
    // creditAccountのbulkCreate
    await creditAccount.bulkCreate(sendData, {
      transaction: t
    });

    // トランザクションをコミット
    await t.commit();
    res.status(200).send("Data inserted successfully");
    console.log("クレジット登録処理完了");
  } catch (error) {
    await t.rollback();
    console.error('Error inserting data:', error.message);
    res.status(500).send(`Error inserting data: ${error.message}`);
  }
});

module.exports = router;
