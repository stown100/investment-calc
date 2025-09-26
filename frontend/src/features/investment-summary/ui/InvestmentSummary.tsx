import React, { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import {
  Business as BusinessIcon,
  Percent as PercentIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { StyledCard } from "../../../shared/ui/StyledCard";
import { useProjectsSummaryStore } from "../../../entities/project/model/summaryStore";

// Displays a summary of all investments
export const InvestmentSummary = () => {
  const summary = useProjectsSummaryStore((s) => s.summary);
  const fetchSummary = useProjectsSummaryStore((s) => s.fetchSummary);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <StyledCard elevation={1} sx={{ p: 1.5, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BusinessIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Total Projects:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 0.5 }}>
              {summary ? summary.totalProjects : "—"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PercentIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Average Percent:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 0.5 }}>
              {summary ? summary.averagePercent.toFixed(2) : "—"}%
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MoneyIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Total Investment:
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, ml: 0.5, whiteSpace: "nowrap" }}
            >
              $
              {summary
                ? summary.totalInvestment.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                : "—"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MoneyIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Active Investments:
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, ml: 0.5, whiteSpace: "nowrap" }}
            >
              $
              {summary
                ? summary.activeInvestments.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                : "—"}
            </Typography>
          </Box>
        </Box>
      </StyledCard>
    </Stack>
  );
};
