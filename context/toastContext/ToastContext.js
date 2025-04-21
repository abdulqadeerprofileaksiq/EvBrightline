import React, { createContext, useContext, useState } from 'react';
import Toast from './Toast'; 

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info'
  });
 
  const showToast = (message, type) => {
    setToast({
      visible: true,
      message,
      type
    });
  };
  
  const toastAPI = {
    showError: (message) => showToast(message, 'error'),
    showInfo: (message) => showToast(message, 'info'),
    showSuccess: (message) => showToast(message, 'success')
  };
  
  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };
  
  return (
    <ToastContext.Provider value={toastAPI}>
      {children}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
