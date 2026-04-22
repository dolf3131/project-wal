// src/lib/github.ts

import { siteConfig } from "@/data/site-config";
import { GithubRepo } from "@/types";

const GITHUB_FETCH_TIMEOUT_MS = 10_000;

// Markdown 제거 함수
function stripMarkdown(markdown: string, maxLength: number = 120): string {
  if (!markdown) return "";
  const text = markdown
    .replace(/^#+\s+(.*)$/gm, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/[\*\_\~\=\-]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

async function fetchWithTimeout(input: string, init: RequestInit = {}) {
  return fetch(input, {
    ...init,
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(GITHUB_FETCH_TIMEOUT_MS),
  });
}

// README 가져오기
async function fetchReadme(username: string, repo: string, branch: string): Promise<string | null> {
  try {
    const url = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`;
    const res = await fetchWithTimeout(url, { cache: "force-cache" });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// 특정 레포지토리 하나만 가져오기
async function fetchSingleRepo(username: string, repoName: string): Promise<GithubRepo | null> {
  try {
    const res = await fetchWithTimeout(`https://api.github.com/repos/${username}/${repoName}`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch pinned repo: ${repoName}`, error);
    return null;
  }
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const username = siteConfig.contact.github.split("/").pop();
  if (!username) return [];

  try {
    const response = await fetchWithTimeout(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, 
      { cache: "force-cache" }
    );
    
    let allRepos: GithubRepo[] = [];
    
    if (response.ok) {
      allRepos = await response.json();
    }

    // 2. 고정 프로젝트 누락 확인
    const pinnedNames = siteConfig.pinnedProjects || [];
    const missingPinnedNames = pinnedNames.filter(
      pinned => !allRepos.some(repo => repo.name === pinned)
    );

    // 3. 누락된 프로젝트 추가 가져오기
    if (missingPinnedNames.length > 0) {
      const additionalRepos = await Promise.all(
        missingPinnedNames.map(name => fetchSingleRepo(username, name))
      );
      const validAdditionalRepos = additionalRepos.filter((r): r is GithubRepo => r !== null);
      allRepos = [...allRepos, ...validAdditionalRepos];
    }

    // 4. README 설명 채우기
    const reposWithReadme = await Promise.all(
      allRepos.map(async (repo) => {
        if (repo.description) return repo;
        const branch = repo.default_branch || 'main'; 
        const readme = await fetchReadme(username, repo.name, branch);
        if (readme) {
          return { ...repo, description: stripMarkdown(readme) };
        }
        return repo;
      })
    );

    // 5. 정렬 및 필터링
    return reposWithReadme.sort((a, b) => {
      const isPinnedA = pinnedNames.includes(a.name);
      const isPinnedB = pinnedNames.includes(b.name);

      if (isPinnedA && !isPinnedB) return -1;
      if (!isPinnedA && isPinnedB) return 1;

      if (!a.fork && b.fork) return -1;
      if (a.fork && !b.fork) return 1;

      return b.stargazers_count - a.stargazers_count;
    }).slice(0, 6);

  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
}
