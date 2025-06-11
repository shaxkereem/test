import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        colors: {
          yellow: [
            "#fff9db", "#fff3bf", "#ffec99", "#ffe066", "#ffd43b",
            "#fcc419", "#fab005", "#f59f00", "#f08c00", "#e67700",
          ],
        },
        primaryColor: "yellow",
      }}
    >
      <BrowserRouter basename="/test">
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);