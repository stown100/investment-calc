import React, { useEffect, useRef, useCallback } from "react";
import { useProjectStore } from "../model/store";
import { Typography, Box, Stack } from "@mui/material";
import { useNotification } from "../../../shared/context/NotificationContext";
import { ProjectSkeletons } from "./ProjectSkeleton";
import { ProjectCard } from "./ProjectCard";

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
  const { showNotification } = useNotification();

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
    [
      hasMore,
      isLoading,
      isInitialLoading,
      loadMoreProjects,
      showNotification,
      projects.length,
    ]
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
          overflowX: "visible",
          p: 0.375,
        }}
      >
        <Stack spacing={2}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={async (id) => {
                try {
                  await removeProject(id);
                  showNotification(
                    "Project has been deleted successfully",
                    "success"
                  );
                } catch (e) {
                  showNotification("Failed to delete project", "error");
                }
              }}
            />
          ))}
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
    </>
  );
};
