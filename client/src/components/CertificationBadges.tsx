import React from 'react';
import { Shield, Lock, Award } from 'lucide-react';

const CertificationBadges: React.FC = () => {
  const certifications = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'SOC 2 TYPE II',
      description: 'Security & Compliance'
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: 'ISO 27001',
      description: 'Information Security'
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
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
          <div className="p-2 bg-blue-50 rounded-lg">
            {cert.icon}
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
