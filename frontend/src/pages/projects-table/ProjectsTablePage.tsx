import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Alert,
  Button,
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
import { toggleProjectSummaryInclusion } from "../../entities/project/api/projectApi";

import { ProjectDetailsModal } from "../../features/project-details/ui/ProjectDetailsModal";
import {
  DesktopProjectsTable,
  MobileProjectsContainer,
  PageError,
  PageSkeleton,
  SummaryCards,
} from "./components";
import { AddProjectDropdown } from "../../features/add-project/ui/AddProjectDropdown";
import { AddProjectModal } from "../../features/add-project/ui/AddProjectModal";
import { AddCryptoProjectModal } from "../../features/add-project/ui/AddCryptoProjectModal";
import { ProjectSearch } from "../../entities/project/ui/ProjectSearch";
import { ProjectSorting } from "../../entities/project/ui/ProjectSorting";
import { ProjectStatusFilter } from "../../entities/project/ui/ProjectStatusFilter";
import { useProjectStore } from "../../entities/project/model/store";
import { useProjectsSummaryStore } from "../../entities/project/model/summaryStore";

export const ProjectsTablePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const projects = useProjectStore((s) => s.projects);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);
  const loadMoreProjects = useProjectStore((s) => s.loadMoreProjects);
  const hasMore = useProjectStore((s) => s.hasMore);
  const isLoadingMore = useProjectStore((s) => s.isLoading);
  const isInitialLoading = useProjectStore((s) => s.isInitialLoading);
  const fetchSummary = useProjectsSummaryStore((s) => s.fetchSummary);
  const setProjectIncludeInSummary = useProjectStore(
    (s) => s.setProjectIncludeInSummary
  );
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [togglingProjects, setTogglingProjects] = useState<Set<string>>(
    new Set()
  );
  const [regularModalOpened, setRegularModalOpened] = useState(false);
  const [cryptoModalOpened, setCryptoModalOpened] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setTableLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchSummary(),
        fetchProjects(undefined, undefined, undefined, undefined, true),
      ]);
      setTableLoading(false);
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
    try {
      await toggleProjectSummaryInclusion(projectId, includeInSummary);
      // Optimistically update local store to reflect toggle
      setProjectIncludeInSummary(projectId, includeInSummary);
      // Refresh only summary; do not reset/refresh list to avoid skeleton/flicker
      await fetchSummary();
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

  if (loading) return <PageSkeleton />;

  if (error) return <PageError error={error} loadData={loadData} />;

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            onClick={loadData}
            startIcon={<RefreshIcon />}
            variant="outlined"
            size="small"
          >
            Refresh
          </Button>
          <AddProjectDropdown
            onAddRegularProject={() => setRegularModalOpened(true)}
            onAddCryptoProject={() => setCryptoModalOpened(true)}
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Filters and sorting */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-end",
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <ProjectSearch />
        <ProjectSorting />
        <ProjectStatusFilter />
      </Box>

      {/* Projects Table - Desktop / Mobile Cards */}
      {!isMobile ? (
        <DesktopProjectsTable
          projects={projects}
          tableLoading={tableLoading || isInitialLoading}
          togglingProjects={togglingProjects}
          onToggleSummary={handleToggleSummary}
          onViewProject={handleViewProject}
          onRefresh={loadData}
          onLoadMore={loadMoreProjects}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          getProjectStatus={getProjectStatus}
          getProjectTypeIcon={getProjectTypeIcon}
        />
      ) : (
        <MobileProjectsContainer
          projects={projects}
          tableLoading={tableLoading || isInitialLoading}
          togglingProjects={togglingProjects}
          onToggleSummary={handleToggleSummary}
          onViewProject={handleViewProject}
          onRefresh={loadData}
          onLoadMore={loadMoreProjects}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
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

      <AddProjectModal
        opened={regularModalOpened}
        onClose={() => {
          setRegularModalOpened(false);
          loadData();
        }}
      />
      <AddCryptoProjectModal
        opened={cryptoModalOpened}
        onClose={() => {
          setCryptoModalOpened(false);
          loadData();
        }}
      />
    </Box>
  );
};
