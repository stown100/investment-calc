import React from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import {
  TextInput,
  NumberInput,
  Button,
  Group,
  Paper,
  Stack,
  rem,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconBuilding,
  IconPercentage,
  IconCalendar,
  IconCoin,
  IconEdit,
} from "@tabler/icons-react";
import { useState } from "react";
import { Project } from "../../../entities/project/model/types";
import { notifications } from "@mantine/notifications";

interface EditProjectFormValues {
  name: string;
  annualPercent: number;
  startDate: string;
  investedAmount: number;
}

interface EditProjectFormProps {
  project: Project;
  onSuccess?: () => void;
}

// Form for editing an existing investment project
export const EditProjectForm = ({ project, onSuccess }: EditProjectFormProps) => {
  const updateProject = useProjectStore((s) => s.updateProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<EditProjectFormValues>({
    initialValues: {
      name: project.name,
      annualPercent: project.annualPercent,
      startDate: project.startDate,
      investedAmount: project.investedAmount,
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      annualPercent: (value) =>
        value <= 0 ? "Percent must be positive" : null,
      investedAmount: (value) =>
        value <= 0 ? "Amount must be positive" : null,
    },
  });

  // Handles form submission and updates the project
  const handleSubmit = async (values: EditProjectFormValues) => {
    setLoading(true);
    setError(null);
    
    const updatedProject: Project = {
      ...project,
      name: values.name,
      annualPercent: values.annualPercent,
      startDate: values.startDate,
      investedAmount: values.investedAmount,
    };
    
    try {
      await updateProject(updatedProject);
      notifications.show({
        title: "Success!",
        message: "Project has been updated successfully",
        color: "green",
        icon: <IconEdit size={16} />,
      });
      onSuccess?.();
    } catch (e) {
      const errorMessage = 'Failed to update project';
      setError(errorMessage);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconEdit size={16} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <Title order={4} mb="md">
        Edit Project
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Project Name"
            placeholder="Enter project name"
            leftSection={
              <IconBuilding
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            description="For example: 18511 Joy Rd, Detroit, MI 48228, USA"
            {...form.getInputProps("name")}
          />

          <NumberInput
            label="Annual Percent"
            placeholder="Enter percent"
            leftSection={
              <IconPercentage
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            description="Annual yield percent of the project"
            min={0}
            decimalScale={2}
            suffix="%"
            {...form.getInputProps("annualPercent")}
          />

          <DateInput
            label="Profit Start Date"
            placeholder="Select date"
            leftSection={
              <IconCalendar
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            description="Date when the percent starts accruing"
            valueFormat="DD.MM.YYYY"
            locale="en"
            firstDayOfWeek={1}
            styles={{
              input: {
                height: rem(36),
              },
            }}
            {...form.getInputProps("startDate")}
          />

          <NumberInput
            label="Investment Amount"
            placeholder="Enter amount"
            leftSection={
              <IconCoin
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            description="Amount you plan to invest"
            min={0}
            decimalScale={2}
            prefix="$"
            thousandSeparator=" "
            {...form.getInputProps("investedAmount")}
          />

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              leftSection={
                <IconEdit style={{ width: rem(16), height: rem(16) }} />
              }
              variant="filled"
              color="blue"
              loading={loading}
              disabled={loading}
            >
              Update Project
            </Button>
          </Group>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Stack>
      </form>
    </Paper>
  );
};
