const express = require('express');
const router = express.Router(); // これでrouterを定義
const { creditAccount, creditDetail, sequelize } = require('../models');

router.post('/', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const date = req.body.date;
    const gasoline = req.body.gasoline;
    const phone = req.body.phone;
    const uniform = req.body.uniform;
    const material = req.body.material;
    const etc = req.body.etc;
    const other = req.body.other;
    const detail = req.body.detail;
    // const userCode = req.body.user_code;
    const userCode = 1;

    let creditDetailId = null;

    if (other) {
      const newDetail = await creditDetail.create({
        detail: detail ? detail : "特になし"
      }, { transaction: t });

      creditDetailId = newDetail.id;
    }

    const sendData = [];

    if(gasoline){
      sendData.push({
        date: date,
        credit_price: gasoline,
        category_code: 1,
        category_detail_code: 0,
        user_code: userCode
      });
    }

    if(phone){
      sendData.push({
        date: date,
        credit_price: phone,
        category_code: 2,
        category_detail_code: 0,
        user_code: userCode
      });
    }

    if(uniform){
      sendData.push({
        date: date,
        credit_price: uniform,
        category_code: 3,
        category_detail_code: 0,
        user_code: userCode
      });
    }

    if(material){
      sendData.push({
        date: date,
        credit_price: material,
        category_code: 4,
        category_detail_code: 0,
        user_code: userCode
      });
    }

    if(etc){
      sendData.push({
        date: date,
        credit_price: etc,
        category_code: 5,
        category_detail_code: 0,
        user_code: userCode
      });
    }

    if(other){
      sendData.push({
        date: date,
        credit_price: other,
        category_code: 6,
        category_detail_code: creditDetailId,
        user_code: userCode
      });
    }

    await creditAccount.bulkCreate(sendData, { transaction: t });

    await t.commit();
    res.status(200).send("Data inserted successfully");

  } catch (error) {
    await t.rollback();
    console.error('Error inserting data:', error.message);
    res.status(500).send(`Error inserting data: ${error.message}`);
  }
});

module.exports = router;