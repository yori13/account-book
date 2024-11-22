import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCompornent from '../header/header'; // ヘッダー

const TopPage = () => {
  const navigate = useNavigate();

  const handleCashbookClick = () => {
    navigate('/cashbook');
  };

  const handleCreditbookClick = () => {
    navigate('/creditbook');
  };

  const handleEditClick = () => {
    navigate('/Edit');
  };

  return (
      <>
        <HeaderCompornent />
        <div className="grid sm:grid-cols-2 grid-cols-1 px-20 sm:py-52 py-12 gap-5 sm:text-5xl text-3xl">
            <button onClick={handleCashbookClick} className="bg-blue-500 hover:bg-blue-300 text-white font-bold rounded py-10">現金出納帳</button>
            <button onClick={handleCreditbookClick} className=" bg-red-500 hover:bg-red-300 text-white font-bold rounded py-10">クレジット出納帳</button>
            <button onClick={handleEditClick} className=" bg-yellow-500 hover:bg-yellow-300 text-white font-bold rounded py-10">出納帳編集</button>
            <button onClick={handleCreditbookClick} className=" bg-green-500 hover:bg-green-300 text-white font-bold rounded py-10">EXCEL出力</button>
          </div>
      </>
  );
};

export default TopPage;
