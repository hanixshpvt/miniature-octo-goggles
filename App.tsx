
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProposition } from './components/ValueProposition';
import { CaseStudies } from './components/CaseStudies';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { Methodology } from './components/Methodology';
import { Chatbot } from './components/Chatbot';
import { ExclusionCriteria } from './components/ExclusionCriteria';
import { InsightSection } from './components/InsightSection';
import { ServicesPage } from './components/ServicesPage';
import { PageHeader, BrandCredibility } from './components/Shared';
import { AppProvider, useAppStore } from './context'; 

const CaseStudiesPage = () => (
  <main className="pb-32 bg-white reveal">
    <PageHeader 
      title="Extraction Evidence." 
      subtitle="HIPAA-verified clinical yield results verified across elite high-ticket US medspa hubs."
    />
    <CaseStudies onStartQuiz={() => {}} />
  </main>
);

const AboutPage = () => (
  <main className="pb-32 px-6 max-w-[1600px] mx-auto space-y-24 md:space-y-32 pt-16 reveal">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center">
      <div className="lg:col-span-7 space-y-8 md:space-y-12">
        <p className="cinematic-caps text-indigo-900 font-black tracking-[0.6em] text-[10px] md:text-[11px]">Elite Clinical Logic</p>
        <h1 className="luxury-header italic text-obsidian leading-[1.05] text-5xl md:text-7xl">Partners for <br/><span className="font-bold border-b-[15px] md:border-b-[25px] border-indigo-50 leading-none">Yield Recovery.</span></h1>
        <p className="text-lg md:text-2xl text-slate-800 font-light leading-relaxed border-l-[6px] md:border-l-[8px] border-indigo-600 pl-8 md:pl-16 italic bg-slate-50 py-8 md:py-10">
          "Clinics have a recovery problem, not a lead problem. We build recovery hubs that normalize procedural revenue extraction."
        </p>
        <div className="pt-12 md:pt-16 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
           <div className="space-y-2">
             <p className="cinematic-caps text-obsidian text-[11px] md:text-[12px] font-black">Performance First</p>
             <p className="text-slate-600 font-medium italic text-base md:text-lg">Growth synchronized with confirmed surgical show-up yield.</p>
           </div>
           <div className="space-y-2">
             <p className="cinematic-caps text-obsidian text-[11px] md:text-[12px] font-black">HIPAA Compliance</p>
             <p className="text-slate-600 font-medium italic text-base md:text-lg">Secure algorithmic sync nodes verified US clinical privacy.</p>
           </div>
        </div>
      </div>
      <div className="lg:col-span-5 aspect-[4/5] bg-slate-50 grayscale overflow-hidden shadow-2xl border-4 border-white shadow-slate-200">
        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200" alt="Consultant" className="w-full h-full object-cover" />
      </div>
    </div>
    <BrandCredibility />
  </main>
);

const ContactPage = () => (
  <main className="pb-32 px-6 max-w-5xl mx-auto space-y-16 md:space-y-24 pt-16 md:pt-24 reveal text-center">
    <div className="space-y-6 md:space-y-8">
       <h1 className="luxury-header italic text-obsidian uppercase text-5xl md:text-7xl">Strategic <span className="font-bold border-b-[15px] border-slate-50">Audit.</span></h1>
       <p className="text-lg md:text-2xl text-slate-800 italic font-light max-w-2xl mx-auto bg-slate-50 py-6 md:py-8 px-6 md:px-10 border-l-4 md:border-l-[8px] border-indigo-600">
         Procedural Extraction audit required to initialize recapture nodes for elite clinical hubs.
       </p>
    </div>
    <div className="bg-white p-6 md:p-24 border border-slate-100 shadow-2xl space-y-12 md:space-y-16 text-left">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-3 md:space-y-4">
            <label className="cinematic-caps text-obsidian font-black text-[10px] tracking-[0.3em]">Partner ID</label>
            <input className="w-full p-4 bg-slate-50 border-b-2 border-slate-200 outline-none font-mono text-lg md:text-xl uppercase text-obsidian placeholder:text-slate-300 focus:border-indigo-600 transition-colors" placeholder="DR_NAME" />
          </div>
          <div className="space-y-3 md:space-y-4">
            <label className="cinematic-caps text-obsidian font-black text-[10px] tracking-[0.3em]">Clinic URL</label>
            <input className="w-full p-4 bg-slate-50 border-b-2 border-slate-200 outline-none font-mono text-lg md:text-xl uppercase text-obsidian placeholder:text-slate-300 focus:border-indigo-600 transition-colors" placeholder="HTTPS://CLINIC.COM" />
          </div>
       </div>
       <button className="btn-luxury w-full py-6 md:py-8 text-[11px] md:text-[12px] uppercase tracking-[0.5em]">INITIALIZE AUDIT TERMINAL ::</button>
    </div>
  </main>
);

const MainLayout: React.FC = () => {
  const [view, setView] = useState<'home' | 'quiz' | 'results' | 'services' | 'cases' | 'about' | 'contact'>('home');
  const { quizResult } = useAppStore();

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace('#', '') || 'home';
      if (['home', 'services', 'cases', 'about', 'contact'].includes(h)) setView(h as any);
      else setView('home');
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (v: string) => {
    window.location.hash = v === 'home' ? '' : v;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderContent = () => {
    if (view === 'quiz') return <Quiz onComplete={() => setView('results')} onCancel={() => navigateTo('home')} />;
    // Results now pulls from global context inside the component, but we pass it as prop for backward compat or refactor Results to use store
    if (view === 'results' && quizResult) return <Results result={quizResult} onReset={() => navigateTo('home')} />;
    if (view === 'services') return <ServicesPage />;
    if (view === 'cases') return <CaseStudiesPage />;
    if (view === 'about') return <AboutPage />;
    if (view === 'contact') return <ContactPage />;

    return (
      <main className="reveal">
        <Hero onStartQuiz={() => setView('quiz')} />
        <BrandCredibility />
        <InsightSection /> 
        <ValueProposition onStartQuiz={() => setView('quiz')} />
        <ExclusionCriteria />
        <Methodology />
        <CaseStudies onStartQuiz={() => setView('quiz')} />
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-950">
      <Navbar onStartQuiz={() => setView('quiz')} onNavigate={navigateTo} currentView={view} />
      <div className="hero-spacer"></div>
      {renderContent()}
      <Footer onStartQuiz={() => setView('quiz')} />
      <Chatbot />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
