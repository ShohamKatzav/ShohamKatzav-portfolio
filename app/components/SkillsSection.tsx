import fullStackSkillsData from '@/app/data/fullstack-skills.json';
import qaSkillsData from '@/app/data/qa-skills.json'
import SectionHeading from './SectionHeading';

interface SectionProperties {
    activeTab: "fullstack" | "qa";
}

const groups = {
    fullstack: { title: 'Full Stack', skills: fullStackSkillsData },
    qa: { title: 'QA Automation', skills: qaSkillsData },
};

export default function SkillsSection({ activeTab }: SectionProperties) {
    const { title, skills } = groups[activeTab];

    return (
        <section id="skills" aria-labelledby="skills-title" className="border-t border-hairline py-16 md:py-20">
            <SectionHeading index="02" id="skills-title" title="Skills" />
            <h3 id="skills-group" className="mt-10 font-serif text-2xl font-semibold text-accent italic">{title}</h3>
            <ul aria-labelledby="skills-group" className="mt-5 flex flex-wrap gap-3">
                {skills.map((skill: string) => (
                    <li
                        key={skill}
                        className="rounded-full border border-hairline bg-surface/80 px-4 py-2 text-base font-medium text-fg transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                        {skill}
                    </li>
                ))}
            </ul>
        </section>
    )
}
