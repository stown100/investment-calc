import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components for enhanced visual appeal
export const StyledCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
      : "linear-gradient(135deg, rgb(30, 41, 59) 0%, rgb(15, 23, 42) 100%)",
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 1px 3px rgba(0, 0, 0, 0.1)"
      : "0 1px 3px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      theme.palette.mode === "light"
        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
        : "0 4px 12px rgba(0, 0, 0, 0.4)",
  },
}));

// Variant for success/green cards
export const SuccessCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
      : "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
  borderRadius: 16,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 4px 20px rgba(34, 197, 94, 0.1)"
      : "0 4px 20px rgba(34, 197, 94, 0.2)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  border:
    theme.palette.mode === "light"
      ? "1px solid rgba(34, 197, 94, 0.2)"
      : "1px solid rgba(34, 197, 94, 0.3)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      theme.palette.mode === "light"
        ? "0 8px 25px rgba(34, 197, 94, 0.15)"
        : "0 8px 25px rgba(34, 197, 94, 0.25)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(45deg, rgba(34, 197, 94, 0.03) 0%, rgba(34, 197, 94, 0.01) 100%)"
        : "linear-gradient(45deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)",
    pointerEvents: "none",
  },
}));

// Platform card with color variants
export const PlatformCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "$color",
})<{ $color: string }>(({ theme, $color }) => ({
  background:
    theme.palette.mode === "light"
      ? `linear-gradient(135deg, ${$color}25 0%, ${$color}15 100%)`
      : `linear-gradient(135deg, ${$color}20 0%, ${$color}10 100%)`,
  border: `1px solid ${$color}40`,
  borderRadius: 8,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      theme.palette.mode === "light"
        ? `0 4px 12px ${$color}30`
        : `0 4px 12px ${$color}40`,
  },
}));
