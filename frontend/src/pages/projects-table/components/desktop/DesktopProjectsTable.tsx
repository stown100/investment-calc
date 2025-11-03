import React, { useEffect, useRef, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, FormControlLabel, Chip, Skeleton, Typography } from "@mui/material";
// removed: MoreHorizIcon - using ProjectActionsMenu
import { Project } from "../../../../entities/project/model/types";
import { RateType } from "../../../../entities/project/types";
import { StyledCard } from "../../../../shared/ui/StyledCard";
import {
  formatCurrency,
  formatPercentage,
} from "../../../../entities/project/utils/profitCalculator";
import { ConfirmDialog } from "../../../../shared/ui";
import { EditProjectModal } from "../../../../features/edit-project/ui/EditProjectModal";
import { removeProject } from "../../../../entities/project/api/projectApi";
import { ProjectActionsMenu } from "../../../../entities/project/ui/ProjectActionsMenu";

interface DesktopProjectsTableProps {
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

export const DesktopProjectsTable: React.FC<DesktopProjectsTableProps> = ({
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
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [actionsHoverRowId, setActionsHoverRowId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (tableLoading) return;
    const rootEl = containerRef.current;
    const targetEl = sentinelRef.current;
    if (!rootEl || !targetEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
        }
      },
      { root: rootEl, threshold: 0.1 }
    );
    observer.observe(targetEl);
    return () => observer.disconnect();
  }, [projects.length, tableLoading, hasMore, isLoadingMore, onLoadMore]);

  return (
    <StyledCard elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "70vh" }} ref={containerRef}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Project
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Investment
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Return %
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Start Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Include in Summary
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgb(30, 41, 59)"
                      : "rgb(248, 250, 252)",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableLoading
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array.from({ length: 8 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex} sx={{ py: 0.5 }}>
                        <Skeleton variant="text" width="90%" height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : projects.map((project) => {
                  const { status, color } = getProjectStatus(project);
                  const isToggling = togglingProjects.has(project.id);

                  return (
                    <TableRow
                      key={project.id}
                      hover
                      sx={{
                        "& .MuiTableCell-root": { py: 0.5 },
                        ...(actionsHoverRowId === project.id
                          ? { "&.MuiTableRow-hover:hover": { backgroundColor: "transparent" } }
                          : {}),
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {getProjectTypeIcon(project)}
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, fontSize: "0.8rem" }}
                          >
                            {project.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            project.rateType === RateType.Floating
                              ? "Crypto"
                              : "Fixed"
                          }
                          size="small"
                          color={
                            project.rateType === RateType.Floating
                              ? "secondary"
                              : "primary"
                          }
                          variant="outlined"
                          sx={{ fontSize: "0.7rem", height: 20 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={status}
                          size="small"
                          color={color}
                          variant="filled"
                          sx={{ fontSize: "0.7rem", height: 20 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, fontSize: "0.8rem" }}
                        >
                          {formatCurrency(project.investedAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                          {project.annualPercent
                            ? formatPercentage(project.annualPercent)
                            : "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                          {new Date(project.startDate).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={project.includeInSummary !== false}
                              onChange={(e) =>
                                onToggleSummary(project.id, e.target.checked)
                              }
                              disabled={isToggling}
                              size="small"
                            />
                          }
                          label=""
                          sx={{ m: 0 }}
                        />
                      </TableCell>
                      <TableCell>
                        <ProjectActionsMenu
                          project={project}
                          onView={(p) => onViewProject(p)}
                          onEdit={(p) => setEditProject(p)}
                          onDelete={(p) => setDeleteProject(p)}
                          iconSize={18}
                          buttonPadding={0.5}
                          onHoverChange={(hovering) =>
                            setActionsHoverRowId(hovering ? project.id : null)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            {/* Infinite scroll sentinel */}
            {!tableLoading && (
              <TableRow ref={sentinelRef}>
                <TableCell colSpan={8} sx={{ py: 1 }}>
                  {isLoadingMore && (
                    <Skeleton variant="text" width="100%" height={20} />
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      

      {editProject && (
        <EditProjectModal
          opened={Boolean(editProject)}
          onClose={() => {
            setEditProject(null);
          }}
          onSuccess={() => {
            setEditProject(null);
            onRefresh();
          }}
          project={editProject}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteProject)}
        onClose={() => setDeleteProject(null)}
        onConfirm={async () => {
          if (deleteProject) {
            await removeProject(deleteProject.id);
            setDeleteProject(null);
            onRefresh();
          }
        }}
        title="Delete Project"
        message={
          <>
            Are you sure you want to delete <strong>{deleteProject?.name}</strong>? This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </StyledCard>
  );
};
