import { SetStateAction } from "react";
import { Code, TestTube } from "lucide-react";

interface RoleToggleProperties {
    activeTab: "fullstack" | "qa";
    setActiveTab: (value: SetStateAction<"fullstack" | "qa">) => void;
}

export default function RoleToggle({ activeTab, setActiveTab }: RoleToggleProperties) {
    return (
        <div className="flex justify-center mb-12">
            <div id="projects" className="bg-slate-800/50 backdrop-blur-sm rounded-full p-2 inline-flex gap-2">
                <button
                    onClick={() => setActiveTab('fullstack')}
                    className={`px-4 py-2 md:px-8 md:py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                         ${activeTab === 'fullstack'
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Code size={20} />
                    Full Stack
                </button>
                <button
                    onClick={() => setActiveTab('qa')}
                    className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                         ${activeTab === 'qa'
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <TestTube size={20} />
                    QA Automation
                </button>
            </div>
        </div>
    );
}