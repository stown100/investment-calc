import React, { useState } from "react";
import {
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
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
import { StyledCard } from "../../../shared/ui/StyledCard";
import { ConfirmDialog } from "../../../shared/ui";
import { EditProjectModal } from "../../../features/edit-project/ui/EditProjectModal";
import { ProjectDetailsModal } from "../../../features/project-details/ui/ProjectDetailsModal";
import { RateType } from "../types";
import { Project } from "../model/types";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const now = dayjs();
  const isActive = now.isAfter(dayjs(project.startDate));
  const startDate = dayjs(project.startDate);
  const daysUntilStart = startDate.diff(now, "day");

  return (
    <>
      <StyledCard
        elevation={2}
        sx={{
          borderRadius: 2,
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            elevation: 4,
          },
        }}
        onClick={() => setDetailsOpen(true)}
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
                <BusinessIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600 }}
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
                {project.rateType === RateType.Fixed ? (
                  <Chip
                    label={`${project.annualPercent}% per year`}
                    icon={<PercentIcon />}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                ) : (
                  <Chip
                    label="Floating rate"
                    icon={<PercentIcon />}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                )}
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
                <MoneyIcon sx={{ fontSize: 16, color: "text.secondary" }} />
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
                <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Start Date
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {startDate.format("DD.MM.YYYY")}
              </Typography>
              {!isActive && (
                <Typography variant="caption" color="text.secondary">
                  {daysUntilStart > 0 ? `in ${daysUntilStart} days` : "today"}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditOpen(true);
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmOpen(true);
                  }}
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

      <ProjectDetailsModal
        project={project}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />

      <EditProjectModal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        project={project}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete(project.id);
          setConfirmOpen(false);
        }}
        title="Delete Project"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong style={{ color: "white" }}>{project.name}</strong>? This
            action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};
