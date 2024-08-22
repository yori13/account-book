import React from 'react';
import BackButton from '../BackButton/BackButton';
import CashbookForm from '../InputForm/CashbookForm';

const CashbookPage = () =>{
  return(
    <div>
      <h1>現金出納帳</h1>
      <CashbookForm/>
    </div>
  );
};

export default CashbookPage;