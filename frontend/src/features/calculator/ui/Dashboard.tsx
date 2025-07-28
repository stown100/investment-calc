import React from "react";
import {
  Paper,
  Title,
  Group,
  Stack,
  NumberFormatter,
  Badge,
  ThemeIcon,
  rem,
  Grid,
  Text,
  Card,
  RingProgress,
} from "@mantine/core";
import {
  IconCalculator,
  IconTrendingUp,
  IconBuilding,
  IconPercentage,
  IconCoin,
  IconChartPie,
  IconChartLine,
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { DashboardSummary, PortfolioChartData } from "../model/types";

interface DashboardProps {
  summary: DashboardSummary;
  portfolioData: PortfolioChartData[];
  growthData: { name: string; invested: number; projected: number }[];
  yearsToShow: number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export const Dashboard = ({
  summary,
  portfolioData,
  growthData,
  yearsToShow,
}: DashboardProps) => {
  const pieData = portfolioData.map((item, index) => ({
    name: item.projectName,
    value: item.investedAmount,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Stack gap="xs">
      {/* Summary Cards - Ultra Compact */}
      <Grid gutter="xs">
        <Grid.Col span={6}>
          <Card shadow="sm" padding="xs" radius="sm" withBorder>
            <Group gap="xs" mb="xs">
              <ThemeIcon size="xs" variant="light" color="blue">
                <IconCoin style={{ width: rem(10), height: rem(10) }} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">
                Total Invested
              </Text>
            </Group>
            <Text
              size="xs"
              fw={700}
              c="blue.6"
              style={{ whiteSpace: "nowrap" }}
            >
              <NumberFormatter
                value={summary.totalInvested}
                prefix="$"
                thousandSeparator=" "
                decimalScale={0}
              />
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" padding="xs" radius="sm" withBorder>
            <Group gap="xs" mb="xs">
              <ThemeIcon size="xs" variant="light" color="green">
                <IconPercentage style={{ width: rem(10), height: rem(10) }} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">
                Avg. Annual %
              </Text>
            </Group>
            <Text size="xs" fw={700} c="green.6">
              <NumberFormatter
                value={summary.averageAnnualPercent}
                suffix="%"
                decimalScale={1}
              />
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" padding="xs" radius="sm" withBorder>
            <Group gap="xs" mb="xs">
              <ThemeIcon size="xs" variant="light" color="orange">
                <IconTrendingUp style={{ width: rem(10), height: rem(10) }} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">
                Total Return
              </Text>
            </Group>
            <Text
              size="xs"
              fw={700}
              c="orange.6"
              style={{ whiteSpace: "nowrap" }}
            >
              <NumberFormatter
                value={summary.totalReturn}
                prefix="$"
                thousandSeparator=" "
                decimalScale={0}
              />
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" padding="xs" radius="sm" withBorder>
            <Group gap="xs" mb="xs">
              <ThemeIcon size="xs" variant="light" color="purple">
                <IconBuilding style={{ width: rem(10), height: rem(10) }} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">
                Projects
              </Text>
            </Group>
            <Text size="xs" fw={700} c="purple.6">
              {summary.numberOfProjects}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Portfolio Growth Chart - Above Distribution */}
      <Paper shadow="sm" p="xs" radius="sm" withBorder>
        <Group gap="xs" mb="xs">
          <ThemeIcon size="xs" variant="light" color="blue">
            <IconChartLine style={{ width: rem(12), height: rem(12) }} />
          </ThemeIcon>
          <Title order={6}>Portfolio Growth ({yearsToShow} Years)</Title>
        </Group>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={9} />
            <YAxis fontSize={9} />
            <Tooltip
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`,
                name,
              ]}
            />
            <Line
              type="monotone"
              dataKey="invested"
              stroke="#8884d8"
              strokeWidth={2}
              name="Initial"
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Total"
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Portfolio Distribution Chart - Below Growth */}
      <Paper shadow="sm" p="xs" radius="sm" withBorder>
        <Group gap="xs" mb="xs">
          <ThemeIcon size="xs" variant="light" color="green">
            <IconChartPie style={{ width: rem(12), height: rem(12) }} />
          </ThemeIcon>
          <Title order={6}>Portfolio Distribution</Title>
        </Group>
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`,
                "Amount",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Stack>
  );
};
