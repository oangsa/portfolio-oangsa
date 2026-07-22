"use client";

import { useEffect, useState } from "react";
import type { GitHubData } from "@/utils/getGitData";

type LoadState = "loading" | "ready" | "error";

function CountUp({ value }: { value: number | undefined }): JSX.Element {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === undefined) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 1_400;
    const startedAt = performance.now();
    let animationFrame = 0;

    const update = (now: number): void => {
      if (reduceMotion) {
        setDisplayValue(value);
        return;
      }

      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  if (value === undefined) {
    return <span>—</span>;
  }

  return (
    <>
      <span aria-hidden="true">{displayValue.toLocaleString("en-US")}</span>
      <span className="visually-hidden">{value.toLocaleString("en-US")}</span>
    </>
  );
}

export default function Stats(): JSX.Element {
  const [stats, setStats] = useState<GitHubData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats(): Promise<void> {
      try {
        const response = await fetch("/api/github-stats", { signal: controller.signal });

        if (!response.ok) {
          throw new Error("GitHub activity could not be loaded");
        }

        const data = await response.json() as GitHubData;
        setStats(data);
        setLoadState("ready");
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setLoadState("error");
        }
      }
    }

    void loadStats();

    return () => controller.abort();
  }, []);

  return (
    <section className="stats-section shell" aria-labelledby="github-stats-heading">
      <div className="stats-intro">
        <p className="hero-role">GitHub activity</p>
        <h2 id="github-stats-heading">Built in public.</h2>
      </div>

      <dl className="stats-grid" aria-busy={loadState === "loading"} aria-live="polite">
        <div className="stat-item">
          <dd><CountUp value={stats?.reposCount} /></dd>
          <dt>Public repositories</dt>
        </div>
        <div className="stat-item">
          <dd><CountUp value={stats?.commitsCount} /></dd>
          <dt>Authored commits</dt>
        </div>
      </dl>

      {loadState === "error" ? <p className="stats-status">Live GitHub totals are temporarily unavailable.</p> : null}
    </section>
  );
}
