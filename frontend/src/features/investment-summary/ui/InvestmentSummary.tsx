import React from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import { 
  Paper, 
  Box, 
  Typography, 
  Stack 
} from "@mui/material";
import { 
  Business as BusinessIcon, 
  Percent as PercentIcon, 
  AttachMoney as MoneyIcon 
} from "@mui/icons-material";

// Displays a summary of all investments
export const InvestmentSummary = () => {
  const projects = useProjectStore((s) => s.projects);
  const currentDate = new Date();

  // Total invested amount
  const totalInvested = projects.reduce(
    (sum, project) => sum + project.investedAmount,
    0
  );
  // Invested amount in active projects
  const activeInvested = projects.reduce((sum, project) => {
    const startDate = new Date(project.startDate);
    return currentDate >= startDate ? sum + project.investedAmount : sum;
  }, 0);

  // Average annual percent
  const averagePercent =
    projects.length > 0
      ? projects.reduce((sum, project) => sum + project.annualPercent, 0) /
        projects.length
      : 0;

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Paper elevation={1} sx={{ p: 1.5, borderRadius: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BusinessIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Total Projects:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 0.5 }}>
              {projects.length}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PercentIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Average Percent:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 0.5 }}>
              {averagePercent.toFixed(2)}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MoneyIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Total Investment:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 0.5, whiteSpace: 'nowrap' }}>
              ${totalInvested.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MoneyIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Active Investments:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 0.5, whiteSpace: 'nowrap' }}>
              ${activeInvested.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
};
