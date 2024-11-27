import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCompornent from '../header/header';
import { useSelector, useDispatch } from 'react-redux';
import CashDataActions from '../../actions/cashDataActions';
import CashItemActions from '../../actions/cashItemActions';
import CashPriceCodeActions from '../../actions/cashPriceCodeActions';
import CreditDataActions from '../../actions/creditDataActions';
import CreditDetailActions from '../../actions/creditDetailActions';

const TopPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cashData = useSelector((state) => state.cashDataEntries || []);
  const cashItem = useSelector((state) => state.cashItemEntries || []);
  const cashPriceCode = useSelector((state) => state.cashPriceEntries || []);
  const creditData = useSelector((state) => state.creditDataEntries || []);
  const creditDetail = useSelector((state) => state.creditDetailEntries || []);

  useEffect(() => {
    if(cashData.length === 0){
      dispatch(CashDataActions());
    }
    if(cashItem.length === 0){
      dispatch(CashItemActions());
    }
    if(cashPriceCode.length === 0){
      dispatch(CashPriceCodeActions());
    }
    if(creditData.length === 0){
      dispatch(CreditDataActions());
    }
    if(creditDetail.length === 0){
      dispatch(CreditDetailActions());
    }
  },[]);


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
