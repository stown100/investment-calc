import React from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  Typography 
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { EditProjectForm } from "./EditProjectForm";
import { Project } from "../../../entities/project/model/types";

interface EditProjectModalProps {
  opened: boolean;
  onClose: () => void;
  project: Project;
}

// Modal dialog for editing an existing project
export const EditProjectModal = ({ opened, onClose, project }: EditProjectModalProps) => {
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
          <EditIcon sx={{ fontSize: 24, color: 'primary.main' }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
            Edit Project
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <EditProjectForm project={project} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};
