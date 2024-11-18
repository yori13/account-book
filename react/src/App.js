import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import TopPage from './components/pages/TopPage'; // TOPページ
import CashbookPage from './components/pages/CashbookPage'; // 現金出納帳画面
import CreditbookPage from './components/pages/CreditbookPage'; // クレジット出納帳画面
import CashConfirmation from './components/pages/CashConfirmation'
import CreditConfirmation from './components/pages/CreditConfirmation';
import EditPage from './components/pages/EditPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/cashbook" element={<CashbookPage />} />
          <Route path="/creditbook" element={<CreditbookPage />} />
          <Route path='/CashConfirmation' element={<CashConfirmation/>}/>
          <Route path='/CreditConfirmation' element={<CreditConfirmation/>}/>
          <Route path='/EditPage' element={<EditPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
