// src/types/index.tsx

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  default_branch?: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[]; // 태그 정보
  fork: boolean;
}
