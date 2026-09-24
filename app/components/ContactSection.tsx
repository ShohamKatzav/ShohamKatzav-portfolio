import { Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const contacts = [
    { label: 'Email', value: 'shohamkatzav95@gmail.com', href: 'mailto:shohamkatzav95@gmail.com', Icon: Mail },
    { label: 'Phone', value: '+972-52-329-2847', href: 'tel:+972523292847', Icon: Phone },
    { label: 'LinkedIn', value: 'linkedin.com/in/shoham-katzav', href: 'https://www.linkedin.com/in/shoham-katzav', Icon: Linkedin },
    { label: 'GitHub', value: 'github.com/ShohamKatzav', href: 'https://github.com/ShohamKatzav', Icon: Github },
];

export default function ContactSection() {

    return (
        <section id="contact" aria-labelledby="contact-title" className="border-t border-hairline py-16 md:py-20">
            <SectionHeading
                index="04"
                id="contact-title"
                title="Contact"
                lead="I'm looking for a full stack or QA automation role. Email is the fastest way to reach me."
            />

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {contacts.map(({ label, value, href, Icon }) => {
                    const external = href.startsWith('http');
                    return (
                        <li key={label}>
                            <a
                                href={href}
                                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="group flex items-center gap-4 rounded-lg border border-hairline bg-surface/80 p-4 transition hover:-translate-y-0.5 hover:border-accent"
                            >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-label">
                                    <Icon size={20} aria-hidden />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm text-muted">{label}</span>
                                    <span className="block break-all font-medium text-fg">{value}</span>
                                </span>
                                <ArrowUpRight size={18} aria-hidden className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </section>
    )
}
