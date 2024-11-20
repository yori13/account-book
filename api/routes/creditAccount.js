const express = require('express');
const router = express.Router();
const { creditAccount, creditDetail, sequelize } = require('../models');

router.post('/', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { date, gasoline, phone, uniform, material, etc, other, detail } = req.body;
    const userCode = 1;  // 仮のユーザーコード

    let creditDetailId = null;

    if (!other) {
      other = 0;
    }

    // creditDetailの挿入と即座のコミット
    try {
      const newDetail = await creditDetail.create({
        detail: detail ? detail : "特になし"
      }, { transaction: t });
      creditDetailId = newDetail.id;  // creditDetailのIDを取得
      console.log('test::' + creditDetailId);
      
      // creditDetailが挿入されて、IDが確定した時点でコミット
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('Error inserting creditDetail:', error.message);
      return res.status(500).send(`Error inserting creditDetail: ${error.message}`);
    }

    // creditDetailが挿入された後、IDを使って次の処理を行う
    const sendData = [];
    const categories = [
      { value: gasoline, categoryCode: 1 },
      { value: phone, categoryCode: 2 },
      { value: uniform, categoryCode: 3 },
      { value: material, categoryCode: 4 },
      { value: etc, categoryCode: 5 },
      { value: other, categoryCode: 6, categoryDetailCode: creditDetailId }
    ];

    categories.forEach(item => {
      if (item.value) {
        sendData.push({
          date: date,
          credit_price: item.value,
          category_code: item.categoryCode,
          category_detail_code: item.categoryDetailCode || 0,
          user_code: userCode
        });
      }
    });

    // creditAccountのbulkCreate
    await creditAccount.bulkCreate(sendData, {
      transaction: t,
      attributes: ['date', 'credit_price', 'category_code', 'category_detail_code', 'user_code']
    });

    // トランザクションをコミット
    await t.commit();
    res.status(200).send("Data inserted successfully");

  } catch (error) {
    await t.rollback();
    console.error('Error inserting data:', error.message);
    res.status(500).send(`Error inserting data: ${error.message}`);
  }
});

module.exports = router;
