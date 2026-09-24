import Project from "../types/Project";
import Image from 'next/image'
import { ArrowUpRight, Github, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectCardProperties {
    project: Project;
    activeTab: "fullstack" | "qa";
    onOpen: () => void;
}

export default function ProjectCard({ project, activeTab, onOpen }: ProjectCardProperties) {
    const imgSrc = project.screenshots?.[0] || '/Pictures/noImage.webp';
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [activeTab, project]);

    const isFullstack = activeTab === 'fullstack';
    const primaryLink = isFullstack ? project.demo : project.reportUrl;
    const primaryLabel = isFullstack ? "Launch App" : "View Report";
    const stop = (e: React.MouseEvent) => e.stopPropagation();
    const crop = project.cardCrop;
    const cropStyle = crop ? {
        width: `${100 / crop.width}%`,
        height: `${100 / crop.height}%`,
        left: `${-crop.x / crop.width * 100}%`,
        top: `${-crop.y / crop.height * 100}%`,
    } : undefined;

    return (
        <article
            onClick={onOpen}
            className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-outline bg-surface transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-20px_var(--accent)] dark:border-hairline dark:hover:border-accent"
        >
            <div className="relative aspect-video overflow-hidden border-b border-hairline bg-sunken">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-muted motion-safe:animate-spin" aria-hidden />
                    </div>
                )}
                <div className="absolute inset-0" style={cropStyle}>
                    <Image
                        key={`${project.title}-${activeTab}`}
                        src={imgSrc}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes={crop ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
                        priority
                        className={`object-cover object-top transition duration-500 motion-safe:group-hover:scale-[1.03] ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                        onError={(e) => {
                            e.currentTarget.src = '/Pictures/noImage.webp';
                            setIsLoading(false);
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-2xl font-semibold text-balance text-fg">{project.title}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{project.tech}</p>
                <p className="mt-3 leading-relaxed text-fg">{project.description}</p>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                    {primaryLink && (
                        <a
                            href={primaryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={stop}
                            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-label transition-colors hover:bg-accent-hover"
                        >
                            {primaryLabel} <ArrowUpRight size={16} aria-hidden />
                        </a>
                    )}
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={stop}
                        className={primaryLink
                            ? "inline-flex items-center gap-1.5 rounded-md border border-outline px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-fg"
                            : "inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-label transition-colors hover:bg-accent-hover"
                        }
                    >
                        <Github size={16} aria-hidden /> GitHub
                    </a>
                    <button
                        type="button"
                        onClick={(e) => { stop(e); onOpen(); }}
                        className="text-sm font-medium text-accent underline underline-offset-4 transition-colors hover:text-fg"
                    >
                        Details<span className="sr-only"> about {project.title}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}
