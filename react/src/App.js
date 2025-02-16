import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopPage from './components/pages/TopPage';
import CashbookPage from './components/pages/CashbookPage';
import CreditbookPage from './components/pages/CreditbookPage';
import CashConfirmation from './components/pages/CashConfirmation';
import CreditConfirmation from './components/pages/CreditConfirmation';
import EditPage from './components/pages/EditPage';
import CashEditInput from './components/Edit/CashEditInput';
import CreditEditInput from './components/Edit/CreditEditInput';
import Login from './components/pages/Login';
import { AuthProvider, useAuth } from './authLogin/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <AuthProvider>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/top" element={<PrivateRoute><TopPage /></PrivateRoute>} />
            <Route path="/cashbook" element={<PrivateRoute><CashbookPage /></PrivateRoute>} />
            <Route path="/creditbook" element={<PrivateRoute><CreditbookPage /></PrivateRoute>} />
            <Route path="/cash-confirmation" element={<PrivateRoute><CashConfirmation /></PrivateRoute>} />
            <Route path="/credit-confirmation" element={<PrivateRoute><CreditConfirmation /></PrivateRoute>} />
            <Route path="/edit" element={<PrivateRoute><EditPage /></PrivateRoute>} />
            <Route path="/cash-edit-input" element={<PrivateRoute><CashEditInput /></PrivateRoute>} />
            <Route path="/credit-edit-input" element={<PrivateRoute><CreditEditInput /></PrivateRoute>} />
          </Routes>
        </Router>
      </HelmetProvider>
    </AuthProvider>
  );
};

// Loginページへのリダイレクト処理
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default App;
