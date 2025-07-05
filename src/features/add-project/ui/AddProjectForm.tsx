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
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import {
  IconBuilding,
  IconPercentage,
  IconCalendar,
  IconCoin,
  IconPlus,
} from "@tabler/icons-react";

interface AddProjectFormValues {
  name: string;
  annualPercent: number;
  startDate: string;
  investedAmount: number;
}

interface AddProjectFormProps {
  onSuccess?: () => void;
}

// Form for adding a new investment project
export const AddProjectForm = ({ onSuccess }: AddProjectFormProps) => {
  const addProject = useProjectStore((s) => s.addProject);
  const form = useForm<AddProjectFormValues>({
    initialValues: {
      name: "",
      annualPercent: 0,
      startDate: new Date().toISOString(),
      investedAmount: 0,
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      annualPercent: (value) =>
        value <= 0 ? "Percent must be positive" : null,
      investedAmount: (value) =>
        value <= 0 ? "Amount must be positive" : null,
    },
  });

  // Handles form submission and adds a new project
  const handleSubmit = (values: AddProjectFormValues) => {
    const newProject = {
      id: uuidv4(),
      name: values.name,
      annualPercent: values.annualPercent,
      startDate: values.startDate,
      createdAt: new Date().toISOString(),
      investedAmount: values.investedAmount,
    };
    addProject(newProject);
    form.reset();
    onSuccess?.();
  };

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Title order={4} mb="md">
        Add New Project
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
                <IconPlus style={{ width: rem(16), height: rem(16) }} />
              }
              variant="filled"
              color="blue"
            >
              Add Project
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
