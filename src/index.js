import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { OneDriveDataProvider } from './context/data';


const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <OneDriveDataProvider>
          <App />
        </OneDriveDataProvider>
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
