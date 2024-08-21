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
      <div className="mt-5 flex justify-center items-center">
        <div className="flex flex-col space-y-5">
          <button onClick={handleCashbookClick} className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-10 px-20 rounded">現金出納帳</button>
          <button onClick={handleCreditbookClick} className=" bg-red-500 hover:bg-red-300 text-white font-bold py-10 px-4 rounded">クレジット出納帳</button>
          <button onClick={handleCreditbookClick} className=" bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-10 px-4 rounded">出納帳編集</button>
          <button onClick={handleCreditbookClick} className=" bg-green-500 hover:bg-green-300 text-white font-bold py-10 px-4 rounded">EXCEL出力</button>
        </div>
      </div>
    </div>
  );
};

export default TopPage;
