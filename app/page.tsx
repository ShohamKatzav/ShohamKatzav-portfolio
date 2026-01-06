"use client"
import { useEffect, useState } from 'react';
import Project from '@/app/types/Project';
import fullStackProjectsData from './data/fullstack-projects.json';
import qaProjectsData from './data/qa-projects.json';
import NavBar from './components/NavBar';
import RoleToggle from './components/RoleToggle';
import ProjectCard from './components/ProjectCard';
import SkillsSection from './components/SkillsSection';
import CVSection from './components/CVSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<'fullstack' | 'qa'>('fullstack');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, selectedProject]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950">

      <NavBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div id="home" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Full Stack Developer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 p-1">
              & QA Engineer
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I'm a Full Stack Developer & QA Automation Engineer specializing in
            building reliable applications and the frameworks that test them.
          </p>
        </div>

        <RoleToggle activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {(activeTab === 'fullstack' ? fullStackProjectsData : qaProjectsData).map((project, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                <ProjectCard project={project} activeTab={activeTab} />
              </div>
            ))}
          </div>
        </div>

        <SkillsSection />

        <CVSection />

        <ContactSection />

      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}