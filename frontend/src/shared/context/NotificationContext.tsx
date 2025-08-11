import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface Notification {
  id: string;
  message: string;
  type: AlertColor;
  open: boolean;
}

interface NotificationContextType {
  showNotification: (message: string, type?: AlertColor) => void;
  hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (message: string, type: AlertColor = 'info') => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      id,
      message,
      type,
      open: true,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Автоматически скрываем уведомление через 6 секунд
    setTimeout(() => {
      hideNotification(id);
    }, 6000);
  };

  const hideNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, open: false }
          : notification
      )
    );

    // Удаляем уведомление из состояния после анимации
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 300);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => hideNotification(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ zIndex: 9999 }}
        >
          <Alert
            onClose={() => hideNotification(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
