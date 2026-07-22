"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { GitHubData } from "@/utils/getGitData";

type LoadState = "loading" | "ready" | "error";

function CountUp({ value }: { value: number | undefined }): JSX.Element {
  const count = useMotionValue(0);
  const formattedCount = useTransform(count, (latest) => Math.round(latest).toLocaleString("en-US"));
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (value === undefined) {
      return;
    }

    if (reduceMotion) {
      count.set(value);
      return;
    }

    count.set(0);
    const controls = animate(count, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });

    return controls.stop;
  }, [count, reduceMotion, value]);

  if (value === undefined) {
    return <span>—</span>;
  }

  return (
    <>
      <motion.span aria-hidden="true">{formattedCount}</motion.span>
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
