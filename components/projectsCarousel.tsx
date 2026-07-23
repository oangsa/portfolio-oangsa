/* Hallmark · component: looping projects carousel · genre: modern-minimal · theme: locked custom
 * states: default · hover · focus · active · disabled · loading · error · success
 * contrast: pass (40–41)
 */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 */
"use client";

import {
  Children,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCircleExclamation,
  FaSpinner,
} from "react-icons/fa6";

export const PROJECTS_PER_PAGE = 2;
export const PROJECTS_AUTO_ADVANCE_MS = 5_000;
export const PROJECTS_DESKTOP_MEDIA_QUERY = "(min-width: 40rem)";

function getHorizontalScrollPosition(
  viewport: HTMLElement,
  item: HTMLElement,
): number {
  return Math.round(
    viewport.scrollLeft
      + item.getBoundingClientRect().left
      - viewport.getBoundingClientRect().left,
  );
}

function moveMobileViewportTo(
  viewport: HTMLElement,
  item: HTMLElement,
): void {
  viewport.scrollLeft = getHorizontalScrollPosition(viewport, item);
}

export function paginateItems<T>(
  items: readonly T[],
  pageSize = PROJECTS_PER_PAGE,
): T[][] {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError("pageSize must be a positive integer");
  }

  return Array.from(
    { length: Math.ceil(items.length / pageSize) },
    (_, pageIndex) => items.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
  );
}

export function getLoopedPageIndex(
  currentPageIndex: number,
  step: number,
  pageCount: number,
): number {
  if (!Number.isInteger(pageCount) || pageCount < 1) {
    throw new RangeError("pageCount must be a positive integer");
  }

  return ((currentPageIndex + step) % pageCount + pageCount) % pageCount;
}

export type CarouselControlState =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "disabled"
  | "loading"
  | "error"
  | "success";

interface CarouselControlProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  visualState?: CarouselControlState;
}

export function CarouselControl({
  children,
  className,
  disabled,
  visualState = "default",
  ...buttonProps
}: CarouselControlProps): JSX.Element {
  const isLoading = visualState === "loading";
  const isNativeDisabled = disabled || visualState === "disabled" || isLoading;
  const forcedStateClass = ["hover", "focus", "active"].includes(visualState)
    ? `is-${visualState}`
    : undefined;
  const classes = ["projects-carousel-control", forcedStateClass, className]
    .filter(Boolean)
    .join(" ");
  const feedbackContent = visualState === "loading"
    ? <><FaSpinner className="projects-carousel-control-spinner" aria-hidden="true" /><span className="visually-hidden">Loading…</span></>
    : visualState === "error"
      ? <><FaCircleExclamation aria-hidden="true" /><span className="visually-hidden">Try again</span></>
      : visualState === "success"
        ? <><FaCheck aria-hidden="true" /><span className="visually-hidden">Updated</span></>
        : children;

  return (
    <button
      {...buttonProps}
      type="button"
      className={classes}
      data-state={visualState}
      disabled={isNativeDisabled}
      aria-busy={isLoading || undefined}
      aria-disabled={isNativeDisabled || buttonProps["aria-disabled"]}
      aria-live={["loading", "error", "success"].includes(visualState) ? "polite" : undefined}
    >
      {feedbackContent}
    </button>
  );
}

interface ProjectsCarouselProps {
  children: ReactNode;
  label?: string;
  pageSize?: number;
}

export default function ProjectsCarousel({
  children,
  label = "Selected projects",
  pageSize = PROJECTS_PER_PAGE,
}: ProjectsCarouselProps): JSX.Element | null {
  const cards = useMemo(() => Children.toArray(children), [children]);
  const pages = useMemo(() => paginateItems(cards, pageSize), [cards, pageSize]);
  const [pageIndex, setPageIndex] = useState(0);
  const [outgoingPageIndex, setOutgoingPageIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"idle" | "forward" | "backward">("idle");
  const [isPointerPaused, setIsPointerPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [announcementMode, setAnnouncementMode] = useState<"off" | "polite">("off");
  const mobileViewportRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId();
  const panelId = `projects-carousel-${reactId.replaceAll(":", "")}`;
  const currentPageIndex = pages.length > 0
    ? getLoopedPageIndex(pageIndex, 0, pages.length)
    : 0;
  const firstProjectNumber = currentPageIndex * pageSize + 1;
  const lastProjectNumber = Math.min(firstProjectNumber + pageSize - 1, cards.length);
  const projectCountLabel = `${pageSize} ${pageSize === 1 ? "project" : "projects"}`;
  const hasMobileLoop = cards.length > 1;

  const prepareMobileViewport = useCallback((viewport: HTMLDivElement | null): void => {
    mobileViewportRef.current = viewport;

    if (!viewport || cards.length < 2) {
      return;
    }

    viewport.querySelectorAll<HTMLElement>("[data-loop-clone]").forEach((clone) => {
      clone.setAttribute("inert", "");
    });

    if (window.matchMedia(PROJECTS_DESKTOP_MEDIA_QUERY).matches) {
      return;
    }

    const firstProject = viewport.querySelector<HTMLElement>(
      ".projects-carousel-page .project-card",
    );

    if (firstProject) {
      moveMobileViewportTo(viewport, firstProject);
    }
  }, [cards.length]);

  useEffect(() => {
    const viewport = mobileViewportRef.current;

    if (!viewport || cards.length < 2) {
      return;
    }

    const desktopViewportQuery = window.matchMedia(PROJECTS_DESKTOP_MEDIA_QUERY);
    let settleTimeoutId: number | undefined;
    let breakpointFrameId: number | undefined;

    const clearPendingLoopCheck = (): void => {
      if (settleTimeoutId !== undefined) {
        window.clearTimeout(settleTimeoutId);
        settleTimeoutId = undefined;
      }
    };

    const getRealProjects = (): HTMLElement[] => Array.from(
      viewport.querySelectorAll<HTMLElement>(".projects-carousel-page .project-card"),
    );

    const loopAtMobileBoundary = (): void => {
      settleTimeoutId = undefined;

      if (desktopViewportQuery.matches) {
        return;
      }

      const leadingClone = viewport.querySelector<HTMLElement>(
        '[data-loop-clone="leading"]',
      );
      const trailingClone = viewport.querySelector<HTMLElement>(
        '[data-loop-clone="trailing"]',
      );
      const realProjects = getRealProjects();
      const firstProject = realProjects.at(0);
      const lastProject = realProjects.at(-1);

      if (!leadingClone || !trailingClone || !firstProject || !lastProject) {
        return;
      }

      const tolerance = Math.max(2, viewport.clientWidth * 0.02);
      const leadingPosition = getHorizontalScrollPosition(viewport, leadingClone);
      const trailingPosition = getHorizontalScrollPosition(viewport, trailingClone);

      if (Math.abs(viewport.scrollLeft - leadingPosition) <= tolerance) {
        moveMobileViewportTo(viewport, lastProject);
      } else if (Math.abs(viewport.scrollLeft - trailingPosition) <= tolerance) {
        moveMobileViewportTo(viewport, firstProject);
      }
    };

    const scheduleLoopCheck = (): void => {
      clearPendingLoopCheck();
      settleTimeoutId = window.setTimeout(loopAtMobileBoundary, 100);
    };

    const resetMobilePosition = (): void => {
      clearPendingLoopCheck();

      if (breakpointFrameId !== undefined) {
        window.cancelAnimationFrame(breakpointFrameId);
      }

      if (desktopViewportQuery.matches) {
        return;
      }

      breakpointFrameId = window.requestAnimationFrame(() => {
        breakpointFrameId = undefined;
        const firstProject = getRealProjects().at(0);

        if (firstProject) {
          moveMobileViewportTo(viewport, firstProject);
        }
      });
    };

    viewport.addEventListener("scroll", scheduleLoopCheck, { passive: true });
    desktopViewportQuery.addEventListener("change", resetMobilePosition);

    return () => {
      clearPendingLoopCheck();

      if (breakpointFrameId !== undefined) {
        window.cancelAnimationFrame(breakpointFrameId);
      }

      viewport.removeEventListener("scroll", scheduleLoopCheck);
      desktopViewportQuery.removeEventListener("change", resetMobilePosition);
    };
  }, [cards.length]);

  useEffect(() => {
    if (pages.length < 2 || isPointerPaused || isFocusPaused) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewportQuery = window.matchMedia(PROJECTS_DESKTOP_MEDIA_QUERY);
    let timeoutId: number | undefined;

    const clearAutoAdvance = (): void => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const scheduleAutoAdvance = (): void => {
      clearAutoAdvance();

      if (document.hidden || reducedMotionQuery.matches || !desktopViewportQuery.matches) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        setAnnouncementMode("off");
        setOutgoingPageIndex(currentPageIndex);
        setDirection("forward");
        setPageIndex(getLoopedPageIndex(currentPageIndex, 1, pages.length));
      }, PROJECTS_AUTO_ADVANCE_MS);
    };

    scheduleAutoAdvance();
    document.addEventListener("visibilitychange", scheduleAutoAdvance);
    reducedMotionQuery.addEventListener("change", scheduleAutoAdvance);
    desktopViewportQuery.addEventListener("change", scheduleAutoAdvance);

    return () => {
      clearAutoAdvance();
      document.removeEventListener("visibilitychange", scheduleAutoAdvance);
      reducedMotionQuery.removeEventListener("change", scheduleAutoAdvance);
      desktopViewportQuery.removeEventListener("change", scheduleAutoAdvance);
    };
  }, [currentPageIndex, isFocusPaused, isPointerPaused, pages.length]);

  if (pages.length === 0) {
    return null;
  }

  const moveBy = (step: -1 | 1): void => {
    if (pages.length < 2) {
      return;
    }

    setAnnouncementMode("polite");
    setOutgoingPageIndex(currentPageIndex);
    setDirection(step > 0 ? "forward" : "backward");
    setPageIndex(getLoopedPageIndex(currentPageIndex, step, pages.length));
  };

  const directionClass = direction === "idle" ? "" : ` is-${direction}`;
  const hasNavigation = pages.length > 1;

  return (
    <div
      className="projects-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsPointerPaused(true)}
      onMouseLeave={() => setIsPointerPaused(false)}
      onFocusCapture={() => setIsFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusPaused(false);
        }
      }}
    >
      <p className="visually-hidden" aria-live={announcementMode} aria-atomic="true">
        Showing projects {firstProjectNumber}–{lastProjectNumber} of {cards.length}.
      </p>
      <div className={`projects-carousel-stage${hasNavigation ? " has-navigation" : ""}`}>
        <div className="projects-carousel-viewport" ref={prepareMobileViewport}>
          {hasMobileLoop ? (
            <div
              className="projects-carousel-mobile-clone"
              data-loop-clone="leading"
              aria-hidden="true"
            >
              {cards.at(-1)}
            </div>
          ) : null}
          {pages.map((page, renderedPageIndex) => {
            const isCurrentPage = renderedPageIndex === currentPageIndex;
            const isOutgoingPage = renderedPageIndex === outgoingPageIndex;
            const pageStateClass = isCurrentPage
              ? ` is-current${directionClass}`
              : isOutgoingPage
                ? ` is-outgoing${directionClass}`
                : "";

            return (
              <div
                key={renderedPageIndex}
                id={isCurrentPage ? panelId : undefined}
                className={`projects-grid projects-carousel-page${pageStateClass}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Project page ${renderedPageIndex + 1} of ${pages.length}`}
                onAnimationEnd={isCurrentPage ? (event) => {
                  if (event.target === event.currentTarget) {
                    setOutgoingPageIndex(null);
                  }
                } : undefined}
              >
                {page}
              </div>
            );
          })}
          {hasMobileLoop ? (
            <div
              className="projects-carousel-mobile-clone"
              data-loop-clone="trailing"
              aria-hidden="true"
            >
              {cards.at(0)}
            </div>
          ) : null}
        </div>

        {hasNavigation ? (
          <div className="projects-carousel-arrows" role="group" aria-label="Project pages">
            <CarouselControl
              className="projects-carousel-arrow"
              aria-label={`Show previous ${projectCountLabel}`}
              aria-controls={panelId}
              onClick={() => moveBy(-1)}
            >
              <FaChevronLeft aria-hidden="true" />
            </CarouselControl>
            <CarouselControl
              className="projects-carousel-arrow"
              aria-label={`Show next ${projectCountLabel}`}
              aria-controls={panelId}
              onClick={() => moveBy(1)}
            >
              <FaChevronRight aria-hidden="true" />
            </CarouselControl>
          </div>
        ) : null}
      </div>
    </div>
  );
}
