/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext(null);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setAlerts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 5000);

    return id;
  }, []);

  const hideAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AlertContainer alerts={alerts} onClose={hideAlert} />
    </AlertContext.Provider>
  );
};

const AlertContainer = ({ alerts, onClose }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => onClose(alert.id)}
        />
      ))}
    </div>
  );
};

const Alert = ({ type, message, onClose }) => {
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✓',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '✕',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠',
      iconBg: 'bg-yellow-100',
      iconText: 'text-yellow-600',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'i',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
    },
  };

  const variant = variants[type] || variants.info;

  return (
    <div
      className={`${variant.bg} ${variant.border} ${variant.text} border rounded-lg p-4 shadow-lg flex items-start gap-3 animate-slide-in`}
      role="alert"
    >
      <div className={`${variant.iconBg} ${variant.iconText} rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
        {variant.icon}
      </div>
      <div className="flex-1 text-sm font-medium">{message}</div>
      <button
        onClick={onClose}
        className={`${variant.iconText} hover:opacity-70 flex-shrink-0 font-bold text-lg leading-none`}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};
