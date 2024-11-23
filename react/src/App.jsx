import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './components/pages/TopPage'; // TOPページ
import CashbookPage from './components/pages/CashbookPage'; // 現金出納帳画面
import CreditbookPage from './components/pages/CreditbookPage'; // クレジット出納帳画面
import CashConfirmation from './components/pages/CashConfirmation'
import CreditConfirmation from './components/pages/CreditConfirmation';
import EditPage from './components/pages/EditPage';
import { useSelector, useDispatch } from 'react-redux';
import CashDataActions, { cashData } from './actions/cashDataActions';

const App = () => {
  const dispatch = useDispatch();
  const cashDataItems = useSelector((state) => state.items || []);

  useEffect(() => {
    if(cashDataItems.length === 0){
      dispatch(CashDataActions());
    }
  },[cashDataItems, dispatch]);
  async function fetchCashData() {
    try {
      const response = await fetch('http://localhost:3000/api/get-cash-account');
      const data = await response.json();
      console.log(data); // データ確認用
      dispatch({ type: 'CASH_DATA', payload: data });
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  }
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/cashbook" element={<CashbookPage />} />
          <Route path="/creditbook" element={<CreditbookPage />} />
          <Route path='/CashConfirmation' element={<CashConfirmation/>}/>
          <Route path='/CreditConfirmation' element={<CreditConfirmation/>}/>
          <Route path='/Edit' element={<EditPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;