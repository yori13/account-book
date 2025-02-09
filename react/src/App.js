import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TopPage from './components/pages/TopPage'; // TOPページ
import CashbookPage from './components/pages/CashbookPage'; // 現金出納帳画面
import CreditbookPage from './components/pages/CreditbookPage'; // クレジット出納帳画面
import CashConfirmation from './components/pages/CashConfirmation'
import CreditConfirmation from './components/pages/CreditConfirmation';
import EditPage from './components/pages/EditPage';
import CashEditInput from './components/Edit/CashEditInput';
import CreditEditInput from './components/Edit/CreditEditInput';
import Login from './components/pages/Login';
import { AuthProvider, useAuth } from './authLogin/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/top"
            element={
              <PrivateRoute>
                <TopPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cashbook"
            element={
              <PrivateRoute>
                <CashbookPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/creditbook"
            element={
              <PrivateRoute>
                <CreditbookPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/CashConfirmation"
            element={
              <PrivateRoute>
                <CashConfirmation />
              </PrivateRoute>
            }
          />
          <Route
            path="/CreditConfirmation"
            element={
              <PrivateRoute>
                <CreditConfirmation />
              </PrivateRoute>
            }
          />
          <Route
            path="/Edit"
            element={
              <PrivateRoute>
                <EditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/CashEditInput"
            element={
              <PrivateRoute>
                <CashEditInput />
              </PrivateRoute>
            }
          />
          <Route
            path="/CreditEditInput"
            element={
              <PrivateRoute>
                <CreditEditInput />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// 認証されていない場合、Loginページにリダイレクト
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 認証状態が決まるまでロード画面を表示
  }

  if (!user) {
    return <Navigate to="/" replace />; // 認証されていない場合、Loginページにリダイレクト
  }

  return children; // 認証されていれば、子コンポーネントを表示
};

export default App;
