/* Hallmark · component preview: looping projects carousel · all eight interaction states */
"use client";

import { FaChevronRight } from "react-icons/fa6";
import {
  CarouselControl,
  type CarouselControlState,
} from "@/components/projectsCarousel";

const previewStates: Array<{ label: string; state: CarouselControlState }> = [
  { label: "Default", state: "default" },
  { label: "Hover", state: "hover" },
  { label: "Focus", state: "focus" },
  { label: "Active", state: "active" },
  { label: "Disabled", state: "disabled" },
  { label: "Loading", state: "loading" },
  { label: "Error", state: "error" },
  { label: "Success", state: "success" },
];

export default function ProjectsCarouselPreview(): JSX.Element {
  return (
    <section className="projects-carousel-preview" aria-labelledby="projects-carousel-preview-heading">
      <h2 id="projects-carousel-preview-heading">Project carousel — eight states</h2>
      <div className="projects-carousel-preview-list">
        {previewStates.map(({ label, state }) => (
          <div className="projects-carousel-preview-row" key={state}>
            <span>{label}</span>
            <CarouselControl
              className="projects-carousel-arrow"
              visualState={state}
              aria-label={`${label} carousel arrow state`}
            >
              <FaChevronRight aria-hidden="true" />
            </CarouselControl>
          </div>
        ))}
      </div>
    </section>
  );
}
