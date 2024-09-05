import { createContext, useContext } from "react";

interface ToastContextType {
  showToast: (type: "success" | "error" | "info", message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser utilizado dentro de um ThemeProvider");
  }
  return context;
};

export { ToastContext };
