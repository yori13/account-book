import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../../authLogin/firebase";
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const compoNentName = "現金出納帳"
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/top");
    } catch (error) {
      setIsError(true);
      console.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>{compoNentName}</title>
      </Helmet>
      <div className="h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold">現金出納帳</h1>
        </div>
        <div className="bg-white w-80 h-80 rounded shadow-lg mt-12">
          <h1 className="bg-blue-700 text-xl text-white font-bold p-2">ログイン</h1>
          <div className={`bg-red-200 ${isError ? "" : "hidden"}`} id="errorMsg">
            <p className="text-red-500 rounded text-center"> IDかパスワードが違います</p>
          </div>
          <div className="text-center">
            <input type="button" value={"Googleアカウントでログイン"} onClick={handleGoogleLogin} className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 mt-24"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
