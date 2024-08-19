import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './components/pages/TopPage';
import CashbookPage from './components/pages/CashbookPage'; // 現金出納帳画面（仮）
import CreditbookPage from './components/pages/CreditbookPage'; // クレジット出納帳画面（仮）

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/cashbook" element={<CashbookPage />} />
          <Route path="/creditbook" element={<CreditbookPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
