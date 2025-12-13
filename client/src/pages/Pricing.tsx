import React, { useState } from 'react';
import { Check, Shield, Calculator, ArrowRight, X, Plus, Minus, Zap } from 'lucide-react';

const ROICalculator = () => {
  const [employees, setEmployees] = useState(5);
  const [avgHourlyRate, setAvgHourlyRate] = useState(30);
  const [hoursAutomated, setHoursAutomated] = useState(10); // per week per employee

  const weeklySavings = employees * hoursAutomated * avgHourlyRate;
  const monthlySavings = weeklySavings * 4;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12">
       <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
             <Calculator size={24} />
          </div>
          <div>
             <h3 className="font-bold text-gray-900 text-lg">Calculate Your Potential Savings</h3>
             <p className="text-xs text-gray-500">Estimate ROI from deploying autonomous agents.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Team Size (Staff)</label>
                <div className="flex items-center gap-4">
                   <button onClick={() => setEmployees(Math.max(1, employees - 1))} className="p-2 rounded hover:bg-gray-100 border border-gray-200"><Minus size={14}/></button>
                   <span className="text-xl font-bold w-8 text-center text-gray-900">{employees}</span>
                   <button onClick={() => setEmployees(employees + 1)} className="p-2 rounded hover:bg-gray-100 border border-gray-200"><Plus size={14}/></button>
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Avg. Hourly Cost ($)</label>
                <input 
                  type="range" min="15" max="200" value={avgHourlyRate} 
                  onChange={(e) => setAvgHourlyRate(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-sm font-bold text-blue-600 mt-1">${avgHourlyRate}/hr</div>
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Hours Automated / Week</label>
                <input 
                  type="range" min="1" max="40" value={hoursAutomated} 
                  onChange={(e) => setHoursAutomated(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-sm font-bold text-blue-600 mt-1">{hoursAutomated} hrs</div>
             </div>
          </div>

          {/* Result Big */}
          <div className="md:col-span-2 bg-gray-900 rounded-xl p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <Zap size={150} />
             </div>
             <p className="text-gray-400 text-sm font-medium mb-2">Projected Annual Savings</p>
             <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-4">
                ${annualSavings.toLocaleString()}
             </div>
             <p className="text-sm text-gray-400 max-w-sm">
                *Based on replacing manual workflows with autonomous agents. Most clients achieve 5x ROI in the first 90 days.
             </p>
          </div>
       </div>
    </div>
  );
};

const Pricing: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
  
  const tiers = [
    {
      name: 'Starter Pilot',
      id: 'pilot',
      price: '$4,500',
      retainer: '$499/mo',
      desc: 'Deploy a specific autonomous worker to solve one critical bottleneck.',
      target: 'Proof of Concept',
      color: 'blue',
      features: [
        { text: '1 Custom Agent (Lead Gen or Support)', bold: true },
        { text: 'Standard Performance Dashboard', bold: false },
        { text: 'CRM Integration (HubSpot/Salesforce)', bold: false },
        { text: 'Email Support (24hr SLA)', bold: false },
        { text: '5-Day Deployment Target', bold: false },
      ],
      notIncluded: [
        'Multi-Agent Orchestration',
        'Mobile App Access',
        'Source Code Ownership'
      ],
      cta: 'Deploy Pilot',
      highlight: false
    },
    {
      name: 'Growth Ecosystem',
      id: 'growth',
      price: '$9,500',
      retainer: '$999/mo',
      desc: 'Connect multiple agents to automate entire departments.',
      target: 'Most Popular',
      color: 'accent',
      features: [
        { text: '3 Interconnected Agents', bold: true },
        { text: 'Advanced "Asset Sentinel" Dashboard', bold: true },
        { text: 'Human-in-the-Loop Review Logic', bold: false },
        { text: 'Weekly Strategy Calls', bold: false },
        { text: 'Priority Slack Channel', bold: false },
        { text: 'Mobile App Extension Included', bold: true },
      ],
      notIncluded: [
        'On-Premise Deployment',
        'White-Label License'
      ],
      cta: 'Start Growth Build',
      highlight: true
    },
    {
      name: 'Enterprise Transformation',
      id: 'enterprise',
      price: 'Custom',
      retainer: 'Retainer based',
      desc: 'Full digital transformation. We act as your Virtual CTO and engineering arm.',
      target: 'Large Organizations',
      color: 'purple',
      features: [
        { text: 'Unlimited Agent Swarms', bold: true },
        { text: 'Full "Advisory & Tech" Suite', bold: true },
        { text: 'Custom Data Lake Architecture', bold: false },
        { text: 'Dedicated Dev Squad + PM', bold: false },
        { text: 'HIPAA / SOC-2 Hardening', bold: false },
        { text: 'Full Source Code Ownership', bold: true },
      ],
      notIncluded: [],
      cta: 'Book Strategy Audit',
      highlight: false
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* Header */}
      <div className="bg-white pt-20 pb-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
            ROI-First Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Invest in <span className="text-blue-600">Outcomes</span>, Not Just Software.
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Transparent pricing designed for scalability. We offer more value upfront to ensure your autonomous workforce pays for itself.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <ROICalculator />

        {/* Pricing Cards - 3 Column Grid with 24px Gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative rounded-xl flex flex-col transition-all duration-300 ${
                tier.highlight 
                  ? 'bg-white border-2 border-blue-600 shadow-xl' 
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              {/* Badge for Highlighted Tier */}
              {tier.highlight && (
                 <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-[10px] font-bold px-4 py-1.5 rounded uppercase tracking-wider">
                    Most Popular
                 </div>
              )}

              {/* Card Header */}
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{tier.name}</h3>
                <p className="text-sm mb-6 text-gray-500">{tier.desc}</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                  <span className="text-sm font-medium text-gray-500"> setup</span>
                </div>
                <div className="text-xs font-medium mt-2 text-blue-600">
                   + {tier.retainer}
                </div>
              </div>

              {/* Card Features */}
              <div className="p-8 flex-grow">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start pl-0">
                       <Check size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" strokeWidth={3} />
                      <span className={`text-sm ${feat.bold ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                  {tier.notIncluded.map((feat, i) => (
                    <li key={`not-${i}`} className="flex items-start opacity-50 pl-0">
                      <X size={16} className="text-gray-400 mt-1 mr-3 flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm text-gray-500">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="p-8 pt-0">
                <button 
                  onClick={() => setPage('Contact')}
                  className={`w-full py-3.5 rounded-lg font-bold transition-all text-base flex items-center justify-center gap-2 ${
                    tier.highlight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {tier.cta} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
               <Shield size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">The ELEVOR Performance Guarantee</h3>
            <p className="text-gray-700">
               We stand behind our engineering. If our autonomous agents do not meet the KPI benchmarks defined in your Scope of Work within the first 30 days, we will provide continued engineering at no cost.
            </p>
        </div>

      </div>
    </div>
  );
};

export default Pricing;