import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  TrendingUp as ProfitIcon,
  TrendingDown as LossIcon,
  Business as BusinessIcon,
  AccountBalance as CryptoIcon,
} from "@mui/icons-material";
import { Project } from "../../../entities/project/model/types";
import { RateType } from "../../../entities/project/types";
import {
  calculateProjectProfit,
  formatCurrency,
  formatPercentage,
  ProjectProfitData,
} from "../../../entities/project/utils/profitCalculator";

interface ProjectDetailsModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export const ProjectDetailsModal = ({
  project,
  open,
  onClose,
}: ProjectDetailsModalProps) => {
  const [profitData, setProfitData] = useState<ProjectProfitData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (project && open) {
      loadProfitData();
    }
  }, [project, open]);

  const loadProfitData = async () => {
    if (!project) return;

    setLoading(true);
    setError(null);

    try {
      const data = await calculateProjectProfit(project);
      setProfitData(data);
    } catch (err) {
      setError("Failed to calculate project performance");
    } finally {
      setLoading(false);
    }
  };

  if (!project) return null;

  const isProfit = profitData ? profitData.profit >= 0 : false;
  const isPending = profitData ? profitData.daysSinceInvestment < 0 : false;
  const isCrypto = project.rateType === RateType.Floating;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          elevation: 0,
          square: true,
          sx: (theme) => ({
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
                : "linear-gradient(135deg, rgb(30, 41, 59) 0%, rgb(15, 23, 42) 100%)",
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.4)",
          }),
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isCrypto ? (
              <CryptoIcon sx={{ fontSize: 24, color: "primary.main" }} />
            ) : (
              <BusinessIcon sx={{ fontSize: 24, color: "primary.main" }} />
            )}
            <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
              {project.name}
            </Typography>
            <Chip
              label={isCrypto ? "Crypto" : "Fixed Rate"}
              size="small"
              color={isCrypto ? "secondary" : "primary"}
              variant="outlined"
            />
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {profitData && !loading && (
          <Box>
            {/* Performance Summary */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: isPending
                  ? "rgba(255, 193, 7, 0.04)"
                  : isProfit
                    ? "rgba(76, 175, 80, 0.04)"
                    : "rgba(244, 67, 54, 0.04)",
                border: (theme) =>
                  `1px solid ${
                    isPending
                      ? "rgba(255, 193, 7, 0.12)"
                      : isProfit
                        ? "rgba(76, 175, 80, 0.12)"
                        : "rgba(244, 67, 54, 0.12)"
                  }`,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                {isPending ? (
                  <ProfitIcon sx={{ color: "warning.main" }} />
                ) : isProfit ? (
                  <ProfitIcon sx={{ color: "success.main" }} />
                ) : (
                  <LossIcon sx={{ color: "error.main" }} />
                )}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {isPending ? "Pending" : isProfit ? "Profit" : "Loss"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Current Value
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {formatCurrency(profitData.currentValue)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {isPending ? "Expected Profit/Loss" : "Profit/Loss"}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: isPending
                        ? "text.primary"
                        : isProfit
                          ? "success.main"
                          : "error.main",
                    }}
                  >
                    {isPending ? "$0.00" : formatCurrency(profitData.profit)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {isPending ? "Expected Return" : "Return"}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: isPending
                        ? "text.primary"
                        : isProfit
                          ? "success.main"
                          : "error.main",
                    }}
                  >
                    {isPending
                      ? "0.00%"
                      : formatPercentage(profitData.profitPercentage)}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Detailed Information Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Project Type</TableCell>
                    <TableCell>
                      {isCrypto
                        ? "Cryptocurrency Investment"
                        : "Fixed Rate Investment"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Investment Date
                    </TableCell>
                    <TableCell>
                      {new Date(project.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {isPending ? "Days Until Start" : "Days Since Investment"}
                    </TableCell>
                    <TableCell>
                      {isPending
                        ? `${Math.abs(profitData.daysSinceInvestment)} days`
                        : `${profitData.daysSinceInvestment} days`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Initial Investment
                    </TableCell>
                    <TableCell>
                      {formatCurrency(profitData.initialInvestment)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Current Value
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {formatCurrency(profitData.currentValue)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {isPending ? "Expected Total Return" : "Total Return"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: isPending
                          ? "text.primary"
                          : isProfit
                            ? "success.main"
                            : "error.main",
                      }}
                    >
                      {isPending
                        ? "$0.00 (0.00%)"
                        : `${formatCurrency(profitData.profit)} (${formatPercentage(profitData.profitPercentage)})`}
                    </TableCell>
                  </TableRow>
                  {profitData.annualizedReturn !== undefined && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {isPending
                          ? "Expected Annual Return"
                          : "Annualized Return"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: isPending
                            ? "text.primary"
                            : profitData.annualizedReturn >= 0
                              ? "success.main"
                              : "error.main",
                        }}
                      >
                        {formatPercentage(profitData.annualizedReturn)}
                      </TableCell>
                    </TableRow>
                  )}
                  {isCrypto && project.marketSymbol && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Market Symbol
                      </TableCell>
                      <TableCell>{project.marketSymbol}</TableCell>
                    </TableRow>
                  )}
                  {isCrypto && project.tokenAmount && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Token Amount
                      </TableCell>
                      <TableCell>
                        {project.tokenAmount.toLocaleString()} tokens
                      </TableCell>
                    </TableRow>
                  )}
                  {isCrypto && project.tokenPrice && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Purchase Price
                      </TableCell>
                      <TableCell>
                        {formatCurrency(project.tokenPrice)} per token
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
