import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Percent as PercentIcon,
  ShowChart as ChartIcon,
  TableChart as TableIcon,
} from "@mui/icons-material";
import { CalculationResult, YearlyCalculation } from "../model/types";
import { StyledCard } from "../../../shared/ui/StyledCard";

interface UnifiedTableProps {
  periodResults: CalculationResult[];
  yearlyData: YearlyCalculation[];
  yearsToShow: number;
  onYearsChange: (value: string | null) => void;
}

export const UnifiedTable = ({
  periodResults,
  yearlyData,
  yearsToShow,
}: UnifiedTableProps) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledCard elevation={2} sx={{ p: 1.5, borderRadius: 2 }}>
      <Stack spacing={1}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalculateIcon sx={{ fontSize: 16, color: "primary.main" }} />
          <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
            Investment Analysis ({yearsToShow} Years)
          </Typography>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            minHeight: 40,
            "& .MuiTab-root": {
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&.Mui-focusVisible": {
                outline: "none",
                boxShadow: "none",
              },
            },
          }}
        >
          <Tab
            icon={<ChartIcon sx={{ fontSize: 14 }} />}
            label="Period Returns"
            sx={{
              minHeight: 40,
              textTransform: "none",
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&.Mui-focusVisible": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          />
          <Tab
            icon={<TableIcon sx={{ fontSize: 14 }} />}
            label="Yearly Breakdown"
            sx={{
              minHeight: 40,
              textTransform: "none",
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&.Mui-focusVisible": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          />
        </Tabs>

        <Box sx={{ pt: 1 }}>
          {tabValue === 0 && (
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ width: "40%", backgroundColor: "background.paper" }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CalendarIcon
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Period
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{ width: "30%", backgroundColor: "background.paper" }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PercentIcon
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Return %
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{ width: "30%", backgroundColor: "background.paper" }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <MoneyIcon
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Return Amount
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {periodResults.map((result) => (
                    <TableRow key={result.period} hover>
                      <TableCell>
                        <Chip
                          label={result.period}
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {result.returnPercentage?.toFixed(2) || "0.00"}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color:
                              (result.returnAmount || 0) >= 0
                                ? "success.main"
                                : "error.main",
                          }}
                        >
                          $
                          {(result.returnAmount || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tabValue === 1 && (
            <Box>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CalendarIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Year
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <MoneyIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Total Value
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <TrendingUpIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Growth
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PercentIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Annual Return
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {yearlyData.map((yearData) => (
                      <TableRow key={yearData.year} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Year {yearData.year}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            $
                            {(yearData.totalValue || 0).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color:
                                yearData.growth >= 0
                                  ? "success.main"
                                  : "error.main",
                            }}
                          >
                            {yearData.growth >= 0 ? "+" : ""}$
                            {(yearData.growth || 0).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color:
                                yearData.annualReturn >= 0
                                  ? "success.main"
                                  : "error.main",
                            }}
                          >
                            {yearData.annualReturn >= 0 ? "+" : ""}
                            {(yearData.annualReturn || 0).toFixed(2)}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Stack>
    </StyledCard>
  );
};
