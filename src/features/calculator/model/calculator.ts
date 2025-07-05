import { Project } from "../../../entities/project/types";
import {
  CalculationPeriod,
  CalculationResult,
  CALCULATION_PERIODS,
  YearlyCalculation,
  DashboardSummary,
  PortfolioChartData,
} from "./types";

// Calculates the return for a single project over a given number of days
export function calculateProjectReturn(
  project: Project,
  days: number
): { percentage: number; amount: number } {
  const dailyRate = project.annualPercent / 365 / 100;
  const percentage = dailyRate * days * 100;
  const amount = project.investedAmount * (dailyRate * days);
  return { percentage, amount };
}

// Calculates the total return for a set of projects for a given period
export function calculateTotalReturn(
  projects: Project[],
  period: CalculationPeriod
): CalculationResult {
  const totalInvested = projects.reduce((sum, p) => sum + p.investedAmount, 0);
  const totalReturn = projects.reduce((sum, project) => {
    const { amount } = calculateProjectReturn(project, period.days);
    return sum + amount;
  }, 0);

  return {
    period: period.label,
    percentage: (totalReturn / totalInvested) * 100,
    amount: totalReturn,
  };
}

// Calculates results for all predefined periods
export function calculateAllPeriods(projects: Project[]): CalculationResult[] {
  return CALCULATION_PERIODS.map((period) =>
    calculateTotalReturn(projects, period)
  );
}

// Calculate yearly breakdown for projects
export function calculateYearlyBreakdown(
  projects: Project[],
  years: number = 10
): YearlyCalculation[] {
  const yearlyData: YearlyCalculation[] = [];
  let currentAmount = projects.reduce((sum, p) => sum + p.investedAmount, 0);
  const averageAnnualPercent = projects.length > 0
    ? projects.reduce((sum, p) => sum + p.annualPercent, 0) / projects.length
    : 0;

  for (let year = 1; year <= years; year++) {
    const percentageIncome = currentAmount * (averageAnnualPercent / 100);
    const additionalInvestment = 0; // Can be made configurable later
    const finalAmount = currentAmount + percentageIncome + additionalInvestment;
    const totalReturn = finalAmount - projects.reduce((sum, p) => sum + p.investedAmount, 0);

    yearlyData.push({
      year,
      initialAmount: currentAmount,
      percentageIncome,
      additionalInvestment,
      finalAmount,
      totalReturn,
    });

    currentAmount = finalAmount;
  }

  return yearlyData;
}

// Generate dashboard summary
export function generateDashboardSummary(projects: Project[], years: number = 10): DashboardSummary {
  const totalInvested = projects.reduce((sum, p) => sum + p.investedAmount, 0);
  const averageAnnualPercent = projects.length > 0
    ? projects.reduce((sum, p) => sum + p.annualPercent, 0) / projects.length
    : 0;
  
  // Calculate projected value after selected years
  const projectedValue = totalInvested * Math.pow(1 + averageAnnualPercent / 100, years);
  const totalReturn = projectedValue - totalInvested;
  const totalReturnPercentage = (totalReturn / totalInvested) * 100;

  return {
    totalInvested,
    averageAnnualPercent,
    totalReturn,
    totalReturnPercentage,
    projectedValue,
    numberOfProjects: projects.length,
  };
}

// Generate portfolio chart data
export function generatePortfolioChartData(projects: Project[], years: number = 10): PortfolioChartData[] {
  const totalInvested = projects.reduce((sum, p) => sum + p.investedAmount, 0);
  
  return projects.map(project => {
    const projectedValue = project.investedAmount * Math.pow(1 + project.annualPercent / 100, years);
    const percentage = (project.investedAmount / totalInvested) * 100;
    
    return {
      projectName: project.name,
      investedAmount: project.investedAmount,
      projectedValue,
      percentage,
    };
  });
}

// Generate growth chart data
export function generateGrowthChartData(
  projects: Project[],
  years: number = 10
): { name: string; invested: number; projected: number }[] {
  const yearlyData = calculateYearlyBreakdown(projects, years);
  const totalInitialInvestment = projects.reduce((sum, p) => sum + p.investedAmount, 0);
  
  return yearlyData.map(data => ({
    name: `Year ${data.year}`,
    invested: totalInitialInvestment,
    projected: data.finalAmount,
  }));
}
