import { create } from "zustand";
import { Project } from "./types";
import * as projectApi from "../api/projectApi";

interface ProjectState {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  fetchProjects: async () => {
    const projects = await projectApi.getAllProjects();
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
}));
