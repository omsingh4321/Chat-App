import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4oG5OeJBxcHS6ZN415KdZtQi0SBGdrsw",
  authDomain: "react-chat-app-1591e.firebaseapp.com",
  databaseURL: "https://react-chat-app-1591e-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-1591e",
  storageBucket: "react-chat-app-1591e.appspot.com",
  messagingSenderId: "692600293848",
  appId: "1:692600293848:web:a055f9d7686b2b232f8aad",
  measurementId: "G-3JJHNJTRRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
