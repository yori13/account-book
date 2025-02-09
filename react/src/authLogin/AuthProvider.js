import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';  // Firebaseの設定をインポート

// 認証情報を共有するためのContext
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);  // ログインしているユーザーの情報を設定
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
