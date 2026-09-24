import { SetStateAction } from "react";
import { Code2, FlaskConical } from "lucide-react";

interface RoleToggleProperties {
    activeTab: "fullstack" | "qa";
    setActiveTab: (value: SetStateAction<"fullstack" | "qa">) => void;
}

const roles = [
    { id: 'fullstack', label: 'Full stack', Icon: Code2 },
    { id: 'qa', label: 'QA automation', Icon: FlaskConical },
] as const;

export default function RoleToggle({ activeTab, setActiveTab }: RoleToggleProperties) {
    return (
        <div className="rounded-lg border border-outline bg-surface/80 p-5 shadow-[0_24px_48px_-28px_var(--accent)] backdrop-blur sm:p-6">
            <p id="role-toggle-label" className="font-serif text-xl font-semibold text-fg">Show work for</p>
            <p id="role-toggle-desc" className="mt-1 text-muted">
                Switches the projects, skills, and CV below.
            </p>
            <div
                role="group"
                aria-labelledby="role-toggle-label"
                aria-describedby="role-toggle-desc"
                className="mt-5 grid grid-cols-2 gap-2"
            >
                {roles.map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setActiveTab(id)}
                        aria-pressed={activeTab === id}
                        className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 font-medium whitespace-nowrap transition-colors sm:px-5 ${activeTab === id
                            ? 'border-accent bg-accent text-accent-label'
                            : 'border-outline text-fg hover:border-fg'
                            }`}
                    >
                        <Icon size={18} aria-hidden />
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
