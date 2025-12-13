import React from 'react';

interface Logo {
  name: string;
  icon?: React.ReactNode;
}

interface LogoMarqueeProps {
  logos: Logo[];
  title?: string;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos, title }) => {
  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-8">
            {title}
          </h3>
        )}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-8 py-4 mx-4 bg-white rounded-lg border border-gray-200 shadow-sm min-w-[180px]"
              >
                {logo.icon ? (
                  <div className="flex items-center gap-2">
                    {logo.icon}
                    <span className="text-lg font-semibold text-gray-700">{logo.name}</span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold text-gray-700">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LogoMarquee;
