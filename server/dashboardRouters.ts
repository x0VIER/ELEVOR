import { publicProcedure, router } from "./_core/trpc";
import * as dashboardDb from "./dashboardDb";

/**
 * Public dashboard router
 * These endpoints are accessible without authentication for the live public dashboard
 */
export const dashboardRouter = router({
  // Get all dashboard metrics
  metrics: publicProcedure.query(async () => {
    return await dashboardDb.getAllDashboardMetrics();
  }),
  
  // Get recent agent activity
  recentActivity: publicProcedure.query(async () => {
    return await dashboardDb.getRecentAgentActivity(30);
  }),
  
  // Get active agents by service
  activeAgents: publicProcedure.query(async () => {
    return await dashboardDb.getActiveAgentsByService();
  }),
  
  // Get current month revenue
  revenue: publicProcedure.query(async () => {
    return await dashboardDb.getCurrentMonthRevenue();
  }),
  
  // Get system health status
  health: publicProcedure.query(async () => {
    return await dashboardDb.getAllSystemHealth();
  }),
  
  // Get deployment statistics
  deployments: publicProcedure.query(async () => {
    return await dashboardDb.getAllDeploymentStats();
  }),
  
  // Get complete dashboard summary
  summary: publicProcedure.query(async () => {
    return await dashboardDb.getDashboardSummary();
  }),
});
