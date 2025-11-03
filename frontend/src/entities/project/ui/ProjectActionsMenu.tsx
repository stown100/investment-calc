import React, { useEffect, useId, useRef, useState } from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Project } from "../model/types";

interface ProjectActionsMenuProps {
  project: Project;
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  iconSize?: number;
  buttonPadding?: number;
  openOnHover?: boolean;
  onHoverChange?: (hovering: boolean) => void;
}

export const ProjectActionsMenu: React.FC<ProjectActionsMenuProps> = ({
  project,
  onView,
  onEdit,
  onDelete,
  iconSize = 18,
  buttonPadding = 0.5,
  openOnHover = false,
  onHoverChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const closeTimerRef = useRef<number | null>(null);
  const [isTriggerHovered, setIsTriggerHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRootRef = useRef<HTMLElement | null>(null);
  const paperId = useId();

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    if (open) setAnchorEl(null);
    else setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      if (!isTriggerHovered && !isMenuHovered) {
        handleClose();
        onHoverChange?.(false);
      }
    }, 60);
  };

  useEffect(() => {
    if (!openOnHover || !open) return;
    const onDocMove = (e: MouseEvent) => {
      const t = e.target as Node | null;
      const inButton = t ? (buttonRef.current?.contains(t) ?? false) : false;
      const paperEl = document.getElementById(paperId);
      if (paperEl) menuRootRef.current = paperEl as HTMLElement;
      const inMenu = t ? (menuRootRef.current?.contains(t) ?? false) : false;
      if (!inButton && !inMenu) {
        handleClose();
        onHoverChange?.(false);
      }
    };
    document.addEventListener("mousemove", onDocMove);
    return () => document.removeEventListener("mousemove", onDocMove);
  }, [openOnHover, open, paperId]);

  const handleView = () => {
    onView(project);
    handleClose();
  };

  const handleEdit = () => {
    onEdit(project);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(project);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Actions">
        <IconButton
          ref={buttonRef}
          onClick={handleToggle}
          onMouseEnter={(e) => {
            if (openOnHover) {
              setIsTriggerHovered(true);
              setAnchorEl(e.currentTarget);
              onHoverChange?.(true);
            }
          }}
          onMouseLeave={() => {
            if (openOnHover) {
              setIsTriggerHovered(false);
              scheduleClose();
            }
          }}
          sx={{ p: buttonPadding }}
        >
          <MoreHorizIcon sx={{ fontSize: iconSize }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            dense: true,
            onMouseEnter: () => {
              if (openOnHover) {
                setIsMenuHovered(true);
                onHoverChange?.(true);
              }
            },
            onMouseLeave: () => {
              if (openOnHover) {
                setIsMenuHovered(false);
                scheduleClose();
              }
            },
          },
          paper: {
            id: paperId,
            onMouseEnter: () => {
              if (openOnHover) {
                setIsMenuHovered(true);
                onHoverChange?.(true);
              }
            },
            onMouseLeave: () => {
              if (openOnHover) {
                setIsMenuHovered(false);
                scheduleClose();
              }
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
