import { describe, expect, it, vi } from "vitest";
import { getGitHubData } from "@/utils/getGitData";

describe("GitHub activity data", () => {
  it("maps repository and authored commit totals from GitHub", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ public_repos: 24 }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ total_count: 318 }), { status: 200 }));

    await expect(getGitHubData(fetcher)).resolves.toEqual({
      reposCount: 24,
      commitsCount: 318,
    });

    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0]?.[0]).toBe("https://api.github.com/users/oangsa");
    expect(fetcher.mock.calls[1]?.[0]).toBe("https://api.github.com/search/commits?q=author:oangsa");
  });

  it("rejects unsuccessful GitHub responses", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 403 }))
      .mockResolvedValueOnce(new Response(null, { status: 403 }));

    await expect(getGitHubData(fetcher)).rejects.toThrow("GitHub activity could not be loaded");
  });
});
