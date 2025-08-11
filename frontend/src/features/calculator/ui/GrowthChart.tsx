import React from "react";
import { Box, Typography, Paper, Card, CardContent, useTheme } from "@mui/material";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GrowthChartProps {
  data: { name: string; invested: number; projected: number }[];
  title?: string;
}

export const GrowthChart = ({
  data,
  title = "Growth Over Time",
}: GrowthChartProps) => {
  const theme = useTheme();
  
  // Цвета для графика в стиле примера
  const colors = {
    invested: {
      primary: "hsl(221 83% 53%)", // Синий
      gradient: "url(#investedGradient)",
    },
    projected: {
      primary: "hsl(142 76% 48%)", // Зеленый
      gradient: "url(#projectedGradient)",
    },
  };

  // Адаптивные цвета для осей в зависимости от темы
  const axisColor = theme.palette.mode === 'dark' 
    ? 'hsl(240 5.9% 80%)'  // Светлый для темной темы
    : 'hsl(240 5.9% 20%)'; // Темный для светлой темы

  const gridColor = theme.palette.mode === 'dark'
    ? 'hsl(240 5.9% 70%)'  // Светлый для темной темы
    : 'hsl(240 5.9% 30%)'; // Темный для светлой темы

  return (
    <Card elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <CardContent sx={{ p: 0 }}>
        {/* Заголовок с иконкой */}
        <Box
          sx={{
            p: 2,
            pb: 1,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TrendingUpIcon sx={{ fontSize: 20, color: "primary.main" }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 400, 
                fontSize: 14,
                color: theme.palette.mode === 'dark' ? 'white' : 'text.primary'
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* График */}
        <Box sx={{ p: 2, pt: 1 }}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <defs>
                {/* Градиент для Invested */}
                <linearGradient
                  id="investedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(221 83% 53%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(221 83% 53%)"
                    stopOpacity={0}
                  />
                </linearGradient>

                {/* Градиент для Projected */}
                <linearGradient
                  id="projectedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(142 76% 48%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(142 76% 48%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              {/* Сетка */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                opacity={0.7}
                vertical={false}
              />

              {/* Оси */}
              <XAxis
                dataKey="name"
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: axisColor, fontWeight: 500 }}
              />

              <YAxis
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: axisColor, fontWeight: 500 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />

              {/* Tooltip */}
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Paper
                        elevation={8}
                        sx={{
                          p: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 2,
                          background: theme.palette.mode === 'dark' 
                            ? 'rgba(30, 41, 59, 0.95)'
                            : 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ 
                            fontWeight: 600, 
                            mb: 1.5, 
                            color: theme.palette.mode === 'dark' ? 'white' : '#1e293b'
                          }}
                        >
                          {label}
                        </Typography>
                        {payload.map((entry: any, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                background:
                                  entry.dataKey === "invested"
                                    ? colors.invested.primary
                                    : colors.projected.primary,
                                border: "2px solid white",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ 
                                fontWeight: 500, 
                                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569'
                              }}
                            >
                              {entry.name}:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ 
                                fontWeight: 600, 
                                color: theme.palette.mode === 'dark' ? 'white' : '#1e293b'
                              }}
                            >
                              $
                              {entry.value.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </Typography>
                          </Box>
                        ))}
                      </Paper>
                    );
                  }
                  return null;
                }}
              />

              {/* Области с заливкой */}
              <Area
                type="monotone"
                dataKey="invested"
                stroke={colors.invested.primary}
                strokeWidth={2}
                fill={colors.invested.gradient}
                fillOpacity={0.6}
                name="Invested"
                dot={{
                  fill: colors.invested.primary,
                  stroke: colors.invested.primary,
                  strokeWidth: 2,
                  r: 4,
                  fillOpacity: 0.6,
                }}
              />

              <Area
                type="monotone"
                dataKey="projected"
                stroke={colors.projected.primary}
                strokeWidth={2}
                fill={colors.projected.gradient}
                fillOpacity={0.6}
                name="Projected"
                dot={{
                  fill: colors.projected.primary,
                  stroke: colors.projected.primary,
                  strokeWidth: 2,
                  r: 4,
                  fillOpacity: 0.6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
