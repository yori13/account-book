import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () =>{
  const navigate = useNavigate();
  const backButton = ()=>{
    navigate(-1);
  }
  return(
    <div>
      <button onClick={backButton} className="border bg-green-800 hover:bg-green-500 text-white py-4 px-10 rounded-3xl font-bold">戻る</button>
    </div>
  );
}

export default BackButton;