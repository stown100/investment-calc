import React from "react";
import { Typography, Box, Stack, CardContent, Chip } from "@mui/material";
import { StyledCard } from "../../../shared/ui/StyledCard";
import {
  Business as BusinessIcon,
  Percent as PercentIcon,
  AttachMoney as MoneyIcon,
  PieChart as PieChartIcon,
} from "@mui/icons-material";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DashboardSummary, PortfolioChartData } from "../model/types";
import { GrowthChart } from "./GrowthChart";

interface DashboardProps {
  summary: DashboardSummary;
  portfolioData: PortfolioChartData[];
  growthData: { name: string; invested: number; projected: number }[];
  yearsToShow: number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export const Dashboard = ({
  summary,
  portfolioData,
  growthData,
}: DashboardProps) => {
  const pieData = portfolioData.map((item, index) => ({
    name: item.projectName,
    value: item.investedAmount,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Stack spacing={1}>
      {/* Summary Cards - Ultra Compact */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <StyledCard>
            <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                <MoneyIcon sx={{ fontSize: 12, color: "primary.main" }} />
                <Typography variant="caption" color="text.secondary">
                  Total Invested
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  whiteSpace: "nowrap",
                }}
              >
                $
                {summary.totalInvested.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>

        <Box sx={{ flex: 1 }}>
          <StyledCard>
            <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                <PercentIcon sx={{ fontSize: 12, color: "success.main" }} />
                <Typography variant="caption" color="text.secondary">
                  Annual Return
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "success.main",
                  whiteSpace: "nowrap",
                }}
              >
                {summary.averageAnnualPercent.toFixed(1)}%
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>

      {/* Charts Section */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="h6" component="h4" sx={{ fontWeight: 500, mb: 1 }}>
          Portfolio Overview
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Portfolio Distribution Pie Chart */}
          <StyledCard>
            <CardContent sx={{ p: 1.5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <PieChartIcon sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Portfolio Distribution
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const safeCx = cx || 0;
                      const safeCy = cy || 0;
                      const safeMidAngle = midAngle || 0;
                      const safeInnerRadius = innerRadius || 0;
                      const safeOuterRadius = outerRadius || 0;

                      const radius =
                        safeInnerRadius +
                        (safeOuterRadius - safeInnerRadius) * 0.8; // Ближе к кругу
                      const x =
                        safeCx + radius * Math.cos(-safeMidAngle * RADIAN);
                      const y =
                        safeCy + radius * Math.sin(-safeMidAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                          }}
                        >
                          {`${((percent || 0) * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const total = pieData.reduce(
                          (sum, item) => sum + item.value,
                          0
                        );
                        const percentage = ((data.value / total) * 100).toFixed(
                          1
                        );

                        return (
                          <Box
                            sx={{
                              backgroundColor: "background.paper",
                              border: `2px solid ${data.color}`,
                              borderRadius: 1,
                              p: 1,
                              boxShadow: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500, color: data.color }}
                            >
                              {data.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.primary" }}
                            >
                              $
                              {data.value.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}{" "}
                              ({percentage}%)
                            </Typography>
                          </Box>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>

          {/* Growth Line Chart */}

          <GrowthChart data={growthData} />
        </Box>

        {/* Project Count Badge */}
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Chip
            icon={<BusinessIcon />}
            label={`${summary.numberOfProjects} Project${
              summary.numberOfProjects !== 1 ? "s" : ""
            }`}
            color="primary"
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
    </Stack>
  );
};
