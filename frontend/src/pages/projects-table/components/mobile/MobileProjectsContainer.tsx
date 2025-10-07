import React from "react";
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
  getProjectStatus,
  getProjectTypeIcon,
}) => {
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
              getProjectStatus={getProjectStatus}
              getProjectTypeIcon={getProjectTypeIcon}
            />
          ))}
    </Box>
  );
};
