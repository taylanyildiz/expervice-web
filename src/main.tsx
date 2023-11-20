import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import theme from "@Themes/index.ts";
import { persistor, store } from "@Store/index.ts";
import "@Log/sentry_logger.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
