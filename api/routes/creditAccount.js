const express = require('express');
const router = express.Router();
const { creditAccount, creditDetail, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

router.post('/', async (req, res) => {
  try {
    // detailの件数取得
    detailCount = 0;
    sequelize.query('SELECT COUNT(*) AS count FROM credit_detail', {
      type: QueryTypes.SELECT
    })
    .then((result) => {
      detailCount = result[0].count + 1;
      console.log(detailCount);
    })
    .catch((error) => {
      console.error('error:', error);
    });

    const date = req.body.date;
    const gasoline = req.body.gasoline;
    const phone = req.body.phone;
    const uniform = req.body.uniform;
    const material = req.body.material;
    const other = req.body.other;
    const userCode = req.body.user_id;

    const sendData = [];

    if(gasoline){
      sendData.push({
        date:date,
        credit_price:gasoline,
        category_code:1,
        credit_detail_code:0,
        user_code:userCode
      });
    }

    if(phone){
      sendData.push({
        dete:date,
        credit_price:phone,
        category_code:2,
        credit_detail_code:0,
        user_code:userCode
      });
    }

    if(uniform){
      sendData.push({
        date:date,
        credit_price:uniform,
        category_code:3,
        credit_detail_code:0,
        user_code:userCode
      });
    }
    if(material){
      sendData.push({
        date:date,
        credit_price:material,
        category_code:4,
        credit_detail_code:0,
        user_code:userCode
      });
    }
    if(other){
      sendData.push({
        date:date,
        credit_price:other,
        category_code:5,
        credit_detail_code:detailCount,
        user_code:userCode
      });
    }
    // creditAccountテーブル一括INSERT
    await creditAccount.bulkCreate(sendData);

    // credit_detailテーブルに詳細をINSERT


  } catch (error) {
    // 詳細なエラーメッセージをログに出力
    console.error('Error inserting data:', error.message);
    res.status(500).send(`Error inserting data: ${error.message}`);
  }
});

module.exports = router;