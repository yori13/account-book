import React from "react";
import Title from "../contexts/title";
import HeaderCompornent from "../header/header";
import BackButton from "../BackButton/BackButton";
import ExcelOutputForm from "../ExcelOutput/ExcelOutputForm";

const title = "EXCEL出力";

const ExcelOutput = () =>{
  return (
    <>
      <HeaderCompornent />
      <Title title={title}/>
      <ExcelOutputForm/>
      <BackButton/>
    </>
  );
}

export default ExcelOutput;