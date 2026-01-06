import Project from "../types/Project";
import Image from 'next/image'
import { ChevronRight } from "lucide-react";

interface ProjectCardProperties {
    project: Project;
    activeTab: "fullstack" | "qa";


}

export default function ProjectCard({ project, activeTab }: ProjectCardProperties) {
    return (
        <>
            <div className="relative mb-4 rounded-lg overflow-hidden bg-slate-900/60 aspect-video flex items-center justify-center">
                <Image
                    src={project.screenshots && project.screenshots.length > 0
                        ? project.screenshots[0]
                        : '/Pictures/noImage.webp'
                    }
                    alt={`${project.title} preview`}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full" // Added for better image fit
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-emerald-400 text-sm mb-3 font-medium">{project.tech}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

            <div className="flex-grow"></div>


            {activeTab === 'fullstack' ? (
                <div className="flex gap-3">
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                       bg-gradient-to-r from-emerald-500 to-cyan-500
                       text-white rounded-lg text-sm font-medium 
                       hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 
                       transition-all duration-300"
                    >
                        Launch App <ChevronRight size={16} />
                    </a>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                           bg-slate-800/50 border border-slate-700 
                           text-slate-300 rounded-lg text-sm font-medium 
                           hover:bg-slate-700 hover:text-white 
                           transition-all duration-300">
                        View Details
                    </button>
                </div>
            ) : (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 
                       bg-gradient-to-r from-emerald-500 to-cyan-500
                       text-white rounded-lg text-sm font-medium 
                       hover:shadow-lg transition-all duration-300">
                    View Details
                </button>
            )}
        </>
    );
}