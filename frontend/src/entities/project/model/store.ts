import { create } from "zustand";
import { Project } from "./types";
import * as projectApi from "../api/projectApi";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconEdit, IconTrash, IconBuilding } from "@tabler/icons-react";

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
  setSearchQuery: (search: string) => {
    set({ searchQuery: search });
    get().fetchProjects().then(() => {
      if (search.trim() !== '') {
        notifications.show({
          title: "Search Results",
          message: `Found ${get().projects.length} projects matching "${search}"`,
          color: "blue",
          icon: IconBuilding({ size: 16 }),
        });
      }
    });
  },
}));
