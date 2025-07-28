import React, { useState } from "react";
import {
  Paper,
  Title,
  Table,
  Text,
  Group,
  Stack,
  NumberFormatter,
  Badge,
  ThemeIcon,
  rem,
  ScrollArea,
  Select,
  Tabs,
} from "@mantine/core";
import {
  IconCalendar,
  IconCalculator,
  IconTrendingUp,
  IconCoin,
  IconPercentage,
  IconChartLine,
  IconTable,
} from "@tabler/icons-react";
import { CalculationResult, YearlyCalculation } from "../model/types";

interface UnifiedTableProps {
  periodResults: CalculationResult[];
  yearlyData: YearlyCalculation[];
  yearsToShow: number;
  onYearsChange: (value: string | null) => void;
}

export const UnifiedTable = ({ 
  periodResults, 
  yearlyData, 
  yearsToShow, 
  onYearsChange 
}: UnifiedTableProps) => {
  return (
    <Paper shadow="sm" p="xs" radius="sm" withBorder>
      <Stack gap="xs">
        <Group gap="xs">
          <ThemeIcon size="xs" variant="light" color="blue">
            <IconCalculator style={{ width: rem(14), height: rem(14) }} />
          </ThemeIcon>
          <Title order={6}>Investment Analysis ({yearsToShow} Years)</Title>
        </Group>

        <Tabs defaultValue="periods">
          <Tabs.List>
            <Tabs.Tab value="periods" leftSection={<IconChartLine size={10} />}>
              Period Returns
            </Tabs.Tab>
            <Tabs.Tab value="yearly" leftSection={<IconTable size={10} />}>
              Yearly Breakdown
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="periods" pt="xs">
            <ScrollArea>
              <div style={{ minWidth: 0 }}>
                <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing="xs">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ width: "40%" }}>
                        <Group gap="xs">
                          <IconCalendar
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Period</Text>
                        </Group>
                      </Table.Th>
                      <Table.Th style={{ width: "30%" }}>
                        <Group gap="xs">
                          <IconPercentage
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Return %</Text>
                        </Group>
                      </Table.Th>
                      <Table.Th style={{ width: "30%" }}>
                        <Group gap="xs">
                          <IconCoin
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Return Amount</Text>
                        </Group>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {periodResults.map((result) => (
                      <Table.Tr key={result.period}>
                        <Table.Td>
                          <Badge variant="light" color="blue" size="xs">
                            {result.period}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" color="green" size="xs">
                            <NumberFormatter
                              value={result.percentage}
                              suffix="%"
                              decimalScale={2}
                            />
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={500} c="blue.6" size="xs" style={{ whiteSpace: 'nowrap' }}>
                            <NumberFormatter
                              value={result.amount}
                              prefix="$"
                              thousandSeparator=" "
                              decimalScale={2}
                            />
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="yearly" pt="xs">
            <ScrollArea>
              <div style={{ minWidth: 0 }}>
                <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing="xs">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ width: "12%" }}>
                        <Group gap="xs">
                          <IconCalendar
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Year</Text>
                        </Group>
                      </Table.Th>
                      <Table.Th style={{ width: "18%" }}>
                        <Group gap="xs">
                          <IconCoin
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Initial Amount</Text>
                        </Group>
                      </Table.Th>
                      <Table.Th style={{ width: "18%" }}>
                        <Group gap="xs">
                          <IconPercentage
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">% Income</Text>
                        </Group>
                      </Table.Th>
                      <Table.Th style={{ width: "18%" }}>
                        <Group gap="xs">
                          <IconTrendingUp
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Additional</Text>
                        </Group>
                      </Table.Th>
                      <Table.Th style={{ width: "18%" }}>
                        <Group gap="xs">
                          <IconCalculator
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Final Amount</Text>
                        </Group>
                      </Table.Th>
                      <Table.Th style={{ width: "16%" }}>
                        <Group gap="xs">
                          <IconTrendingUp
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                          <Text size="xs">Total Return</Text>
                        </Group>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {yearlyData.map((data) => (
                      <Table.Tr key={data.year}>
                        <Table.Td>
                          <Badge variant="light" color="blue" size="xs">
                            Year {data.year}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={500} c="blue.6" size="xs" style={{ whiteSpace: 'nowrap' }}>
                            <NumberFormatter
                              value={data.initialAmount}
                              prefix="$"
                              thousandSeparator=" "
                              decimalScale={0}
                            />
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={500} c="green.6" size="xs" style={{ whiteSpace: 'nowrap' }}>
                            <NumberFormatter
                              value={data.percentageIncome}
                              prefix="$"
                              thousandSeparator=" "
                              decimalScale={0}
                            />
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={500} c="orange.6" size="xs" style={{ whiteSpace: 'nowrap' }}>
                            <NumberFormatter
                              value={data.additionalInvestment}
                              prefix="$"
                              thousandSeparator=" "
                              decimalScale={0}
                            />
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={700} c="purple.6" size="xs" style={{ whiteSpace: 'nowrap' }}>
                            <NumberFormatter
                              value={data.finalAmount}
                              prefix="$"
                              thousandSeparator=" "
                              decimalScale={0}
                            />
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={500} c="green.6" size="xs" style={{ whiteSpace: 'nowrap' }}>
                            <NumberFormatter
                              value={data.totalReturn}
                              prefix="$"
                              thousandSeparator=" "
                              decimalScale={0}
                            />
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>

        <Text size="xs" c="dimmed" ta="center">
          * Calculations assume compound interest and do not account for inflation or tax implications
        </Text>
      </Stack>
    </Paper>
  );
}; 