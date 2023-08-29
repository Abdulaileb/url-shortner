import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom"; // Import browser router 
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app" // we initialze to use firbase

// We take the config file from firebase 

const firebaseConfig = {
  apiKey: "AIzaSyCnebeu_5q7pxZVI5IWknh80QzUAJAP15A",
  authDomain: "url-shortner-6abed.firebaseapp.com",
  projectId: "url-shortner-6abed",
  storageBucket: "url-shortner-6abed.appspot.com",
  messagingSenderId: "722215002150",
  appId: "1:722215002150:web:ec8dfb4b3037527bf846e7",
  measurementId: "G-D84NX5HWQW"
};

//We then call initialize app right underneath 
initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Wrap browser router like this 
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
