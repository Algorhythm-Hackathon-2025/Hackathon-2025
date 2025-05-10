import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App as AntApp } from "antd";
import App from "./App.tsx";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { UserProvider } from "./providers/user-provider.tsx";
import { BrowserRouter } from "react-router";
import mnMN from "antd/locale/mn_MN";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
        locale={mnMN}
      >
        <AntApp>
          <UserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserProvider>
        </AntApp>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>
);
