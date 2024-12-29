require('dotenv').config();
const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { user } = require('../models');

router.post('/', async (req, res) => {
  const userKey = process.env.USER; // .envのUSERを取得
  const passKey = process.env.PASSWORD; // .envのPASSWORDを取得

  try {
    const { id, password } = req.body; // 受け取った暗号化データ
    const decryptedId = CryptoJS.AES.decrypt(id, userKey).toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(password, passKey).toString(CryptoJS.enc.Utf8);

    const users = await user.findOne({
      where: {
        user_name: decryptedId,
        password: decryptedPassword,
      }
    });
    if (users) {
      res.status(200).json({ message: 'ログイン成功'});
    } else {
      res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません。' });
    }
  } catch (error) {
    console.error('エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
});

module.exports = router;
