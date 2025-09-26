import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { WarningAmber as WarningIcon } from "@mui/icons-material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: React.ReactNode | string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon sx={{ color: "error.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading} sx={{ borderRadius: 2 }}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          sx={{ borderRadius: 2 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
