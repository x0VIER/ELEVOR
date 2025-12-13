/**
 * Dashboard Data Simulator
 * Generates realistic, time-based data for the live public dashboard
 * Data persists and continues updating even when users aren't viewing
 */

import * as dashboardDb from "./dashboardDb";

// Service types matching our services table
const SERVICE_TYPES = [
  "Autonomous Lead Acquisition",
  "Predictive Deal Analysis",
  "Asset Sentinel Dashboard",
  "Brand Reputation Guardian",
  "Intelligent Scheduling Matrix",
];

const ACTIVITY_TYPES = [
  "processing",
  "analyzing",
  "completed",
  "enriching",
  "scoring",
  "syncing",
  "monitoring",
  "detecting",
  "responding",
  "negotiating",
];

const INDUSTRIES = [
  "Real Estate",
  "Healthcare",
  "Finance",
  "Insurance",
  "Logistics",
  "Retail",
  "Manufacturing",
  "Technology",
];

// Base revenue for calculation (monthly)
const BASE_MONTHLY_REVENUE = 2_450_000; // $2.45M base
const REVENUE_GROWTH_RATE = 0.15; // 15% monthly growth

// Calculate realistic revenue based on time
function calculateCurrentRevenue(): number {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const totalDaysInMonth = monthEnd.getDate();
  const currentDay = now.getDate();
  
  // Revenue accumulates throughout the month
  const dailyRevenue = BASE_MONTHLY_REVENUE / totalDaysInMonth;
  const accumulatedRevenue = dailyRevenue * currentDay;
  
  // Add some realistic variation (±5%)
  const variation = (Math.random() - 0.5) * 0.1;
  const finalRevenue = accumulatedRevenue * (1 + variation);
  
  return Math.floor(finalRevenue);
}

// Generate realistic agent activity
function generateAgentActivity() {
  const serviceType = SERVICE_TYPES[Math.floor(Math.random() * SERVICE_TYPES.length)];
  const activityType = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
  const industry = INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];
  
  // Generate realistic agent ID
  const agentId = `AGT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const clientId = `CLI-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  
  return {
    agentId,
    agentName: `${serviceType} Agent`,
    serviceType,
    activityType,
    status: Math.random() > 0.3 ? 'active' : 'processing',
    clientId,
    industryCategory: industry,
    metadata: JSON.stringify({
      processingTime: `${Math.floor(Math.random() * 500) + 50}ms`,
      confidence: `${(Math.random() * 20 + 80).toFixed(1)}%`,
    }),
  };
}

// Initialize dashboard with base metrics
export async function initializeDashboard() {
  console.log("[Dashboard] Initializing metrics...");
  
  // Total agents deployed
  await dashboardDb.updateDashboardMetric(
    "total_agents",
    "13,839",
    "13,425",
    "+3.1%"
  );
  
  // Active deployments
  await dashboardDb.updateDashboardMetric(
    "active_deployments",
    "8,247",
    "7,892",
    "+4.5%"
  );
  
  // Monthly automation runs
  await dashboardDb.updateDashboardMetric(
    "monthly_runs",
    "1,247,893",
    "1,184,220",
    "+5.4%"
  );
  
  // Cost savings this month
  await dashboardDb.updateDashboardMetric(
    "cost_savings",
    "$8.4M",
    "$7.9M",
    "+6.3%"
  );
  
  // System uptime
  await dashboardDb.updateSystemHealth(
    "System Uptime",
    "operational",
    "99.98%",
    "42ms"
  );
  
  await dashboardDb.updateSystemHealth(
    "API Response Time",
    "operational",
    "99.95%",
    "38ms"
  );
  
  await dashboardDb.updateSystemHealth(
    "Agent Processing",
    "operational",
    "99.99%",
    "125ms"
  );
  
  console.log("[Dashboard] Initialization complete");
}

// Update revenue metrics
export async function updateRevenueData() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  
  const currentRevenue = calculateCurrentRevenue();
  const dealsClosedThisMonth = Math.floor(currentRevenue / 45000); // Avg deal size $45k
  const activeClients = 247 + Math.floor(Math.random() * 10); // Base 247 clients
  const automationRuns = Math.floor(currentRevenue / 2); // Rough correlation
  const costSavings = Math.floor(currentRevenue * 3.4); // 3.4x ROI
  
  await dashboardDb.updateRevenueMetrics({
    periodType: "monthly",
    periodStart: monthStart,
    periodEnd: monthEnd,
    totalRevenue: `$${(currentRevenue / 1000000).toFixed(2)}M`,
    dealsClosed: dealsClosedThisMonth,
    activeClients,
    automationRuns,
    costSavings: `$${(costSavings / 1000000).toFixed(1)}M`,
  });
  
  // Update dashboard metric
  await dashboardDb.updateDashboardMetric(
    "monthly_revenue",
    `$${(currentRevenue / 1000000).toFixed(2)}M`,
    `$${((currentRevenue * 0.92) / 1000000).toFixed(2)}M`,
    "+8.7%"
  );
}

// Simulate agent activity
export async function simulateAgentActivity() {
  // Generate 3-7 activities per cycle
  const activityCount = Math.floor(Math.random() * 5) + 3;
  
  for (let i = 0; i < activityCount; i++) {
    const activity = generateAgentActivity();
    await dashboardDb.logAgentActivity(activity);
  }
}

// Update deployment stats for each service
export async function updateDeploymentStatistics() {
  const serviceDeployments = [
    { serviceId: 1, total: 842, active: 789, successRate: "99.2%", avgResponse: "1.2s" },
    { serviceId: 2, total: 1250, active: 1187, successRate: "98.8%", avgResponse: "2.4s" },
    { serviceId: 3, total: 535, active: 512, successRate: "99.7%", avgResponse: "0.8s" },
    { serviceId: 4, total: 3436, active: 3289, successRate: "99.5%", avgResponse: "0.3s" },
    { serviceId: 5, total: 6766, active: 6470, successRate: "99.9%", avgResponse: "0.5s" },
  ];
  
  for (const deployment of serviceDeployments) {
    await dashboardDb.updateDeploymentStats(deployment.serviceId, {
      totalDeployments: deployment.total,
      activeDeployments: deployment.active,
      successRate: deployment.successRate,
      avgResponseTime: deployment.avgResponse,
      lastDeployment: new Date(),
    });
  }
}

// Main simulation loop
let simulationInterval: NodeJS.Timeout | null = null;

export function startDashboardSimulation() {
  if (simulationInterval) {
    console.log("[Dashboard] Simulation already running");
    return;
  }
  
  console.log("[Dashboard] Starting real-time simulation...");
  
  // Initialize on start
  initializeDashboard();
  updateRevenueData();
  updateDeploymentStatistics();
  
  // Update agent activity every 5-10 seconds
  simulationInterval = setInterval(async () => {
    await simulateAgentActivity();
    
    // Update revenue every minute
    if (Math.random() > 0.9) {
      await updateRevenueData();
    }
    
    // Update deployment stats every 30 seconds
    if (Math.random() > 0.8) {
      await updateDeploymentStatistics();
    }
  }, 7000); // 7 seconds
  
  console.log("[Dashboard] Simulation started");
}

export function stopDashboardSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    console.log("[Dashboard] Simulation stopped");
  }
}
