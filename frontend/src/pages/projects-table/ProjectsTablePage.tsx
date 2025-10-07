import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Alert,
  Button,
  IconButton,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Business as BusinessIcon,
  AccountBalance as CryptoIcon,
} from "@mui/icons-material";
import { Project } from "../../entities/project/model/types";
import { RateType } from "../../entities/project/types";
import { ProjectsSummary } from "../../entities/project/api/projectApi";
import {
  getAllProjectsWithSummary,
  toggleProjectSummaryInclusion,
} from "../../entities/project/api/projectApi";
import {
  calculateProjectProfit,
  formatCurrency,
  formatPercentage,
} from "../../entities/project/utils/profitCalculator";
import { ProjectDetailsModal } from "../../features/project-details/ui/ProjectDetailsModal";
import { StyledCard } from "../../shared/ui/StyledCard";
import { DesktopProjectsTable, MobileProjectsContainer } from "./components";

export const ProjectsTablePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [projects, setProjects] = useState<Project[]>([]);
  const [summary, setSummary] = useState<ProjectsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [togglingProjects, setTogglingProjects] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setTableLoading(true);
    setError(null);
    try {
      const data = await getAllProjectsWithSummary();
      setSummary(data.summary);
      setTableLoading(false);
      setProjects(data.projects);
    } catch (err) {
      setError("Failed to load projects data");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSummary = async (
    projectId: string,
    includeInSummary: boolean
  ) => {
    setTogglingProjects((prev) => new Set(prev).add(projectId));
    setTableLoading(true);
    try {
      await toggleProjectSummaryInclusion(projectId, includeInSummary);
      // Reload data to get updated summary
      await loadData();
    } catch (err) {
      setError("Failed to update project summary inclusion");
    } finally {
      setTogglingProjects((prev) => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    setSelectedProject(null);
  };

  const getProjectStatus = (project: Project) => {
    const today = new Date().toISOString().slice(0, 10);
    const startDate = project.startDate;

    if (startDate > today) {
      return { status: "pending", color: "warning" as const };
    } else {
      return { status: "active", color: "success" as const };
    }
  };

  const getProjectTypeIcon = (project: Project) => {
    return project.rateType === RateType.Floating ? (
      <CryptoIcon sx={{ fontSize: 20 }} />
    ) : (
      <BusinessIcon sx={{ fontSize: 20 }} />
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          p: 2,
          maxWidth: "1392px",
          mx: "auto",
          width: "100%",
        }}
      >
        {/* Header Skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton
            variant="rectangular"
            width={100}
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Box>

        {/* Summary Cards Skeleton */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 1.5,
            mb: 3,
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <StyledCard
              key={index}
              elevation={1}
              sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
            >
              <Skeleton
                variant="text"
                width="60%"
                height={32}
                sx={{ mx: "auto", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ mx: "auto" }}
              />
            </StyledCard>
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button onClick={loadData} startIcon={<RefreshIcon />}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: "1392px",
        mx: "auto",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          All Projects
        </Typography>
        <Button
          onClick={loadData}
          startIcon={<RefreshIcon />}
          variant="outlined"
          size="small"
        >
          Refresh
        </Button>
      </Box>

      {/* Summary Cards */}
      {summary ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 1.5,
            mb: 3,
          }}
        >
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {summary.totalProjects}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Total Projects
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="success.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatCurrency(summary.totalInvestment)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Total Investment
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="info.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatPercentage(summary.averagePercent)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Average Return
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="warning.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatCurrency(summary.activeInvestments)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Active Investments
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="success.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatCurrency(summary.totalProfit || 0)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Total Profit
            </Typography>
          </StyledCard>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 1.5,
            mb: 3,
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <StyledCard
              key={index}
              elevation={1}
              sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
            >
              <Skeleton
                variant="text"
                width="60%"
                height={32}
                sx={{ mx: "auto", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ mx: "auto" }}
              />
            </StyledCard>
          ))}
        </Box>
      )}

      {/* Projects Table - Desktop / Mobile Cards */}
      {!isMobile ? (
        <DesktopProjectsTable
          projects={projects}
          tableLoading={tableLoading}
          togglingProjects={togglingProjects}
          onToggleSummary={handleToggleSummary}
          onViewProject={handleViewProject}
          getProjectStatus={getProjectStatus}
          getProjectTypeIcon={getProjectTypeIcon}
        />
      ) : (
        <MobileProjectsContainer
          projects={projects}
          tableLoading={tableLoading}
          togglingProjects={togglingProjects}
          onToggleSummary={handleToggleSummary}
          onViewProject={handleViewProject}
          getProjectStatus={getProjectStatus}
          getProjectTypeIcon={getProjectTypeIcon}
        />
      )}

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        open={detailsModalOpen}
        onClose={handleCloseDetails}
      />
    </Box>
  );
};
