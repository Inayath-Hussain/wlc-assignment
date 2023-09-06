import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Main from "./components/main";
import { SignIn } from "./components/signIn";


export default function App() {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Main />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    </div>
  );
}
