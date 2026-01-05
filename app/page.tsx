"use client"
import { useEffect, useState } from 'react';
import { Code, TestTube, Mail, Linkedin, Github, ChevronRight, Download, Menu, X, Info } from 'lucide-react';
import Project from '@/types/Project';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('fullstack');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const headerOffset = 64; // h-16
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

  const fullStackProjects: Project[] = [
    {
      title: "We Communicate",
      tech: "Next.js, MongoDB, Socket.io",
      description: "Real-time chat app with messaging and location sharing capabilities",
      github: "https://github.com/ShohamKatzav/WeCommunicate-NextJs",
      demo: "https://wecommunicate-nextjs.onrender.com/",
      credentials: [
        { username: "shoham@gmail.com", password: "12345678" },
        { username: "skgladiator3@gmail.com", password: "12345678" }
      ]
    },
    {
      title: "PC Marketplace",
      tech: "Angular, .NET, JWT, SQLite",
      description: "PC components marketplace with secure authentication and user management",
      github: "https://github.com/ShohamKatzav/PCMarketPlace",
      demo: "https://pc-market-place.vercel.app/",
      credentials: [
        { authorization: "admin", username: "shoham", password: "Pa$w0rd" },
        { authorization: "user", username: "caitlin", password: "Pa$w0rd" }
      ]
    },
    {
      title: "Todo App",
      tech: "React, Express.js, MongoDB, Auth0",
      description: "Task management application with secure Auth0 authentication",
      github: "https://github.com/ShohamKatzav/react-express-crud",
      demo: "https://todo-app-topaz-psi.vercel.app/",
      credentials: [
        { username: "shoham@gmail.com", password: "Pa$w0rd" }
      ]
    }
  ];

  const qaProjects: Project[] = [
    {
      title: "Real-time Chat Testing Suite",
      tech: "Playwright, TypeScript, GitHub Actions",
      description: "E2E test suite with POM and data-driven approach for authentication, messaging, and offline scenarios",
      github: "https://github.com/ShohamKatzav/WeCommunicate-NextJs/tree/main/tests"
    },
    {
      title: "Hybrid Selenium Framework",
      tech: "Selenium, Java, TestNG, Maven, Jenkins",
      description: "Page Object Model framework for e-commerce with CI/CD pipeline and webhook triggers",
      github: "https://github.com/ShohamKatzav/AutomationCICD"
    },
    {
      title: "Playwright E2E Framework",
      tech: "Playwright, JavaScript, GitHub Actions",
      description: "Page Object Model framework with utility classes and API integration for payment processing",
      github: "https://github.com/ShohamKatzav/GrowAutomationCICD"
    }
  ];

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-white">Shoham Katzav</div>

            {/* Desktop Menu */}
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

            {/* Mobile Menu Button */}
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

        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
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

      <div id="home" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Full Stack Developer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              & QA Engineer
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Building robust applications and ensuring quality through comprehensive testing
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div id="projects" className="bg-slate-800/50 backdrop-blur-sm rounded-full p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('fullstack')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'fullstack'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Code size={20} />
              Full Stack
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'qa'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <TestTube size={20} />
              QA Automation
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {(activeTab === 'fullstack' ? fullStackProjects : qaProjects).map((project, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-purple-400 text-sm mb-3 font-medium">{project.tech}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

                {activeTab === 'fullstack' && project.credentials && (
                  <div className="mb-4 bg-slate-900/60 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Info size={16} className="text-purple-400" />
                      <span className="text-xs font-semibold text-purple-400">Demo Credentials</span>
                    </div>
                    {project.credentials.map((cred, credIdx) => (
                      <div key={credIdx} className="text-xs text-gray-300 space-y-1 mb-2 last:mb-0">
                        {project.credentials?.length! > 1 &&
                          cred.authorization ?
                          <div className="text-purple-300 font-medium">Account {credIdx + 1}: (Authorization: {cred.authorization})</div>
                          :
                          <div className="text-purple-300 font-medium">Account {credIdx + 1}:</div>}
                        <div><span className="text-gray-400">Username:</span> {cred.username}</div>
                        <div><span className="text-gray-400">Password:</span> {cred.password}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex-grow"></div>

                {activeTab === 'fullstack' ? (
                  <div className="flex gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      View Demo <ChevronRight size={16} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/60 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-all duration-300"
                    >
                      <Github size={16} /> Code
                    </a>
                  </div>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <Github size={16} /> View Code <ChevronRight size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="skills" className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Tech Stack</h2>
          <div className="grid gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Full Stack Development</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript',
                  'C#', '.NET', 'Node.js', 'Express.js', 'ASP.NET',
                  'MongoDB', 'SQL Server', 'SQLite', 'Tailwind CSS', 'Bootstrap'
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-slate-800/60 backdrop-blur-sm text-gray-300 rounded-full text-sm border border-slate-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">QA Automation</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Selenium', 'Playwright', 'TestNG', 'Cucumber', 'Mocha',
                  'Java', 'Jenkins', 'GitHub Actions', 'Azure Pipelines',
                  'Postman', 'REST APIs', 'Maven', 'Git'
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-slate-800/60 backdrop-blur-sm text-gray-300 rounded-full text-sm border border-slate-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="CV" className="max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Download CV</h2>
          <p className="text-gray-400 text-center mb-8">
            Choose the CV that best fits the opportunity
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/Shoham_Katzav_Fullstack_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Download size={20} />
              Full Stack Developer CV
            </a>
            <a
              href="/Shoham_Katzav_Automation_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Download size={20} />
              QA Automation CV
            </a>
          </div>
        </div>

        <div id="contact" className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-gray-400 mb-8">
            Interested in working together? Feel free to reach out!
          </p>

          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Mail size={20} className="text-purple-400" />
                <a href="mailto:shohamkatzav95@gmail.com" className="hover:text-purple-400 transition-colors">
                  shohamkatzav95@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+972523292847" className="hover:text-purple-400 transition-colors">
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
              className="flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-sm text-white rounded-full font-medium border border-slate-700/50 hover:border-purple-500/50 hover:scale-105 transition-all duration-300"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="https://github.com/ShohamKatzav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-sm text-white rounded-full font-medium border border-slate-700/50 hover:border-purple-500/50 hover:scale-105 transition-all duration-300"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div >
  );
}