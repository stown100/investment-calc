import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 300,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 300,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#42a5f5",
      contrastText: "#000000",
    },
    secondary: {
      main: "#f48fb1",
      light: "#fce4ec",
      dark: "#f06292",
      contrastText: "#000000",
    },
    background: {
      default: "rgb(15, 23, 42)",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#e65100",
    },
    error: {
      main: "#f44336",
      light: "#ef5350",
      dark: "#c62828",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
    },
    divider: "rgba(51, 65, 85, 0.6)",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 300,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 300,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        },
      },
    },
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check localStorage for saved theme preference
    const savedMode = localStorage.getItem("investment_calc_theme");
    if (savedMode === "light" || savedMode === "dark") {
      return savedMode;
    }
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("investment_calc_theme", mode);

    // Update document body class for potential CSS customizations
    document.body.className = `theme-${mode}`;
  }, [mode]);

  const theme = mode === "light" ? lightTheme : darkTheme;

  const contextValue: ThemeContextType = {
    mode,
    toggleTheme,
    setMode,
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
