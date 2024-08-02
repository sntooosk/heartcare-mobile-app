import React, { ReactNode, useCallback } from 'react';
import { Platform } from 'react-native';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Toast from 'react-native-toast-message';
import { ToastContext } from '../context/ToastContext';

export const ToastProvider = ({ children }: { children: ReactNode }) => {

  const showToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    if (Platform.OS === 'web') {
      toast(message, { 
        type,
        position: 'top-right',
        autoClose: 4000
      });
    } else {
      Toast.show({
        type,
        position: 'top',
        text1: type.charAt(0).toUpperCase() + type.slice(1),
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  }, []);

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>
      {Platform.OS === 'web' && <ToastContainer />}
      {Platform.OS !== 'web' && <Toast />}
    </>
  );
};
