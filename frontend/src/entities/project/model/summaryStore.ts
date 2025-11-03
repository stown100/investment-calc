import { create } from "zustand";
import { getProjectsSummary, ProjectsSummary } from "../api/projectApi";

interface ProjectsSummaryState {
  summary: ProjectsSummary | null;
  isLoading: boolean;
  error: string | null;
  fetchSummary: () => Promise<void>;
  reset: () => void;
}

export const useProjectsSummaryStore = create<ProjectsSummaryState>((set) => ({
  summary: null,
  isLoading: false,
  error: null,
  fetchSummary: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProjectsSummary();
      set({ summary: data, isLoading: false });
    } catch (e) {
      set({
        isLoading: false,
        error: "Failed to fetch projects summary",
        summary: {
          totalProjects: 0,
          averagePercent: 0,
          totalInvestment: 0,
          activeInvestments: 0,
          totalProfit: 0,
        },
      });
    }
  },
  reset: () => set({ summary: null, isLoading: false, error: null }),
}));
