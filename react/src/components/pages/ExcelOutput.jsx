import React from "react";
import Title from "../contexts/title";
import HeaderCompornent from "../header/header";
import ExcelOutputForm from "../ExcelOutput/ExcelOutputForm";

const title = "EXCEL出力";

const ExcelOutput = () =>{
  return (
    <>
      <HeaderCompornent />
      <Title title={title}/>
      <ExcelOutputForm/>
    </>
  );
}

export default ExcelOutput;