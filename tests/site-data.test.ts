import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/utils/data";
import { navigation, socialLinks } from "@/utils/site";

describe("navigation", () => {
  it("only links to routes that exist", () => {
    for (const { href } of navigation) {
      const routeFile = href === "/"
        ? join(process.cwd(), "app", "page.tsx")
        : join(process.cwd(), "app", href.slice(1), "page.tsx");

      expect(existsSync(routeFile), `${href} should resolve to an app route`).toBe(true);
    }
  });

  it("has unique labels and destinations", () => {
    expect(new Set(navigation.map(({ href }) => href)).size).toBe(navigation.length);
    expect(new Set(navigation.map(({ label }) => label)).size).toBe(navigation.length);
  });
});

describe("public portfolio data", () => {
  it("uses valid project statuses and secure public links", () => {
    for (const project of projects) {
      expect(["Completed", "In progress"]).toContain(project.status);
      if (project.href) expect(project.href).toMatch(/^https:\/\//);
    }
  });

  it("gives every social destination an accessible, unique label", () => {
    expect(new Set(socialLinks.map(({ label }) => label)).size).toBe(socialLinks.length);

    for (const social of socialLinks) {
      expect(social.label.length).toBeGreaterThan(0);
      expect(social.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });
});
