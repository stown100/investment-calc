import { Project } from "./types";
import { sampleProjects } from "./sample-projects";

// Returns initial projects from JSON
export function getInitialProjects(): Project[] {
  return sampleProjects as Project[];
}
