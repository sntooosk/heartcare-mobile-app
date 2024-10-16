import React, { ReactNode, useCallback } from "react";
import { Platform, Alert } from "react-native";

import { ToastContext } from "../context/ToastContext";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = useCallback(
    (type: "success" | "error" | "info", message: string) => {
      Alert.alert(type.charAt(0).toUpperCase() + type.slice(1), message);
    },
    []
  );

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};
