import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { ReactFlow, Node, Edge, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, TrendingUp, Users, Zap, CheckCircle2, Clock } from "lucide-react";

// Counter animation component
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold"
    >
      {prefix}{value}{suffix}
    </motion.div>
  );
}

// Metric card component
function MetricCard({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  trend 
}: { 
  icon: any; 
  title: string; 
  value: string; 
  change?: string; 
  trend?: "up" | "down" 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
      <AnimatePresence mode="wait">
        <AnimatedCounter value={value} />
      </AnimatePresence>
    </motion.div>
  );
}

// Activity feed item
function ActivityItem({ activity }: { activity: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "idle":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
    >
      <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {activity.serviceType}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {activity.activityType} • {activity.industryCategory}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {new Date(activity.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  );
}

export default function LiveDashboard() {
  const { data: summary, isLoading } = trpc.dashboard.summary.useQuery(undefined, {
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Generate workflow nodes and edges from active agents
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (summary?.activeAgents) {
      // Create a simple workflow visualization
      const serviceGroups = summary.activeAgents.reduce((acc: any, agent: any) => {
        if (!acc[agent.serviceType]) {
          acc[agent.serviceType] = [];
        }
        acc[agent.serviceType].push(agent);
        return {};
      }, {});

      // Generate nodes for visualization
      const newNodes: Node[] = [
        {
          id: "central",
          type: "default",
          position: { x: 400, y: 200 },
          data: { label: "ELEVOR AI Platform" },
          style: {
            background: "#3b82f6",
            color: "white",
            border: "2px solid #2563eb",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "600",
          },
        },
      ];

      // Add service nodes in a circle around central node
      const serviceTypes = Array.from(new Set(summary.activeAgents.map((a: any) => a.serviceType)));
      const radius = 250;
      serviceTypes.forEach((service: string, index: number) => {
        const angle = (index / serviceTypes.length) * 2 * Math.PI;
        const x = 400 + radius * Math.cos(angle);
        const y = 200 + radius * Math.sin(angle);

        newNodes.push({
          id: `service-${index}`,
          type: "default",
          position: { x, y },
          data: { label: service },
          style: {
            background: "#f3f4f6",
            border: "2px solid #3b82f6",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "12px",
          },
        });
      });

      // Create edges
      const newEdges: Edge[] = serviceTypes.map((_, index) => ({
        id: `edge-${index}`,
        source: "central",
        target: `service-${index}`,
        animated: true,
        style: { stroke: "#3b82f6" },
      }));

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [summary?.activeAgents]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading live dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Live Operations Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time view of ELEVOR AI agents working across all deployments
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summary?.metrics?.map((metric: any) => (
            <MetricCard
              key={metric.id}
              icon={
                metric.metricType.includes("revenue")
                  ? TrendingUp
                  : metric.metricType.includes("agents")
                  ? Users
                  : metric.metricType.includes("deployments")
                  ? Zap
                  : Activity
              }
              title={metric.metricType.replace(/_/g, " ").toUpperCase()}
              value={metric.currentValue}
              change={metric.changePercentage}
              trend="up"
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Workflow Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Active Agent Network
              </h2>
              <div className="h-[500px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  fitView
                  attributionPosition="bottom-left"
                >
                  <Background />
                  <Controls />
                  <MiniMap />
                </ReactFlow>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Live Activity
                </h2>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live</span>
                </div>
              </div>
              <div className="space-y-2 max-h-[450px] overflow-y-auto">
                <AnimatePresence>
                  {summary?.recentActivity?.slice(0, 15).map((activity: any) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summary?.health?.map((health: any) => (
              <div key={health.id} className="flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {health.metricName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {health.uptime} uptime • {health.responseTime} avg
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Section */}
        {summary?.monthRevenue && (
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm border border-blue-200 dark:border-gray-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Monthly Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {summary.monthRevenue.totalRevenue}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Deals Closed
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {summary.monthRevenue.dealsClosed}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Active Clients
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {summary.monthRevenue.activeClients}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Cost Savings
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {summary.monthRevenue.costSavings}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            <Clock className="w-4 h-4 inline mr-2" />
            This dashboard displays aggregated, anonymized metrics from all ELEVOR AI deployments.
            No personally identifiable information or client-specific data is displayed.
            All data is collected in compliance with privacy regulations and client agreements.
          </p>
        </div>
      </div>
    </div>
  );
}
