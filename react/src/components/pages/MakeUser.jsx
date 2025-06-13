// UserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { startRegistration } from '@simplewebauthn/browser';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const  MakeUser = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email) {
      setError('すべてのフィールドを入力してください');
      return;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setError('正しいメールアドレスを入力してください');
      return;
    }

    try {

      //仮ユーザーIDを発行
      const uuid = uuidv4();

      console.log(uuid);

      const { data: options } = await axios.post('http://localhost:3000/api/webauthn/challenge',{
        email,
        userName,
        uuid
      },{
        withCredentials: true // cookieを送信するための設定
      });

      // チャレンジコード取得
      const { challenge } = options;
      
      // 電子署名作成
      const attestationResponse = await startRegistration(options);

      // サーバー側に電子署名を送信
      const response = await axios.post('http://localhost:3000/api/webauthn/verifyAttestation',{
        attestationResponse,
        challenge
      });

      if (response.status === 201) {
        alert(response.data.message);
        setUserName('');
        setEmail('');
        navigate("/");
      } else {
        alert("パスキー登録に失敗しました。");
      }
    } catch (err) {
      console.error(err); 
      setError('エラーが発生しました');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="max-w-md bg-white p-12 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">ユーザー登録</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="user_name">
                ユーザー名
              </label>
              <input
                type="text"
                id="user_name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              登録
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default  MakeUser;
