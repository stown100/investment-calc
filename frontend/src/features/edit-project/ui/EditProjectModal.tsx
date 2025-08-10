import React from "react";
import { Modal, Title, Group, ThemeIcon, rem } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
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
    <Modal
      opened={opened}
      onClose={onClose}
      size="sm"
      centered
      transitionProps={{
        transition: "fade",
        duration: 200,
        timingFunction: "ease",
      }}
      styles={{
        inner: {
          position: "fixed",
          left: 0,
        },
      }}
      title={
        <Group gap="sm">
          <ThemeIcon size="lg" radius="md" variant="light" color="blue">
            <IconEdit style={{ width: rem(20), height: rem(20) }} />
          </ThemeIcon>
          <Title order={3}>Edit Project</Title>
        </Group>
      }
    >
      <EditProjectForm project={project} onSuccess={onClose} />
    </Modal>
  );
};
