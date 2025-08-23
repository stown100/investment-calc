import React, { FormEvent, ReactNode, SyntheticEvent, useState } from "react";
import { Box, TextField, Button, Typography, Tabs, Tab } from "@mui/material";
import { useAuthStore } from "../model/store";
import { useTheme } from "../../../theme/ThemeContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import { BlurLoader, StyledCard } from "../../../shared/ui";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const AuthForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, register, isLoading } = useAuthStore();
  const { mode } = useTheme();
  const notifications = useNotifications();

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (tabValue === 0) {
        await login(
          { email, password },
          () => {
            notifications.show("Successfully logged in!", {
              severity: "success",
            });
          },
          (errorMessage) => {
            notifications.show(errorMessage, { severity: "error" });
          }
        );
      } else {
        await register(
          { email, password },
          () => {
            notifications.show("Account created successfully!", {
              severity: "success",
            });
          },
          (errorMessage) => {
            notifications.show(errorMessage, { severity: "error" });
          }
        );
      }
    } catch (err) {
      // Error handling is now done through callbacks
      notifications.show(err, { severity: "error" });
    }
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <StyledCard
      sx={{
        "&:hover": {
          transform: "none",
          boxShadow: "none",
        },
      }}
      style={{ position: "relative" }}
    >
      {isLoading && <BlurLoader />}

      <Box
        sx={{
          borderBottom: 1,
          borderColor:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(0, 0, 0, 0.12)",
          backgroundColor:
            mode === "dark" ? "background.default" : "background.paper",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="auth tabs"
          centered
          sx={{
            "& .MuiTab-root": {
              color: mode === "dark" ? "text.secondary" : "text.primary",
              "&.Mui-selected": {
                color: mode === "dark" ? "primary.light" : "primary.main",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor:
                mode === "dark" ? "primary.light" : "primary.main",
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>

      <form onSubmit={handleSubmit}>
        <TabPanel value={tabValue} index={0}>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ color: mode === "dark" ? "text.primary" : "text.primary" }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account to continue
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ color: mode === "dark" ? "text.primary" : "text.primary" }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign up to get started with your investment projects
          </Typography>
        </TabPanel>

        <Box sx={{ px: 3, pb: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.23)"
                      : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(0, 0, 0, 0.4)",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    mode === "dark" ? "primary.light" : "primary.main",
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.23)"
                      : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(0, 0, 0, 0.4)",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    mode === "dark" ? "primary.light" : "primary.main",
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor:
                mode === "dark" ? "primary.dark" : "primary.main",
              "&:hover": {
                backgroundColor:
                  mode === "dark" ? "primary.main" : "primary.dark",
              },
            }}
            disabled={!isFormValid || isLoading}
          >
            {tabValue === 0 ? "Sign In" : "Sign Up"}
          </Button>
        </Box>
      </form>
    </StyledCard>
  );
};
