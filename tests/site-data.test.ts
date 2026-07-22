import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { activities, caseStudyProjects, educations, experiences, projects } from "@/utils/data";
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

      for (const link of project.links ?? []) {
        expect(link.href).toMatch(/^https:\/\//);
        expect(link.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("publishes complete, uniquely addressable project case studies", () => {
    expect(caseStudyProjects.map((project) => project.slug)).toEqual([
      "codetice",
      "maintenance-tracking-system",
      "inventory-management-system",
      "hospital-system",
      "treasure-hunt-robot",
      "brainrot-interpreter",
      "sandwich-bot",
      "to-be-number-one-website",
    ]);
    expect(caseStudyProjects).toHaveLength(projects.length);
    expect(new Set(caseStudyProjects.map((project) => project.slug)).size).toBe(caseStudyProjects.length);

    for (const project of caseStudyProjects) {
      expect(project.caseStudy.problem.length).toBeGreaterThan(100);
      expect(project.caseStudy.outcome.length).toBeGreaterThan(100);
      expect(project.caseStudy.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(project.caseStudy).not.toHaveProperty("decisions");
      expect(project.caseStudy).not.toHaveProperty("challenges");

      if (project.links?.length) {
        expect(project.caseStudy.architecture).toHaveLength(3);
        for (const part of project.caseStudy.architecture ?? []) {
          expect(part.label.length).toBeLessThanOrEqual(32);
          expect(part.detail.length).toBeLessThanOrEqual(140);
        }
      } else {
        expect(project.caseStudy.architecture).toBeUndefined();
      }

      for (const link of project.links ?? []) {
        expect(link.href).toMatch(/^https:\/\/github\.com\/oangsa\//);
      }
    }
  });

  it("credits the verified Maintenance Tracking System team", () => {
    const maintenanceProject = caseStudyProjects.find(
      (project) => project.slug === "maintenance-tracking-system",
    );

    expect(maintenanceProject?.caseStudy.contributors).toEqual([
      "Suthang Sukrueangkun",
      "Phirada Lekpaeng",
      "Phenwatsa",
      "Chompuwell",
    ]);
  });

  it("keeps résumé sections complete and suitable for public display", () => {
    expect(experiences.entries).toHaveLength(2);
    expect(educations.entries[0]?.highlights).toContain("GPA: 3.30/4.0");
    expect(activities.entries).toHaveLength(3);

    for (const section of [experiences, educations, activities]) {
      for (const entry of section.entries) {
        expect(entry.title.length).toBeGreaterThan(0);
        expect(entry.organization.length).toBeGreaterThan(0);
        expect(entry.duration.length).toBeGreaterThan(0);
        expect(entry.highlights?.length).toBeGreaterThan(0);
      }
    }

    for (const entry of experiences.entries) {
      expect(entry.highlights).toHaveLength(3);
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
