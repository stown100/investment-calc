export enum RateType {
  Fixed = 'fixed',
  Floating = 'floating',
}
// Investment project type
export interface Project {
  id: string;
  name: string;
  annualPercent: number | null;
  startDate: string; // ISO string
  createdAt: string; // ISO string
  investedAmount: number;
  rateType: RateType;
}

// Lightweight project type for fast selects/calculations
export interface ProjectLite {
  id: string;
  name: string;
  annualPercent: number | null;
  startDate: string; // ISO string
  investedAmount: number;
  rateType: RateType;
}
