import React, { useState } from 'react';
import { ArrowRight, Zap, BrainCircuit, BarChart3, Database, Cpu, MessageSquare, ChevronRight, Stethoscope, Truck, Coins, Car, Plane, GraduationCap, ShoppingBag, Clapperboard, Check, X, ShieldCheck, Lock, Globe, Layers, Code2 } from 'lucide-react';
import { SERVICES, BLOG_POSTS } from '../constants';

const Home: React.FC<{ setPage: (page: string) => void; setCategory?: (category: string) => void }> = ({ setPage, setCategory }) => {
  
  const [activeFilter, setActiveFilter] = useState('All');

  const handleIndustryClick = (category: string) => {
    if (setCategory) {
      setCategory(category);
    } else {
      setPage('CaseStudies');
    }
  };

  const INDUSTRIES = [
    { name: 'Healthcare', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50', category: 'Healthcare' },
    { name: 'Logistics', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', category: 'Logistics' },
    { name: 'Fintech', icon: Coins, color: 'text-blue-600', bg: 'bg-blue-50', category: 'FinTech' },
    { name: 'Automotive', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50', category: 'Automotive' },
    { name: 'Travel', icon: Plane, color: 'text-blue-600', bg: 'bg-blue-50', category: 'Travel' },
    { name: 'Education', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', category: 'Education' },
    { name: 'Retail', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', category: 'Retail' },
    { name: 'Entertainment', icon: Clapperboard, color: 'text-blue-600', bg: 'bg-blue-50', category: 'Entertainment' },
  ];

  const WORK_ITEMS = [
    {
      id: 1,
      category: "Real Estate",
      type: "Case Study",
      location: "Korea",
      title: "Jikbang Scales with ELEVOR Autonomous Lead Acquisition",
      teaser: "In the heart of Seoul, Jikbang leveraged our Autonomous Lead Acquisition Ecosystem to revolutionize their operations.",
      icon: Database
    },
    {
      id: 2,
      category: "Real Estate",
      type: "Case Study",
      location: "Korea",
      title: "LOTTE REIT Scales with ELEVOR Predictive Deal Analysis",
      teaser: "Eliminating emotional bias from investing with computer vision agents and 50+ market indicators.",
      icon: BarChart3
    },
    {
      id: 3,
      category: "Real Estate",
      type: "Case Study",
      location: "Korea",
      title: "ESR Kendall Square Scales with ELEVOR Asset Sentinel",
      teaser: "Creating a continuous monitoring loop to flag anomalies before they become liabilities.",
      icon: Layers
    }
  ];

  const FILTERS = ["All", "AI Agents", "Workflows", "Healthcare", "FinTech", "Logistics", "Retail", "Travel", "Education", "Entertainment", "Real Estate"];

  return (
    <div>
      {/* Hero Section - Reduced Padding, Tighter Spacing */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="z-10 relative">
                 <div className="inline-block mb-4 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase">
                    Enterprise AI Engineering
                 </div>
                 <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
                    Scale Operations with <span className="text-blue-600">Autonomous AI</span>
                 </h1>
                 <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-lg">
                    We build custom AI workforces that integrate seamlessly into your existing stack, automating complex workflows to reduce costs and accelerate growth.
                 </p>
                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                    <button onClick={() => setPage('Contact')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-all text-base">
                       Start Building
                    </button>
                    <button onClick={() => setPage('CaseStudies')} className="text-gray-900 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 group text-base px-6 py-3 border border-gray-200 rounded-lg hover:border-blue-600">
                       Explore Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
                 
                 {/* Trust Signals */}
                 <div className="flex flex-wrap items-center gap-6 border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <ShieldCheck className="text-blue-600" size={20} />
                        <span>SOC 2 Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <Lock className="text-blue-600" size={20} />
                        <span>Enterprise Security</span>
                    </div>
                     <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <Globe className="text-blue-600" size={20} />
                        <span>24/7 Global Support</span>
                    </div>
                 </div>
            </div>

            {/* Right Image Area */}
            <div className="relative h-[450px] lg:h-[550px] w-full flex items-center justify-center hidden lg:flex">
                 <div className="absolute inset-0 border-2 border-dashed border-blue-100 rounded-2xl"></div>
                 <div className="relative w-[95%] h-[95%] rounded-xl overflow-hidden shadow-2xl border border-gray-200 group bg-gray-900">
                    <img 
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000" 
                      alt="AI Digital Brain" 
                      className="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                       <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <Zap size={20} fill="currentColor" />
                       </div>
                       <div>
                          <div className="font-bold text-gray-900 text-base">10x Efficiency</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Automated Workflows</div>
                       </div>
                    </div>
                 </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Compact */}
      <section className="py-10 bg-gray-50 border-y border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="md:w-1/3 text-center md:text-left">
                  <h3 className="font-bold text-gray-900 text-base">Powered by Best-in-Class Tech</h3>
                  <p className="text-sm text-gray-500">We leverage the most advanced models and infrastructure.</p>
               </div>
               <div className="md:w-2/3">
                  <div className="flex flex-wrap justify-center md:justify-end gap-3">
                     {['OpenAI', 'Anthropic', 'Llama 3', 'Pinecone', 'LangChain', 'Python', 'React', 'AWS'].map(tech => (
                        <div key={tech} className="px-3 py-1.5 bg-white rounded-md border border-gray-200 text-xs font-bold text-gray-600 shadow-sm flex items-center gap-2">
                           <Cpu size={14} className="text-blue-600" /> {tech}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Comprehensive AI Solutions - Tighter Grid & New Icons */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-10">
              <span className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-2 block">Our Expertise</span>
              <h2 className="text-3xl font-bold text-gray-900">Comprehensive AI Solutions</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all group">
                 <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                    <BrainCircuit size={28} />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Agent Engineering</h3>
                 <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    We design bespoke AI agents trained on your proprietary data to handle specific tasks like lead qualification, support, and analysis.
                 </p>
                 <div className="text-blue-600 font-bold text-sm flex items-center cursor-pointer hover:underline">Learn More <ChevronRight size={14} className="ml-1" /></div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all group">
                 <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                    <Layers size={28} />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">Workflow Orchestration</h3>
                 <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Connect disparate systems (CRM, ERP, Email) into a unified, intelligent pipeline that executes complex logic without human intervention.
                 </p>
                 <div className="text-blue-600 font-bold text-sm flex items-center cursor-pointer hover:underline">View Workflows <ChevronRight size={14} className="ml-1" /></div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all group">
                 <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                    <Database size={28} />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">Data Intelligence</h3>
                 <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Turn raw data into actionable insights. Our RAG (Retrieval-Augmented Generation) systems provide agents with real-time context.
                 </p>
                 <div className="text-blue-600 font-bold text-sm flex items-center cursor-pointer hover:underline">See Analytics <ChevronRight size={14} className="ml-1" /></div>
              </div>
           </div>
        </div>
      </section>

      {/* Work & Insights Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Recent Transformations</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Real results driven by our autonomous architecture.
              </p>
           </div>

           {/* Clean Pill Filters */}
           <div className="flex flex-wrap justify-center gap-2 mb-10">
              {FILTERS.slice(0, 6).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                    activeFilter === f
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  {f}
                </button>
              ))}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WORK_ITEMS.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setPage('CaseStudies')}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <item.icon size={24} />
                     </div>
                     <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gray-100 text-gray-600">
                        {item.category}
                     </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {item.teaser}
                  </p>

                  <div className="mt-auto flex items-center text-xs font-bold text-gray-900 group-hover:text-blue-600 uppercase tracking-wide">
                    View Case Study <ArrowRight size={12} className="ml-1" />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-10">
             <h2 className="text-3xl font-bold text-gray-900">Industries We Serve</h2>
             <p className="text-gray-500 mt-2">Tailored solutions for sector-specific challenges.</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {INDUSTRIES.map((ind) => (
                <button 
                  key={ind.name} 
                  onClick={() => handleIndustryClick(ind.category)}
                  className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-blue-600 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center"
                >
                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors bg-blue-50 text-blue-600 group-hover:scale-110 duration-200`}>
                      <ind.icon size={24} />
                   </div>
                   <h3 className="text-gray-900 font-bold text-sm group-hover:text-blue-600 transition-colors">{ind.name}</h3>
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Scale?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Join the forward-thinking enterprises building the future with ELEVOR AI.</p>
            <button onClick={() => setPage('Contact')} className="bg-blue-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1">
              Start Your Transformation
            </button>
         </div>
      </section>
    </div>
  );
};

export default Home;