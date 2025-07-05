import { create } from "zustand";
import { Project } from "./types";
import { sampleProjects } from "./sample-projects";

// State for managing investment projects
interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
}

const STORAGE_KEY = "investment-projects";

// Loads projects from localStorage or uses sample data
const loadProjects = (): Project[] => {
  const storedProjects = localStorage.getItem(STORAGE_KEY);
  if (storedProjects) {
    try {
      return JSON.parse(storedProjects);
    } catch (error) {
      console.error("Error parsing stored projects:", error);
      return sampleProjects;
    }
  }
  return sampleProjects;
};

// Zustand store for projects
export const useProjectStore = create<ProjectState>((set) => ({
  projects: loadProjects(),
  addProject: (project) =>
    set((state) => {
      const newProjects = [...state.projects, project];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
      return { projects: newProjects };
    }),
  removeProject: (id) =>
    set((state) => {
      const newProjects = state.projects.filter((project) => project.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
      return { projects: newProjects };
    }),
}));
