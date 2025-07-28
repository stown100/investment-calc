import React, { useState } from "react";
import { useProjectStore } from "../../../entities/project/model/store";
import { 
  calculateAllPeriods, 
  calculateYearlyBreakdown, 
  generateDashboardSummary, 
  generatePortfolioChartData, 
  generateGrowthChartData 
} from "../model/calculator";
import {
  Paper,
  Title,
  MultiSelect,
  Group,
  Stack,
  ThemeIcon,
  rem,
  Tabs,
  Select,
} from "@mantine/core";
import {
  IconCalculator,
  IconBuilding,
  IconDashboard,
  IconTable,
} from "@tabler/icons-react";
import { Dashboard } from "./Dashboard";
import { UnifiedTable } from "./UnifiedTable";

// Calculator for investment returns
export const Calculator = () => {
  const projects = useProjectStore((state) => state.projects);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [yearsToShow, setYearsToShow] = useState(10);

  // Options for project selection
  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: project.name,
    description: `${
      project.annualPercent
    }% per year | $${project.investedAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
  }));

  // Get selected projects data
  const selectedProjectsData = projects.filter((p) =>
    selectedProjects.includes(p.id)
  );

  // Calculate all data
  const results = calculateAllPeriods(selectedProjectsData);
  const yearlyData = calculateYearlyBreakdown(selectedProjectsData, yearsToShow);
  const dashboardSummary = generateDashboardSummary(selectedProjectsData, yearsToShow);
  const portfolioData = generatePortfolioChartData(selectedProjectsData, yearsToShow);
  const growthData = generateGrowthChartData(selectedProjectsData, yearsToShow);

  const yearOptions = [
    { value: "5", label: "5 Years" },
    { value: "10", label: "10 Years" },
    { value: "15", label: "15 Years" },
    { value: "20", label: "20 Years" },
  ];

  return (
    <Paper
      shadow="sm"
      p="xs"
      radius="sm"
      withBorder
      style={{ width: "100%", overflow: "hidden" }}
    >
      <Stack gap="xs">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <ThemeIcon size="sm" variant="light" color="blue">
              <IconCalculator style={{ width: rem(14), height: rem(14) }} />
            </ThemeIcon>
            <Title order={6}>Investment Calculator</Title>
          </Group>
          <Select
            label="Time Period"
            value={yearsToShow.toString()}
            onChange={(value) => setYearsToShow(parseInt(value || "10"))}
            data={yearOptions}
            w={100}
            size="xs"
          />
        </Group>

        <MultiSelect
          label="Select Projects"
          placeholder="Choose projects to calculate"
          data={projectOptions}
          value={selectedProjects}
          onChange={setSelectedProjects}
          searchable
          clearable
          size="xs"
          leftSection={
            <IconBuilding
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          }
        />

        {selectedProjects.length > 0 && (
          <Tabs defaultValue="dashboard">
            <Tabs.List>
              <Tabs.Tab value="dashboard" leftSection={<IconDashboard size={12} />}>
                Dashboard
              </Tabs.Tab>
              <Tabs.Tab value="analysis" leftSection={<IconTable size={12} />}>
                Analysis
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="dashboard" pt="xs">
              <Dashboard 
                summary={dashboardSummary}
                portfolioData={portfolioData}
                growthData={growthData}
                yearsToShow={yearsToShow}
              />
            </Tabs.Panel>

            <Tabs.Panel value="analysis" pt="xs">
              <UnifiedTable 
                periodResults={results}
                yearlyData={yearlyData}
                yearsToShow={yearsToShow}
                onYearsChange={(value) => setYearsToShow(parseInt(value || "10"))}
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </Stack>
    </Paper>
  );
};
