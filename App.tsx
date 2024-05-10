import React from "react";
import { AuthProvider } from "./src/hooks/AuthProvider";
import { ThemeProvider } from "./src/hooks/ThemeProvider";
import Router from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
