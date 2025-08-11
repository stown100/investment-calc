import { create } from "zustand";
import { Project } from "./types";
import * as projectApi from "../api/projectApi";

interface ProjectState {
  projects: Project[];
  sortBy: string;
  sortOrder: string;
  status: string;
  searchQuery: string;
  fetchProjects: (sortBy?: string, sortOrder?: string, status?: string, search?: string) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  setSorting: (sortBy: string, sortOrder: string) => void;
  setStatusFilter: (status: string) => void;
  setSearchQuery: (search: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  sortBy: "startDate",
  sortOrder: "desc",
  status: "all",
  searchQuery: "",
  fetchProjects: async (sortBy?: string, sortOrder?: string, status?: string, search?: string) => {
    try {
      const currentSortBy = sortBy || get().sortBy;
      const currentSortOrder = sortOrder || get().sortOrder;
      const currentStatus = status || get().status;
      const currentSearch = search !== undefined ? search : get().searchQuery;
      
      console.log('Store fetchProjects called with:', { currentSortBy, currentSortOrder, currentStatus, currentSearch }); // Debug log
      
      const projects = await projectApi.getAllProjects({
        sortBy: currentSortBy,
        sortOrder: currentSortOrder,
        status: currentStatus === 'all' ? undefined : currentStatus,
        search: currentSearch,
      });
      console.log('Search results:', projects.length, 'projects found'); // Debug log
      set({ projects });
    } catch (error) {
      throw error;
    }
  },
  addProject: async (project) => {
    await projectApi.addProject(project);
    await get().fetchProjects(get().sortBy, get().sortOrder, get().status, get().searchQuery);
  },
  removeProject: async (id) => {
    await projectApi.removeProject(id);
    await get().fetchProjects(get().sortBy, get().sortOrder, get().status, get().searchQuery);
  },
  updateProject: async (project) => {
    await projectApi.updateProject(project);
    await get().fetchProjects(get().sortBy, get().sortOrder, get().status, get().searchQuery);
  },
  setSorting: (sortBy: string, sortOrder: string) => {
    set({ sortBy, sortOrder });
    get().fetchProjects(sortBy, sortOrder, undefined, get().searchQuery);
  },
  setStatusFilter: (status: string) => {
    set({ status });
    get().fetchProjects(undefined, undefined, status, get().searchQuery);
  },
  setSearchQuery: (search: string) => {
    console.log('setSearchQuery called with:', search); // Debug log
    set({ searchQuery: search });
    get().fetchProjects(undefined, undefined, undefined, search).then(() => {
      console.log('Search completed, projects count:', get().projects.length); // Debug log
    });
  },
}));
