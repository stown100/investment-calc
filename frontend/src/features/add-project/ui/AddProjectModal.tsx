import React from "react";
import { Modal, Title, Group, ThemeIcon, rem } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import { AddProjectForm } from "./AddProjectForm";

interface AddProjectModalProps {
  opened: boolean;
  onClose: () => void;
}

// Modal dialog for adding a new project
export const AddProjectModal = ({ opened, onClose }: AddProjectModalProps) => {
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
          <ThemeIcon size="lg" radius="md" variant="light">
            <IconBuilding style={{ width: rem(20), height: rem(20) }} />
          </ThemeIcon>
          <Title order={3}>Add New Project</Title>
        </Group>
      }
    >
      <AddProjectForm onSuccess={onClose} />
    </Modal>
  );
};
