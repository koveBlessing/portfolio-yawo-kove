'use client';

import { useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  Download, 
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Code2,
  Palette,
  Database,
  Workflow,
  BookOpen,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Languages,
  Brain,
  Rocket,
  Cpu,
  Cloud,
  Server,
  Smartphone,
  Globe
} from 'lucide-react';

class CalligraphyStroke {
  x: number;
  y: number;
  length: number;
  angle: number;
  thickness: number;
  opacity: number;
  speed: number;
  offset: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.length = 150 + Math.random() * 400;
    this.angle = Math.random() * Math.PI * 2;
    this.thickness = 3 + Math.random() * 8;
    this.opacity = 0.5 + Math.random() * 0.4;
    this.speed = 0.0001 + Math.random() * 0.0002;
    this.offset = Math.random() * Math.PI * 2;
  }

  draw(ctx: CanvasRenderingContext2D, time: number) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.sin(time * this.speed + this.offset) * 0.05);
    
    const gradient = ctx.createLinearGradient(0, 0, this.length, 0);
    gradient.addColorStop(0, `rgba(20, 20, 20, 0)`);
    gradient.addColorStop(0.15, `rgba(20, 20, 20, ${this.opacity})`);
    gradient.addColorStop(0.85, `rgba(20, 20, 20, ${this.opacity * 0.8})`);
    gradient.addColorStop(1, `rgba(20, 20, 20, 0)`);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    const cp1x = this.length * 0.25;
    const cp1y = (Math.sin(time * this.speed * 2 + this.offset) * 30);
    const cp2x = this.length * 0.75;
    const cp2y = (Math.sin(time * this.speed * 3 + this.offset + 1) * 30);
    
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, this.length, 0);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, this.length, 0);
    ctx.lineWidth = this.thickness * 0.5;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    ctx.restore();
  }
}

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const strokes: CalligraphyStroke[] = [];
    const numStrokes = 20;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    }

    function drawBackground() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = '#f5f5f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < 3000; i++) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.02})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }
    }

    function initStrokes() {
      if (!canvas) return;
      strokes.length = 0;
      for (let i = 0; i < numStrokes; i++) {
        strokes.push(new CalligraphyStroke(canvas.width, canvas.height));
      }
    }

    function animate() {
      if (!ctx) return;
      const time = Date.now();
      drawBackground();
      strokes.forEach(stroke => stroke.draw(ctx, time));
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    initStrokes();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initStrokes();
    };

    window.addEventListener('resize', handleResize);

    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = document.querySelector((e.target as HTMLAnchorElement).getAttribute('href') || '');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f5f5f0] to-[#e8e8e0]">
      {/* Toile de calligraphie */}
      <div className="fixed inset-0 z-0">
        <canvas ref={canvasRef} id="calligraphy" />
      </div>
      
      {/* Container principal */}
      <div className="relative z-10 container mx-auto px-5 py-10 max-w-7xl">
        {/* Navigation */}
        <nav className="relative w-full p-5 flex justify-between items-center gap-5 mb-20">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl backdrop-saturate-180 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">YBK</span>
          </div>
          <ul className="relative z-10 hidden md:flex gap-2 list-none">
            {['Accueil', 'Projets', 'Compétences', 'Formation', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="relative px-5 py-2.5 text-gray-800 text-sm font-medium transition-colors duration-300 block cursor-pointer"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-2xl border border-white/80 opacity-0 scale-95 transition-all duration-400 ease-out-cubic shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:opacity-100 hover:scale-100" />
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="/cv_yawo_blessing_kove.pdf" 
            download
            className="relative px-6 py-3 text-gray-800 text-base font-semibold cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="relative z-10">CV</span>
            <div className="absolute inset-0 bg-white/60 backdrop-blur-lg backdrop-saturate-180 rounded-2xl border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,1)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]" />
          </a>
        </nav>

        {/* Hero Section */}
        <section id="accueil" className="flex flex-col items-center text-center py-15 mb-25">
          <div className="relative px-8 py-16 md:px-12 md:py-20 max-w-4xl">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl backdrop-saturate-180 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]" />
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Yawo Blessing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">KOVE</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
                Développeur Full Stack & Ingénieur Logiciel
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Passionné par la création d&apos;applications web et mobiles modernes avec React, Next.js et TypeScript. 
                Je transforme les idées en solutions digitales performantes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#projets" className="relative px-8 py-4 text-gray-800 text-base font-semibold cursor-pointer flex items-center gap-2 justify-center">
                  <Code2 className="w-5 h-5" />
                  <span className="relative z-10">Voir mes projets</span>
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-lg backdrop-saturate-180 rounded-2xl border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,1)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]" />
                </a>
                <a href="#contact" className="relative px-8 py-4 text-gray-800 text-base font-semibold cursor-pointer flex items-center gap-2 justify-center">
                  <Mail className="w-5 h-5" />
                  <span className="relative z-10">Me contacter</span>
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-lg backdrop-saturate-180 rounded-2xl border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,1)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projets Section */}
        <section id="projets" className="mb-25">
          <div className="text-center mb-12">
            <Code2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Projets Professionnels
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions innovantes développées avec les dernières technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projet 1 - SmartGo */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_2px_0_rgba(255,255,255,0.9)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] group-hover:bg-white/50" />
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">SmartGo Platform</h3>
                    <p className="text-gray-600">Plateforme de gestion locative PWA</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                  Application web progressive complète pour la location de véhicules et propriétés 
                  avec système de gestion intégré et réservations en temps réel.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React.js', 'TypeScript', 'Next.js', 'PWA', 'Tailwind CSS'].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-2xl text-sm text-gray-800 border border-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://conciergerie.synergiefinance.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Voir la démo
                  </a>
                </div>
              </div>
            </div>

            {/* Projet 2 - SaaS Business Suite */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_2px_0_rgba(255,255,255,0.9)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] group-hover:bg-white/50" />
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">SaaS Business Suite</h3>
                    <p className="text-gray-600">Plateforme de gestion d&apos;entreprise</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                  Solution SaaS complète avec modules de gestion des réunions, reporting financier, 
                  ressources humaines et analytics en temps réel.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-2xl text-sm text-gray-800 border border-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Projet 3 - Application Mobile React Native */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_2px_0_rgba(255,255,255,0.9)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] group-hover:bg-white/50" />
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">App Mobile</h3>
                    <p className="text-gray-600">Application React Native</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                  Application mobile cross-platform développée avec React Native, 
                  offrant une expérience utilisateur native sur iOS et Android.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React Native', 'TypeScript', 'Expo', 'Firebase', 'Redux'].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-2xl text-sm text-gray-800 border border-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-gray-600 font-medium">
                    <Smartphone className="w-4 h-4" />
                    Version mobile disponible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compétences Section */}
        <section id="compétences" className="mb-25">
          <div className="text-center mb-12">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Compétences Techniques
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un éventail complet de technologies modernes pour des solutions robustes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Code2,
                title: 'Frontend & Mobile',
                color: 'from-blue-500 to-cyan-500',
                skills: ['React.js', 'Next.js', 'React Native', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'PWA']
              },
              {
                icon: Server,
                title: 'Backend & Base de données',
                color: 'from-green-500 to-emerald-500',
                skills: ['Node.js', 'Python', 'Prisma', 'Supabase', 'PostgreSQL', 'REST APIs']
              },
              {
                icon: Workflow,
                title: 'Outils & Méthodologies',
                color: 'from-purple-500 to-pink-500',
                skills: ['Git & GitHub', 'Vercel', 'Agile', 'Docker', 'VS Code', 'Figma']
              }
            ].map((category, index) => (
              <div key={index} className="relative p-8">
                <div className="absolute inset-0 bg-white/35 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]" />
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-2 bg-white/60 backdrop-blur-sm rounded-xl text-sm text-gray-800 border border-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compétences transversales */}
          <div className="relative p-8 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-white/35 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]" />
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Compétences Transversales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Résolution de problèmes complexes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Apprentissage rapide et autonomie</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Workflow className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Communication et travail d&apos;équipe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-orange-600" />
                    </div>
                    <span>Veille technologique constante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formation Section */}
        <section id="formation" className="mb-25">
          <div className="text-center mb-12">
            <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Parcours Académique
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une formation internationale en ingénierie des systèmes informatiques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative p-8">
              <div className="absolute inset-0 bg-white/35 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Master Ingénierie des Systèmes Informatiques Avancés</h3>
                    <p className="text-gray-600 font-medium">Université de Technologie de Belfort-Montbéliard (UTBM)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Oct 2024
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    France-Togo
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Formation avancée en architecture logicielle, systèmes distribués et technologies émergentes 
                  dans le cadre d&apos;un programme d&apos;édition international.
                </p>
              </div>
            </div>

            <div className="relative p-8">
              <div className="absolute inset-0 bg-white/35 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Licence Professionnelle Ingénierie des Systèmes Informatiques</h3>
                    <p className="text-gray-600 font-medium">ESAG-NDE & SUPMTI Maroc</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Mai 2023
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Maroc-Togo
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Spécialisation en conception et développement de systèmes informatiques, 
                  avec focus sur les architectures modernes et les bonnes pratiques de développement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expérience Professionnelle */}
        <section className="mb-25">
          <div className="text-center mb-12">
            <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Expérience Professionnelle
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des réalisations concrètes dans le développement d&apos;applications modernes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8">
              <div className="absolute inset-0 bg-white/35 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Développeur Full Stack</h3>
                    <p className="text-gray-600 font-medium text-lg">Synergie Finance SA, Lomé</p>
                    <div className="flex items-center gap-4 text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Jan 2024 - Présent
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Lomé, Togo
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-blue-600" />
                      SmartGo Platform
                    </h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• Développement d&apos;une PWA complète</li>
                      <li>• Système de location véhicules/propriétés</li>
                      <li>• Gestion de flotte automobile</li>
                      <li>• Réservations en temps réel</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-purple-600" />
                      SaaS Business Suite
                    </h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• Architecture microservices</li>
                      <li>• Modules RH et financiers</li>
                      <li>• Analytics et reporting</li>
                      <li>• Déploiement Docker</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies utilisées</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Prisma', 'React Native'].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-xl text-sm text-gray-800 border border-white/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center py-20">
          <div className="relative px-8 py-16 md:px-12 md:py-20 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl backdrop-saturate-180 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]" />
            <div className="relative z-10">
              <Mail className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Travaillons Ensemble
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Je suis disponible pour des projets freelance et des opportunités de collaboration. 
                N&apos;hésitez pas à me contacter pour discuter de votre projet !
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 justify-center p-4 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/80">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600 text-sm">koveyawo@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center p-4 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/80">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Téléphone</p>
                    <p className="text-gray-600 text-sm">+228 93 00 68 50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center p-4 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/80">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Localisation</p>
                    <p className="text-gray-600 text-sm">Lomé, Togo</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center mb-8">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/80 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <social.icon className="w-5 h-5 text-gray-700" />
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:koveyawo@gmail.com" 
                  className="relative px-8 py-4 text-gray-800 text-base font-semibold cursor-pointer flex items-center gap-2 justify-center"
                >
                  <Mail className="w-5 h-5" />
                  <span className="relative z-10">Envoyer un email</span>
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-lg backdrop-saturate-180 rounded-2xl border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,1)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]" />
                </a>
                <a 
                  href="/cv_yawo_blessing_kove.pdf" 
                  download 
                  className="relative px-8 py-4 text-gray-800 text-base font-semibold cursor-pointer flex items-center gap-2 justify-center"
                >
                  <Download className="w-5 h-5" />
                  <span className="relative z-10">Télécharger CV</span>
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-lg backdrop-saturate-180 rounded-2xl border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,1)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative text-center py-10">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl backdrop-saturate-180 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-800">Yawo Blessing KOVE</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 - Conçu et développé avec passion en utilisant Next.js et Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}