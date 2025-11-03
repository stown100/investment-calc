import React from "react";
import { useProjectsSummaryStore } from "../../../../entities/project/model/summaryStore";
import { Box, Skeleton } from "@mui/material";
import { StyledCard } from "../../../../shared/ui/StyledCard";
import { Typography } from "@mui/material";
import {
  formatCurrency,
  formatPercentage,
} from "../../../../entities/project/utils/profitCalculator";

export const SummaryCards: React.FC = () => {
  const summary = useProjectsSummaryStore((s) => s.summary);

  return (
    <>
      {summary ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 1.5,
            mb: 3,
          }}
        >
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {summary.totalProjects}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Total Projects
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="success.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatCurrency(summary.totalInvestment)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Total Investment
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="info.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatPercentage(summary.averagePercent)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Average Return
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="warning.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatCurrency(summary.activeInvestments)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Active Investments
            </Typography>
          </StyledCard>
          <StyledCard
            elevation={1}
            sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
          >
            <Typography
              variant="h6"
              color="success.main"
              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
            >
              {formatCurrency(summary.totalProfit || 0)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Total Profit
            </Typography>
          </StyledCard>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 1.5,
            mb: 3,
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <StyledCard
              key={index}
              elevation={1}
              sx={{ p: 1.5, textAlign: "center", borderRadius: 2 }}
            >
              <Skeleton
                variant="text"
                width="60%"
                height={32}
                sx={{ mx: "auto", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ mx: "auto" }}
              />
            </StyledCard>
          ))}
        </Box>
      )}
    </>
  );
};
