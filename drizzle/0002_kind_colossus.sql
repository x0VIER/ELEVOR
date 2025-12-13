CREATE TABLE `agent_activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentId` varchar(64) NOT NULL,
	`agentName` varchar(255) NOT NULL,
	`serviceType` varchar(100) NOT NULL,
	`activityType` varchar(100) NOT NULL,
	`status` varchar(50) NOT NULL,
	`clientId` varchar(64),
	`industryCategory` varchar(100),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`metadata` text,
	CONSTRAINT `agent_activity_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dashboard_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metricType` varchar(64) NOT NULL,
	`currentValue` varchar(255) NOT NULL,
	`previousValue` varchar(255),
	`changePercentage` varchar(20),
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`displayOrder` int DEFAULT 0,
	`isVisible` boolean DEFAULT true,
	CONSTRAINT `dashboard_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deployment_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serviceId` int NOT NULL,
	`totalDeployments` int DEFAULT 0,
	`activeDeployments` int DEFAULT 0,
	`avgResponseTime` varchar(50),
	`successRate` varchar(20),
	`lastDeployment` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `deployment_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `revenue_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`periodType` varchar(50) NOT NULL,
	`periodStart` timestamp NOT NULL,
	`periodEnd` timestamp NOT NULL,
	`totalRevenue` varchar(50) NOT NULL,
	`dealsClosed` int DEFAULT 0,
	`activeClients` int DEFAULT 0,
	`automationRuns` int DEFAULT 0,
	`costSavings` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revenue_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_health` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metricName` varchar(100) NOT NULL,
	`status` varchar(50) NOT NULL,
	`uptime` varchar(50),
	`responseTime` varchar(50),
	`lastChecked` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `system_health_id` PRIMARY KEY(`id`)
);
