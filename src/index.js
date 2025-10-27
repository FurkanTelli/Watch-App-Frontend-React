import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'primereact/resources/primereact.css';                     // PrimeReact stil
import 'primeicons/primeicons.css';                               // İkonlar
import 'primeflex/primeflex.css';                                 // Flex yardımcı sınıfları
import './index.css';                                             // Kendi stillerin

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
