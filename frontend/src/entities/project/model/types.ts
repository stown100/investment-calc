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
