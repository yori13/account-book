import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () =>{
  const navigate = useNavigate();
  const backButton = ()=>{
    navigate(-1);
  }
  return(
    <div>
      <button onClick={backButton}>戻る</button>
    </div>
  );
}

export default BackButton;