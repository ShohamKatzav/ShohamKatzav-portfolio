"use client"
import { useCallback, useEffect, useState } from 'react';
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
import SectionHeading from './components/SectionHeading';
import { ArrowRight, Download } from 'lucide-react';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<'fullstack' | 'qa'>('fullstack');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, selectedProject]);

  const projects: Project[] = activeTab === 'fullstack' ? fullStackProjectsData : qaProjectsData;

  return (
    <div className="min-h-screen text-fg">

      <NavBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section id="home" aria-labelledby="home-title" className="grid items-center gap-10 pt-12 pb-12 md:pt-16 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/70 px-3 py-1 text-sm font-medium text-muted">
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
              Open to full stack and QA automation roles
            </p>
            <h1 id="home-title" className="mt-5 font-serif text-5xl font-semibold tracking-tight text-fg md:text-6xl md:leading-[1.05]">
              <span className="block">Full Stack Developer</span>
              <span className="block text-accent italic">&amp; QA Engineer</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg md:text-xl">
              I build the application and the automated tests that check it.
            </p>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
              We Communicate puts both in one repo: a Next.js chat app and a Playwright suite that
              runs after every deploy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#CV" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-accent-label shadow-[0_8px_24px_-8px_var(--accent)] transition hover:-translate-y-0.5 hover:bg-accent-hover">
                <Download size={18} aria-hidden /> Download a CV
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-outline bg-surface/60 px-5 py-3 font-medium text-fg transition hover:-translate-y-0.5 hover:border-fg">
                Get in touch <ArrowRight size={18} aria-hidden />
              </a>
            </div>
          </div>
          <div>
            <RoleToggle activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title" className="border-t border-hairline py-16 md:py-20">
          <SectionHeading index="01" id="projects-title" title="Projects" />

          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} activeTab={activeTab} onOpen={() => setSelectedProject(project)} />
              </li>
            ))}
          </ul>
        </section>

        <SkillsSection activeTab={activeTab} />

        <CVSection activeTab={activeTab} />

        <ContactSection />

      </main>
      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:px-6">
          <p>&copy; {new Date().getFullYear()} Shoham Katzav</p>
          <a href="#home" className="font-medium text-accent transition-colors hover:text-fg">Back to top</a>
        </div>
      </footer>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
