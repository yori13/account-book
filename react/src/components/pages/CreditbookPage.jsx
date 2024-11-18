import React from 'react';
import CreditbookForm from '../InputForm/CreditbookForm';
import HeaderCompornent from '../header/header'; // ヘッダー

const CreditbookPage = () =>{
  return(
    <HeaderCompornent>
      <div>
        <h1>クレジット出納帳</h1>
        <CreditbookForm/>
      </div>
    </HeaderCompornent>
  );
}

export default CreditbookPage;