import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "#FFF",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
