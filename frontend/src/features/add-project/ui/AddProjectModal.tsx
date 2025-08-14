import React from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  Typography 
} from "@mui/material";
import { Business as BusinessIcon } from "@mui/icons-material";
import { AddProjectForm } from "./AddProjectForm";

interface AddProjectModalProps {
  opened: boolean;
  onClose: () => void;
}

// Modal dialog for adding a new project
export const AddProjectModal = ({ opened, onClose }: AddProjectModalProps) => {
  return (
    <Dialog
      open={opened}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon sx={{ fontSize: 24, color: 'primary.main' }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
            Add New Project
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <AddProjectForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};
