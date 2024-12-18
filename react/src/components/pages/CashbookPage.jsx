import React from 'react';
import CashbookForm from '../InputForm/CashbookForm';
import HeaderCompornent from '../header/header'; // ヘッダー
import Title from '../contexts/title';

const CashbookPage = () =>{
  const title = "現金出納帳";
  return(
    <>
      <HeaderCompornent />
        <Title title = {title} />
        <CashbookForm/>
    </>
  );
};

export default CashbookPage;