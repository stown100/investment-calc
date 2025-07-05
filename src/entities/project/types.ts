// Investment project type
export interface Project {
  id: string;
  name: string;
  annualPercent: number;
  startDate: string; // ISO string
  createdAt: string; // ISO string
  investedAmount: number;
}
