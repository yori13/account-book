import React from "react";

const HeaderCompornent = ()=>{
  return(
    <>
  <header className="bg-blue-900 p-5">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">出納帳アプリ</h1>
      <button className="text-white">ログアウト</button>
    </div>
  </header>

    </>
  );
}

export default HeaderCompornent;