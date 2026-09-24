"use client"
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const subscribe = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
};

export default function ThemeToggle() {
    const isDark = useSyncExternalStore(
        subscribe,
        () => document.documentElement.classList.contains('dark'),
        () => true
    );

    const toggle = () => {
        const next = isDark ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', next === 'dark');
        try {
            localStorage.setItem('theme', next);
        } catch { }
    };

    const nextLabel = isDark ? 'Light' : 'Dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
            className="inline-flex items-center gap-1.5 rounded-md border border-outline px-2.5 py-1.5 text-sm text-fg transition-colors hover:border-fg"
        >
            {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
            {nextLabel}
        </button>
    );
}
