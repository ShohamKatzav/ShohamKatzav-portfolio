import { Download } from "lucide-react";

export default function CVSection() {
    return (
        <div id="CV" className="max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Download CV</h2>
            <p className="text-gray-400 text-center mb-8">
                Choose the CV that best fits the opportunity
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <a
                    href="/Shoham_Katzav_Fullstack_CV.pdf"
                    download
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    <Download size={20} />
                    Full Stack Developer CV
                </a>
                <a
                    href="/Shoham_Katzav_Automation_CV.pdf"
                    download
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    <Download size={20} />
                    QA Automation CV
                </a>
            </div>
        </div>
    )
}