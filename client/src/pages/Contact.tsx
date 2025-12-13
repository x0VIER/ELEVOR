import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const services = [
    "Custom AI Agents", 
    "Workflow Automation", 
    "Consulting & Audit", 
    "Mobile Development", 
    "Enterprise Platform", 
    "Other"
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send data to backend here
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Vision & Contact */}
          <div className="flex flex-col justify-center animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest w-fit mb-6">
              <Sparkles size={12} />
              <span>Priority Access</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Let’s Architect Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Autonomous Future.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Ready to replace manual overhead with intelligent agents? Schedule a technical discovery call directly with our Solution Architects. 
            </p>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Direct Email</h3>
                  <p className="text-gray-500 text-sm mt-1 group-hover:text-blue-600 transition-colors">hello@elevor.ai</p>
               </div>

               <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Global HQ</h3>
                  <p className="text-gray-500 text-sm mt-1">New York • Seoul • Dubai</p>
               </div>
            </div>

            <div className="hidden lg:block">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Trusted by engineering teams at</p>
              <div className="flex gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Simple text placeholders for logos to keep it clean */}
                <span className="text-lg font-black text-gray-800">ACME Corp</span>
                <span className="text-lg font-black text-gray-800">GlobalFlow</span>
                <span className="text-lg font-black text-gray-800">FinTech.io</span>
              </div>
            </div>
          </div>

          {/* Right Column: The "Clean" Form */}
          <div className="animate-in slide-in-from-right duration-700 delay-100">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative overflow-hidden">
              
              {/* Subtle top decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

              {submitted ? (
                 <div className="text-center py-24 flex flex-col items-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Request Received</h3>
                    <p className="text-gray-500 mb-8 text-lg max-w-xs mx-auto">
                      Our architects are reviewing your profile. Expect a calendar invite shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="px-8 py-3 bg-gray-100 text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Start New Request
                    </button>
                 </div>
              ) : (
                 <form onSubmit={handleSubmit} className="space-y-8">
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Project Discovery</h3>
                      <p className="text-sm text-gray-500">Tell us what you want to automate.</p>
                    </div>

                    {/* Chips */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">I'm interested in...</label>
                      <div className="flex flex-wrap gap-2">
                        {services.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border transform active:scale-95 ${
                              selectedServices.includes(s)
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400 hover:bg-white hover:text-blue-600'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="group">
                          <label className={`block text-xs font-bold uppercase tracking-wide mb-1.5 transition-colors ${focusedField === 'name' ? 'text-blue-600' : 'text-gray-500'}`}>
                            Full Name
                          </label>
                          <input 
                            required 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 block p-3.5 outline-none transition-all placeholder-gray-400 hover:bg-white" 
                            placeholder="John Doe"
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                          />
                       </div>
                       <div className="group">
                          <label className={`block text-xs font-bold uppercase tracking-wide mb-1.5 transition-colors ${focusedField === 'email' ? 'text-blue-600' : 'text-gray-500'}`}>
                            Work Email
                          </label>
                          <input 
                            required 
                            type="email" 
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 block p-3.5 outline-none transition-all placeholder-gray-400 hover:bg-white" 
                            placeholder="john@company.com" 
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                          />
                       </div>
                    </div>
                    
                    <div className="group">
                      <label className={`block text-xs font-bold uppercase tracking-wide mb-1.5 transition-colors ${focusedField === 'details' ? 'text-blue-600' : 'text-gray-500'}`}>
                        Operational Bottlenecks
                      </label>
                      <textarea 
                        required 
                        rows={4} 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 block p-3.5 outline-none transition-all placeholder-gray-400 resize-none hover:bg-white" 
                        placeholder="Describe the workflow you want to automate (e.g. 'Our lead qualification process takes 48 hours manually...')"
                        onFocus={() => setFocusedField('details')}
                        onBlur={() => setFocusedField(null)}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                       Start Conversion <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-center text-xs text-gray-400 mt-4">
                      By submitting, you agree to our <span className="underline cursor-pointer hover:text-gray-600">Privacy Policy</span>. We respect your inbox.
                    </p>
                 </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;