const express = require('express');
const router = express.Router();
const { cashAccount } = require('../models');

router.post('/', async(req,res)=>{
  try{
    const entries = req.body;
    const [affectedRows] = await cashAccount.update(
      entries,
      { where: { id: entries.id } }
    );
    res.json();
  }catch(error){
  }
});

module.exports = router;