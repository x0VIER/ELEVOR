import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Dashboard metrics tables
export * from './schema-dashboard';

/**
 * Services table - stores AI agent service offerings
 */
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: mysqlEnum("category", ["AI Agents", "Advisory & Tech"]).notNull(),
  description: text("description").notNull(),
  impact: varchar("impact", { length: 255 }).notNull(),
  engine: varchar("engine", { length: 500 }).notNull(),
  workflowSteps: varchar("workflowSteps", { length: 500 }).notNull(), // Store workflow steps for diagram generation
  deployedCount: int("deployedCount").notNull().default(0),
  iconName: varchar("iconName", { length: 50 }).notNull(), // Store icon name as string
  isActive: boolean("isActive").notNull().default(true),
  displayOrder: int("displayOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

/**
 * Case studies table with category support
 */
export const caseStudies = mysqlTable("case_studies", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  result: text("result").notNull(),
  tech: text("tech").notNull(), // JSON array stored as text
  imageUrl: varchar("imageUrl", { length: 500 }),
  isActive: boolean("isActive").notNull().default(true),
  displayOrder: int("displayOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = typeof caseStudies.$inferInsert;

/**
 * Portfolio items table
 */
export const portfolioItems = mysqlTable("portfolio_items", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  result: text("result").notNull(),
  tech: text("tech").notNull(), // JSON array stored as text
  imageUrl: varchar("imageUrl", { length: 500 }),
  isActive: boolean("isActive").notNull().default(true),
  displayOrder: int("displayOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = typeof portfolioItems.$inferInsert;

/**
 * Pricing plans table
 */
export const pricingPlans = mysqlTable("pricing_plans", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  price: varchar("price", { length: 50 }).notNull(),
  period: varchar("period", { length: 50 }),
  description: text("description"),
  features: text("features").notNull(), // JSON array stored as text
  highlighted: boolean("highlighted").notNull().default(false),
  ctaText: varchar("ctaText", { length: 100 }).notNull().default("Get Started"),
  ctaLink: varchar("ctaLink", { length: 255 }),
  isActive: boolean("isActive").notNull().default(true),
  displayOrder: int("displayOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PricingPlan = typeof pricingPlans.$inferSelect;
export type InsertPricingPlan = typeof pricingPlans.$inferInsert;

/**
 * Contact form submissions table
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "contacted", "closed"]).notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Blog posts table with category filtering
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  authorId: int("authorId").references(() => users.id),
  isPublished: boolean("isPublished").notNull().default(false),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;
