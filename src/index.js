import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Welcome from './pages/Welcome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
);