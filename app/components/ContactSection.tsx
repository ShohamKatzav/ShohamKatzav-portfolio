import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactSection() {

    return (
        <div id="contact" className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-gray-400 mb-8">
                Currently looking for new opportunities. If you like what you see, I'd love to hear from you.
            </p>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-gray-300">
                        <Mail size={20} className="text-emerald-400" />
                        <a href="mailto:shohamkatzav95@gmail.com" className="hover:text-emerald-400 transition-colors">
                            shohamkatzav95@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-300">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href="tel:+972523292847" className="hover:text-emerald-400 transition-colors">
                            052-329-2847
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-6">
                <a
                    href="https://www.linkedin.com/in/shoham-katzav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-sm text-white rounded-full font-medium border border-slate-700/50 hover:border-emerald-500/50 hover:scale-105 transition-all duration-300"
                >
                    <Linkedin size={20} />
                    LinkedIn
                </a>
                <a
                    href="https://github.com/ShohamKatzav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-sm text-white rounded-full font-medium border border-slate-700/50 hover:border-emerald-500/50 hover:scale-105 transition-all duration-300"
                >
                    <Github size={20} />
                    GitHub
                </a>
            </div>
        </div>
    )
}