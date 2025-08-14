// Period for calculation (label and number of days)
export interface CalculationPeriod {
  label: string;
  days: number;
}

// Result of calculation for a period
export interface CalculationResult {
  period: string;
  returnPercentage: number;
  returnAmount: number;
}

// Yearly calculation result with detailed breakdown
export interface YearlyCalculation {
  year: number;
  totalValue: number;
  growth: number;
  annualReturn: number;
  // Добавляем недостающие поля для совместимости
  initialAmount?: number;
  percentageIncome?: number;
  additionalInvestment?: number;
  finalAmount?: number;
  totalReturn?: number;
}

// Dashboard summary data
export interface DashboardSummary {
  totalInvested: number;
  averageAnnualPercent: number;
  totalReturn: number;
  totalReturnPercentage: number;
  projectedValue: number;
  numberOfProjects: number;
}

// Chart data for different visualizations
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface PortfolioChartData {
  projectName: string;
  investedAmount: number;
  projectedValue: number;
  percentage: number;
}

// Predefined periods for return calculation
export const CALCULATION_PERIODS: CalculationPeriod[] = [
  { label: "Day", days: 1 },
  { label: "Week", days: 7 },
  { label: "Month", days: 30 },
  { label: "Year", days: 365 },
  { label: "2 Years", days: 365 * 2 },
  { label: "5 Years", days: 365 * 5 },
  { label: "10 Years", days: 365 * 10 },
  { label: "20 Years", days: 365 * 20 },
];
