import { int, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Dashboard metrics tables for live public dashboard
 * These tables store aggregated metrics and real-time activity data
 */

// System-wide metrics that update in real-time
export const dashboardMetrics = mysqlTable("dashboard_metrics", {
  id: int("id").autoincrement().primaryKey(),
  metricType: varchar("metricType", { length: 64 }).notNull(), // 'total_agents', 'active_deployments', 'monthly_revenue', etc.
  currentValue: varchar("currentValue", { length: 255 }).notNull(), // Stored as string to handle different formats
  previousValue: varchar("previousValue", { length: 255 }),
  changePercentage: varchar("changePercentage", { length: 20 }), // e.g., "+12.5%"
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  displayOrder: int("displayOrder").default(0),
  isVisible: boolean("isVisible").default(true),
});

// Individual agent activity logs
export const agentActivity = mysqlTable("agent_activity", {
  id: int("id").autoincrement().primaryKey(),
  agentId: varchar("agentId", { length: 64 }).notNull(),
  agentName: varchar("agentName", { length: 255 }).notNull(),
  serviceType: varchar("serviceType", { length: 100 }).notNull(), // 'Lead Acquisition', 'Deal Analysis', etc.
  activityType: varchar("activityType", { length: 100 }).notNull(), // 'processing', 'completed', 'analyzing', etc.
  status: varchar("status", { length: 50 }).notNull(), // 'active', 'idle', 'processing'
  clientId: varchar("clientId", { length: 64 }), // Anonymized client identifier
  industryCategory: varchar("industryCategory", { length: 100 }), // 'Real Estate', 'Healthcare', etc.
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: text("metadata"), // JSON string for additional data
});

// Revenue tracking for dashboard display
export const revenueMetrics = mysqlTable("revenue_metrics", {
  id: int("id").autoincrement().primaryKey(),
  periodType: varchar("periodType", { length: 50 }).notNull(), // 'daily', 'weekly', 'monthly'
  periodStart: timestamp("periodStart").notNull(),
  periodEnd: timestamp("periodEnd").notNull(),
  totalRevenue: varchar("totalRevenue", { length: 50 }).notNull(), // Stored as string for display
  dealsClosed: int("dealsClosed").default(0),
  activeClients: int("activeClients").default(0),
  automationRuns: int("automationRuns").default(0),
  costSavings: varchar("costSavings", { length: 50 }), // Calculated cost savings
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// System health and uptime metrics
export const systemHealth = mysqlTable("system_health", {
  id: int("id").autoincrement().primaryKey(),
  metricName: varchar("metricName", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(), // 'operational', 'degraded', 'down'
  uptime: varchar("uptime", { length: 50 }), // e.g., "99.98%"
  responseTime: varchar("responseTime", { length: 50 }), // e.g., "45ms"
  lastChecked: timestamp("lastChecked").defaultNow().onUpdateNow().notNull(),
});

// Agent deployment statistics
export const deploymentStats = mysqlTable("deployment_stats", {
  id: int("id").autoincrement().primaryKey(),
  serviceId: int("serviceId").notNull(), // References services table
  totalDeployments: int("totalDeployments").default(0),
  activeDeployments: int("activeDeployments").default(0),
  avgResponseTime: varchar("avgResponseTime", { length: 50 }),
  successRate: varchar("successRate", { length: 20 }), // e.g., "99.2%"
  lastDeployment: timestamp("lastDeployment"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DashboardMetric = typeof dashboardMetrics.$inferSelect;
export type InsertDashboardMetric = typeof dashboardMetrics.$inferInsert;

export type AgentActivity = typeof agentActivity.$inferSelect;
export type InsertAgentActivity = typeof agentActivity.$inferInsert;

export type RevenueMetric = typeof revenueMetrics.$inferSelect;
export type InsertRevenueMetric = typeof revenueMetrics.$inferInsert;

export type SystemHealth = typeof systemHealth.$inferSelect;
export type InsertSystemHealth = typeof systemHealth.$inferInsert;

export type DeploymentStat = typeof deploymentStats.$inferSelect;
export type InsertDeploymentStat = typeof deploymentStats.$inferInsert;
