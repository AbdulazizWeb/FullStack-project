import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./app/providers/router/app-router";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/providers/store/app-store";
import { MessageProvider } from "./shared/ui/message-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <MessageProvider />
        <AppRouter />
      </App>
    </Provider>
  </StrictMode>
);
