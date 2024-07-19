import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/language.context.jsx";
import { UserProvider } from "./contexts/user.context.jsx";
import { UserReportProvider } from "./contexts/userReport.context.jsx";
import "./utils/i18n.js";
import App from "./App.jsx";
import "./index.css";

// TO BE REMOVED
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <UserReportProvider>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </UserReportProvider>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
