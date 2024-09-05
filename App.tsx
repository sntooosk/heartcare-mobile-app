import React from "react";
import { AuthProvider } from "./src/hooks/AuthProvider";
import { ThemeProvider } from "./src/hooks/ThemeProvider";
import Router from "./src/routes";
import { ToastProvider } from "./src/hooks/ToastProvider";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
