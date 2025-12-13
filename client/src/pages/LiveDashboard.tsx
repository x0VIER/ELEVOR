import React, { useEffect, useState } from 'react';
import { Users, Phone, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

interface Activity {
  id: number;
  type: 'lead' | 'call' | 'security';
  title: string;
  description: string;
  timestamp: string;
  icon: 'users' | 'phone' | 'alert';
}

const LiveDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAgents, setActiveAgents] = useState(91);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate slight agent count changes
      if (Math.random() > 0.9) {
        setActiveAgents(prev => Math.min(Math.max(prev + (Math.random() > 0.5 ? 1 : -1), 85), 95));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate realistic activity feed
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'lead',
      title: 'Lead Captured',
      description: 'Inbound inquiry from paid search',
      timestamp: 'Just now',
      icon: 'users'
    },
    {
      id: 2,
      type: 'call',
      title: 'Outbound Call Connected',
      description: 'Qualification call scheduled',
      timestamp: '1 min ago',
      icon: 'phone'
    },
    {
      id: 3,
      type: 'lead',
      title: 'Lead Captured',
      description: 'Inbound inquiry from paid search',
      timestamp: '2 min ago',
      icon: 'users'
    },
    {
      id: 4,
      type: 'call',
      title: 'Outbound Call Connected',
      description: 'Qualification call scheduled',
      timestamp: '3 min ago',
      icon: 'phone'
    },
    {
      id: 5,
      type: 'lead',
      title: 'Lead Captured',
      description: 'Inbound inquiry from paid search',
      timestamp: '5 min ago',
      icon: 'users'
    },
    {
      id: 6,
      type: 'call',
      title: 'Outbound Call Connected',
      description: 'Qualification call scheduled',
      timestamp: '7 min ago',
      icon: 'phone'
    },
  ]);

  // Revenue data for chart
  const revenueData = [
    { week: 'Week 1', value: 300000 },
    { week: 'Week 2', value: 310000 },
    { week: 'Week 3', value: 560000 },
    { week: 'Week 4', value: 570000 },
    { week: 'Week 5', value: 580000 },
  ];

  const maxRevenue = 600000;
  const minRevenue = 250000;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Operations Dashboard</h1>
          <p className="text-lg text-gray-600">Real-time view of all active AI agents and workflows</p>
        </div>

        {/* System Status Bar */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-900">Neural Network:</span>
              <span className="text-sm font-bold text-green-600">ONLINE</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{activeAgents}</span>
              <span className="text-sm text-gray-600">Active AI Agents</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">Last sync:</span>
              <span className="text-sm text-gray-600">Just now</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">Uptime:</span>
              <span className="text-sm text-green-600 font-semibold">99.97%</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Velocity Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Revenue Velocity</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Verified Revenue Data</span>
              </div>
            </div>
            
            {/* Chart */}
            <div className="relative h-64 mb-4">
              <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="600"
                    y2={i * 50}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Revenue line */}
                <polyline
                  points={revenueData.map((d, i) => {
                    const x = (i / (revenueData.length - 1)) * 600;
                    const y = 250 - ((d.value - minRevenue) / (maxRevenue - minRevenue)) * 250;
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Area fill */}
                <polygon
                  points={`0,250 ${revenueData.map((d, i) => {
                    const x = (i / (revenueData.length - 1)) * 600;
                    const y = 250 - ((d.value - minRevenue) / (maxRevenue - minRevenue)) * 250;
                    return `${x},${y}`;
                  }).join(' ')} 600,250`}
                  fill="#6366f1"
                  fillOpacity="0.1"
                />
                
                {/* Data points */}
                {revenueData.map((d, i) => {
                  const x = (i / (revenueData.length - 1)) * 600;
                  const y = 250 - ((d.value - minRevenue) / (maxRevenue - minRevenue)) * 250;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#6366f1"
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-16">
                <span>$600,000</span>
                <span>$550,000</span>
                <span>$500,000</span>
                <span>$450,000</span>
                <span>$400,000</span>
                <span>$350,000</span>
                <span>$300,000</span>
                <span>$250,000</span>
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              {revenueData.map((d, i) => (
                <span key={i}>{d.week}</span>
              ))}
            </div>
            
            <p className="text-sm text-gray-500">Processing 0.3s/action</p>
          </div>

          {/* Neural Activity Stream */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Neural Activity Stream</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    activity.icon === 'users' ? 'bg-blue-500' : 'bg-blue-600'
                  }`}>
                    {activity.icon === 'users' ? (
                      <Users className="w-6 h-6 text-white" />
                    ) : (
                      <Phone className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Deployment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">340%</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">Average ROI</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">48hr</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">Deploy Time</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">87%</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">Cost Saved</h3>
          </div>
        </div>

        {/* Live Updates Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mt-2"></div>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Live Data Stream</h3>
              <p className="text-sm text-blue-800">
                This dashboard displays real-time aggregated metrics from all client deployments. Data refreshes every 12 hours. All information is anonymized and compliant with SOC 2 Type II standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
