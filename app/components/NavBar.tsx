import { SetStateAction, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavBarProperties {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (value: SetStateAction<boolean>) => void;
}

const links = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'CV', label: 'CV' },
    { id: 'contact', label: 'Contact' },
];

const sectionIds = ['home', 'projects', 'skills', 'CV', 'contact'];

export default function NavBar({ mobileMenuOpen, setMobileMenuOpen }: NavBarProperties) {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);
        if (sections.length === 0) return;

        const update = () => {
            const marker = window.scrollY + 96;
            let current = 'home';
            for (const section of sections) {
                if (section.getBoundingClientRect().top + window.scrollY <= marker) current = section.id;
            }
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
                current = sections[sections.length - 1].id;
            }
            setActiveSection(current);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [mobileMenuOpen, setMobileMenuOpen]);

    return (
        <>
        <header className="sticky top-0 z-40 border-b border-hairline bg-surface/90 shadow-[0_1px_0_0_var(--accent)] backdrop-blur-md">
            <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <a href="#home" className="font-serif text-xl font-semibold tracking-tight text-fg" onClick={() => setMobileMenuOpen(false)}>
                    Shoham Katzav
                </a>

                <div className="flex items-center gap-6">
                    <ul className="hidden items-center gap-1 md:flex">
                        {links.map(({ id, label }) => {
                            const current = activeSection === id;
                            return (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        aria-current={current ? 'true' : undefined}
                                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${current
                                            ? 'bg-accent/15 text-fg'
                                            : 'text-muted hover:bg-sunken hover:text-fg'
                                            }`}
                                    >
                                        {label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(prev => !prev)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        className="rounded-md p-1 text-fg md:hidden"
                    >
                        {mobileMenuOpen ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
                    </button>
                </div>
            </nav>
        </header>

            {mobileMenuOpen && (
                <div className="fixed inset-x-0 top-16 bottom-0 z-30 md:hidden">
                    <div className="absolute inset-0 bg-black/90" onClick={() => setMobileMenuOpen(false)} />
                    <ul id="mobile-menu" className="relative border-b border-hairline bg-surface px-3 py-2 shadow-lg">
                        {links.map(({ id, label }) => {
                            const current = activeSection === id;
                            return (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        aria-current={current ? 'true' : undefined}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block rounded-md px-3 py-3 text-lg ${current ? 'bg-accent/15 font-medium text-fg' : 'text-fg'}`}
                                    >
                                        {label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
