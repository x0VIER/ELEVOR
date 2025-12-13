import React from 'react';

const CertificationBadges: React.FC = () => {
  const certifications = [
    {
      logo: '/logos/soc2.png',
      title: 'SOC 2 TYPE II',
      description: 'Security & Compliance'
    },
    {
      logo: '/logos/iso27001.png',
      title: 'ISO 27001',
      description: 'Information Security'
    },
    {
      logo: '/logos/cmmi-level3.png',
      title: 'CMMI LEVEL 3',
      description: 'Process Maturity'
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12">
            <img 
              src={cert.logo} 
              alt={cert.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{cert.title}</div>
            <div className="text-xs text-gray-600">{cert.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationBadges;
