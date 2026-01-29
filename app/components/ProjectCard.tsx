import Project from "../types/Project";
import Image from 'next/image'
import { ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectCardProperties {
    project: Project;
    activeTab: "fullstack" | "qa";
}

export default function ProjectCard({ project, activeTab }: ProjectCardProperties) {
    const imgSrc = project.screenshots?.[0] || '/Pictures/noImage.webp';
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [activeTab, project]);

    const isFullstack = activeTab === 'fullstack';
    const primaryLink = isFullstack ? project.demo : project.reportUrl;
    const primaryLabel = isFullstack ? "Launch App" : "View Report";

    const primaryBtnClass = `flex-1 flex items-center justify-center gap-2 px-4 py-2 
                           bg-gradient-to-r from-emerald-500 to-cyan-500
                           text-white rounded-lg text-sm font-medium whitespace-nowrap
                           hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 
                           transition-all duration-300`;

    const secondaryBtnClass = `flex-1 flex items-center justify-center gap-2 px-4 py-2 
                             bg-slate-800/50 border border-slate-700 
                             text-slate-300 rounded-lg text-sm font-medium whitespace-nowrap
                             hover:bg-slate-700 hover:text-white 
                             transition-all duration-300`;

    return (
        <>
            <div className="relative mb-4 rounded-lg overflow-hidden bg-slate-900/60 aspect-video flex items-center justify-center">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900/60">
                        <Loader2 className="w-10 h-10 text-white animate-spin opacity-50" />
                    </div>
                )}
                <Image
                    key={`${project.title}-${activeTab}`}
                    src={imgSrc}
                    alt={`${project.title} preview`}
                    width={500}
                    height={500}
                    priority
                    className={`object-cover w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    onLoad={() => setIsLoading(false)}
                    onError={(e) => {
                        e.currentTarget.src = '/Pictures/noImage.webp';
                        setIsLoading(false);
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-emerald-400 text-sm mb-3 font-medium">{project.tech}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

            <div className="flex-grow"></div>

            <div className="flex gap-3">
                {primaryLink && (
                    <a
                        href={primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={primaryBtnClass}
                    >
                        {primaryLabel} <ChevronRight size={16} />
                    </a>
                )}
                <button className={secondaryBtnClass}>
                    View Details
                </button>
            </div>
        </>
    );
}