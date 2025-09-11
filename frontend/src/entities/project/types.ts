// Investment project type
export interface Project {
  id: string;
  name: string;
  annualPercent: number;
  startDate: string; // ISO string
  createdAt: string; // ISO string
  investedAmount: number;
}

// Lightweight project type for fast selects/calculations
export interface ProjectLite {
  id: string;
  name: string;
  annualPercent: number;
  startDate: string; // ISO string
  investedAmount: number;
}
