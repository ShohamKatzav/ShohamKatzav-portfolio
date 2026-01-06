import fullStackSkillsData from '@/app/data/fullstack-skills.json';
import qaSkillsData from '@/app/data/qa-skills.json'

export default function SkillsSection() {
    return (
        <div id="skills" className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Tech Stack</h2>
            <div className="grid gap-8 mb-8">
                <div>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">Full Stack Development</h3>
                    <div className="flex flex-wrap gap-3">
                        {fullStackSkillsData.map((skill: string, idx: number) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-slate-800/60 md:backdrop-blur-sm text-gray-300 rounded-full text-sm border border-slate-700/50"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">QA Automation</h3>
                    <div className="flex flex-wrap gap-3">
                        {qaSkillsData.map((skill: string, idx: number) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-slate-800/60 md:backdrop-blur-sm text-gray-300 rounded-full text-sm border border-slate-700/50"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}