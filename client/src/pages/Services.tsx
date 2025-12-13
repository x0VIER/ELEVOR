import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../constants';
import { ArrowRight, Terminal, X, Check, Calendar, Zap, MessageSquare, Database, Search, Shield, Server, FileText, Send, User, Play } from 'lucide-react';
import { Service } from '../types';

// --- TYPES & CONFIGURATION ---

interface SimConfig {
  title: string;
  description: string;
  // Steps for the visual pipeline at the top
  workflowSteps: { label: string; icon: any }[]; 
  inputs: { label: string; placeholder?: string; type: 'select' | 'text' | 'range'; options?: string[] }[];
  logs: string[];
}

const getServiceConfig = (service: Service): SimConfig => {
  // 1. Real Estate / Lead Gen
  if (service.category === 'AI Agents' && (service.title.includes('Lead') || service.title.includes('Deal') || service.title.includes('Estate'))) {
    return {
      title: "Property Finder Agent",
      description: "Define your buy box. The agent will hunt 24/7.",
      workflowSteps: [
        { label: "Data Ingest", icon: Database },
        { label: "AI Analysis", icon: Search },
        { label: "Owner Skip", icon: User },
        { label: "Outreach", icon: Send }
      ],
      inputs: [
        { label: 'Target Market', placeholder: 'e.g. Austin, TX (78701)', type: 'text' },
        { label: 'Asset Strategy', type: 'select', options: ['Fix & Flip', 'Buy & Hold', 'Wholesale'] },
        { label: 'Property Type', type: 'select', options: ['Single Family', 'Multi-Family', 'Land'] }
      ],
      logs: [
        'Connecting to MLS & County Records...',
        'Ingesting 1,420 new listings...',
        'Filtering for < 80% ARV...',
        'Vision API: Roof condition poor (Opportunity)...',
        'Skiptracing owner: John D. (High Accuracy)...',
        'Drafting personalized SMS...',
        'Lead added to CRM: #4921'
      ]
    };
  }
  
  // 2. Healthcare
  if (service.title.includes('Patient') || service.title.includes('Clinical') || service.title.includes('Triage')) {
    return {
      title: "Patient Triage Agent",
      description: "Automate intake, scheduling, and pre-screening.",
      workflowSteps: [
        { label: "Inbound Call", icon: User },
        { label: "NLP Triage", icon: FileText },
        { label: "Ins. Verify", icon: Shield },
        { label: "Schedule", icon: Calendar }
      ],
      inputs: [
        { label: 'Clinic Name', placeholder: 'e.g. Downtown Dental', type: 'text' },
        { label: 'Triage Protocol', type: 'select', options: ['Standard', 'Urgent Care', 'Specialist'] },
        { label: 'EMR Integration', type: 'select', options: ['Epic', 'Cerner', 'Athena'] }
      ],
      logs: [
        'Voice Stream Detected...',
        'Transcribing symptoms (Accuracy: 99%)...',
        'Matching intent: "Tooth pain, urgent"...',
        'Querying Payer Gateway for eligibility...',
        'Status: Active Coverage Found...',
        'Booking Slot: Tomorrow 2:00 PM...',
        'Syncing to EMR...'
      ]
    };
  }

  // 3. Advisory / Tech / Dev
  if (service.category === 'Advisory & Tech') {
    return {
      title: "Tech Stack Audit",
      description: "Identify bottlenecks and security risks instantly.",
      workflowSteps: [
        { label: "Scan Infra", icon: Server },
        { label: "Detect Risk", icon: Shield },
        { label: "Optimize", icon: Zap },
        { label: "Report", icon: FileText }
      ],
      inputs: [
        { label: 'Cloud Provider', type: 'select', options: ['AWS', 'Azure', 'GCP', 'Hybrid'] },
        { label: 'Audit Focus', type: 'select', options: ['Security', 'Cost', 'Performance'] },
        { label: 'Environment', type: 'select', options: ['Production', 'Staging', 'Dev'] }
      ],
      logs: [
        'Handshaking with API Gateway...',
        'Mapping dependency graph...',
        'Running CVE vulnerability scan...',
        'Alert: Unencrypted S3 bucket found...',
        'Analyzing query latency...',
        'Generating optimization roadmap...',
        'Final Report compiled.'
      ]
    };
  }

  // Default / General
  return {
    title: "Autonomous Agent",
    description: "Configure your digital worker.",
    workflowSteps: [
      { label: "Trigger", icon: Zap },
      { label: "Process", icon: Server },
      { label: "Reasoning", icon: Search },
      { label: "Action", icon: Check }
    ],
    inputs: [
      { label: 'Agent Name', placeholder: 'My Custom Agent', type: 'text' },
      { label: 'Operation Mode', type: 'select', options: ['Fully Auto', 'Human Approval'] },
      { label: 'Notification', type: 'select', options: ['Slack', 'Email', 'SMS'] }
    ],
    logs: [
      'Initializing Neural Engine...',
      'Loading context window...',
      'Processing input stream...',
      'Pattern matched: High Priority...',
      'Executing defined logic...',
      'Verifying output integrity...',
      'Task completed successfully.'
    ]
  };
};

// --- SUB-COMPONENTS ---

const LiveLog: React.FC<{ logs: string[] }> = ({ logs }) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleLogs(prev => {
        const newLogs = [...prev, `> ${logs[index]}`];
        // Keep log short so it doesn't scroll endlessly
        if (newLogs.length > 6) newLogs.shift();
        return newLogs;
      });
      index = (index + 1) % logs.length;
    }, 1500);
    return () => clearInterval(interval);
  }, [logs]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLogs]);

  return (
    <div className="font-mono text-xs md:text-sm text-green-400 space-y-2 h-full overflow-hidden flex flex-col justify-end">
      {visibleLogs.map((log, i) => (
        <div key={i} className="animate-in slide-in-from-left duration-300 truncate">
          <span className="opacity-50 mr-2">{new Date().toLocaleTimeString([], {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"})}</span>
          {log}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

// --- MAIN WIZARD ---

const WorkflowWizard: React.FC<{ service: Service, onClose: () => void, onSchedule: () => void }> = ({ service, onClose, onSchedule }) => {
  const config = getServiceConfig(service);
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState<Record<string, string>>({});

  // Cycle through the workflow steps visually
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % config.workflowSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [config.workflowSteps]);

  const handleInputChange = (label: string, value: string) => {
    setFormState(prev => ({ ...prev, [label]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row relative z-10 animate-in zoom-in-95 duration-200 border border-gray-100 max-h-[90vh]">
        
        {/* Mobile Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-50 p-2 bg-white/80 rounded-full md:hidden text-gray-400 hover:text-gray-900 shadow-sm border border-gray-100"
        >
            <X size={20} />
        </button>

        {/* LEFT SIDE: Friendly Configuration */}
        <div className="w-full md:w-5/12 p-6 md:p-8 overflow-y-auto bg-white flex flex-col h-full border-r border-gray-100">
           
           {/* Header */}
           <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                 <div className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                    Configuration
                 </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{config.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{config.description}</p>
           </div>

           {/* Interactive Form */}
           <div className="flex-grow space-y-6">
              {config.inputs.map((input, idx) => (
                 <div key={idx} className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 ml-1">{input.label}</label>
                    
                    {input.type === 'select' ? (
                       <div className="flex flex-wrap gap-2">
                          {input.options?.map(opt => (
                             <button 
                                key={opt}
                                onClick={() => handleInputChange(input.label, opt)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center gap-2 ${
                                   formState[input.label] === opt 
                                      ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105' 
                                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                                }`}
                             >
                                {opt}
                                {formState[input.label] === opt && <Check size={14} />}
                             </button>
                          ))}
                       </div>
                    ) : (
                       <div className="relative">
                          <input 
                             type="text" 
                             placeholder={input.placeholder || "Type here..."}
                             className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 placeholder-gray-400 hover:bg-white"
                          />
                       </div>
                    )}
                 </div>
              ))}
           </div>

           {/* High Converting CTA */}
           <div className="mt-8 pt-6 border-t border-gray-50">
              <button 
                onClick={onSchedule}
                className="w-full group bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                 <span>Deploy Workflow</span>
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
                 Ready in minutes • No code required
              </p>
           </div>
        </div>

        {/* RIGHT SIDE: Visual Pipeline & Terminal */}
        <div className="w-full md:w-7/12 bg-gray-50/80 p-6 md:p-8 flex flex-col justify-center relative min-h-[300px] md:h-auto">
           
           {/* Desktop Close */}
           <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors hidden md:block">
              <X size={20} />
           </button>

           <div className="max-w-md mx-auto w-full space-y-8">
              
              {/* 1. Visual Workflow Pipeline */}
              <div className="relative">
                 {/* Connecting Line */}
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2 rounded-full"></div>
                 
                 <div className="flex justify-between items-center relative z-0">
                    {config.workflowSteps.map((step, i) => {
                       const isActive = i === activeStep;
                       const isPast = i < activeStep;
                       
                       return (
                          <div key={i} className="flex flex-col items-center gap-3 group">
                             <div 
                                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${
                                   isActive 
                                      ? 'bg-white border-blue-500 text-blue-600 scale-110 shadow-blue-200' 
                                      : isPast 
                                         ? 'bg-blue-50 border-blue-200 text-blue-400'
                                         : 'bg-white border-gray-200 text-gray-300'
                                }`}
                             >
                                <step.icon size={20} />
                             </div>
                             <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                {step.label}
                             </span>
                          </div>
                       )
                    })}
                 </div>
              </div>

              {/* 2. The "Screen with Green Lines" (Terminal) */}
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900 relative group">
                 {/* Terminal Header */}
                 <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                       <Terminal size={12} className="text-white" />
                       <span className="text-[10px] font-mono text-white">agent_core.exe</span>
                    </div>
                    <div className="w-8"></div> {/* Spacer */}
                 </div>
                 
                 {/* Terminal Body */}
                 <div className="p-4 h-48 bg-gray-900 relative">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20"></div>
                    <LiveLog logs={config.logs} />
                 </div>

                 {/* Status Footer */}
                 <div className="bg-gray-800 px-4 py-1.5 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                    <span className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                       Online
                    </span>
                    <span>Latency: 12ms</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// 3. Service Card Component (Simplified & Polished)
const ServiceCard: React.FC<{ service: Service; onConfigure: (service: Service) => void; highlight?: boolean }> = ({ service, onConfigure, highlight }) => {
  const [deployed, setDeployed] = useState(service.deployedCount);
  
  useEffect(() => {
     const interval = setInterval(() => {
        if (Math.random() > 0.7) {
           setDeployed(prev => prev + 1);
        }
     }, 3000);
     return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id={`service-${service.id}`}
      className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 flex flex-col h-full group hover:shadow-xl hover:-translate-y-1 ${
        highlight 
          ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/20' 
          : 'border-gray-200 hover:border-blue-400'
      }`}
    >
      {/* Workflow Image Area */}
      <div className="h-40 bg-gray-50 border-b border-gray-100 relative overflow-hidden flex items-center justify-center group-hover:bg-blue-50/30 transition-colors">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <img 
            src={service.workflowImage} 
            alt={`${service.title} Architecture Diagram`} 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          
          {/* Active Badge */}
          <div className="absolute top-3 right-3 z-10">
             <div className="flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-2 py-0.5 text-[10px] font-bold text-gray-600 shadow-sm">
               <span className="relative flex h-1.5 w-1.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
               </span>
               <span>{deployed.toLocaleString()} Agents</span>
             </div>
          </div>
      </div>

      <div className="p-5 flex flex-col flex-grow relative">
          <div className="mb-3 flex items-start justify-between">
             <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100">
                <service.icon size={20} />
             </div>
             {/* Simple Tech Dots */}
             <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-blue-400 transition-colors"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-indigo-400 transition-colors"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-purple-400 transition-colors"></span>
             </div>
          </div>
          
          <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
        
          <p className="text-gray-500 text-xs mb-4 flex-grow leading-relaxed line-clamp-3">
            {service.description}
          </p>
        
          <div className="mb-4 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-0.5">
               <Zap size={12} className="text-orange-500" fill="currentColor"/>
               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Impact</span>
            </div>
            <div className="text-xs font-bold text-gray-900">
              {service.impact}
            </div>
          </div>

          <button 
            onClick={() => onConfigure(service)} 
            className="w-full mt-auto py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all group-hover:shadow-sm"
          >
            <Play size={12} className="fill-current opacity-50" /> Configure Workflow
          </button>
      </div>
    </div>
  );
};


// --- MAIN PAGE ---

const Services: React.FC<{ setPage: (page: string) => void; targetId: number | null; clearTarget: () => void }> = ({ setPage, targetId, clearTarget }) => {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeSection, setActiveSection] = useState<'agents' | 'advisory'>('agents');

  const agents = SERVICES.filter(s => s.category === 'AI Agents');
  const advisory = SERVICES.filter(s => s.category === 'Advisory & Tech');

  useEffect(() => {
    if (targetId) {
      const element = document.getElementById(`service-${targetId}`);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 180; 
        window.scrollTo({ top: y, behavior: 'smooth' });
        setTimeout(() => clearTarget(), 2000);
      }
    }
  }, [targetId, clearTarget]);

  const scrollToSection = (section: 'agents' | 'advisory') => {
    setActiveSection(section);
    const id = section === 'agents' ? 'section-agents' : 'section-advisory';
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140; 
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSchedule = () => {
    setActiveService(null);
    setPage('Contact');
  };

  return (
    <div className="pt-0 bg-gray-50 relative min-h-screen pb-16">
      
      {activeService && (
        <WorkflowWizard 
          service={activeService} 
          onClose={() => setActiveService(null)} 
          onSchedule={handleSchedule}
        />
      )}

      {/* Header */}
      <div className="bg-white py-16 mb-0 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
            Enterprise Grade • SOC-2 Compliant
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Autonomous <span className="text-blue-600">Intelligence</span> Catalog
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Select a neural architecture below to begin configuration. All agents are deployed on dedicated, isolated instances.
          </p>
        </div>
      </div>

      {/* Sticky Quick Nav */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm py-4">
         <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4">
            <button 
              onClick={() => scrollToSection('agents')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${activeSection === 'agents' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:text-gray-900'}`}
              aria-current={activeSection === 'agents' ? 'page' : undefined}
            >
               AI Agents & Workflows
            </button>
            <button 
              onClick={() => scrollToSection('advisory')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${activeSection === 'advisory' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:text-gray-900'}`}
              aria-current={activeSection === 'advisory' ? 'page' : undefined}
            >
               Advisory & Tech Infrastructure
            </button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Category 1 */}
        <div id="section-agents" className="mb-16 scroll-mt-40">
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-gray-900">AI Agents & Automated Workflows</h2>
             <p className="text-sm text-gray-500 mt-1">Autonomous workers that replace manual labor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onConfigure={setActiveService} 
                highlight={targetId === service.id}
              />
            ))}
          </div>
        </div>

        {/* Category 2 */}
        <div id="section-advisory" className="mb-12 scroll-mt-40 pt-8 border-t border-gray-200">
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-gray-900">Advisory & Technical Infrastructure</h2>
             <p className="text-sm text-gray-500 mt-1">Strategic layers to scale your enterprise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisory.map((service) => (
              <ServiceCard 
                 key={service.id} 
                 service={service} 
                 onConfigure={setActiveService}
                 highlight={targetId === service.id}
              />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Services;