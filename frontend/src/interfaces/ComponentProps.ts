import { ApiStatus } from "../types/ApiTypes";

export interface StatusOrbProps {
  status: ApiStatus;
}
export interface RepositoryProps {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  contributors_url: string;
  commit_count?: number | string;
  languages?: string;
  languages_url?: string;
}
