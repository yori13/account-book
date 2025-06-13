const express = require('express');
const router = express.Router();
const { generateRegistrationOptions } = require('@simplewebauthn/server');

router.post('/', async (req, res) => {
  const { email, userName, uuid } = req.body;
  
  try {
    // チャレンジコード生成
    const options = await generateRegistrationOptions({
      rpName: 'MyApp',
      rpID: 'localhost',
      userID: Buffer.from(uuid, 'utf-8'),
      userName: email,
      userDisplayName: userName,
      attestationType: 'none'
    });
    
    // セッションに保存
    req.session.challenge = options.challenge;
    req.session.userID = uuid;
    req.session.userName = userName;
    req.session.email = email;

    res.status(200).json(options); 
  } catch (error) {
    console.error('チャレンジ生成エラー:', error);
    res.status(500).json({ error: 'チャレンジの生成に失敗しました' });
  }
});

module.exports = router;
