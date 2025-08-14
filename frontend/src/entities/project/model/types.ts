export type Project = {
  id: string;
  name: string;
  annualPercent: number;
  startDate: string;
  createdAt: string;
  investedAmount: number;
};

// Тип для форм, где числовые поля могут быть строками
export type ProjectFormData = {
  id?: string;
  name: string;
  annualPercent: number | string;
  startDate: string;
  createdAt?: string;
  investedAmount: number | string;
};

// Тип для создания нового проекта
export type CreateProjectData = Omit<ProjectFormData, 'id' | 'createdAt'>;

// Тип для обновления проекта
export type UpdateProjectData = Partial<ProjectFormData> & { id: string };
