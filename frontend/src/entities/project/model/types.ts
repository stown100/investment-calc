import { RateType } from "../types";
export type Project = {
  id: string;
  name: string;
  annualPercent: number | null;
  startDate: string;
  createdAt: string;
  investedAmount: number;
  rateType: RateType;
  marketSymbol?: string | null;
  // For crypto projects - store additional data in the name or use a separate field
  tokenAmount?: number; // Number of tokens (for crypto projects)
  tokenPrice?: number; // Price per token at purchase (for crypto projects)
};

// Тип для форм, где числовые поля могут быть строками
export type ProjectFormData = {
  id?: string;
  name: string;
  annualPercent: number | string;
  startDate: string;
  createdAt?: string;
  investedAmount: number | string;
  rateType: RateType;
  marketSymbol?: string | null;
};

// Тип для создания нового проекта
export type CreateProjectData = Omit<ProjectFormData, "id" | "createdAt">;

// Тип для обновления проекта
export type UpdateProjectData = Partial<ProjectFormData> & { id: string };

// Тип для крипто-проекта
export type CryptoProject = {
  id: string;
  tickerSymbol: string;
  startDate: string;
  createdAt: string;
  tokenAmount: number;
  rateType: RateType.Floating; // Всегда floating для крипто
};

// Тип для формы крипто-проекта
export type CryptoProjectFormData = {
  id?: string;
  tickerSymbol: string;
  startDate: string;
  createdAt?: string;
  tokenAmount: number | string;
  tokenPrice: number | string; // Цена одного токена в USD
};
