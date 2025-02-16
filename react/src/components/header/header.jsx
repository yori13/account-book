import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../authLogin/firebase"; 

const HeaderCompornent = () => {
  // ログアウト処理
  const handleGoogleLogout = async () => {
    try {
      await signOut(auth);
      console.log("ログアウトしました");
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  return (
    <>
      <header className="bg-blue-900 p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">出納帳アプリ</h1>
          <button onClick={handleGoogleLogout} className="text-white">ログアウト</button>
        </div>
      </header>
    </>
  );
};

export default HeaderCompornent;
