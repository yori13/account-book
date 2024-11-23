const express = require('express');
const router = express.Router();
const { cashAccount, creditAccount } = require('../models');

router.post('/', async (req,res) => {
  try {
    const data = await creditAccount.findall(
      // TODO：条件はおいおい記載する
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;