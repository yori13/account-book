const { user, passkey } = require('../models');

// ユーザー作成
exports.createUser = async (userName, email, transaction) => {
  try {
    const data = await user.findOne({ where: { email } });
    if (data) {
      return { status: 409, message: '既に登録済みです。' };
    }

    const newUserData = await user.create({
      user_name: userName,
      email: email
    }, { transaction });

    console.log(newUserData.id);


    if (!newUserData) {
      return { status: 500, message: 'ユーザー作成に失敗しました。' };
    } else {
      return { status: 201, message: 'ユーザー作成成功', userId: newUserData.id };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: '内部サーバエラー' };
  }
}

// パスキー登録
exports.createPasskey = async (verification, userId, transaction) => {
  try {
    const { registrationInfo } = verification;
    const {
      credentialID,
      credentialPublicKey,
      counter,
      userID,
      transports,
    } = registrationInfo;
    const newPasskey = await passkey.create({
      user_id: userId,
      credential_id: Buffer.from(String(credentialID)).toString('base64'),
      public_key: Buffer.from(String(credentialPublicKey)).toString('base64'),
      sign_count: counter,
      transports: transports ? transports.join(',') : null,
      last_used_at: new Date()
    }, { transaction });

    if (!newPasskey) {
      return { status: 500, message: 'パスキー登録に失敗しました。' };
    } else {
      return { status: 201, message: 'パスキー登録が完了しました'};
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: '内部サーバエラー' };
  }
}
