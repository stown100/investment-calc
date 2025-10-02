import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Add as AddIcon,
  Business as BusinessIcon,
  AccountBalance as CryptoIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";

interface AddProjectDropdownProps {
  onAddRegularProject: () => void;
  onAddCryptoProject: () => void;
}

export const AddProjectDropdown = ({
  onAddRegularProject,
  onAddCryptoProject,
}: AddProjectDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRegularProject = () => {
    onAddRegularProject();
    handleClose();
  };

  const handleCryptoProject = () => {
    onAddCryptoProject();
    handleClose();
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        endIcon={<ArrowDownIcon />}
        onClick={handleClick}
        size="small"
        sx={{
          borderRadius: 2,
          textTransform: "none",
          boxShadow: 2,
        }}
      >
        Add Project
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              minWidth: 200,
              boxShadow: 3,
            },
          },
        }}
      >
        <MenuItem onClick={handleRegularProject}>
          <ListItemIcon>
            <BusinessIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Regular Project"
            secondary="Traditional investment project"
          />
        </MenuItem>
        <MenuItem onClick={handleCryptoProject}>
          <ListItemIcon>
            <CryptoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Crypto Project"
            secondary="Cryptocurrency investment"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};
