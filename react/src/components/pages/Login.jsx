import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const onSubmit = () => {
    navigate("/top");
  }
  return(
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="">
          <h1 className="text-3xl font-bold">現金出納帳</h1>
        </div>
        <div className="bg-white w-80 h-80 rounded shadow-lg mt-12">
          <h1 className="bg-blue-700 text-xl text-white font-bold p-2">ログイン</h1>
          <div className={`bg-red-200 ${isError ? "" : "hidden"}`} id="errorMsg">
            <p className="text-red-500 rounded text-center"> IDかパスワードが違います</p>
          </div>
          <form className="space-y-6 text-center mt-8" onSubmit={onSubmit}>
            <div className="">
              <input type="text" placeholder="ID" className="border rounded-sm h-10 w-56" />
            </div>
            <div className="">
              <input type="password" placeholder="パスワード" className="border rounded-sm h-10 w-56" />
            </div>
            <div className="">
              <input type="submit" className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2" value={"ログイン"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;