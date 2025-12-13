import React, { useState } from 'react';
import { ArrowRight, Zap, BrainCircuit, BarChart3, Database, Cpu, MessageSquare, ChevronRight, Stethoscope, Truck, Coins, Car, Plane, GraduationCap, ShoppingBag, Clapperboard, Check, X, ShieldCheck, Lock, Globe, Layers, Code2 } from 'lucide-react';
import { SERVICES, BLOG_POSTS } from '../constants';
import RotatingText from '../components/RotatingText';
import LogoMarquee from '../components/LogoMarquee';
import CertificationBadges from '../components/CertificationBadges';
import AnimatedWorkflow from '../components/AnimatedWorkflow';
import HeroFlowAnimation from '../components/HeroFlowAnimation';

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

  const rotatingIndustries = ['Healthcare', 'FinTech', 'Logistics', 'Retail', 'Manufacturing', 'Real Estate'];
  const rotatingTexts = ['Reliability', 'Scale', 'Performance', 'Security'];

  const techLogos = [
    { name: 'OpenAI', icon: <Cpu className="w-5 h-5 text-blue-600" /> },
    { name: 'Anthropic', icon: <BrainCircuit className="w-5 h-5 text-blue-600" /> },
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
                 <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
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
                    <button onClick={() => setPage('Contact')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-base">
                       Start Building
                    </button>
                    <button onClick={() => setPage('CaseStudies')} className="text-gray-900 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 group text-base px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-blue-600">
                       Explore Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
                 
                 {/* Certification Badges */}
                 <CertificationBadges />
            </div>

            {/* Right Content - Animated Workflow */}
            <div className="relative">
              <HeroFlowAnimation />
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real deployments
              </p>
            </div>
            <button
              onClick={() => setPage('CaseStudies')}
              className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group"
            >
              View All Case Studies
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WORK_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setPage('CaseStudies')}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Scale with AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading enterprises who trust ELEVOR to automate their most critical workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setPage('Contact')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Schedule a Demo
            </button>
            <button
              onClick={() => setPage('LiveDashboard')}
              className="bg-blue-700 text-white hover:bg-blue-800 font-bold py-4 px-8 rounded-lg border-2 border-blue-400 transition-all text-lg"
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
