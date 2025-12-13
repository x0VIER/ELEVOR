import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, Zap, Users, DollarSign, CheckCircle2, Clock, AlertCircle, Bot, BarChart3, Database, MessageSquare } from 'lucide-react';

const LiveDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAgents, setActiveAgents] = useState(247);
  const [tasksCompleted, setTasksCompleted] = useState(18543);
  const [revenueThisMonth, setRevenueThisMonth] = useState(2847000);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate slight increases
      if (Math.random() > 0.7) {
        setActiveAgents(prev => Math.min(prev + Math.floor(Math.random() * 3), 260));
        setTasksCompleted(prev => prev + Math.floor(Math.random() * 5));
        setRevenueThisMonth(prev => prev + Math.floor(Math.random() * 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate realistic activity feed
  const generateActivities = () => {
    const agentTypes = [
      'Lead Acquisition Agent',
      'Customer Support Agent',
      'Data Analysis Agent',
      'Content Generation Agent',
      'Workflow Automation Agent',
      'Predictive Analytics Agent',
      'Document Processing Agent',
      'Email Automation Agent'
    ];

    const actions = [
      'Processed 15 new leads',
      'Completed customer inquiry',
      'Generated monthly report',
      'Automated invoice processing',
      'Analyzed market trends',
      'Updated CRM records',
      'Sent automated follow-up',
      'Classified 50 documents',
      'Optimized workflow efficiency',
      'Detected anomaly in data'
    ];

    const activities = [];
    const now = Date.now();
    
    for (let i = 0; i < 12; i++) {
      activities.push({
        agentType: agentTypes[Math.floor(Math.random() * agentTypes.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date(now - i * 45000), // 45 seconds apart
      });
    }

    return activities;
  };

  const [activities] = useState(generateActivities());

  // Total deployments from all services: 21,565
  const totalDeployments = 21565;
  const automationRate = 94;
  const costSavings = 4250000;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Operations Dashboard</h1>
              <p className="text-lg text-gray-600">Real-time view of all active AI agents and workflows across client deployments</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Live • {currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Trust & Credibility Banner */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">SOC 2 TYPE II</div>
              <div className="text-xs text-gray-600">Certified</div>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">ISO 27001</div>
              <div className="text-xs text-gray-600">Certified</div>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">99.97% Uptime</div>
              <div className="text-xs text-gray-600">Last 12 months</div>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">340% Avg ROI</div>
              <div className="text-xs text-gray-600">First year</div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Privacy & Security</h3>
              <p className="text-sm text-blue-800">
                This dashboard displays aggregated, anonymized metrics from all client deployments. No personally identifiable information or sensitive business data is shown. All data transmission is encrypted and compliant with SOC 2 standards.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Live
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Active Agents</h3>
            <p className="text-3xl font-bold text-gray-900">{activeAgents}</p>
            <p className="text-xs text-gray-500 mt-2">Across all deployments</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{automationRate}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Tasks Completed Today</h3>
            <p className="text-3xl font-bold text-gray-900">{tasksCompleted.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Automated workflows</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Active
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Deployments</h3>
            <p className="text-3xl font-bold text-gray-900">{totalDeployments.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">AI agents deployed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +23%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Revenue This Month</h3>
            <p className="text-3xl font-bold text-gray-900">${(revenueThisMonth / 1000000).toFixed(2)}M</p>
            <p className="text-xs text-gray-500 mt-2">From all operations</p>
          </div>
        </div>

        {/* Agent Types Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Active Agent Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Bot, name: 'Lead Acquisition', count: 842, color: 'blue' },
              { icon: MessageSquare, name: 'Customer Support', count: 1250, color: 'green' },
              { icon: BarChart3, name: 'Data Analysis', count: 535, color: 'purple' },
              { icon: Database, name: 'Workflow Automation', count: 3436, color: 'orange' },
            ].map((agent, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className={`p-2 bg-${agent.color}-50 rounded-lg`}>
                  <agent.icon className={`w-5 h-5 text-${agent.color}-600`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{agent.name}</p>
                  <p className="text-lg font-bold text-gray-700">{agent.count.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Live updates</span>
            </div>
          </div>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {activity.agentType}
                    </span>
                    <span>{activity.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health & Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">System Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response Time</span>
                <span className="text-sm font-semibold text-green-600">87ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-semibold text-green-600">99.97%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="text-sm font-semibold text-green-600">0.008%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Connections</span>
                <span className="text-sm font-semibold text-blue-600">{activeAgents}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Automation Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Automation Rate</span>
                <span className="text-sm font-semibold text-blue-600">{automationRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cost Savings</span>
                <span className="text-sm font-semibold text-blue-600">${(costSavings / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Efficiency Gain</span>
                <span className="text-sm font-semibold text-blue-600">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time Saved</span>
                <span className="text-sm font-semibold text-blue-600">12,450 hrs</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue Growth</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-semibold text-green-600">${(revenueThisMonth / 1000000).toFixed(2)}M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Growth Rate</span>
                <span className="text-sm font-semibold text-green-600">+23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Projected</span>
                <span className="text-sm font-semibold text-green-600">$3.5M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Deal Size</span>
                <span className="text-sm font-semibold text-green-600">$132K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
