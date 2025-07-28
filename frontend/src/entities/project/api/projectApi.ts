import { Project } from '../model/types';

const API_URL = 'http://localhost:3001/api/projects';

export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function addProject(project: Project): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error('Failed to add project');
}

export async function updateProject(project: Project): Promise<void> {
  const res = await fetch(`${API_URL}/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error('Failed to update project');
}

export async function removeProject(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete project');
} 