import React, { useEffect, useState } from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import {
  calculateAllPeriods,
  calculateYearlyBreakdown,
  generateDashboardSummary,
  generatePortfolioChartData,
  generateGrowthChartData,
} from "../model/calculator";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  OutlinedInput,
} from "@mui/material";
import {
  Calculate as CalculateIcon,
  Business as BusinessIcon,
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Dashboard } from "./Dashboard";
import { UnifiedTable } from "./UnifiedTable";
import { StyledCard } from "../../../shared/ui/StyledCard";
import { getAllProjectsLite } from "../../../entities/project/api/projectApi";
import type { ProjectLite } from "../../../entities/project/types";
import dayjs from "dayjs";

// Calculator for investment returns
export const Calculator = () => {
  const storeProjects = useProjectStore((state) => state.projects);
  const [projects, setProjects] = useState<ProjectLite[]>(storeProjects);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [yearsToShow, setYearsToShow] = useState(10);

  // Fetch lightweight projects for fast select/calculation
  useEffect(() => {
    getAllProjectsLite()
      .then((data) => setProjects(data))
      .catch(() => setProjects(storeProjects));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle project selection with "Select All" and "Select Active" logic
  const handleProjectSelection = (event: any) => {
    const value = event.target.value;

    // Check if "select-all" is being selected
    if (value.includes("select-all")) {
      const allProjectIds = projects.map((p) => p.id);
      setSelectedProjects(allProjectIds);
      return;
    }

    // Check if "select-active" is being selected
    if (value.includes("select-active")) {
      const now = dayjs();
      const activeProjectIds = projects
        .filter((p) => now.isAfter(dayjs(p.startDate)))
        .map((p) => p.id);
      setSelectedProjects(activeProjectIds);
      return;
    }

    // Otherwise, keep the chosen values (excluding special options if any slipped in)
    const filteredValue = value.filter(
      (v: string) => v !== "select-all" && v !== "select-active"
    );
    setSelectedProjects(filteredValue);
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
    { value: 1, label: "1 Year" },
    { value: 5, label: "5 Years" },
    { value: 10, label: "10 Years" },
    { value: 15, label: "15 Years" },
    { value: 20, label: "20 Years" },
    { value: 30, label: "30 Years" },
  ];

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledCard
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    color:
                      selected.length === 0 ? "text.secondary" : "text.primary",
                    fontWeight: selected.length === 0 ? 400 : 500,
                  }}
                >
                  {selected.length === 0
                    ? `Select projects to analyze (${projects.length} available)`
                    : `${selected.length} project${
                        selected.length === 1 ? "" : "s"
                      } selected`}
                </Typography>
                {selected.length > 0 && (
                  <Box
                    component="button"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedProjects([]);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "action.hover",
                      color: "text.secondary",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.2s ease",
                      transform: "scale(1)",
                      outline: "none",
                      padding: 0,
                      "&:hover": {
                        backgroundColor: "error.light",
                        color: "error.contrastText",
                        borderColor: "error.main",
                        transform: "scale(1.1)",
                      },
                      "&:active": {
                        transform: "scale(0.95)",
                      },
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "16px" }} />
                  </Box>
                )}
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
            <MenuItem value="select-active">
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}
              >
                <BusinessIcon sx={{ fontSize: 16, color: "success.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Select Active Projects
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
              sx={{
                minHeight: 40,
                "& .MuiTab-root": {
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                },
              }}
            >
              <Tab
                icon={<DashboardIcon sx={{ fontSize: 16 }} />}
                label="Dashboard"
                sx={{
                  minHeight: 40,
                  textTransform: "none",
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              />
              <Tab
                icon={<TableChartIcon sx={{ fontSize: 16 }} />}
                label="Analysis"
                sx={{
                  minHeight: 40,
                  textTransform: "none",
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
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
    </StyledCard>
  );
};
