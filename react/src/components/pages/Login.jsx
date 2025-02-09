import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";


const Login = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState({id: "", password: ""});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const encryptedUserInfo = {
      id: undefined,
      password: undefined
    };
    
    const userKey = process.env.REACT_APP_USER;
    const passKey = process.env.REACT_APP_PASSWORD;
    
    // 暗号化された情報をBase64文字列に変換
    encryptedUserInfo.id = CryptoJS.AES.encrypt(userInfo.id, userKey).toString();
    encryptedUserInfo.password = CryptoJS.AES.encrypt(userInfo.password, passKey).toString();

    const url = process.env.REACT_APP_API_ENDPOINT + "authLogin";
    
    try {
      const response = await axios.post(url, encryptedUserInfo);
      if (response.status === 200) {
        navigate("/top");
      } else {
        alert(response.message);
        console.log(response);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };
  
  
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
              <input type="text" placeholder="ID" name="id" className="border rounded-sm h-10 w-56" onChange={handleChange} />
            </div>
            <div className="">
              <input type="password" placeholder="パスワード" name="password" className="border rounded-sm h-10 w-56" onChange={handleChange} />
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