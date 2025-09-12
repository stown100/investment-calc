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
import { v4 as uuidv4 } from "uuid";
import {
  Business as BusinessIcon,
  Percent as PercentIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { FormControlLabel, Switch, InputAdornment } from "@mui/material";
import dayjs from "dayjs";
import {
  Project,
  ProjectFormData,
} from "../../../entities/project/model/types";
import { useNotification } from "../../../shared/context/NotificationContext";
import { RateType } from "../../../entities/project/types";

interface AddProjectFormProps {
  onSuccess?: () => void;
}

// Form for adding a new investment project
export const AddProjectForm = ({ onSuccess }: AddProjectFormProps) => {
  const addProject = useProjectStore((s) => s.addProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const [formValues, setFormValues] = useState<ProjectFormData>({
    name: "",
    annualPercent: "",
    startDate: new Date().toISOString().split("T")[0],
    investedAmount: "",
    rateType: RateType.Fixed,
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

  const resetForm = () => {
    setFormValues({
      name: "",
      annualPercent: "",
      startDate: new Date().toISOString().split("T")[0],
      investedAmount: "",
      rateType: RateType.Fixed,
    });
    setErrors({});
  };

  // Handles form submission and adds a new project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    const newProject: Project = {
      id: uuidv4(),
      name: formValues.name,
      annualPercent:
        formValues.rateType === RateType.Fixed
          ? Number(formValues.annualPercent)
          : null,
      startDate: formValues.startDate,
      createdAt: new Date().toISOString(),
      investedAmount: Number(formValues.investedAmount),
      rateType: formValues.rateType,
    };

    try {
      await addProject(newProject);
      resetForm();
      showNotification("Project has been created successfully", "success");
      onSuccess?.();
    } catch (e) {
      const errorMessage = "Failed to add project";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, position: "relative" }}>
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

      <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Project Details
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Project Name"
            placeholder="Enter project name"
            value={formValues.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={!!errors.name}
            helperText={
              errors.name || "For example: 18511 Joy Rd, Detroit, MI 48228, USA"
            }
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
              helperText={
                errors.annualPercent || "Annual yield percent of the project"
              }
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
                  helperText:
                    errors.startDate || "Date when the percent starts accruing",
                  slotProps: {
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon
                            sx={{ fontSize: 16, color: "text.secondary", mr: 1 }}
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
            helperText={errors.investedAmount || "Amount you plan to invest"}
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
              startIcon={<AddIcon />}
              disabled={loading}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Create Project
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};
