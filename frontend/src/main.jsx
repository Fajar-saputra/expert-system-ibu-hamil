import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux'; // Import Provider
import store from './features/store.js'; // Import store
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Bungkus App dengan Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);