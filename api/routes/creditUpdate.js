const express = require('express');
const router = express.Router();
const { creditAccount,creditDetail } = require('../models');

router.post('/', async (req, res) => {
  try {
    const entries = req.body;
    console.log(entries);
    res.json(entries);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;