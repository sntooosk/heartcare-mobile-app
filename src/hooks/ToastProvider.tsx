import React, { ReactNode, useCallback } from 'react';
import { Platform, Alert } from 'react-native';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContext } from '../context/ToastContext';

export const ToastProvider = ({ children }: { children: ReactNode }) => {

  const showToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    if (Platform.OS === 'web') {
      toast(message, { 
        type,
        position: 'top-right',
        autoClose: 4000,
      });
    } else {
      Alert.alert(
        type.charAt(0).toUpperCase() + type.slice(1),
        message,
      );
    }
  }, []);

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>
      {Platform.OS === 'web' && <ToastContainer />}
    </>
  );
};
