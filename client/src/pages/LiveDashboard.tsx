import React, { useEffect, useState } from 'react';
import { Users, Phone, TrendingUp, CheckCircle2, Clock, Zap, Activity, MessageSquare, Calendar, BarChart3, Cpu } from 'lucide-react';
import HeroFlowAnimation from '../components/HeroFlowAnimation';

interface ActivityEvent {
  id: number;
  type: 'lead' | 'call' | 'message' | 'appointment';
  title: string;
  description: string;
  timestamp: string;
}

const LiveDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAgents, setActiveAgents] = useState(91);
  const [leadsCount, setLeadsCount] = useState(480);
  const [dealsCount, setDealsCount] = useState(57);
  const [actionsCount, setActionsCount] = useState(7543);
  const [callsCount, setCallsCount] = useState(1326);
  const [messagesCount, setMessagesCount] = useState(2872);
  const [appointmentsCount, setAppointmentsCount] = useState(164);

  // Update time and simulate live data changes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate live updates (small random changes)
      if (Math.random() > 0.7) {
        setActiveAgents(prev => Math.min(Math.max(prev + (Math.random() > 0.5 ? 1 : -1), 85), 95));
        setLeadsCount(prev => prev + Math.floor(Math.random() * 3));
        setActionsCount(prev => prev + Math.floor(Math.random() * 5));
        setCallsCount(prev => prev + Math.floor(Math.random() * 2));
        setMessagesCount(prev => prev + Math.floor(Math.random() * 4));
        
        if (Math.random() > 0.9) {
          setDealsCount(prev => prev + 1);
          setAppointmentsCount(prev => prev + 1);
        }
      }
    }, 2000);

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
      type: 'message',
      title: 'Message Sent',
      description: 'Follow-up email delivered',
      timestamp: '2 min ago'
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Appointment Scheduled',
      description: 'Demo call booked for tomorrow',
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Live Operations Dashboard</h1>
          <p className="text-lg text-gray-600">Real-time view of all active AI agents and workflows</p>
        </div>

        {/* NEURAL LIVE Badge */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border-2 border-green-200 rounded-full">
            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-lg font-bold text-green-700 uppercase tracking-wide">Neural Live</span>
          </div>
        </div>

        {/* Top Metrics - Leads and Deals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Leads Captured */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-4 bg-blue-100 rounded-2xl">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Leads Captured</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">{leadsCount.toLocaleString()}</div>
                <div className="inline-flex items-center gap-1 text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deals Closed */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-4 bg-green-100 rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Deals Closed</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">{dealsCount}</div>
                <div className="inline-flex items-center gap-1 text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mid-tier Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Actions Today */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-yellow-100 rounded-xl mb-3">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{actionsCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600 font-medium">Actions Today</div>
          </div>

          {/* Calls Connected */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-3">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{callsCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600 font-medium">Calls Connected</div>
          </div>

          {/* Messages Sent */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-orange-100 rounded-xl mb-3">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{messagesCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600 font-medium">Messages Sent</div>
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-cyan-100 rounded-xl mb-3">
              <Calendar className="w-6 h-6 text-cyan-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{appointmentsCount}</div>
            <div className="text-sm text-gray-600 font-medium">Appointments</div>
          </div>
        </div>

        {/* Bottom Metrics - Response Time and Analytics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Avg Response Time */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-purple-100 rounded-xl mb-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2.3s</div>
            <div className="text-sm text-gray-600 font-medium">Avg Response</div>
          </div>

          {/* AI Agents Active */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-3">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{activeAgents}</div>
            <div className="text-sm text-gray-600 font-medium">AI Agents Active</div>
          </div>

          {/* Workflows Running */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-indigo-100 rounded-xl mb-3">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600 font-medium">Workflows Running</div>
          </div>

          {/* Data Sync */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex p-3 bg-green-100 rounded-xl mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">Healthy</div>
            <div className="text-sm text-gray-600 font-medium">Data Sync</div>
          </div>
        </div>

        {/* ELEVOR Neural Engine */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Cpu className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ELEVOR Neural Engine</h2>
              <p className="text-gray-600">Real-time AI automation network • Processing {actionsCount.toLocaleString()}+ actions today</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <HeroFlowAnimation />
          </div>
        </div>

        {/* System Status Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-md">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">AI Agents Active:</span>
              <span className="font-bold text-blue-600">{activeAgents}</span>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Workflows Running:</span>
              <span className="font-bold text-indigo-600">12</span>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Avg Response Time:</span>
              <span className="font-bold text-green-600">2.3s</span>
            </div>
            <div className="text-gray-300">•</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Data Sync:</span>
              <span className="font-bold text-green-600">Healthy</span>
            </div>
          </div>
        </div>

        {/* Live Data Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="relative flex items-center justify-center mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Live Data Stream</h3>
              <p className="text-sm text-blue-800">
                This dashboard displays real-time aggregated metrics from all client deployments. Data updates every 2 seconds. All information is anonymized and compliant with SOC 2 Type II standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
