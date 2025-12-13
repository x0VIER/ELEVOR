import { eq, desc, and, gte } from "drizzle-orm";
import { 
  dashboardMetrics, 
  agentActivity, 
  revenueMetrics, 
  systemHealth,
  deploymentStats,
  type InsertDashboardMetric,
  type InsertAgentActivity,
  type InsertRevenueMetric,
  type InsertSystemHealth,
  type InsertDeploymentStat
} from "../drizzle/schema";
import { getDb } from "./db";

// ===== Dashboard Metrics =====

export async function getAllDashboardMetrics() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(dashboardMetrics)
    .where(eq(dashboardMetrics.isVisible, true))
    .orderBy(dashboardMetrics.displayOrder);
}

export async function updateDashboardMetric(metricType: string, currentValue: string, previousValue?: string, changePercentage?: string) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db
    .select()
    .from(dashboardMetrics)
    .where(eq(dashboardMetrics.metricType, metricType))
    .limit(1);
  
  if (existing.length > 0) {
    await db
      .update(dashboardMetrics)
      .set({ 
        currentValue, 
        previousValue: previousValue || existing[0].currentValue,
        changePercentage,
        lastUpdated: new Date()
      })
      .where(eq(dashboardMetrics.metricType, metricType));
  } else {
    await db.insert(dashboardMetrics).values({
      metricType,
      currentValue,
      previousValue,
      changePercentage,
    });
  }
}

// ===== Agent Activity =====

export async function getRecentAgentActivity(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(agentActivity)
    .orderBy(desc(agentActivity.timestamp))
    .limit(limit);
}

export async function getActiveAgentsByService() {
  const db = await getDb();
  if (!db) return [];
  
  // Get activity from last 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  return await db
    .select()
    .from(agentActivity)
    .where(
      and(
        eq(agentActivity.status, 'active'),
        gte(agentActivity.timestamp, fiveMinutesAgo)
      )
    )
    .orderBy(desc(agentActivity.timestamp));
}

export async function logAgentActivity(data: InsertAgentActivity) {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(agentActivity).values(data);
}

// ===== Revenue Metrics =====

export async function getCurrentMonthRevenue() {
  const db = await getDb();
  if (!db) return null;
  
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const result = await db
    .select()
    .from(revenueMetrics)
    .where(
      and(
        eq(revenueMetrics.periodType, 'monthly'),
        gte(revenueMetrics.periodStart, monthStart)
      )
    )
    .orderBy(desc(revenueMetrics.createdAt))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function updateRevenueMetrics(data: InsertRevenueMetric) {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(revenueMetrics).values(data);
}

// ===== System Health =====

export async function getAllSystemHealth() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(systemHealth)
    .orderBy(systemHealth.metricName);
}

export async function updateSystemHealth(metricName: string, status: string, uptime?: string, responseTime?: string) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db
    .select()
    .from(systemHealth)
    .where(eq(systemHealth.metricName, metricName))
    .limit(1);
  
  if (existing.length > 0) {
    await db
      .update(systemHealth)
      .set({ status, uptime, responseTime, lastChecked: new Date() })
      .where(eq(systemHealth.metricName, metricName));
  } else {
    await db.insert(systemHealth).values({
      metricName,
      status,
      uptime,
      responseTime,
    });
  }
}

// ===== Deployment Stats =====

export async function getAllDeploymentStats() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(deploymentStats)
    .orderBy(deploymentStats.serviceId);
}

export async function updateDeploymentStats(serviceId: number, data: Partial<InsertDeploymentStat>) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db
    .select()
    .from(deploymentStats)
    .where(eq(deploymentStats.serviceId, serviceId))
    .limit(1);
  
  if (existing.length > 0) {
    await db
      .update(deploymentStats)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(deploymentStats.serviceId, serviceId));
  } else {
    await db.insert(deploymentStats).values({
      serviceId,
      ...data,
    });
  }
}

// ===== Dashboard Aggregations =====

export async function getDashboardSummary() {
  const metrics = await getAllDashboardMetrics();
  const recentActivity = await getRecentAgentActivity(20);
  const activeAgents = await getActiveAgentsByService();
  const monthRevenue = await getCurrentMonthRevenue();
  const health = await getAllSystemHealth();
  const deployments = await getAllDeploymentStats();
  
  return {
    metrics,
    recentActivity,
    activeAgents,
    monthRevenue,
    health,
    deployments,
  };
}
