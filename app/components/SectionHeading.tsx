interface SectionHeadingProperties {
    index: string;
    id: string;
    title: string;
    lead?: string;
}

export default function SectionHeading({ index, id, title, lead }: SectionHeadingProperties) {
    return (
        <div>
            <p className="flex items-center gap-3 font-mono text-sm text-accent" aria-hidden>
                {index}
                <span className="h-px w-10 bg-accent/60" />
            </p>
            <h2 id={id} className="mt-2 font-serif text-4xl font-semibold tracking-tight text-fg md:text-5xl">{title}</h2>
            {lead && <p className="mt-3 max-w-2xl text-lg text-pretty text-muted">{lead}</p>}
        </div>
    );
}
