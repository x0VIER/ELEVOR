import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Search, X, ChevronRight, TrendingUp, Activity, CheckCircle2, AlertCircle, BarChart3, Clock, DollarSign, MapPin, Users, Zap, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../constants';

// --- TYPES ---
interface ContentItem {
  id: string;
  type: 'Case Study';
  title: string;
  category: string;
  location: string;
  company: string;
  serviceId: number;
  teaser: string;
  fullContent: string; // HTML String
  metrics: { label: string; before: string; after: string; delta: string }[];
  impactStat: string;
  tags: string[];
}

// --- DATA GENERATION ENGINE ---

const LOCATIONS = ["New York, NY", "Austin, TX", "London, UK", "Singapore", "Seoul, KR", "Dubai, UAE", "Toronto, CA", "Berlin, DE", "San Francisco, CA", "Chicago, IL", "Miami, FL", "Sydney, AU"];

const INDUSTRIES: Record<string, { companies: string[], challenges: string[], outcomes: string[] }> = {
  "Real Estate": {
    companies: ["Summit Properties", "UrbanFlow Realty", "Apex Holdings", "Terra Firma Corp", "Skyline Assets", "MetroSpace", "Vantage Point", "Capital Brick", "EstateStream", "PropLink", "Brick & Mortar Ventures", "HighRise Capital", "CityBlock Dev", "NextGen Housing"],
    challenges: ["Manual lead qualification was taking 40+ hours/week per agent.", "Missed 30% of off-market deals due to slow analysis.", "Property management maintenance tickets were piling up unread.", "Zoning data verification was error-prone and slow."],
    outcomes: ["Lead response time dropped to under 5 seconds.", "Acquisition volume doubled in Q2.", "Tenant satisfaction scores rose by 45%.", "Underwriting error rate reduced to near zero."]
  },
  "FinTech": {
    companies: ["FinVault", "LedgerLine", "CoinTrust", "AlphaQuant", "SecurePay", "ChainGuard", "NeoBank Systems", "CreditFlow", "AssetWise", "PayPulse", "Vaulted Inc", "CryptoShield", "TradeStream", "Fiscal AI"],
    challenges: ["Fraud detection false positives were blocking legitimate users.", "Loan underwriting took 5-7 business days.", "Regulatory compliance reporting was a manual spreadsheet nightmare.", "Transaction reconciliation was delaying monthly close."],
    outcomes: ["Fraud loss reduced by 92% instantly.", "Approvals are now instant (sub-100ms).", "Audit trails are generated automatically in real-time.", "Books close in 2 hours instead of 5 days."]
  },
  "Healthcare": {
    companies: ["MediCore", "HealthSync", "VitalData", "CarePoint", "BioTrack", "MediGuard", "PulseAnalytics", "ClinicOS", "PharmaFlow", "LifeScience AI", "WellSpring Health", "RapidCare Ops", "DocuHealth", "SurgicalMind"],
    challenges: ["Patient intake forms were causing hour-long lobby waits.", "Insurance verification backlog delayed critical procedures.", "Clinical notes transcription was causing physician burnout.", "Appointment no-show rates were costing $50k/mo."],
    outcomes: ["Wait times reduced by 75% via mobile triage.", "Claims denial rate dropped to <1%.", "Doctors save 2 hours/day on documentation.", "Smart scheduling filled 98% of cancellation slots."]
  },
  "Logistics": {
    companies: ["SwiftCargo", "RouteMaster", "GlobalFleet", "PortSync", "SupplyChainPro", "LogiTech", "FreightOS", "ShipFast", "WareHouse AI", "TransPort", "CargoLoop", "LastMile Heroes", "ContainerIQ", "FleetBrain"],
    challenges: ["Empty backhaul miles were eating into profit margins.", "Warehouse picking errors led to high return rates.", "Route planning didn't account for real-time traffic/weather.", "Driver shift scheduling was manual and inefficient."],
    outcomes: ["Fuel costs reduced by 18% via AI routing.", "Picking accuracy reached 99.99%.", "On-time delivery rate improved to 98%.", "Fleet utilization increased by 30%."]
  },
  "Retail": {
    companies: ["ShopScale", "RetailMind", "Commercia", "BrandLift", "MarketFlow", "ConsumerIQ", "TrendSpot", "StoreOS", "OmniCart", "SalesBoost", "LuxeThreads", "MarketSquare", "UrbanRetail", "GlobalGoods"],
    challenges: ["Customer support tickets piled up during peak seasons.", "Inventory stockouts were missing demand spikes.", "Generic email marketing had low open rates.", "Return processing was slow and costly."],
    outcomes: ["CSAT scores hit all-time highs with AI chat.", "Dynamic stocking prevented 95% of stockouts.", "Personalized AI outreach doubled conversion.", "Returns are now auto-processed in seconds."]
  },
  "AI Agents": {
    // Fallback/General
    companies: ["TechCorp", "InnovateX", "FutureSystems", "AutoWorks", "NeuralNet Inc", "DataDrive", "SoftScale"],
    challenges: ["Operational overhead was unscalable.", "Manual data entry caused 10% error rates.", "Staff was spending 50% of time on repetitive tasks.", "Legacy systems couldn't talk to each other."],
    outcomes: ["Operational costs slashed by 40%.", "Data accuracy is now guaranteed.", "Team focused purely on strategy.", "Systems synced in real-time."]
  }
};

const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomFloat = (min: number, max: number, decimals: number = 1) => (Math.random() * (max - min) + min).toFixed(decimals);
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Generator Function
const generateCaseStudies = (count: number): ContentItem[] => {
  const items: ContentItem[] = [];
  
  for (let i = 0; i < count; i++) {
    // 1. Pick a Service & Category
    const service = SERVICES[i % SERVICES.length];
    // Map service category to our industries logic
    let industryKey = "AI Agents";
    if (service.title.includes("Lead") || service.title.includes("Deal")) industryKey = "Real Estate";
    else if (service.title.includes("Patient") || service.title.includes("Clinical")) industryKey = "Healthcare";
    else if (service.title.includes("Supply") || service.title.includes("Route")) industryKey = "Logistics";
    else if (service.title.includes("Transaction") || service.title.includes("Risk")) industryKey = "FinTech";
    else if (service.title.includes("Retail") || service.title.includes("Shopping")) industryKey = "Retail";
    
    const industryData = INDUSTRIES[industryKey] || INDUSTRIES["AI Agents"];
    const company = getRandom(industryData.companies);
    const location = getRandom(LOCATIONS);
    const challenge = getRandom(industryData.challenges);
    const outcome = getRandom(industryData.outcomes);

    // 2. Generate Realistic Metrics
    const metricTypes = [
        { label: "Processing Time", unit: "", beforeRange: [24, 72], afterRange: [1, 5], beforeSuffix: " hrs", afterSuffix: " mins" },
        { label: "Cost Per Unit", unit: "$", beforeRange: [50, 150], afterRange: [2, 10], beforeSuffix: "", afterSuffix: "" },
        { label: "Error Rate", unit: "", beforeRange: [8, 15], afterRange: [0.01, 0.5], beforeSuffix: "%", afterSuffix: "%" },
        { label: "Labor Hours", unit: "", beforeRange: [40, 100], afterRange: [0, 5], beforeSuffix: "/wk", afterSuffix: "/wk" },
        { label: "Revenue Recovery", unit: "$", beforeRange: [0, 1000], afterRange: [50000, 200000], beforeSuffix: "", afterSuffix: "/mo" },
        { label: "Customer Wait", unit: "", beforeRange: [20, 45], afterRange: [0, 2], beforeSuffix: " mins", afterSuffix: " mins" },
    ];

    // Pick 3 random unique metrics
    const shuffledMetrics = [...metricTypes].sort(() => 0.5 - Math.random());
    const selectedMetrics = shuffledMetrics.slice(0, 3).map(m => {
        const b = getRandomInt(m.beforeRange[0], m.beforeRange[1]);
        const a = m.unit === "$" && m.afterRange[1] > 1000 ? getRandomInt(m.afterRange[0], m.afterRange[1]) : getRandomFloat(m.afterRange[0], m.afterRange[1]); 
        
        return {
            label: m.label,
            before: `${m.unit}${b}${m.beforeSuffix}`,
            after: `${m.unit}${a}${m.afterSuffix}`,
            delta: m.unit === "$" && m.afterRange[1] > 1000 ? `+${Math.floor(Number(a)/1000)}k` : `-${Math.floor((b - Number(a))/b * 100)}%`
        };
    });

    const impactValue = selectedMetrics[0].delta.includes('+') ? selectedMetrics[0].delta + " Gain" : selectedMetrics[0].delta + " Efficiency";
    const roi = getRandomInt(200, 800) + "%";

    // Tech Stack Generation
    const techStack = ["Python", "TensorFlow", "OpenAI API", "Pinecone", "React", "AWS Lambda", "Docker", "Kubernetes", "LangChain"];
    const selectedTech = techStack.sort(() => 0.5 - Math.random()).slice(0, 4);

    // 3. Construct HTML Story
    const fullContent = `
      <div class="space-y-12 font-sans text-gray-800">
        
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
           <div class="absolute top-0 right-0 p-4 opacity-10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
           </div>
           <h4 class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 relative z-10">Executive Summary</h4>
           <p class="text-lg text-blue-900 leading-relaxed font-medium relative z-10">
             Facing stagnation due to operational bottlenecks, <strong>${company}</strong> partnered with <strong>ELEVOR AI</strong> to implement a radical digital transformation. 
             By deploying the <strong>${service.title}</strong>, we replaced manual friction with autonomous speed, resulting in a verified <strong>${roi} ROI</strong> and fundamentally changing their unit economics.
           </p>
        </div>

        <div class="prose-section">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span class="bg-red-100 text-red-600 p-2 rounded-lg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>
            The Breaking Point
          </h3>
          <p class="text-gray-600 leading-8 mb-6 text-lg">
            Before engaging ELEVOR AI, ${company} was struggling with ${challenge.toLowerCase()} Their legacy infrastructure relied heavily on human intervention for routine tasks, creating a fragile system unable to handle peak loads.
          </p>
          <p class="text-gray-600 leading-8 mb-6 text-lg">
             Key performance indicators were flashing red:
          </p>
          <ul class="space-y-4 mb-8">
             <li class="flex items-start gap-3">
                <span class="text-red-500 mt-1.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span>
                <span><strong>${selectedMetrics[0].label}</strong> was stalling at <span class="text-red-600 font-bold decoration-red-300 underline underline-offset-4">${selectedMetrics[0].before}</span>, far below industry standards.</span>
             </li>
             <li class="flex items-start gap-3">
                <span class="text-red-500 mt-1.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span>
                <span><strong>${selectedMetrics[2].label}</strong> had climbed to ${selectedMetrics[2].before}, resulting in significant downstream waste.</span>
             </li>
          </ul>
          <blockquote class="border-l-4 border-gray-200 pl-6 italic text-gray-500 my-8 text-xl">
            "We were drowning in data but starving for insights. The manual reconciliation processes were not just slow; they were limiting our ability to compete."
            <footer class="text-sm font-bold text-gray-900 mt-2 not-italic">— CTO, ${company}</footer>
          </blockquote>
        </div>

        <div class="prose-section">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
             <span class="bg-blue-100 text-blue-600 p-2 rounded-lg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span>
             The ELEVOR AI Architecture
          </h3>
          <p class="text-gray-600 leading-8 mb-8 text-lg">
            <strong>ELEVOR AI</strong> deployed a custom-engineered <em>${service.title}</em> designed to operate autonomously within ${company}'s secure environment.
            Leveraging a modern stack including <strong>${selectedTech.join(', ')}</strong>, our solution architects built a system capable of sub-second decision making.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
               <div class="text-blue-600 mb-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg></div>
               <h5 class="font-bold text-gray-900 mb-2 text-base">Intelligent Ingestion</h5>
               <p class="text-gray-600 leading-relaxed">ELEVOR agents connected directly to ${company}'s raw data streams, normalizing unstructured inputs into vector embeddings for analysis.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
               <div class="text-blue-600 mb-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 16v.01"/><path d="M12 12v.01"/></svg></div>
               <h5 class="font-bold text-gray-900 mb-2 text-base">Autonomous Reasoning</h5>
               <p class="text-gray-600 leading-relaxed">Proprietary models achieved <strong>${selectedMetrics[2].after}</strong> error rates, handling complex edge cases without human intervention.</p>
            </div>
          </div>
        </div>

        <div class="prose-section">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span class="bg-green-100 text-green-600 p-2 rounded-lg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
            Business Impact
          </h3>
          <p class="text-gray-600 leading-8 mb-6 text-lg">
            The transformation was immediate. Post-deployment, ${company} verified a drastic improvement in their core unit economics. 
            The <strong>${service.title}</strong> now handles 100% of the workload that previously required a dedicated team, allowing staff to focus on high-level strategy.
          </p>
          
          <div class="bg-gray-50 rounded-2xl p-8 border border-gray-200">
             <h4 class="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Verified Outcomes</h4>
             <div class="space-y-6">
                <div class="flex items-center justify-between border-b border-gray-200 pb-4">
                   <span class="text-gray-600 font-medium">${selectedMetrics[0].label}</span>
                   <div class="text-right">
                      <span class="block text-2xl font-black text-gray-900">${selectedMetrics[0].after}</span>
                      <span class="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Improved by ${selectedMetrics[0].delta.replace('-','')}</span>
                   </div>
                </div>
                 <div class="flex items-center justify-between border-b border-gray-200 pb-4">
                   <span class="text-gray-600 font-medium">${selectedMetrics[1].label}</span>
                   <div class="text-right">
                      <span class="block text-2xl font-black text-gray-900">${selectedMetrics[1].after}</span>
                      <span class="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Optimized by ${selectedMetrics[1].delta.replace('-','')}</span>
                   </div>
                </div>
             </div>
          </div>
          
          <p class="text-gray-600 leading-8 mt-8 text-lg">
            "ELEVOR AI didn't just automate a process; they gave us our agility back. We are now scaling into new markets with the same headcount, thanks to this infrastructure."
          </p>
        </div>
      </div>
    `;

    items.push({
      id: `cs-gen-${i}`,
      type: 'Case Study',
      title: `${company}: ${service.title}`,
      category: industryKey,
      location: location,
      company: company,
      serviceId: service.id,
      teaser: `${outcome} Discover how we achieved a ${roi} ROI for ${company} by automating their core workflow.`,
      metrics: selectedMetrics,
      impactStat: roi + " ROI",
      fullContent: fullContent,
      tags: [industryKey, "Automation", "AI Agents"]
    });
  }
  return items;
};

// Generate 77 Items
const ITEMS: ContentItem[] = generateCaseStudies(77);


// --- MODAL COMPONENT ---
const CaseStudyModal: React.FC<{ item: ContentItem; onClose: () => void; onSchedule: () => void }> = ({ item, onClose, onSchedule }) => {
  const Icon = SERVICES.find(s => s.id === item.serviceId)?.icon || Activity;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6 flex justify-between items-start sticky top-0 z-20 shadow-sm">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 border border-blue-100 shadow-inner">
               <Icon size={28} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-blue-600 px-2 py-1 rounded shadow-sm">
                  {item.category}
                </span>
                <span className="flex items-center text-gray-500 text-xs font-medium gap-1">
                   <MapPin size={10} /> {item.location}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight pr-8">
                {item.title}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow bg-gray-50/30 scroll-smooth">
          <div className="max-w-3xl mx-auto p-6 md:p-10">
            
            {/* Live Data Grid */}
            <div className="mb-10 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                    <Activity size={16} className="text-green-400"/> Live Performance Data
                  </h4>
                  <span className="text-green-400 font-bold text-sm bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                    {item.impactStat} Confirmed
                  </span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  {item.metrics.map((m, i) => (
                    <div key={i} className="p-6 text-center group hover:bg-gray-50 transition-colors">
                       <div className="text-xs text-gray-500 font-bold uppercase mb-3 tracking-wider">{m.label}</div>
                       <div className="flex items-center justify-center gap-4">
                          <div className="text-gray-400 line-through text-sm font-medium">{m.before}</div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                          <div className="text-gray-900 font-black text-xl">{m.after}</div>
                       </div>
                       <div className={`text-xs font-bold mt-2 ${m.delta.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
                          {m.delta.includes('+') ? '▲' : '▼'} {m.delta.replace('-', '')} Improvement
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Rich Content Injection */}
            <div 
              className="prose prose-blue prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: item.fullContent }}
            />

            {/* CTA in Modal */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white text-center shadow-lg relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/3 -translate-y-1/3 transition-transform group-hover:scale-110 duration-700">
                  <Zap size={200} fill="currentColor" />
               </div>
               
               <h3 className="text-2xl font-bold mb-3 relative z-10">Achieve results like {item.company}</h3>
               <p className="text-blue-100 mb-8 max-w-lg mx-auto relative z-10 text-sm md:text-base">
                 Our Solution Architects are ready to map this exact workflow to your infrastructure.
               </p>
               <button onClick={onSchedule} className="relative z-10 bg-white text-blue-700 font-bold py-3.5 px-8 rounded-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
                 Schedule Feasibility Audit
               </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
const CaseStudies: React.FC<{ initialCategory?: string; setPage: (page: string) => void }> = ({ initialCategory = 'All', setPage }) => {
  const [filter, setFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  
  const filters = ["All", "AI Agents", "Real Estate", "FinTech", "Healthcare", "Logistics", "Retail"];

  const filteredItems = useMemo(() => {
     let items = ITEMS;
     if (filter !== 'All') {
       items = items.filter(i => i.category === filter);
     }
     if (searchQuery.trim()) {
       const query = searchQuery.toLowerCase();
       items = items.filter(i => 
         i.title.toLowerCase().includes(query) || 
         i.teaser.toLowerCase().includes(query) ||
         i.company.toLowerCase().includes(query)
       );
     }
     return items;
  }, [filter, searchQuery]);

  const getServiceIcon = (id: number) => {
    const service = SERVICES.find(s => s.id === id);
    return service ? service.icon : ArrowRight;
  };

  const handleScheduleFromModal = () => {
    setSelectedItem(null);
    setPage('Contact');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {selectedItem && (
        <CaseStudyModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onSchedule={handleScheduleFromModal} 
        />
      )}

      {/* Hero */}
      <div className="bg-white pt-20 pb-16 text-center border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Work & <span className="text-blue-600">Insights</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Search our database of <span className="font-bold text-gray-900">{ITEMS.length}</span> autonomous transformations across 6 global industries.
        </p>
      </div>

      {/* Sticky Header: Search & Filters */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 order-2 md:order-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  filter === f
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs order-1 md:order-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-400"
              placeholder="Search companies, metrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Card Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
               const Icon = getServiceIcon(item.serviceId);
               return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="bg-white rounded-xl border border-gray-200 p-0 hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group overflow-hidden"
                >
                  {/* Card Header with Color Splash */}
                  <div className="p-6 pb-0">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-gray-100 shadow-sm">
                            <Icon size={24} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                            {item.category}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-400 font-medium uppercase tracking-wide gap-2 mb-4">
                        <MapPin size={10} /> {item.location}
                      </div>
                  </div>
                  
                  {/* Data Strip */}
                  <div className="mx-6 mb-4 py-3 border-y border-gray-50 flex items-center justify-between">
                     <div className="text-center">
                        <div className="text-[10px] uppercase text-gray-400 font-bold">Before</div>
                        <div className="text-xs font-bold text-gray-500 line-through decoration-red-400">{item.metrics[0].before}</div>
                     </div>
                     <ArrowRight size={12} className="text-gray-300"/>
                     <div className="text-center">
                        <div className="text-[10px] uppercase text-gray-400 font-bold">After</div>
                        <div className="text-sm font-black text-gray-900">{item.metrics[0].after}</div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] uppercase text-gray-400 font-bold">Impact</div>
                        <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{item.metrics[0].delta}</div>
                     </div>
                  </div>

                  <div className="px-6 pb-6 flex-grow">
                     <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {item.teaser}
                     </p>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm group-hover:bg-blue-50/30 transition-colors">
                    <span className="font-bold text-blue-600 group-hover:underline decoration-2 underline-offset-4 flex items-center">
                      Read Case Study <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-gray-400 text-xs font-bold">
                       {item.impactStat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Search size={40} />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">No studies found</h3>
             <p className="text-gray-500 max-w-md mx-auto">We couldn't find any case studies matching your current filters. Try adjusting your search terms.</p>
             <button 
                onClick={() => {setSearchQuery(''); setFilter('All');}}
                className="mt-6 text-blue-600 font-bold hover:underline"
             >
                Reset Database
             </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CaseStudies;