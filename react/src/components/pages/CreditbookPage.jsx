import React from 'react';
import CreditbookForm from '../InputForm/CreditbookForm';
import HeaderCompornent from '../header/header'; // ヘッダー
import Title from '../contexts/title';

const CreditbookPage = () =>{
  const title = "クレジット出納帳";
  return(
      <>
        <HeaderCompornent />
          <Title title={title}/>
          <CreditbookForm/>
      </>
  );
}

export default CreditbookPage;