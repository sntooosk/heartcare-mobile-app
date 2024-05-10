import React from "react";
import { AuthProvider } from "./src/hooks/AuthProvider";
import Router from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
