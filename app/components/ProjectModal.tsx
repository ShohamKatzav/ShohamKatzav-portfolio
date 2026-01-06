import Project from "@/app/types/Project";
import { ChevronRight, Github, X } from "lucide-react";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        setCurrentScreenshot(0);
    }, [project]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 relative">
                <button
                    onClick={onClose}
                    className="sticky top-4 right-4 float-right z-10 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
                >
                    <X size={24} className="text-white" />
                </button>

                <div className="p-8">
                    {/* Screenshots Gallery */}
                    {project.screenshots && project.screenshots.length > 0 && (
                        <div className="mb-6">
                            <div className="relative rounded-lg overflow-hidden bg-slate-800 mb-4 aspect-video">

                                <Image
                                    src={project.screenshots[currentScreenshot]}
                                    onDoubleClick={() => {
                                        if (isMobile) setIsFullscreen(true);
                                    }}
                                    onClick={() => {
                                        if (!isMobile) setIsFullscreen(true);
                                    }}
                                    fill
                                    className="object-cover"
                                    alt={`${project.title} screenshot ${currentScreenshot + 1}`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="flex gap-2 justify-center">
                                {project.screenshots.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentScreenshot(idx)}
                                        className={`w-3 h-3 rounded-full transition-all ${currentScreenshot === idx
                                            ? 'bg-emerald-500 w-8'
                                            : 'bg-slate-600 hover:bg-slate-500'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                    <p className="text-emerald-400 font-medium mb-4">{project.tech}</p>
                    <p className="text-gray-300 text-lg mb-6">{project.description}</p>

                    {/* Key Features */}
                    {project.features && project.features.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                            <ul className="space-y-2">
                                {project.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                                        <ChevronRight size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technical Challenges */}
                    {project.challenges && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3">Technical Challenges & Solutions</h3>
                            <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
                        </div>
                    )}

                    {/* Demo Credentials */}
                    {project.credentials && project.credentials.length > 0 && (
                        <div className="mb-6 bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-semibold text-emerald-400">Demo Credentials</span>
                            </div>
                            {project.credentials.map((cred, credIdx) => (
                                <div key={credIdx} className="text-sm text-gray-300 space-y-1 mb-3 last:mb-0">
                                    {project.credentials!.length > 1 && cred.authorization ? (
                                        <div className="text-emerald-300 font-medium">
                                            {cred.authorization.slice(0, 1).toUpperCase() + cred.authorization.slice(1)}:
                                        </div>
                                    ) : (
                                        <div className="text-emerald-300 font-medium">Account{project.credentials!.length > 1 && <span> {credIdx + 1}</span>}:</div>
                                    )}
                                    <div><span className="text-gray-400">Username:</span> {cred.username}</div>
                                    <div><span className="text-gray-400">Password:</span> {cred.password}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                            >
                                Launch App <ChevronRight size={16} />
                            </a>
                        )}
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-all duration-300"
                        >
                            <Github size={18} />
                            View Source Code
                        </a>
                    </div>
                </div>
            </div>
            {isFullscreen && project.screenshots && (
                <FullscreenMediaViewer
                    src={project.screenshots[currentScreenshot]}
                    onClose={() => setIsFullscreen(false)}
                />
            )}
        </div>
    );
}