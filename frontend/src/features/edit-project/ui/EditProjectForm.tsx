import React, { useState } from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import {
  TextField,
  Button,
  Box,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Business as BusinessIcon,
  Percent as PercentIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { FormControlLabel, Switch, InputAdornment } from "@mui/material";
import dayjs from "dayjs";
import {
  Project,
  ProjectFormData,
} from "../../../entities/project/model/types";
import { RateType } from "../../../entities/project/types";
import { useNotification } from "../../../shared/context/NotificationContext";

interface EditProjectFormProps {
  project: Project;
  onSuccess?: () => void;
}

// Form for editing an existing investment project
export const EditProjectForm = ({
  project,
  onSuccess,
}: EditProjectFormProps) => {
  const updateProject = useProjectStore((s) => s.updateProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const [formValues, setFormValues] = useState<ProjectFormData>({
    id: project.id,
    name: project.name,
    annualPercent: project.annualPercent?.toString() || "",
    startDate: project.startDate,
    investedAmount: project.investedAmount.toString(),
    rateType: project.rateType,
    marketSymbol: project.marketSymbol || "",
  });

  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {};

    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formValues.rateType === RateType.Fixed) {
      const annualPercent = Number(formValues.annualPercent);
      if (isNaN(annualPercent) || annualPercent <= 0) {
        newErrors.annualPercent = "Percent must be a positive number";
      }
    }

    const investedAmount = Number(formValues.investedAmount);
    if (isNaN(investedAmount) || investedAmount <= 0) {
      newErrors.investedAmount = "Amount must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handles form submission and updates the project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    const updatedProject: Project = {
      ...project,
      name: formValues.name,
      annualPercent:
        formValues.rateType === RateType.Fixed
          ? Number(formValues.annualPercent)
          : null,
      startDate: formValues.startDate,
      investedAmount: Number(formValues.investedAmount),
      rateType: formValues.rateType,
      marketSymbol: formValues.marketSymbol || null,
    };

    try {
      await updateProject(updatedProject);
      showNotification("Project has been updated successfully", "success");
      onSuccess?.();
    } catch (e) {
      const errorMessage = "Failed to update project";
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
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
            label="Project Name"
            placeholder="Enter project name"
            value={formValues.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon
                      sx={{ fontSize: 16, color: "text.secondary", mr: 1 }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formValues.rateType === RateType.Floating}
                onChange={(e) =>
                  handleInputChange(
                    "rateType",
                    e.target.checked ? RateType.Floating : RateType.Fixed
                  )
                }
              />
            }
            label={
              formValues.rateType === RateType.Floating
                ? "Floating Rate"
                : "Fixed Rate"
            }
          />

          {formValues.rateType === RateType.Fixed && (
            <TextField
              label="Annual Percent"
              placeholder="Enter percent"
              type="number"
              value={formValues.annualPercent}
              onChange={(e) =>
                handleInputChange("annualPercent", e.target.value)
              }
              error={!!errors.annualPercent}
              helperText={errors.annualPercent}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PercentIcon
                        sx={{ fontSize: 16, color: "text.secondary", mr: 1 }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="caption">%</Typography>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}

          {formValues.rateType === RateType.Floating && (
            <TextField
              label="Market Symbol"
              placeholder="e.g., BTC, TON, SPY"
              value={formValues.marketSymbol || ""}
              onChange={(e) =>
                handleInputChange("marketSymbol", e.target.value.toUpperCase())
              }
              fullWidth
              size="small"
            />
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Profit Start Date"
              value={dayjs(formValues.startDate)}
              onChange={(date) =>
                handleInputChange("startDate", date?.format("YYYY-MM-DD") || "")
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error: !!errors.startDate,
                  helperText: errors.startDate,
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
            label="Investment Amount"
            placeholder="Enter amount"
            type="number"
            value={formValues.investedAmount}
            onChange={(e) =>
              handleInputChange("investedAmount", e.target.value)
            }
            error={!!errors.investedAmount}
            helperText={errors.investedAmount}
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="caption" sx={{ mr: 1 }}>
                      $
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 1 }}
          >
            <Button
              type="submit"
              variant="contained"
              startIcon={<EditIcon />}
              disabled={loading}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Update Project
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};
