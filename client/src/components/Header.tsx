import React, { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SERVICES } from '../constants';

interface HeaderProps {
  setPage: (page: string) => void;
  currentPage: string;
  setTargetServiceId?: (id: number) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage, currentPage, setTargetServiceId }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const caseStudiesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigation items including Live Dashboard
  const navItems = ['Home', 'Services', 'CaseStudies', 'Pricing', 'LiveDashboard', 'About', 'Contact'];

  // Helper to display names nicely in UI but use correct page key
  const getLabel = (item: string) => {
    if (item === 'CaseStudies') return 'Case Studies';
    if (item === 'LiveDashboard') return 'Live Dashboard';
    return item;
  };

  const handleNav = (page: string) => {
    setPage(page);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsCaseStudiesOpen(false);
  };

  const handleServiceClick = (id: number) => {
    if (setTargetServiceId) {
      setTargetServiceId(id);
    }
    setPage('Services');
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const handleCaseStudiesEnter = () => {
    if (caseStudiesTimeoutRef.current) clearTimeout(caseStudiesTimeoutRef.current);
    setIsCaseStudiesOpen(true);
  };

  const handleCaseStudiesLeave = () => {
    caseStudiesTimeoutRef.current = setTimeout(() => {
      setIsCaseStudiesOpen(false);
    }, 150);
  };

  // Categorize services for the mega menu
  const aiServices = SERVICES.filter(s => s.category === 'AI Agents');
  const advisoryServices = SERVICES.filter(s => s.category === 'Advisory & Tech');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer z-20" onClick={() => handleNav('Home')}>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">ELEVOR <span className="text-accent">AI</span></span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8 h-full">
            {navItems.map((item) => {
              // Services Dropdown Logic
              if (item === 'Services') {
                return (
                  <div 
                    key={item}
                    className="relative h-full flex items-center"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <button
                      onClick={() => handleNav(item)}
                      className={`text-sm font-medium transition-colors duration-200 flex items-center ${
                        currentPage === item || isServicesOpen ? 'text-accent' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {getLabel(item)}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  </div>
                );
              }

              // Case Studies Dropdown Logic
              if (item === 'CaseStudies') {
                return (
                  <div 
                    key={item}
                    className="relative h-full flex items-center"
                    onMouseEnter={handleCaseStudiesEnter}
                    onMouseLeave={handleCaseStudiesLeave}
                  >
                    <button
                      onClick={() => handleNav(item)}
                      className={`text-sm font-medium transition-colors duration-200 flex items-center ${
                        currentPage === 'CaseStudies' || currentPage === 'Blog' || isCaseStudiesOpen ? 'text-accent' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {getLabel(item)}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-200 ${isCaseStudiesOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-4 w-48 transition-all duration-200 origin-top ${isCaseStudiesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                        <div className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden p-1">
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleNav('CaseStudies'); }}
                                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors ${currentPage === 'CaseStudies' ? 'text-accent bg-blue-50' : 'text-gray-700'}`}
                            >
                                Portfolio
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleNav('Blog'); }}
                                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors ${currentPage === 'Blog' ? 'text-accent bg-blue-50' : 'text-gray-700'}`}
                            >
                                Blog
                            </button>
                        </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item} className="h-full flex items-center">
                   <button
                    onClick={() => handleNav(item)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      currentPage === item ? 'text-accent' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {getLabel(item)}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={() => handleNav('Contact')} className="text-gray-600 hover:text-accent font-medium text-sm transition-colors">
              Request Quote
            </button>
            <button 
              onClick={() => handleNav('Contact')}
              className="bg-accent hover:bg-accentHover text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-accent/20 transition-all transform hover:scale-105 text-sm"
            >
              Schedule Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown (Services) */}
      <div 
        className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 ease-in-out transform origin-top z-10 ${
          isServicesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
        }`}
        onMouseEnter={handleServicesEnter}
        onMouseLeave={handleServicesLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-12 gap-12">
            
            {/* Column 1: AI Services */}
            <div className="col-span-6 border-r border-gray-100 pr-8">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Artificial Intelligence Services</h3>
                 <span className="text-xs font-bold text-accent">10 Services</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {aiServices.map((service) => (
                  <div 
                    key={service.id} 
                    onClick={() => handleServiceClick(service.id)}
                    className="group flex items-start p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <service.icon size={18} className="text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-accent transition-colors">{service.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Development Services */}
            <div className="col-span-6 pl-4">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Development & Advisory</h3>
                 <span className="text-xs font-bold text-purple-600">11 Services</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {advisoryServices.map((service) => (
                  <div 
                    key={service.id} 
                    onClick={() => handleServiceClick(service.id)}
                    className="group flex items-start p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                     <div className="mt-1 flex-shrink-0">
                      <service.icon size={18} className="text-purple-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">{service.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 -mx-8 px-8 -mb-10 pb-10">
              <div className="flex items-center space-x-2">
                 <span className="text-sm font-medium text-gray-500">Rated 4.9/5 on</span>
                 <span className="font-bold text-gray-800">Clutch</span>
              </div>
              <button onClick={() => handleNav('Contact')} className="text-sm font-bold text-accent hover:underline flex items-center">
                 Talk to our Solution Architects <ChevronDown className="rotate-[-90deg] ml-1" size={14} />
              </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => {
               if (item === 'CaseStudies') {
                 return (
                   <div key={item} className="border-b border-gray-50 pb-2 mb-2">
                      <div className="px-3 py-2 text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Work</div>
                      <button
                        onClick={() => handleNav('CaseStudies')}
                        className={`block w-full text-left px-3 py-2 text-base font-medium ${
                          currentPage === 'CaseStudies' ? 'text-accent' : 'text-gray-600'
                        }`}
                      >
                        Portfolio
                      </button>
                      <button
                        onClick={() => handleNav('Blog')}
                        className={`block w-full text-left px-3 py-2 text-base font-medium ${
                          currentPage === 'Blog' ? 'text-accent' : 'text-gray-600'
                        }`}
                      >
                        Blog
                      </button>
                   </div>
                 );
               }
               return (
                  <button
                    key={item}
                    onClick={() => handleNav(item)}
                    className={`block w-full text-left px-3 py-4 border-b border-gray-50 text-base font-medium ${
                      currentPage === item ? 'text-accent' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {getLabel(item)}
                  </button>
               );
            })}
            <div className="pt-6 pb-20">
               <button 
                onClick={() => handleNav('Contact')}
                className="block w-full text-center bg-accent text-white font-bold py-3 rounded-md shadow-md"
              >
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;