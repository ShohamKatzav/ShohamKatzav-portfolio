import { SetStateAction } from "react";
import { Menu, X } from "lucide-react";

interface NavBarProperties {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (value: SetStateAction<boolean>) => void;
}

export default function NavBar({ mobileMenuOpen, setMobileMenuOpen }: NavBarProperties) {

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        const headerOffset = 64;
        const elementPosition = element?.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        if (element) {
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="text-xl font-bold text-white">Shoham Katzav</div>

                    <div className="hidden md:flex items-center gap-8">
                        {['home', 'projects', 'skills', 'CV', 'contact'].map((id) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(prev => !prev)}
                        aria-expanded={mobileMenuOpen}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        className="md:hidden text-white z-50"
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setMobileMenuOpen(false)}
                />

                <div
                    className={`absolute top-16 left-0 right-0 bg-slate-900 border-t border-slate-800
      transition-transform duration-200 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
                        }`}
                >
                    <nav className="flex flex-col px-6 py-4">
                        {['home', 'projects', 'skills', 'CV', 'contact'].map((id) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className="py-4 text-left text-lg text-gray-300 hover:text-white transition-colors"
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </nav>
    );
}
