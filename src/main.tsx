import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import theme from "@Themes/index.ts";
import { persistor, store } from "@Store/index.ts";
import "@Log/sentry_logger.ts";
import { I18nextProvider } from "react-i18next";
import i18n from "@Local/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </I18nextProvider>
    </PersistGate>
  </Provider>
);
