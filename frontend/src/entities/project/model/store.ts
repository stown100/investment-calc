import { create } from "zustand";
import { Project } from "./types";
import * as projectApi from "../api/projectApi";

interface ProjectState {
  projects: Project[];
  sortBy: string;
  sortOrder: string;
  status: string;
  fetchProjects: (sortBy?: string, sortOrder?: string, status?: string) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  setSorting: (sortBy: string, sortOrder: string) => void;
  setStatusFilter: (status: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  sortBy: "startDate",
  sortOrder: "desc",
  status: "all",
  fetchProjects: async (sortBy?: string, sortOrder?: string, status?: string) => {
    const currentSortBy = sortBy || get().sortBy;
    const currentSortOrder = sortOrder || get().sortOrder;
    const currentStatus = status || get().status;
    
    const projects = await projectApi.getAllProjects({
      sortBy: currentSortBy,
      sortOrder: currentSortOrder,
      status: currentStatus === 'all' ? undefined : currentStatus,
    });
    set({ projects });
  },
  addProject: async (project) => {
    await projectApi.addProject(project);
    await get().fetchProjects();
  },
  removeProject: async (id) => {
    await projectApi.removeProject(id);
    await get().fetchProjects();
  },
  updateProject: async (project) => {
    await projectApi.updateProject(project);
    await get().fetchProjects();
  },
  setSorting: (sortBy: string, sortOrder: string) => {
    set({ sortBy, sortOrder });
    get().fetchProjects(sortBy, sortOrder);
  },
  setStatusFilter: (status: string) => {
    set({ status });
    get().fetchProjects();
  },
}));
