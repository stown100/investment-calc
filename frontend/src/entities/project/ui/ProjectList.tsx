import React, { useEffect, useState, useRef, useCallback } from "react";
import { useProjectStore } from "../model/store";
import {
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Percent as PercentIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { Project } from "../model/types";
import { EditProjectModal } from "../../../features/edit-project/ui/EditProjectModal";
import { useNotification } from "../../../shared/context/NotificationContext";
import { StyledCard } from "../../../shared/ui/StyledCard";
import { ProjectSkeletons } from "./ProjectSkeleton";

// Displays the list of investment projects with infinite scroll
export const ProjectList = () => {
  const projects = useProjectStore((s) => s.projects);
  const removeProject = useProjectStore((s) => s.removeProject);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);
  const loadMoreProjects = useProjectStore((s) => s.loadMoreProjects);
  const sortBy = useProjectStore((s) => s.sortBy);
  const sortOrder = useProjectStore((s) => s.sortOrder);
  const status = useProjectStore((s) => s.status);
  const searchQuery = useProjectStore((s) => s.searchQuery);
  const hasMore = useProjectStore((s) => s.hasMore);
  const isLoading = useProjectStore((s) => s.isLoading);
  const isInitialLoading = useProjectStore((s) => s.isInitialLoading);
  const now = dayjs();
  const { showNotification } = useNotification();

  // State for edit modal
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editModalOpened, setEditModalOpened] = useState(false);

  // Ref for intersection observer
  const observerRef = useRef<HTMLDivElement>(null);

  // Intersection observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && hasMore && !isLoading && !isInitialLoading) {
        loadMoreProjects().catch((e) => {
          showNotification("Failed to load more projects", "error");
        });
      }
    },
    [hasMore, isLoading, isInitialLoading, loadMoreProjects, showNotification, projects.length]
  );

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver, hasMore, isLoading, isInitialLoading]);

  // Re-observe when projects change
  useEffect(() => {
    if (observerRef.current && hasMore && !isInitialLoading) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "20px",
        threshold: 0.1,
      });

      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [projects.length, hasMore, handleObserver, isInitialLoading]);

  useEffect(() => {
    fetchProjects(sortBy, sortOrder, status, searchQuery).catch((e) => {
      showNotification("Failed to load projects", "error");
    });
  }, [fetchProjects, sortBy, sortOrder, status, searchQuery, showNotification]);

  // Handles project deletion with confirmation
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await removeProject(id);
        showNotification("Project has been deleted successfully", "success");
      } catch (e) {
        showNotification("Failed to delete project", "error");
      }
    }
  };

  // Handles opening edit modal for a project
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditModalOpened(true);
  };

  // Handles closing edit modal
  const handleCloseEditModal = () => {
    setEditModalOpened(false);
    setEditingProject(null);
  };

  // Show skeletons when filtering/searching and projects are being updated
  if (isInitialLoading && projects.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <ProjectSkeletons count={5} />
      </Box>
    );
  }

  // Show skeletons when filtering/searching and projects are being updated
  if (isInitialLoading && projects.length > 0) {
    return (
      <Box sx={{ py: 2 }}>
        <ProjectSkeletons count={5} />
      </Box>
    );
  }

  // Show "No projects found" only when not loading and no projects
  if (projects.length === 0 && !isInitialLoading) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          color: "text.secondary",
        }}
      >
        <Typography variant="h6" gutterBottom>
          No projects found
        </Typography>
        <Typography variant="body2">
          {searchQuery
            ? `No projects match "${searchQuery}"`
            : "Start by adding your first investment project"}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
          pt: 0.25,
        }}
      >
        <Stack spacing={2}>
          {projects.map((project) => {
            const isActive = now.isAfter(dayjs(project.startDate));
            const startDate = dayjs(project.startDate);
            const daysUntilStart = startDate.diff(now, "day");

            return (
              <StyledCard
                key={project.id}
                elevation={2}
                sx={{
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    elevation: 4,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      alignItems: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    <Box sx={{ flex: { sm: 2 }, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <BusinessIcon
                          sx={{ fontSize: 20, color: "primary.main" }}
                        />
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 500 }}
                        >
                          {project.name}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                          label={isActive ? "Active" : "Pending"}
                          color={isActive ? "success" : "warning"}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={`${project.annualPercent}% per year`}
                          icon={<PercentIcon />}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </Box>
                    </Box>

                    <Box sx={{ flex: { sm: 1 }, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <MoneyIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Investment Amount
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        $
                        {project.investedAmount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: { sm: 1 }, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <CalendarIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Start Date
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {startDate.format("DD.MM.YYYY")}
                      </Typography>
                      {!isActive && (
                        <Typography variant="caption" color="text.secondary">
                          {daysUntilStart > 0
                            ? `in ${daysUntilStart} days`
                            : "today"}
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                        flex: { sm: 0.5 },
                      }}
                    >
                      <Tooltip title="Edit project">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(project)}
                          sx={{
                            color: "primary.main",
                            "&:hover": {
                              backgroundColor: "primary.light",
                              color: "white",
                            },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete project">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(project.id)}
                          sx={{
                            color: "error.main",
                            "&:hover": {
                              backgroundColor: "error.light",
                              color: "white",
                            },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            );
          })}
          {/* Show loading skeletons when loading more projects */}
          {isLoading && hasMore && <ProjectSkeletons count={3} />}

          {/* Show loading skeletons at the bottom when loading more */}
          {isLoading && !hasMore && projects.length > 0 && (
            <ProjectSkeletons count={2} />
          )}

          {/* Intersection observer target for infinite scroll */}
          <div ref={observerRef} style={{ height: "20px" }} />
        </Stack>
      </Box>

      {editingProject && (
        <EditProjectModal
          opened={editModalOpened}
          onClose={handleCloseEditModal}
          project={editingProject}
        />
      )}
    </>
  );
};
