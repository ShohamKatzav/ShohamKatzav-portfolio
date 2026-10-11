"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Project from "../types/Project";
import ProjectCard from "./ProjectCard";

interface ProjectCarouselProperties {
    projects: Project[];
    activeTab: "fullstack" | "qa";
    onOpen: (project: Project) => void;
}

export default function ProjectCarousel({ projects, activeTab, onOpen }: ProjectCarouselProperties) {
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const update = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setCanLeft(el.scrollLeft > 2);
        setCanRight(max > 2 && el.scrollLeft < max - 2);
    }, []);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollLeft = 0;
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        el.addEventListener("scroll", update, { passive: true });
        return () => {
            observer.disconnect();
            el.removeEventListener("scroll", update);
        };
    }, [activeTab, projects, update]);

    const move = (direction: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;
        const cards = [...el.children].filter((node): node is HTMLLIElement => node instanceof HTMLLIElement);
        if (cards.length === 0) return;
        const origin = el.getBoundingClientRect().left;
        const current = cards.reduce((nearest, card) =>
            Math.abs(card.getBoundingClientRect().left - origin) < Math.abs(nearest.getBoundingClientRect().left - origin) ? card : nearest
        );
        const next = cards[cards.indexOf(current) + direction];
        if (!next) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const left = next.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
        el.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    };

    const arrow = "flex h-11 w-11 items-center justify-center rounded-full border border-outline text-fg transition hover:border-fg disabled:cursor-not-allowed disabled:opacity-35";

    return (
        <div className="mt-8">
            <div className="mb-4 flex justify-end gap-2">
                <button type="button" className={arrow} onClick={() => move(-1)} disabled={!canLeft} aria-label="Show previous projects">
                    <ChevronLeft size={22} aria-hidden />
                </button>
                <button type="button" className={arrow} onClick={() => move(1)} disabled={!canRight} aria-label="Show next projects">
                    <ChevronRight size={22} aria-hidden />
                </button>
            </div>
            <ul
                ref={scrollerRef}
                className="relative -mt-2 -mb-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pt-2 pb-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {projects.map((project) => (
                    <li key={`${activeTab}-${project.title}`} className="flex w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
                        <ProjectCard project={project} activeTab={activeTab} onOpen={() => onOpen(project)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
