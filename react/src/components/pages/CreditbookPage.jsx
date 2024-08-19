import React from 'react';
import BackButton from '../BackButton/BackButton';
import CreditbookForm from '../InputForm/CreditbookForm';

const CreditbookPage = () =>{
  return(
    <div>
      <h1>クレジット出納帳</h1>
      <CreditbookForm/>
      <BackButton />
    </div>
  );
}

export default CreditbookPage;