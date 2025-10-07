import React from "react";
import {
  Box,
  Typography,
  CardContent,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility as ViewIcon } from "@mui/icons-material";
import { Project } from "../../../../entities/project/model/types";
import { RateType } from "../../../../entities/project/types";
import { StyledCard } from "../../../../shared/ui/StyledCard";
import {
  formatCurrency,
  formatPercentage,
} from "../../../../entities/project/utils/profitCalculator";

interface MobileProjectCardProps {
  project: Project;
  isToggling: boolean;
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

export const MobileProjectCard: React.FC<MobileProjectCardProps> = ({
  project,
  isToggling,
  onToggleSummary,
  onViewProject,
  getProjectStatus,
  getProjectTypeIcon,
}) => {
  const { status, color } = getProjectStatus(project);

  return (
    <StyledCard elevation={1} sx={{ mb: 1, borderRadius: 1 }}>
      <CardContent sx={{ p: 1 }}>
        {/* Header with project name and type */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flex: 1,
              minWidth: 0,
            }}
          >
            {getProjectTypeIcon(project)}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {project.name}
            </Typography>
          </Box>
          <Chip
            label={project.rateType === RateType.Floating ? "Crypto" : "Fixed"}
            size="small"
            color={
              project.rateType === RateType.Floating ? "secondary" : "primary"
            }
            variant="outlined"
            sx={{ fontSize: "0.6rem", height: 16 }}
          />
        </Box>

        {/* Status and Investment */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            label={status}
            size="small"
            color={color}
            variant="filled"
            sx={{ fontSize: "0.6rem", height: 16 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: "0.9rem" }}
          >
            {formatCurrency(project.investedAmount)}
          </Typography>
        </Box>

        {/* Return percentage and start date */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.65rem" }}
            >
              Return %
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.75rem" }}
            >
              {project.annualPercent
                ? formatPercentage(project.annualPercent)
                : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.65rem" }}
            >
              Start Date
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.75rem" }}
            >
              {new Date(project.startDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Actions row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={project.includeInSummary !== false}
                onChange={(e) => onToggleSummary(project.id, e.target.checked)}
                disabled={isToggling}
                size="small"
              />
            }
            label={
              <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
                Include in Summary
              </Typography>
            }
            sx={{ m: 0 }}
          />
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => onViewProject(project)}
              sx={{ p: 0.2 }}
            >
              <ViewIcon sx={{ fontSize: 12 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </StyledCard>
  );
};
