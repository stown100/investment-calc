import { Project } from "../model/types";
import { RateType } from "../types";
import { getCurrentCryptoPrice } from "../api/cryptoApi";

export interface ProjectProfitData {
  initialInvestment: number;
  currentValue: number;
  profit: number;
  profitPercentage: number;
  daysSinceInvestment: number;
  annualizedReturn?: number;
}

// Calculate profit for fixed rate projects
export function calculateFixedRateProfit(project: Project): ProjectProfitData {
  const startDate = new Date(project.startDate);
  const currentDate = new Date();
  const daysSinceInvestment = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // If project hasn't started yet (pending), no profit/loss should be calculated
  if (daysSinceInvestment < 0) {
    return {
      initialInvestment: project.investedAmount,
      currentValue: project.investedAmount, // Same as initial investment
      profit: 0, // No profit/loss yet
      profitPercentage: 0, // No percentage change
      daysSinceInvestment,
      annualizedReturn: project.annualPercent || 0, // Expected return
    };
  }

  const yearsSinceInvestment = daysSinceInvestment / 365.25;
  const annualPercent = project.annualPercent || 0;
  const currentValue =
    project.investedAmount * (1 + (annualPercent / 100) * yearsSinceInvestment);
  const profit = currentValue - project.investedAmount;
  const profitPercentage = (profit / project.investedAmount) * 100;

  return {
    initialInvestment: project.investedAmount,
    currentValue,
    profit,
    profitPercentage,
    daysSinceInvestment,
    annualizedReturn: annualPercent,
  };
}

// Calculate profit for crypto projects
export async function calculateCryptoProfit(
  project: Project
): Promise<ProjectProfitData> {
  if (!project.marketSymbol) {
    throw new Error("Market symbol is required for crypto projects");
  }

  try {
    const currentPriceData = await getCurrentCryptoPrice(project.marketSymbol);

    const startDate = new Date(project.startDate);
    const currentDate = new Date();
    const daysSinceInvestment = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Use stored token amount if available, otherwise estimate
    let tokenAmount: number;
    if (project.tokenAmount && project.tokenAmount > 0) {
      tokenAmount = project.tokenAmount;
    } else {
      // Fallback: estimate based on invested amount and stored purchase price
      if (project.tokenPrice && project.tokenPrice > 0) {
        tokenAmount = project.investedAmount / project.tokenPrice;
      } else {
        // Last resort: this shouldn't happen for new crypto projects
        throw new Error(
          "Insufficient data for crypto project calculation. Please recreate the project with proper token data."
        );
      }
    }

    const currentValue = tokenAmount * currentPriceData.price;
    const profit = currentValue - project.investedAmount;
    const profitPercentage = (profit / project.investedAmount) * 100;

    // Calculate annualized return
    const yearsSinceInvestment = daysSinceInvestment / 365.25;
    const annualizedReturn =
      yearsSinceInvestment > 0
        ? (Math.pow(
            currentValue / project.investedAmount,
            1 / yearsSinceInvestment
          ) -
            1) *
          100
        : 0;

    return {
      initialInvestment: project.investedAmount,
      currentValue,
      profit,
      profitPercentage,
      daysSinceInvestment,
      annualizedReturn,
    };
  } catch (error) {
    throw error;
  }
}

// Main function to calculate profit based on project type
export async function calculateProjectProfit(
  project: Project
): Promise<ProjectProfitData> {
  if (project.rateType === RateType.Fixed) {
    return calculateFixedRateProfit(project);
  } else {
    return await calculateCryptoProfit(project);
  }
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format percentage
export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}%`;
}
