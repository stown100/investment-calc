import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import { AccountBalance as CryptoIcon } from "@mui/icons-material";
import { AddCryptoProjectForm } from "./AddCryptoProjectForm";

interface AddCryptoProjectModalProps {
  opened: boolean;
  onClose: () => void;
}

// Modal dialog for adding a new crypto project
export const AddCryptoProjectModal = ({
  opened,
  onClose,
}: AddCryptoProjectModalProps) => {
  return (
    <Dialog
      open={opened}
      onClose={onClose}
      maxWidth="sm"
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
          <CryptoIcon sx={{ fontSize: 24, color: "primary.main" }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
            Add New Crypto Project
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <AddCryptoProjectForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};
