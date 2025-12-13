import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Import schema
import { services, caseStudies, portfolioItems, pricingPlans } from "./drizzle/schema.js";

console.log("Seeding database with ELEVOR data...");

// Seed Services
const servicesData = [
  {
    title: "Autonomous Lead Acquisition Ecosystem",
    category: "AI Agents",
    description: "Deploy a 24/7 autonomous pipeline that ingests raw market data, enriches profiles with 99% accuracy, and scores intent using predictive modeling—syncing only sales-ready leads to your CRM.",
    impact: "Reduces CAC by 64% in <90 days.",
    engine: "sys.ingest(raw_data) >> identity.resolve() >> model.predict(intent) >> crm.sync()",
    workflowSteps: "Ingest Stream > Identity Resolve > AI Scoring > CRM Sync",
    deployedCount: 842,
    iconName: "Search",
    displayOrder: 1,
  },
  {
    title: "Predictive Deal Analysis Engine",
    category: "AI Agents",
    description: "Eliminate emotional bias. Computer vision agents assess property conditions from photos while financial agents cross-reference 50+ market indicators to calculate ARV/MAO with institutional precision.",
    impact: "Risk assessment error < 3%.",
    engine: "vision.scan(img) >> comp.retrieve(loc) >> fin.model(arv) >> offer.gen(pdf)",
    workflowSteps: "Vision Scan > Market Comps > Risk Model > Gen Offer",
    deployedCount: 1250,
    iconName: "BarChart3",
    displayOrder: 2,
  },
  {
    title: "Asset Sentinel Dashboard",
    category: "AI Agents",
    description: "The eyes of your portfolio. Creates a continuous monitoring loop comparing real-time asset performance against historical baselines, flagging anomalies before they become liabilities.",
    impact: "Monitors $4B+ autonomously.",
    engine: "monitor.watch(stream) >> anomaly.detect(ml) >> alert.dispatch() >> report.gen()",
    workflowSteps: "Monitor Loop > Detect Anomaly > Alert Dispatch > Gen Report",
    deployedCount: 535,
    iconName: "Layout",
    displayOrder: 3,
  },
  {
    title: "Brand Reputation Guardian",
    category: "AI Agents",
    description: "Turn sentiment into strategy. NLP agents scour the web for mentions, interpreting context and intent to automatically resolve issues or amplify positive feedback across all channels.",
    impact: "Response latency: < 5s.",
    engine: "crawl.web(targets) >> nlp.sentiment(txt) >> context.map() >> reply.deploy()",
    workflowSteps: "Web Crawl > NLP Sentiment > Context Map > Auto Reply",
    deployedCount: 3436,
    iconName: "MessageSquare",
    displayOrder: 4,
  },
  {
    title: "Intelligent Scheduling Matrix",
    category: "AI Agents",
    description: "Stop playing email tag. This agent negotiates time, resolves multi-party conflicts, and locks in appointments based on priority logic, filling your calendar with high-value activities.",
    impact: "Recovers 15hrs/week/agent.",
    engine: "req.parse(nlp) >> slot.check(cal) >> negotiate.lock() >> notify.all()",
    workflowSteps: "Parse Req > Check Slots > Lock Cal > Notify",
    deployedCount: 6766,
    iconName: "Calendar",
    displayOrder: 5,
  },
];

console.log("Inserting services...");
for (const service of servicesData) {
  await db.insert(services).values(service);
}
console.log(`✓ Inserted ${servicesData.length} services`);

// Seed Case Studies
const caseStudiesData = [
  {
    title: "Real Estate Automation",
    category: "Real Estate",
    challenge: "Manual lead qualification taking 40+ hours per week",
    solution: "Deployed autonomous lead acquisition ecosystem with predictive scoring",
    result: "64% reduction in CAC, 3x increase in qualified leads",
    tech: JSON.stringify(["AI Agents", "CRM Integration", "Predictive Analytics"]),
    displayOrder: 1,
  },
  {
    title: "Property Investment Analysis",
    category: "Real Estate",
    challenge: "Inconsistent deal evaluation leading to missed opportunities",
    solution: "Implemented computer vision and financial modeling for ARV/MAO calculation",
    result: "Risk assessment error reduced to <3%, 50% faster deal analysis",
    tech: JSON.stringify(["Computer Vision", "Financial Modeling", "Market Data"]),
    displayOrder: 2,
  },
];

console.log("Inserting case studies...");
for (const caseStudy of caseStudiesData) {
  await db.insert(caseStudies).values(caseStudy);
}
console.log(`✓ Inserted ${caseStudiesData.length} case studies`);

// Seed Pricing Plans
const pricingData = [
  {
    name: "Starter",
    subtitle: "For small teams getting started",
    price: "$999",
    period: "/month",
    description: "Essential AI automation for growing businesses",
    features: JSON.stringify([
      "Up to 3 AI agents",
      "1,000 automation runs/month",
      "Email support",
      "Basic analytics",
      "CRM integration",
    ]),
    ctaText: "Get Started",
    displayOrder: 1,
  },
  {
    name: "Professional",
    subtitle: "For scaling operations",
    price: "$2,999",
    period: "/month",
    description: "Advanced automation with priority support",
    features: JSON.stringify([
      "Up to 10 AI agents",
      "10,000 automation runs/month",
      "Priority support",
      "Advanced analytics",
      "All integrations",
      "Custom workflows",
    ]),
    highlighted: true,
    ctaText: "Start Free Trial",
    displayOrder: 2,
  },
  {
    name: "Enterprise",
    subtitle: "For large organizations",
    price: "Custom",
    period: "",
    description: "Unlimited automation with dedicated support",
    features: JSON.stringify([
      "Unlimited AI agents",
      "Unlimited automation runs",
      "Dedicated support team",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
    ]),
    ctaText: "Contact Sales",
    displayOrder: 3,
  },
];

console.log("Inserting pricing plans...");
for (const plan of pricingData) {
  await db.insert(pricingPlans).values(plan);
}
console.log(`✓ Inserted ${pricingData.length} pricing plans`);

console.log("✅ Database seeded successfully!");

await connection.end();
process.exit(0);
