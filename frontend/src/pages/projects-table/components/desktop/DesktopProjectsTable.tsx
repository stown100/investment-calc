import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  Tooltip,
  Skeleton,
  Typography,
} from "@mui/material";
import { Visibility as ViewIcon } from "@mui/icons-material";
import { Project } from "../../../../entities/project/model/types";
import { RateType } from "../../../../entities/project/types";
import { StyledCard } from "../../../../shared/ui/StyledCard";
import {
  formatCurrency,
  formatPercentage,
} from "../../../../entities/project/utils/profitCalculator";

interface DesktopProjectsTableProps {
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

export const DesktopProjectsTable: React.FC<DesktopProjectsTableProps> = ({
  projects,
  tableLoading,
  togglingProjects,
  onToggleSummary,
  onViewProject,
  getProjectStatus,
  getProjectTypeIcon,
}) => {
  return (
    <StyledCard elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "70vh" }}>
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
                      sx={{ "& .MuiTableCell-root": { py: 0.5 } }}
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
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => onViewProject(project)}
                            sx={{ p: 0.5 }}
                          >
                            <ViewIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledCard>
  );
};
