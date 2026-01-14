import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./app/providers/router/app-router";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/providers/store/app-store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <AppRouter />
      </App>
    </Provider>
  </StrictMode>
);
