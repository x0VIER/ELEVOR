import React, { useState } from 'react';
import { ArrowRight, Zap, BrainCircuit, BarChart3, Database, Cpu, MessageSquare, ChevronRight, Stethoscope, Truck, Coins, Car, Plane, GraduationCap, ShoppingBag, Clapperboard, Check, X, ShieldCheck, Lock, Globe, Layers, Code2 } from 'lucide-react';
import { SERVICES, BLOG_POSTS } from '../constants';
import RotatingText from '../components/RotatingText';
import LogoMarquee from '../components/LogoMarquee';
import CertificationBadges from '../components/CertificationBadges';
import AnimatedWorkflow from '../components/AnimatedWorkflow';


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
      title: "Zigbang Scales with ELEVOR Autonomous Lead Acquisition",
      teaser: "In the heart of Seoul, Zigbang leveraged our Autonomous Lead Acquisition Ecosystem to revolutionize their operations.",
      logo: "/logos/zigbang.jpg"
    },
    {
      id: 2,
      category: "Real Estate",
      type: "Case Study",
      location: "Korea",
      title: "LOTTE REIT Scales with ELEVOR Predictive Deal Analysis",
      teaser: "Eliminating emotional bias from investing with computer vision agents and 50+ market indicators.",
      logo: "/logos/lotte-reit.png"
    },
    {
      id: 3,
      category: "Real Estate",
      type: "Case Study",
      location: "Korea",
      title: "ESR Scales with ELEVOR Asset Sentinel",
      teaser: "Creating a continuous monitoring loop to flag anomalies before they become liabilities.",
      logo: "/logos/esr.png"
    }
  ];

  const FILTERS = ["All", "AI Agents", "Workflows", "Healthcare", "FinTech", "Logistics", "Retail", "Travel", "Education", "Entertainment", "Real Estate"];

  const rotatingIndustries = ['Healthcare', 'FinTech', 'Logistics', 'Retail', 'Manufacturing', 'Real Estate'];
  const rotatingTexts = ['Reliability', 'Scale', 'Performance', 'Security'];

  const techLogos = [
    { name: 'OpenAI', logo: '/logos/openai.png' },
    { name: 'Anthropic', logo: '/logos/anthropic.jpg' },
    { name: 'Llama 3', icon: <Zap className="w-5 h-5 text-blue-600" /> },
    { name: 'Pinecone', icon: <Database className="w-5 h-5 text-blue-600" /> },
    { name: 'LangChain', icon: <Layers className="w-5 h-5 text-blue-600" /> },
    { name: 'Python', icon: <Code2 className="w-5 h-5 text-blue-600" /> },
    { name: 'React', icon: <Code2 className="w-5 h-5 text-blue-600" /> },
    { name: 'AWS', icon: <Globe className="w-5 h-5 text-blue-600" /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="z-10 relative">
                 <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold">
                    OUR STORY & VISION
                 </div>
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Built for <span className="text-blue-600"><RotatingText texts={rotatingTexts} interval={2500} /></span>.<br/>
                    Designed for <span className="text-blue-600">Scale</span>.
                 </h1>
                 <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                    ELEVOR AI bridges the gap between cutting-edge autonomous technology and enterprise-grade reliability.
                 </p>
                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We value transparency, security, and measurable outcomes. Serving <RotatingText texts={rotatingIndustries} interval={2000} className="text-blue-600 font-semibold" /> and beyond.
                 </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                     <button onClick={() => setPage('Contact')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base">
                        Start Building
                     </button>
                     <button onClick={() => setPage('CaseStudies')} className="text-gray-900 font-bold hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group text-base px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:shadow-md">
                        Explore Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
                 
                 {/* Certification Badges */}
                 <CertificationBadges />
            </div>

            {/* Right Content - Dynamic Stats & Social Proof */}
            <div className="relative">
              {/* Gradient Background Card */}
              <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl shadow-xl p-8 border border-blue-100 overflow-hidden">
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(37, 99, 235) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                </div>

                <div className="relative z-10">
                  {/* Header with Live Badge & Last Updated */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Live Metrics</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Powering Enterprise AI</h3>
                      <p className="text-gray-600 text-xs">Last updated: 2 hours ago • Refreshes every 12 hours</p>
                    </div>
                  </div>
                  
                  {/* Main Stats Grid */}
                   <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
                    <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-2xl"></div>
                       <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">247</div>
                      <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Total Agents</div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-2xl"></div>
                       <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">21.5K</div>
                      <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Tasks Today</div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-600 rounded-l-2xl"></div>
                       <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">$2.8M</div>
                      <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Monthly Value</div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-600 rounded-l-2xl"></div>
                       <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">99.9%</div>
                      <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Uptime SLA</div>
                    </div>
                  </div>

                  {/* Agent Deployment Breakdown */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold text-sm">Active Deployments by Service</h4>
                      <span className="text-blue-100 text-xs">247 agents</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-blue-200" />
                          <span className="text-white text-xs font-medium">Lead Generation</span>
                        </div>
                        <span className="text-white font-bold text-sm">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-blue-200" />
                          <span className="text-white text-xs font-medium">Customer Support</span>
                        </div>
                        <span className="text-white font-bold text-sm">67</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-3.5 h-3.5 text-blue-200" />
                          <span className="text-white text-xs font-medium">Data Analysis</span>
                        </div>
                        <span className="text-white font-bold text-sm">54</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BrainCircuit className="w-3.5 h-3.5 text-blue-200" />
                          <span className="text-white text-xs font-medium">Content Creation</span>
                        </div>
                        <span className="text-white font-bold text-sm">37</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Proof Stats */}
                   <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 mb-6">
                    <div className="text-center">
                       <div className="text-xl sm:text-2xl font-bold text-gray-900">340%</div>
                      <div className="text-xs text-gray-600">Avg ROI</div>
                    </div>
                    <div className="text-center">
                       <div className="text-xl sm:text-2xl font-bold text-gray-900">48hr</div>
                      <div className="text-xs text-gray-600">Deploy Time</div>
                    </div>
                    <div className="text-center">
                       <div className="text-xl sm:text-2xl font-bold text-gray-900">87%</div>
                      <div className="text-xs text-gray-600">Cost Saved</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5"></div>

                  {/* Key Benefits - Compact & Clean */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-2.5 group">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Production-ready in 48 hours</span>
                    </div>
                    <div className="flex items-center gap-2.5 group">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">SOC 2 & ISO 27001 certified</span>
                    </div>
                    <div className="flex items-center gap-2.5 group">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">24/7 monitoring & support</span>
                    </div>
                    <div className="flex items-center gap-2.5 group">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Money-back guarantee</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => setPage('LiveDashboard')}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>View Live Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <LogoMarquee logos={techLogos} title="Powered by Best-in-Class Tech" />

      {/* How It Works - Workflow Visualization */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How ELEVOR Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch AI agents process tasks in real-time across your workflows
            </p>
          </div>
          <AnimatedWorkflow />
        </div>
      </section>

      {/* What Sets ELEVOR Apart */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Sets ELEVOR Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just build AI. We engineer autonomous systems that deliver measurable business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: "10x Efficiency Gains",
                description: "Our AI agents automate complex workflows, reducing operational costs by up to 87% while maintaining enterprise-grade quality."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
                title: "Enterprise Security",
                description: "SOC 2 Type II and ISO 27001 certified. Your data stays secure with end-to-end encryption and compliance monitoring."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                title: "Measurable ROI",
                description: "Track every metric that matters. Our clients see average ROI of 340% within the first year of deployment."
              }
            ].map((item, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg inline-block">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by leading organizations across multiple sectors
            </p>
          </div>

           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {INDUSTRIES.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleIndustryClick(industry.category)}
                  className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
                >
                  <div className={`${industry.bg} p-4 rounded-lg inline-block mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`${industry.color} w-8 h-8`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{industry.name}</h3>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real deployments
              </p>
            </div>
            <button
              onClick={() => setPage('CaseStudies')}
              className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group transition-all duration-300 hover:gap-3"
            >
              View All Case Studies
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WORK_ITEMS.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setPage('CaseStudies')}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden p-2">
                      <img src={item.logo} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">{item.category}</span>
                      <span className="text-sm text-gray-500 ml-2">• {item.location}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.teaser}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Scale with AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading enterprises who trust ELEVOR to automate their most critical workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setPage('Contact')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
            >
              Get Started Today
            </button>
            <button
              onClick={() => setPage('LiveDashboard')}
              className="bg-blue-700 text-white hover:bg-blue-800 font-bold py-4 px-8 rounded-lg border-2 border-blue-400 transition-all duration-300 hover:scale-105 text-lg"
            >
              View Live Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
