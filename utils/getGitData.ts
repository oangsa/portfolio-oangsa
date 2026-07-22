export interface GitHubData {
  commitsCount: number;
  reposCount: number;
}

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

const GITHUB_USER = "oangsa";

export async function getGitHubData(fetcher: Fetcher = fetch): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN ?? process.env.GIT_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const [profileResponse, commitsResponse] = await Promise.all([
    fetcher(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
    fetcher(`https://api.github.com/search/commits?q=author:${GITHUB_USER}`, { headers }),
  ]);

  if (!profileResponse.ok || !commitsResponse.ok) {
    throw new Error("GitHub activity could not be loaded");
  }

  const profile = await profileResponse.json() as { public_repos?: unknown };
  const commits = await commitsResponse.json() as { total_count?: unknown };

  if (typeof profile.public_repos !== "number" || typeof commits.total_count !== "number") {
    throw new Error("GitHub returned an unexpected response");
  }

  return {
    reposCount: profile.public_repos,
    commitsCount: commits.total_count,
  };
}
