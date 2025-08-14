import { create } from "zustand";
import { Project } from "./types";
import * as projectApi from "../api/projectApi";

interface ProjectState {
  projects: Project[];
  sortBy: string;
  sortOrder: string;
  status: string;
  searchQuery: string;
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
  fetchProjects: (
    sortBy?: string,
    sortOrder?: string,
    status?: string,
    search?: string,
    resetPagination?: boolean
  ) => Promise<void>;
  loadMoreProjects: () => Promise<void>;
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
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  isInitialLoading: true,
  fetchProjects: async (
    sortBy?: string,
    sortOrder?: string,
    status?: string,
    search?: string,
    resetPagination: boolean = true
  ) => {
    try {
      // Set initial loading state
      if (resetPagination) {
        set({ isInitialLoading: true });
      }
      
      const currentSortBy = sortBy || get().sortBy;
      const currentSortOrder = sortOrder || get().sortOrder;
      const currentStatus = status || get().status;
      const currentSearch = search !== undefined ? search : get().searchQuery;

      // Reset pagination if needed
      const shouldReset = resetPagination || 
        currentSortBy !== get().sortBy || 
        currentSortOrder !== get().sortOrder || 
        currentStatus !== get().status || 
        currentSearch !== get().searchQuery;

      if (shouldReset) {
        set({ currentPage: 1, hasMore: true });
      }

      const offset = shouldReset ? 0 : (get().currentPage - 1) * 10;
      
      const projects = await projectApi.getAllProjects({
        sortBy: currentSortBy,
        sortOrder: currentSortOrder,
        status: currentStatus === "all" ? undefined : currentStatus,
        search: currentSearch,
        limit: 10,
        offset: offset,
      });

      if (shouldReset) {
        set({ 
          projects,
          hasMore: projects.length === 10,
          currentPage: 1,
          isInitialLoading: false
        });
      } else {
        set((state) => ({
          projects: [...state.projects, ...projects],
          hasMore: projects.length === 10,
          currentPage: state.currentPage + 1
        }));
      }
    } catch (error) {
      set({ isInitialLoading: false });
      throw error;
    }
  },
  loadMoreProjects: async () => {
    if (!get().hasMore || get().isLoading) {
      return;
    }
    
    set({ isLoading: true });
    
    try {
      const currentState = get();
      const nextOffset = currentState.currentPage * 10;
      
      const projects = await projectApi.getAllProjects({
        sortBy: currentState.sortBy,
        sortOrder: currentState.sortOrder,
        status: currentState.status === "all" ? undefined : currentState.status,
        search: currentState.searchQuery,
        limit: 10,
        offset: nextOffset,
      });
      
      if (projects.length > 0) {
        set((state) => ({
          projects: [...state.projects, ...projects],
          hasMore: projects.length === 10,
          currentPage: state.currentPage + 1,
          isLoading: false
        }));
      } else {
        set({ hasMore: false, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addProject: async (project) => {
    await projectApi.addProject(project);
    await get().fetchProjects(
      get().sortBy,
      get().sortOrder,
      get().status,
      get().searchQuery
    );
  },
  removeProject: async (id) => {
    await projectApi.removeProject(id);
    await get().fetchProjects(
      get().sortBy,
      get().sortOrder,
      get().status,
      get().searchQuery
    );
  },
  updateProject: async (project) => {
    await projectApi.updateProject(project);
    await get().fetchProjects(
      get().sortBy,
      get().sortOrder,
      get().status,
      get().searchQuery
    );
  },
  setSorting: (sortBy: string, sortOrder: string) => {
    set({ sortBy, sortOrder });
    get().fetchProjects(sortBy, sortOrder, undefined, get().searchQuery, true);
  },
  setStatusFilter: (status: string) => {
    set({ status });
    get().fetchProjects(undefined, undefined, status, get().searchQuery, true);
  },
  setSearchQuery: (search: string) => {
    set({ searchQuery: search });
    get()
      .fetchProjects(undefined, undefined, undefined, search, true)
      .then(() => {});
  },
}));
