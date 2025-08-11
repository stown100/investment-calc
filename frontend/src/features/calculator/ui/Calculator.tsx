import React, { useState } from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import {
  calculateAllPeriods,
  calculateYearlyBreakdown,
  generateDashboardSummary,
  generatePortfolioChartData,
  generateGrowthChartData,
} from "../model/calculator";
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Chip,
  Stack,
  OutlinedInput,
} from "@mui/material";
import {
  Calculate as CalculateIcon,
  Business as BusinessIcon,
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
} from "@mui/icons-material";
import { Dashboard } from "./Dashboard";
import { UnifiedTable } from "./UnifiedTable";

// Calculator for investment returns
export const Calculator = () => {
  const projects = useProjectStore((state) => state.projects);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [yearsToShow, setYearsToShow] = useState(10);

  // Handle project selection with "Select All" logic
  const handleProjectSelection = (event: any) => {
    const value = event.target.value;

    // Check if "select-all" is being selected
    if (value.includes("select-all")) {
      // If "select-all" is selected, select all actual projects
      const allProjectIds = projects.map((p) => p.id);
      setSelectedProjects(allProjectIds);
    } else {
      // Remove "select-all" if it was previously selected and now deselected
      const filteredValue = value.filter((v: string) => v !== "select-all");
      setSelectedProjects(filteredValue);
    }
  };

  // Get selected projects data (filter out the "select-all" option)
  const selectedProjectsData = projects.filter((p) =>
    selectedProjects.includes(p.id)
  );

  // Calculate all data
  const results = calculateAllPeriods(selectedProjectsData);
  const yearlyData = calculateYearlyBreakdown(
    selectedProjectsData,
    yearsToShow
  );
  const dashboardSummary = generateDashboardSummary(
    selectedProjectsData,
    yearsToShow
  );
  const portfolioData = generatePortfolioChartData(
    selectedProjectsData,
    yearsToShow
  );
  const growthData = generateGrowthChartData(selectedProjectsData, yearsToShow);

  const yearOptions = [
    { value: 5, label: "5 Years" },
    { value: 10, label: "10 Years" },
    { value: 15, label: "15 Years" },
    { value: 20, label: "20 Years" },
  ];

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        borderRadius: 2,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalculateIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
              Investment Calculator
            </Typography>
          </Box>
          <FormControl size="small" sx={{ width: 120 }}>
            <InputLabel>Time Period</InputLabel>
            <Select
              value={yearsToShow}
              onChange={(e) => setYearsToShow(e.target.value as number)}
              label="Time Period"
              sx={{ borderRadius: 2 }}
            >
              {yearOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth size="small">
          <InputLabel>Select Projects</InputLabel>
          <Select
            multiple
            value={selectedProjects}
            onChange={handleProjectSelection}
            input={<OutlinedInput label="Select Projects" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  const project = projects.find((p) => p.id === value);
                  return (
                    <Chip
                      key={value}
                      label={project?.name || value}
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  );
                })}
              </Box>
            )}
            sx={{ borderRadius: 2 }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300, // Максимальная высота 300px
                },
              },
            }}
          >
            <MenuItem value="select-all">
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}
              >
                <BusinessIcon sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Select All Projects
                </Typography>
              </Box>
            </MenuItem>
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {project.name}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedProjects.length > 0 && (
          <Box sx={{ borderTop: 1, borderColor: "divider", pt: 1 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ minHeight: 40 }}
            >
              <Tab
                icon={<DashboardIcon sx={{ fontSize: 16 }} />}
                label="Dashboard"
                sx={{ minHeight: 40, textTransform: "none" }}
              />
              <Tab
                icon={<TableChartIcon sx={{ fontSize: 16 }} />}
                label="Analysis"
                sx={{ minHeight: 40, textTransform: "none" }}
              />
            </Tabs>

            <Box sx={{ pt: 1 }}>
              {tabValue === 0 && (
                <Dashboard
                  summary={dashboardSummary}
                  portfolioData={portfolioData}
                  growthData={growthData}
                  yearsToShow={yearsToShow}
                />
              )}
              {tabValue === 1 && (
                <UnifiedTable
                  periodResults={results}
                  yearlyData={yearlyData}
                  yearsToShow={yearsToShow}
                  onYearsChange={(value) =>
                    setYearsToShow(parseInt(value || "10"))
                  }
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
