import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';

import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer position='bottom-right' theme='dark' limit={1} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
