import { Project } from "../model/types";

const API_URL = "http://localhost:3001/api/projects";

export interface SortParams {
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getAllProjects(
  sortParams?: SortParams
): Promise<Project[]> {
  const url = new URL(API_URL);

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

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function addProject(project: Project): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to add project");
}

export async function updateProject(project: Project): Promise<void> {
  const res = await fetch(`${API_URL}/${project.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to update project");
}

export async function removeProject(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
}
