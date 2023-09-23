import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./assets/css/index.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './utils/hooks/index.ts';
import { ThemeProvider } from '@mui/material';
import theme from './themes/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
