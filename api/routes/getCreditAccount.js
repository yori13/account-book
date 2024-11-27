const express = require('express');
const router = express.Router();
const { creditAccount } = require('../models');

router.get('/', async(req,res) => {
  try{
    const data = await creditAccount.findAll({
    });
    const result = data.map(item => item.get());
    res.json(result);
  }catch(error){
    console.log(error);
  }
});

module.exports = router;