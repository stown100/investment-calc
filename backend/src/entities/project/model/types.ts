export enum RateType {
  Fixed = "fixed",
  Floating = "floating",
}

export type ProjectEntity = {
  id: string;
  name: string;
  annualPercent: number | null;
  startDate: string;
  createdAt: string;
  investedAmount: number;
  rateType: RateType;
  marketSymbol?: string | null;
  tokenAmount?: number; // For crypto projects
  tokenPrice?: number; // For crypto projects
  includeInSummary?: boolean; // Whether to include in summary calculations
};
