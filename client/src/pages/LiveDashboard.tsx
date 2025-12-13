import React, { useEffect, useState } from 'react';
import { Users, Phone, TrendingUp, CheckCircle2, Clock, Zap, Activity } from 'lucide-react';
import HeroFlowAnimation from '../components/HeroFlowAnimation';

interface ActivityEvent {
  id: number;
  type: 'lead' | 'call';
  title: string;
  description: string;
  timestamp: string;
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

  // Activity feed data
  const [activities] = useState<ActivityEvent[]>([
    {
      id: 1,
      type: 'call',
      title: 'Outbound Call Connected',
      description: 'Qualification call scheduled',
      timestamp: 'Just now'
    },
    {
      id: 2,
      type: 'lead',
      title: 'Lead Captured',
      description: 'Inbound inquiry from paid search',
      timestamp: '1 min ago'
    },
    {
      id: 3,
      type: 'call',
      title: 'Outbound Call Connected',
      description: 'Qualification call scheduled',
      timestamp: '2 min ago'
    },
    {
      id: 4,
      type: 'lead',
      title: 'Lead Captured',
      description: 'Inbound inquiry from paid search',
      timestamp: '3 min ago'
    },
    {
      id: 5,
      type: 'call',
      title: 'Outbound Call Connected',
      description: 'Qualification call scheduled',
      timestamp: '5 min ago'
    },
    {
      id: 6,
      type: 'lead',
      title: 'Lead Captured',
      description: 'Inbound inquiry from paid search',
      timestamp: '7 min ago'
    },
  ]);

  // Revenue data for chart
  const revenueData = [
    { week: 'Week 1', value: 300000, x: 0 },
    { week: 'Week 2', value: 310000, x: 1 },
    { week: 'Week 3', value: 560000, x: 2 },
    { week: 'Week 4', value: 570000, x: 3 },
    { week: 'Week 5', value: 580000, x: 4 },
  ];

  const maxRevenue = 600000;
  const minRevenue = 250000;
  const chartWidth = 600;
  const chartHeight = 300;

  // Calculate SVG path for the line
  const linePath = revenueData.map((d, i) => {
    const x = (i / (revenueData.length - 1)) * chartWidth;
    const y = chartHeight - ((d.value - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  // Calculate area path
  const areaPath = `M 0,${chartHeight} ${revenueData.map((d, i) => {
    const x = (i / (revenueData.length - 1)) * chartWidth;
    const y = chartHeight - ((d.value - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
    return `L ${x},${y}`;
  }).join(' ')} L ${chartWidth},${chartHeight} Z`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Operations Dashboard</h1>
          <p className="text-lg text-gray-600">Real-time view of all active AI agents and workflows</p>
        </div>

        {/* System Status Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Neural Network:</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-bold text-green-600">ONLINE</span>
              </div>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">{activeAgents}</span>
              <span className="text-sm text-gray-600">Active AI Agents</span>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Last sync:</span>
              <span className="text-sm text-gray-900">Just now</span>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Uptime:</span>
              <span className="text-sm font-bold text-green-600">99.97%</span>
            </div>
          </div>
        </div>

        {/* Main Grid - Revenue Chart and Activity Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Velocity Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Revenue Velocity</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Verified Revenue Data</span>
              </div>
            </div>
            
            {/* Chart Container */}
            <div className="relative mb-6" style={{ height: '320px' }}>
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 pr-3">
                <span>$600,000</span>
                <span>$550,000</span>
                <span>$500,000</span>
                <span>$450,000</span>
                <span>$400,000</span>
                <span>$350,000</span>
                <span>$300,000</span>
                <span>$250,000</span>
              </div>
              
              {/* Chart SVG */}
              <div className="ml-16 h-full">
                <svg className="w-full" style={{ height: '300px' }} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={(i / 7) * chartHeight}
                      x2={chartWidth}
                      y2={(i / 7) * chartHeight}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  
                  {/* Area fill */}
                  <path
                    d={areaPath}
                    fill="#6366f1"
                    fillOpacity="0.1"
                  />
                  
                  {/* Line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  
                  {/* Data points */}
                  {revenueData.map((d, i) => {
                    const x = (i / (revenueData.length - 1)) * chartWidth;
                    const y = chartHeight - ((d.value - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#6366f1"
                        stroke="white"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}
                </svg>
                
                {/* X-axis labels */}
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  {revenueData.map((d, i) => (
                    <span key={i}>{d.week}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">Processing 0.3s/action</p>
          </div>

          {/* Neural Activity Stream */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Neural Activity Stream</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    activity.type === 'lead' ? 'bg-blue-500' : 'bg-blue-600'
                  }`}>
                    {activity.type === 'lead' ? (
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

        {/* Workflow Visualization */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ELEVOR Neural Engine</h2>
          <p className="text-gray-600 mb-6">Real-time AI automation network • Processing 8,299+ actions today</p>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <HeroFlowAnimation />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">AI Agents Active</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{activeAgents}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-purple-50 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Workflows Running</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-green-50 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Avg Response Time</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">2.0s</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-orange-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Data Sync</span>
            </div>
            <p className="text-3xl font-bold text-green-600">Healthy</p>
          </div>
        </div>

        {/* Live Data Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
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
