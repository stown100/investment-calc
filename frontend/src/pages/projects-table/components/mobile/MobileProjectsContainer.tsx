import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Project } from "../../../../entities/project/model/types";
import { MobileProjectCard } from "./MobileProjectCard";
import { MobileProjectSkeleton } from "./MobileProjectSkeleton";

interface MobileProjectsContainerProps {
  projects: Project[];
  tableLoading: boolean;
  togglingProjects: Set<string>;
  onToggleSummary: (id: string, includeInSummary: boolean) => void;
  onViewProject: (project: Project) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  getProjectStatus: (project: Project) => {
    status: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  };
  getProjectTypeIcon: (project: Project) => React.ReactElement;
}

export const MobileProjectsContainer: React.FC<
  MobileProjectsContainerProps
> = ({
  projects,
  tableLoading,
  togglingProjects,
  onToggleSummary,
  onViewProject,
  onRefresh,
  onLoadMore,
  hasMore,
  isLoadingMore,
  getProjectStatus,
  getProjectTypeIcon,
}) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tableLoading) return;
    const targetEl = sentinelRef.current;
    if (!targetEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
        }
      },
      { root: null, threshold: 0.1 }
    );
    observer.observe(targetEl);
    return () => observer.disconnect();
  }, [projects.length, tableLoading, hasMore, isLoadingMore, onLoadMore]);

  return (
    <Box>
      {tableLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <MobileProjectSkeleton key={index} />
          ))
        : projects.map((project) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              isToggling={togglingProjects.has(project.id)}
              onToggleSummary={onToggleSummary}
              onViewProject={onViewProject}
              onRefresh={onRefresh}
              getProjectStatus={getProjectStatus}
              getProjectTypeIcon={getProjectTypeIcon}
            />
          ))}
      {/* Infinite scroll sentinel */}
      {!tableLoading && <Box ref={sentinelRef} sx={{ height: 1 }} />}
    </Box>
  );
};
