const express = require('express');
const router = express.Router();
const { verifyRegistrationResponse } = require('@simplewebauthn/server');
const { createUser, createPasskey } = require('../../controllers/webauthnControllers');
const { sequelize } = require('../../models');

router.post('/', async (req, res) => {

  let transaction;

  const { attestationResponse, challenge } = req.body;

  // セッションからチャレンジコードを取得
  const sessionChallenge = req.session.challenge;
  const userName = req.session.userName;
  const email = req.session.email;

  // セッション取得チェック
  if (!sessionChallenge || !userName || !email) {
    return res.status(400).json({ error: 'セッション情報が不足しています' });
  }

  // チャレンジコードが一致しない場合
  if (sessionChallenge !== challenge) {
    return res.status(400).json({ error: 'チャレンジコードが一致しません' });
  }

  try {
    transaction = await sequelize.transaction();

    // 登録情報照合処理
    const verification = await verifyRegistrationResponse({
      response: attestationResponse,
      expectedChallenge: sessionChallenge,
      expectedOrigin: 'http://localhost:8080',
      expectedRPID: 'localhost'
    });

    // 登録が成功しているか確認
    if (verification.verified) {
      // ユーザー作成処理
      const createUserStatus = await createUser(userName, email, transaction);

      if (createUserStatus.status !== 201) {
        await transaction.rollback();
        return res.status(400).json(createUserStatus.message);
      }

      const userId = createUserStatus.userId;
      // パスキー登録処理
      const createPasskeyStatus = await createPasskey(verification, userId, transaction);

      if (createPasskeyStatus.status !== 201) {
        await transaction.rollback();
        return res.status(500).json({ error: createPasskeyStatus.message });
      }
      await transaction.commit();
      req.session.challenge = null;
      req.session.userID = null;
      req.session.userName = null;
      req.session.email = null;
      return res.status(201).json({ message: '登録に成功しました' });
    } else {
      return res.status(400).json({ error: '登録に失敗しました' });
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    return res.status(500).json({ error: '内部サーバエラー' });
  }
});

module.exports = router;