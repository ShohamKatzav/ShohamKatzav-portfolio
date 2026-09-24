import Project from "@/app/types/Project";
import { ArrowUpRight, Github, Loader2, X, BarChart3, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FullscreenMediaViewer from "./fullscreenMediaViewer";
import Image from 'next/image';
import useIsMobile from "../hooks/useIsMobile";

interface ProjectModalProperties {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProperties) {
    const [currentScreenshot, setCurrentScreenshot] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const isMobile = useIsMobile();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setCurrentScreenshot(0);
    }, [project]);

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
    }, [currentScreenshot, project]);

    useEffect(() => {
        const opener = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();
        return () => opener?.focus();
    }, []);

    useEffect(() => {
        if (isFullscreen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isFullscreen, onClose]);

    const primaryBtn = "inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-accent-label shadow-[0_8px_24px_-8px_var(--accent)] transition hover:-translate-y-0.5 hover:bg-accent-hover";
    const secondaryBtn = "inline-flex items-center gap-2 rounded-md border border-outline px-5 py-2.5 font-medium text-fg transition hover:-translate-y-0.5 hover:border-fg";

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4" onClick={onClose}>
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="project-modal-title"
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-outline bg-surface shadow-[0_40px_120px_-40px_var(--accent)]"
                >
                    <div className="sticky top-0 z-20 flex h-0 justify-end">
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={onClose}
                            aria-label="Close details"
                            className="mt-3 mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-outline bg-surface/85 text-fg shadow-lg backdrop-blur transition hover:rotate-90 hover:border-accent hover:text-accent"
                        >
                            <X size={20} aria-hidden />
                        </button>
                    </div>

                    <div className="p-5 sm:p-8">
                        {project.screenshots && project.screenshots.length > 0 && (
                            <div className="mb-6">
                                <div className="relative mb-3 aspect-video overflow-hidden rounded-md border border-hairline bg-sunken">
                                    {isLoading && !isError && (
                                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                                            <Loader2 className="h-8 w-8 text-muted motion-safe:animate-spin" aria-hidden />
                                        </div>
                                    )}

                                    <Image
                                        src={isError ? '/Pictures/noImage.webp' : project.screenshots[currentScreenshot]}
                                        onDoubleClick={() => {
                                            if (isMobile) setIsFullscreen(true);
                                        }}
                                        onClick={() => {
                                            if (!isMobile) setIsFullscreen(true);
                                        }}
                                        fill
                                        className={`cursor-zoom-in object-cover object-top transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                                        alt={`${project.title} screenshot ${currentScreenshot + 1} of ${project.screenshots.length}`}
                                        sizes="(max-width: 896px) 100vw, 832px"
                                        priority
                                        onLoad={() => setIsLoading(false)}
                                        onError={() => {
                                            setIsError(true);
                                            setIsLoading(false);
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                                    <p className="text-sm text-muted">
                                        {isMobile ? 'Double-tap' : 'Click'} the image for full screen
                                    </p>
                                    <div className="flex gap-1">
                                        {project.screenshots.map((_, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setCurrentScreenshot(idx)}
                                                aria-label={`Show screenshot ${idx + 1}`}
                                                aria-current={currentScreenshot === idx}
                                                className="flex h-8 w-8 items-center justify-center"
                                            >
                                                <span className={`block h-2.5 rounded-full transition-all duration-300 ${currentScreenshot === idx
                                                    ? 'w-6 bg-accent'
                                                    : 'w-2.5 border border-outline bg-transparent'
                                                    }`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <h2 id="project-modal-title" className="font-serif text-3xl font-semibold text-balance text-fg md:text-4xl">{project.title}</h2>
                        <p className="mt-2 font-medium text-accent">{project.tech}</p>
                        <p className="mt-4 text-lg leading-relaxed text-fg">{project.description}</p>

                        {project.features && project.features.length > 0 && (
                            <div className="mt-8">
                                <h3 className="font-serif text-xl font-semibold text-fg">What it does</h3>
                                <ul className="mt-3 space-y-2.5 leading-relaxed text-fg">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="flex gap-2.5">
                                            <ChevronRight size={18} aria-hidden className="mt-1 shrink-0 text-accent" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.challenges && (
                            <div className="mt-8 rounded-lg border border-hairline border-l-4 border-l-accent bg-sunken/70 p-5">
                                <h3 className="font-serif text-xl font-semibold text-fg">The hard part</h3>
                                <p className="mt-2 leading-relaxed text-fg">{project.challenges}</p>
                            </div>
                        )}

                        {project.credentials && project.credentials.length > 0 && (
                            <div className="mt-8 rounded-md border border-outline bg-sunken p-4">
                                <h3 className="font-medium text-fg">Demo accounts</h3>
                                <p className="mt-1 text-sm text-muted">Log in with one of these instead of signing up.</p>
                                <dl className="mt-3 grid gap-4 sm:grid-cols-2">
                                    {project.credentials.map((cred, credIdx) => (
                                        <div key={credIdx} className="text-sm">
                                            <dt className="font-medium text-accent">
                                                {cred.authorization
                                                    ? cred.authorization.slice(0, 1).toUpperCase() + cred.authorization.slice(1)
                                                    : `Account${project.credentials!.length > 1 ? ` ${credIdx + 1}` : ''}`}
                                            </dt>
                                            <dd className="mt-1 text-fg">
                                                <span className="text-muted">Username: </span>
                                                <span className="font-mono break-all">{cred.username}</span>
                                            </dd>
                                            <dd className="text-fg">
                                                <span className="text-muted">Password: </span>
                                                <span className="font-mono">{cred.password}</span>
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}

                        <div className="mt-8 flex flex-wrap gap-3">
                            {project.demo && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                                    Launch App <ArrowUpRight size={16} aria-hidden />
                                </a>
                            )}
                            {project.reportUrl && (
                                <a href={project.reportUrl} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                                    <BarChart3 size={16} aria-hidden />
                                    View Report
                                </a>
                            )}
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                                <Github size={18} aria-hidden />
                                View Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {isFullscreen && project.screenshots && (
                <FullscreenMediaViewer
                    src={project.screenshots[currentScreenshot]}
                    currentScreenshot={currentScreenshot}
                    setCurrentScreenshot={setCurrentScreenshot}
                    screenshotsLength={project.screenshots.length}
                    onClose={() => setIsFullscreen(false)}
                />
            )}
        </>
    );
}
