import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_M_9NUpjSi0p5STtGXReLugddl4IE2Co",  // ウェブ API キー
  authDomain: "accounting-book-2e95f.firebaseapp.com",  // プロジェクト ID に基づいたドメイン
  projectId: "accounting-book-2e95f",  // プロジェクト ID
  storageBucket: "accounting-book-2e95f.appspot.com",  // プロジェクト ID に基づくストレージバケット名
  messagingSenderId: "123638433789",  // プロジェクト番号（送信者 ID）
  appId: "1:123638433789:web:abc12345abcde12345",  // プロジェクト番号に基づいたアプリ ID
};


// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
