import React from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import { Paper, Group, Text, NumberFormatter, Stack, rem } from "@mantine/core";
import { IconBuilding, IconPercentage, IconCoin } from "@tabler/icons-react";

// Displays a summary of all investments
export const InvestmentSummary = () => {
  const projects = useProjectStore((s) => s.projects);
  const currentDate = new Date();

  // Total invested amount
  const totalInvested = projects.reduce(
    (sum, project) => sum + project.investedAmount,
    0
  );
  // Invested amount in active projects
  const activeInvested = projects.reduce((sum, project) => {
    const startDate = new Date(project.startDate);
    return currentDate >= startDate ? sum + project.investedAmount : sum;
  }, 0);

  // Average annual percent
  const averagePercent =
    projects.length > 0
      ? projects.reduce((sum, project) => sum + project.annualPercent, 0) /
        projects.length
      : 0;

  return (
    <Stack gap="xs" mb="sm">
      <Paper shadow="sm" p="xs" withBorder>
        <Group gap="sm">
          <Group gap="xs">
            <IconBuilding
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
            <Text size="xs" c="dimmed">
              Total Projects:
            </Text>
            <Text fw={500} size="xs">{projects.length}</Text>
          </Group>

          <Group gap="xs">
            <IconPercentage
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
            <Text size="xs" c="dimmed">
              Average Percent:
            </Text>
            <Text fw={500} size="xs">{averagePercent.toFixed(2)}%</Text>
          </Group>

          <Group gap="xs">
            <IconCoin
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
            <Text size="xs" c="dimmed">
              Total Investment:
            </Text>
            <Text fw={500} size="xs" style={{ whiteSpace: 'nowrap' }}>
              <NumberFormatter
                value={totalInvested}
                prefix="$"
                thousandSeparator=" "
                decimalScale={0}
              />
            </Text>
          </Group>

          <Group gap="xs">
            <IconCoin
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
            <Text size="xs" c="dimmed">
              Active Investments:
            </Text>
            <Text fw={500} size="xs" style={{ whiteSpace: 'nowrap' }}>
              <NumberFormatter
                value={activeInvested}
                prefix="$"
                thousandSeparator=" "
                decimalScale={0}
              />
            </Text>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
};
