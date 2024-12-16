import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './components/pages/TopPage'; // TOPページ
import CashbookPage from './components/pages/CashbookPage'; // 現金出納帳画面
import CreditbookPage from './components/pages/CreditbookPage'; // クレジット出納帳画面
import CashConfirmation from './components/pages/CashConfirmation'
import CreditConfirmation from './components/pages/CreditConfirmation';
import EditPage from './components/pages/EditPage';
import CashEditInput from './components/Edit/CashEditInput';
import CreditEditInput from './components/Edit/CreditEditInput';
import Login from './components/pages/Login';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/top" element={<TopPage />} />
          <Route path="/cashbook" element={<CashbookPage />} />
          <Route path="/creditbook" element={<CreditbookPage />} />
          <Route path='/CashConfirmation' element={<CashConfirmation/>}/>
          <Route path='/CreditConfirmation' element={<CreditConfirmation/>}/>
          <Route path='/Edit' element={<EditPage />}/>
          <Route path='/CashEditInput' element={<CashEditInput />}/>
          <Route path='/CreditEditInput' element={<CreditEditInput />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;