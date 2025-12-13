import React from 'react';
import { Twitter, Linkedin, Mail, MapPin, Phone, Github, Instagram, ArrowRight } from 'lucide-react';

interface FooterProps {
  setPage: (page: string) => void;
  setTargetServiceId: (id: number) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage, setTargetServiceId }) => {
  
  const handleServiceClick = (id: number) => {
    setTargetServiceId(id);
    setPage('Services');
  };

  const linkGroups = [
    {
      title: "Company",
      links: [
        { label: "About Us", action: () => setPage('About') },
        { label: "Executive Team", action: () => setPage('About') },
        { label: "Case Studies", action: () => setPage('CaseStudies') },
        { label: "Tech Blog", action: () => setPage('Blog') },
        { label: "Pricing", action: () => setPage('Pricing') },
        { label: "Contact", action: () => setPage('Contact') },
      ]
    },
    {
      title: "Specialized Agents",
      links: [
        { label: "Lead Acquisition Bot", action: () => handleServiceClick(1) },
        { label: "Deal Analyzer Engine", action: () => handleServiceClick(2) },
        { label: "Scheduling Matrix", action: () => handleServiceClick(5) },
        { label: "Reputation Guardian", action: () => handleServiceClick(4) },
        { label: "Patient Triage Agent", action: () => handleServiceClick(22) },
        { label: "Supply Chain Brain", action: () => handleServiceClick(23) },
      ]
    },
    {
      title: "Advisory & Tech",
      links: [
        { label: "Virtual CTO Audit", action: () => handleServiceClick(11) },
        { label: "Rapid MVP Build", action: () => handleServiceClick(13) },
        { label: "Data Lake Infra", action: () => handleServiceClick(17) },
        { label: "ERP Backbone", action: () => handleServiceClick(14) },
        { label: "Blockchain Security", action: () => handleServiceClick(12) },
        { label: "Legacy Migration", action: () => handleServiceClick(10) },
      ]
    },
    {
      title: "Industries",
      links: [
        { label: "Healthcare AI", action: () => handleServiceClick(22) },
        { label: "Logistics AI", action: () => handleServiceClick(23) },
        { label: "Fintech AI", action: () => handleServiceClick(25) },
        { label: "Retail AI", action: () => handleServiceClick(24) },
        { label: "Real Estate AI", action: () => handleServiceClick(1) },
        { label: "Education AI", action: () => handleServiceClick(26) },
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Layout: 12 Column Grid for perfect spacing control */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8 mb-12">
          
          {/* Brand & Contact Column (Takes 4/12 space on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6 pr-8">
             <div className="cursor-pointer" onClick={() => setPage('Home')}>
               <span className="text-2xl font-black text-gray-900 tracking-tighter">ELEVOR <span className="text-accent">AI</span></span>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
               Innovating faster with autonomous AI talent. Zero risk, unlimited potential for real estate and service enterprises.
             </p>
             
             {/* Compact Contact Stack */}
             <div className="space-y-3 mt-1">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-accent transition-colors cursor-pointer group">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                     <Mail size={14} />
                   </div>
                   <span>hello@elevor.ai</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-accent transition-colors cursor-pointer group">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                     <Phone size={14} />
                   </div>
                   <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700 group">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-accent">
                     <MapPin size={14} />
                   </div>
                   <span>123 Innovation Dr, Tech City</span>
                </div>
             </div>

             <div className="flex gap-3 mt-4">
                {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all">
                    <Icon size={14} />
                  </button>
                ))}
             </div>
          </div>

          {/* Links Columns (Takes 8/12 space on desktop, divided into 4 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-bold text-gray-900 mb-5 text-xs uppercase tracking-widest border-b border-gray-100 pb-2">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <button 
                        onClick={link.action} 
                        className="text-xs font-medium text-gray-500 hover:text-accent transition-colors text-left flex items-center group"
                      >
                        <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-accent mr-0 group-hover:mr-1">
                          <ArrowRight size={10} />
                        </span>
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright - Tighter */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-medium">
          <p>&copy; {new Date().getFullYear()} ELEVOR AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <button className="hover:text-accent transition-colors">Privacy Policy</button>
            <button className="hover:text-accent transition-colors">Terms of Service</button>
            <button className="hover:text-accent transition-colors">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;