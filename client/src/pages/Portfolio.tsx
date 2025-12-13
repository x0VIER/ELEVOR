import React, { useState } from 'react';
import { PORTFOLIO } from '../constants';
import { ExternalLink, Tag } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Real Estate', 'Investment', 'SaaS', 'Marketing', 'FinTech', 'Mobile'];

  const filteredItems = filter === 'All' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(item => item.category === filter);

  return (
    <div className="pt-10 pb-20 bg-secondary">
       <div className="bg-white py-16 mb-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Case Studies</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Real results from real clients. See how we've delivered 10x ROI through autonomous AI.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-accent hover:border-accent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 duration-300 shadow-sm">
              <div className="h-48 bg-gray-100 flex items-center justify-center p-6 relative group">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-4xl font-black text-gray-200 select-none">{item.title.substring(0,2).toUpperCase()}</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">{item.category}</span>
                  <ExternalLink size={16} className="text-gray-400 hover:text-accent cursor-pointer" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Challenge</h4>
                    <p className="text-sm text-gray-500">{item.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Solution</h4>
                    <p className="text-sm text-gray-500">{item.solution}</p>
                  </div>
                   <div className="bg-blue-50 p-3 rounded border-l-2 border-accent">
                    <h4 className="text-sm font-bold text-accent">Result</h4>
                    <p className="text-sm text-gray-700">{item.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tech.map(t => (
                    <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      <Tag size={10} className="mr-1" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;