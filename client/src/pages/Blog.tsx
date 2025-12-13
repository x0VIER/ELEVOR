import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="pt-10 pb-20 bg-gray-50">
      <div className="bg-white py-16 mb-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Insights & Innovation</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Stay ahead of the curve with our latest thoughts on AI, Real Estate tech, and agentic workflows.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">{post.category}</span>
                <span className="text-xs text-gray-400 font-mono">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{post.excerpt}</p>
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-sm font-bold text-gray-900 group-hover:text-blue-600">
                 Read Article <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;