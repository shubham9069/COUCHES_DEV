import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import bootstrap from 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);

