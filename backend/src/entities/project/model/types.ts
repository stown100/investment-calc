export enum RateType {
  Fixed = 'fixed',
  Floating = 'floating',
}

export type ProjectEntity = {
  id: string;
  name: string;
  annualPercent: number | null;
  startDate: string;
  createdAt: string;
  investedAmount: number;
  rateType: RateType;
};


