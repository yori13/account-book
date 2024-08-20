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
      <div>
        <button onClick={handleCashbookClick} class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4">現金出納帳</button>
        <button onClick={handleCreditbookClick} class="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4">クレジット出納帳</button>
      </div>
    </div>
  );
};

export default TopPage;
