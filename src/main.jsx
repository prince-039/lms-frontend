import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client' 
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Slices/store.js';


createRoot(document.getElementById('root')).render(
     <Provider store={store}>
        <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
   </Provider>
);

