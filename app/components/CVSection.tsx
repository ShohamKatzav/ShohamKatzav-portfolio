import { Download, FileText } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface CVSectionProperties {
    activeTab: "fullstack" | "qa";
}

const cvs = [
    {
        id: 'fullstack',
        label: 'Full Stack Developer CV',
        blurb: 'React, Next.js, Angular, .NET, and Node.js work, with the apps you can open above.',
        href: process.env.NEXT_PUBLIC_CV_FULLSTACK_URL?.trim() || '/Shoham_Katzav_Fullstack_CV.pdf',
    },
    {
        id: 'qa',
        label: 'QA Automation CV',
        blurb: 'Playwright, Selenium, and REST Assured frameworks, CI pipelines, and published reports.',
        href: process.env.NEXT_PUBLIC_CV_QA_URL?.trim() || '/Shoham_Katzav_Automation_CV.pdf',
    },
] as const;

const linkProps = (href: string) => ({
    href,
    download: true,
    ...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
});

export default function CVSection({ activeTab }: CVSectionProperties) {
    const ordered = [...cvs].sort((a, b) => Number(b.id === activeTab) - Number(a.id === activeTab));

    return (
        <section id="CV" aria-labelledby="cv-title" className="border-t border-hairline py-16 md:py-20">
            <SectionHeading index="03" id="cv-title" title="Download CV" lead="Choose the CV that best fits the opportunity." />

            <ul className="mt-8 grid gap-5 md:grid-cols-2">
                {ordered.map(({ id, label, blurb, href }) => {
                    const matches = id === activeTab;
                    return (
                        <li key={id}>
                            <a
                                {...linkProps(href)}
                                className={`group relative flex h-full flex-col overflow-hidden rounded-lg border p-6 transition hover:-translate-y-1 ${matches
                                    ? 'border-accent bg-surface shadow-[0_18px_48px_-24px_var(--accent)]'
                                    : 'border-hairline bg-surface/70 hover:border-outline'
                                    }`}
                            >
                                <span className="flex items-center justify-between gap-3">
                                    <span className={`flex h-11 w-11 items-center justify-center rounded-md ${matches ? 'bg-accent text-accent-label' : 'bg-sunken text-accent'}`}>
                                        <FileText size={22} aria-hidden />
                                    </span>
                                    {matches && (
                                        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                                            Matches the work shown
                                        </span>
                                    )}
                                </span>
                                <span className="mt-5 font-serif text-2xl font-semibold text-fg">{label}</span>
                                <span className="mt-2 leading-relaxed text-muted">{blurb}</span>
                                <span className="mt-6 inline-flex items-center gap-2 font-medium text-accent">
                                    <Download size={18} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
                                    Download PDF
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </section>
    )
}
