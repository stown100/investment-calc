import React, { useState } from "react";
import {
  Title,
  Grid,
  Paper,
  Group,
  ThemeIcon,
  rem,
  Button,
  Box,
  Stack,
} from "@mantine/core";
import { ProjectList } from "../../entities/project/ui/ProjectList";
import { Calculator } from "../../features/calculator/ui/Calculator";
import { InvestmentSummary } from "../../features/investment-summary/ui/InvestmentSummary";
import { IconBuilding, IconPlus } from "@tabler/icons-react";
import { AddProjectModal } from "../../features/add-project/ui/AddProjectModal";

// Main page of the application
export const HomePage = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Box w="100vw" px={12} py={8}>
      <Paper shadow="sm" p="xs" mb="sm" withBorder>
        <Group gap="xs">
          <ThemeIcon size="sm" radius="sm" variant="light">
            <IconBuilding style={{ width: rem(14), height: rem(14) }} />
          </ThemeIcon>
          <Title order={3}>Investment Projects</Title>
        </Group>
      </Paper>

      <InvestmentSummary />

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Group justify="space-between" mb="xs">
            <Title order={4}>Project List</Title>
            <Button
              leftSection={
                <IconPlus style={{ width: rem(12), height: rem(12) }} />
              }
              onClick={() => setModalOpened(true)}
              size="xs"
            >
              Add Project
            </Button>
          </Group>
          <ProjectList />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Calculator />
        </Grid.Col>
      </Grid>

      <AddProjectModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </Box>
  );
};
