import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Zap, Heart, TrendingUp, Users, Lightbulb, Microscope, Code2, Cpu, Cloud, Database, Lock } from 'lucide-react';

const About: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
  return (
    <div className="bg-white">
      
      {/* Hero - 64px padding desktop */}
      <section className="pt-20 pb-16 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
            Our Story & Vision
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Built for <span className="text-blue-600">Reliability</span>. Designed for <span className="text-blue-600">Scale</span>.
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            ELEVOR AI bridges the gap between cutting-edge autonomous technology and enterprise-grade reliability. We value transparency, security, and measurable outcomes.
          </p>
        </div>
      </section>

      {/* Certifications Bar */}
      <section className="py-10 border-b border-gray-100 bg-white">
         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-wide">
               <ShieldCheck className="text-blue-600" size={24} /> SOC 2 Type II
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-wide">
               <CheckCircle2 className="text-blue-600" size={24} /> ISO 27001
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-wide">
               <Award className="text-blue-600" size={24} /> CMMI Level 3
            </div>
         </div>
      </section>

      {/* Why Choose Us Stats */}
      <section className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-gray-900">Why Global Companies Choose ELEVOR</h2>
               <p className="text-gray-700 mt-2 text-lg">
                  Our cutting-edge agentic workflows drive business transformation.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                  { val: "5X", title: "Agile Speed", desc: "Rapid prototyping and deployment." },
                  { val: "100%", title: "Success Rate", desc: "Dedicated support teams." },
                  { val: "99%", title: "Advanced CI/CD", desc: "Automated pipelines." },
                  { val: "15+", title: "Years Exp", desc: "Leadership in AI & SaaS." },
               ].map((stat, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all text-center">
                     <div className="text-4xl font-bold text-blue-600 mb-2">{stat.val}</div>
                     <div className="font-bold text-gray-900 mb-2">{stat.title}</div>
                     <p className="text-sm text-gray-500">{stat.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Foundational Pillars - New Card Style */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-gray-900">Foundational Pillars</h2>
               <p className="text-gray-700 mt-2 text-lg">Core values supporting scalable systems.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Pillar 1 */}
               <div className="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-blue-600 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3 mb-4">
                     <Users className="text-blue-600" size={24} />
                     <h3 className="text-xl font-bold text-gray-900">Co-Engineering</h3>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">The Right Delivery Model</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                     We seamlessly integrate with internal teams to accelerate delivery and ensure full-cycle development success.
                  </p>
               </div>

               {/* Pillar 2 */}
               <div className="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-blue-600 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3 mb-4">
                     <Microscope className="text-blue-600" size={24} />
                     <h3 className="text-xl font-bold text-gray-900">Innovation Lab</h3>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">The Right Innovation Strategy</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                     Rapidly validate ideas, accelerate prototyping, and transform concepts into market-ready software products.
                  </p>
               </div>

               {/* Pillar 3 */}
               <div className="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-blue-600 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3 mb-4">
                     <Lightbulb className="text-blue-600" size={24} />
                     <h3 className="text-xl font-bold text-gray-900">TalentOps</h3>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">The Right Technical Expertise</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                     Specialized talent with domain expertise to ensure consistent delivery across enterprise IT landscapes.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-white border-t border-gray-200">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Innovate?</h2>
            <p className="text-gray-700 mb-8">
               Join the companies that are reshaping their industries with ELEVOR AI.
            </p>
            <button onClick={() => setPage('Contact')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 shadow-md transition-all">
               Schedule a Consultation
            </button>
         </div>
      </section>

    </div>
  );
};

export default About;