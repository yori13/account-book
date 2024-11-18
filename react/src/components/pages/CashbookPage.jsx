import React from 'react';
import CashbookForm from '../InputForm/CashbookForm';
import HeaderCompornent from '../header/header'; // ヘッダー

const CashbookPage = () =>{
  return(
    <HeaderCompornent>
      <div>
        <h1>現金出納帳</h1>
          <CashbookForm/>
      </div>
    </HeaderCompornent>
  );
};

export default CashbookPage;