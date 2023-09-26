import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./assets/css/index.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';
import { persistor, store } from '@Utils/hooks/index.ts';
import theme from '@Themes/index.ts';

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
