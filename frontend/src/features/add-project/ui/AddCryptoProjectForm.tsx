import React, { useState } from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { v4 as uuidv4 } from "uuid";
import {
  AccountBalance as CryptoIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
  AttachMoney as PriceIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import {
  Project,
  CryptoProjectFormData,
} from "../../../entities/project/model/types";
import { useNotification } from "../../../shared/context/NotificationContext";
import { RateType } from "../../../entities/project/types";

interface AddCryptoProjectFormProps {
  onSuccess?: () => void;
}

// Form for adding a new crypto investment project
export const AddCryptoProjectForm = ({
  onSuccess,
}: AddCryptoProjectFormProps) => {
  const addProject = useProjectStore((s) => s.addProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const [formValues, setFormValues] = useState<CryptoProjectFormData>({
    tickerSymbol: "",
    startDate: new Date().toISOString().split("T")[0],
    tokenAmount: "",
    tokenPrice: "",
  });

  const [errors, setErrors] = useState<Partial<CryptoProjectFormData>>({});

  // Calculate total investment amount
  const calculateTotalInvestment = (): number => {
    const tokenAmount = Number(formValues.tokenAmount);
    const tokenPrice = Number(formValues.tokenPrice);
    if (
      isNaN(tokenAmount) ||
      isNaN(tokenPrice) ||
      tokenAmount <= 0 ||
      tokenPrice <= 0
    ) {
      return 0;
    }
    return tokenAmount * tokenPrice;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CryptoProjectFormData> = {};

    if (!formValues.tickerSymbol.trim()) {
      newErrors.tickerSymbol = "Ticker symbol is required";
    }

    const tokenAmount = Number(formValues.tokenAmount);
    if (isNaN(tokenAmount) || tokenAmount <= 0) {
      newErrors.tokenAmount = "Token amount must be a positive number";
    }

    const tokenPrice = Number(formValues.tokenPrice);
    if (isNaN(tokenPrice) || tokenPrice <= 0) {
      newErrors.tokenPrice = "Token price must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof CryptoProjectFormData,
    value: any
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormValues({
      tickerSymbol: "",
      startDate: new Date().toISOString().split("T")[0],
      tokenAmount: "",
      tokenPrice: "",
    });
    setErrors({});
  };

  // Handles form submission and adds a new crypto project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    // Convert crypto project to regular project format
    const tokenAmount = Number(formValues.tokenAmount);
    const tokenPrice = Number(formValues.tokenPrice);
    const totalInvestment = tokenAmount * tokenPrice; // Calculate total investment in USD

    const newProject: Project = {
      id: uuidv4(),
      name: `${formValues.tickerSymbol} Crypto Investment`, // Generate name from ticker
      annualPercent: null, // Always null for crypto projects
      startDate: formValues.startDate,
      createdAt: new Date().toISOString(),
      investedAmount: totalInvestment, // Store total investment amount in USD
      rateType: RateType.Floating, // Always floating for crypto
      marketSymbol: formValues.tickerSymbol, // Use ticker symbol as market symbol
      tokenAmount: tokenAmount, // Store number of tokens
      tokenPrice: tokenPrice, // Store price per token at purchase
    };

    try {
      await addProject(newProject);
      resetForm();
      showNotification(
        "Crypto project has been created successfully",
        "success"
      );
      onSuccess?.();
    } catch (e) {
      const errorMessage = "Failed to add crypto project";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            borderRadius: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} pt={0.6}>
          <TextField
            label="Ticker Symbol"
            placeholder="e.g., BTC, ETH, TON"
            value={formValues.tickerSymbol}
            onChange={(e) =>
              handleInputChange("tickerSymbol", e.target.value.toUpperCase())
            }
            error={!!errors.tickerSymbol}
            helperText={
              errors.tickerSymbol ||
              "Cryptocurrency ticker symbol used for fetching market data"
            }
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CryptoIcon
                      sx={{ fontSize: 16, color: "text.secondary", mr: 1 }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Investment Start Date"
              value={dayjs(formValues.startDate)}
              onChange={(date) =>
                handleInputChange("startDate", date?.format("YYYY-MM-DD") || "")
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error: !!errors.startDate,
                  helperText:
                    errors.startDate || "Date when you started investing",
                  slotProps: {
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon
                            sx={{
                              fontSize: 16,
                              color: "text.secondary",
                              mr: 1,
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            label="Token Amount"
            placeholder="Enter token quantity"
            type="number"
            value={formValues.tokenAmount}
            onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
            error={!!errors.tokenAmount}
            helperText={errors.tokenAmount || "Number of tokens you own"}
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="caption" sx={{ mr: 1 }}>
                      #
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Token Price"
            placeholder="Enter price per token"
            type="number"
            value={formValues.tokenPrice}
            onChange={(e) => handleInputChange("tokenPrice", e.target.value)}
            error={!!errors.tokenPrice}
            helperText={errors.tokenPrice || "Price per token in USD"}
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PriceIcon
                      sx={{ fontSize: 16, color: "text.secondary", mr: 1 }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="caption">USD</Typography>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Total Investment Display */}
          {calculateTotalInvestment() > 0 && (
            <Paper
              sx={{
                p: 2,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(25, 118, 210, 0.04)"
                    : "rgba(144, 202, 249, 0.08)",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "light"
                      ? "rgba(25, 118, 210, 0.12)"
                      : "rgba(144, 202, 249, 0.12)"
                  }`,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Total Investment Amount:
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  $
                  {calculateTotalInvestment().toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                {Number(formValues.tokenAmount).toLocaleString()} × $
                {Number(formValues.tokenPrice).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                per token
              </Typography>
            </Paper>
          )}

          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 1 }}
          >
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={loading}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Create Crypto Project
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};
