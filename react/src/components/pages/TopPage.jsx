import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopPage = () => {
  const navigate = useNavigate();

  const handleCashbookClick = () => {
    navigate('/cashbook');
  };

  const handleCreditbookClick = () => {
    navigate('/creditbook');
  };

  return (
    <div>
      <h1>トップ画面</h1>
      <button onClick={handleCashbookClick}>現金出納帳</button>
      <button onClick={handleCreditbookClick}>クレジット出納帳</button>
    </div>
  );
};

export default TopPage;
