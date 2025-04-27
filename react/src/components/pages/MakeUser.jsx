// UserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { startRegistration } from '@simplewebauthn/browser';

const  MakeUser = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!userName || !email) {
    //   setError('すべてのフィールドを入力してください');
    //   return;
    // }

    try {

      const { data: options } = await axios.post('http://localhost:3000/api/webauthn/challenge',{
        email,
        user_name: userName
      });

      console.log(options.data);







      




      // await axios.post('http:///localhost:3000/api/users', {
      //   user_name: userName,
      //   email: email,
      // });
      // setUserName('');
      // setEmail('');
      // setError('');
      // alert('ユーザーが作成されました！');
    } catch (err) {
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
