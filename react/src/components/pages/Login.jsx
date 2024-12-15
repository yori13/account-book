import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/top");
  }
  return(
    <>
    <div className=" h-screen flex justify-center items-center">
      <div className="bg-white w-80 h-80 rounded shadow-lg">
        <h1 className="bg-blue-700 text-xl text-white font-bold ">ログイン</h1>
        <form className="space-y-4 text-center" onSubmit={onSubmit}>
          <div className="">
            <input type="text" placeholder="ID" className="border h-10 w-52" />
          </div>
          <div className="">
            <input type="password" placeholder="パスワード" className="border h-10 w-52" />
          </div>
          <div className="">
            <input type="submit" className="bg-blue-500 text-white px-4 py-2" value={"ログイン"} />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;