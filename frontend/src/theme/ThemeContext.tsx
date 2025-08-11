import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';
import { lightTheme, darkTheme } from './index';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
  setTheme: (mode: PaletteMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  // Загружаем сохраненную тему из localStorage при инициализации
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setMode(savedTheme);
    } else {
      // Определяем тему по системным настройкам
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Сохраняем тему в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newMode: PaletteMode) => {
    setMode(newMode);
  };

  // Создаем тему на основе текущего режима
  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme);

  const contextValue: ThemeContextType = {
    mode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
