import { Project } from "../model/types";
import type { ProjectLite } from "../../project/types";

const API_URL = import.meta.env.VITE_API_URL;

export interface SortParams {
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export async function getAllProjects(
  sortParams?: SortParams
): Promise<Project[]> {
  const url = new URL(`${API_URL}/projects`);

  if (sortParams?.sortBy) {
    url.searchParams.append("sortBy", sortParams.sortBy);
  }
  if (sortParams?.sortOrder) {
    url.searchParams.append("sortOrder", sortParams.sortOrder);
  }
  if (sortParams?.status) {
    url.searchParams.append("status", sortParams.status);
  }
  if (sortParams?.search) {
    url.searchParams.append("search", sortParams.search);
  }
  if (sortParams?.limit) {
    url.searchParams.append("limit", sortParams.limit.toString());
  }
  if (sortParams?.offset) {
    url.searchParams.append("offset", sortParams.offset.toString());
  }

  const res = await fetch(url.toString(), {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  const projects = await res.json();

  return projects;
}

export async function addProject(project: Project): Promise<void> {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to add project");
}

export async function updateProject(project: Project): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${project.id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to update project");
}

export async function removeProject(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete project");
}

export type ProjectsSummary = {
  totalProjects: number;
  averagePercent: number;
  totalInvestment: number;
  activeInvestments: number;
  totalProfit: number;
};

export async function getProjectsSummary(): Promise<ProjectsSummary> {
  const res = await fetch(`${API_URL}/projects/summary`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch projects summary");
  return res.json();
}

// Lightweight list of all projects for fast select and calc
export async function getAllProjectsLite(): Promise<ProjectLite[]> {
  const res = await fetch(`${API_URL}/projects/all-lite`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch lite projects");
  return res.json();
}

// Get all projects with summary for table view
export async function getAllProjectsWithSummary(): Promise<{
  projects: Project[];
  summary: ProjectsSummary;
}> {
  const res = await fetch(`${API_URL}/projects/all-with-summary`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch projects with summary");
  return res.json();
}

// Toggle project inclusion in summary
export async function toggleProjectSummaryInclusion(
  id: string,
  includeInSummary: boolean
): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}/summary-toggle`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ includeInSummary }),
  });
  if (!res.ok) throw new Error("Failed to toggle project summary inclusion");
}
