import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  services, Service, InsertService,
  caseStudies, CaseStudy, InsertCaseStudy,
  portfolioItems, PortfolioItem, InsertPortfolioItem,
  pricingPlans, PricingPlan, InsertPricingPlan,
  contactSubmissions, ContactSubmission, InsertContactSubmission,
  blogPosts, BlogPost, InsertBlogPost
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ===== USER OPERATIONS =====

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ===== SERVICES OPERATIONS =====

export async function getAllServices() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(services).where(eq(services.isActive, true)).orderBy(services.displayOrder, services.id);
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createService(data: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(services).values(data);
}

export async function updateService(id: number, data: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(services).set(data).where(eq(services.id, id));
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(services).set({ isActive: false }).where(eq(services.id, id));
}

// ===== CASE STUDIES OPERATIONS =====

export async function getAllCaseStudies(category?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (category && category !== 'All') {
    return await db.select().from(caseStudies)
      .where(and(eq(caseStudies.isActive, true), eq(caseStudies.category, category)))
      .orderBy(caseStudies.displayOrder, desc(caseStudies.createdAt));
  }
  
  return await db.select().from(caseStudies)
    .where(eq(caseStudies.isActive, true))
    .orderBy(caseStudies.displayOrder, desc(caseStudies.createdAt));
}

export async function getCaseStudyById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(caseStudies).where(eq(caseStudies.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCaseStudy(data: InsertCaseStudy) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(caseStudies).values(data);
}

export async function updateCaseStudy(id: number, data: Partial<InsertCaseStudy>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(caseStudies).set(data).where(eq(caseStudies.id, id));
}

export async function deleteCaseStudy(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(caseStudies).set({ isActive: false }).where(eq(caseStudies.id, id));
}

// ===== PORTFOLIO OPERATIONS =====

export async function getAllPortfolioItems() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(portfolioItems)
    .where(eq(portfolioItems.isActive, true))
    .orderBy(portfolioItems.displayOrder, desc(portfolioItems.createdAt));
}

export async function getPortfolioItemById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPortfolioItem(data: InsertPortfolioItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(portfolioItems).values(data);
}

export async function updatePortfolioItem(id: number, data: Partial<InsertPortfolioItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(portfolioItems).set(data).where(eq(portfolioItems.id, id));
}

export async function deletePortfolioItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(portfolioItems).set({ isActive: false }).where(eq(portfolioItems.id, id));
}

// ===== PRICING OPERATIONS =====

export async function getAllPricingPlans() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(pricingPlans)
    .where(eq(pricingPlans.isActive, true))
    .orderBy(pricingPlans.displayOrder, pricingPlans.id);
}

export async function getPricingPlanById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(pricingPlans).where(eq(pricingPlans.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPricingPlan(data: InsertPricingPlan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(pricingPlans).values(data);
}

export async function updatePricingPlan(id: number, data: Partial<InsertPricingPlan>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(pricingPlans).set(data).where(eq(pricingPlans.id, id));
}

export async function deletePricingPlan(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(pricingPlans).set({ isActive: false }).where(eq(pricingPlans.id, id));
}

// ===== CONTACT SUBMISSIONS OPERATIONS =====

export async function getAllContactSubmissions() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function getContactSubmissionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(contactSubmissions).values(data);
}

export async function updateContactSubmissionStatus(id: number, status: "new" | "contacted" | "closed", notes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status };
  if (notes !== undefined) {
    updateData.notes = notes;
  }
  
  await db.update(contactSubmissions).set(updateData).where(eq(contactSubmissions.id, id));
}

// ===== BLOG POSTS OPERATIONS =====

export async function getAllBlogPosts(category?: string, publishedOnly: boolean = true) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  if (publishedOnly) {
    conditions.push(eq(blogPosts.isPublished, true));
  }
  if (category && category !== 'All' && category !== 'Blog') {
    conditions.push(eq(blogPosts.category, category));
  }
  
  if (conditions.length > 0) {
    return await db.select().from(blogPosts)
      .where(and(...conditions))
      .orderBy(desc(blogPosts.publishedAt));
  }
  
  return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(data: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(blogPosts).values(data);
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}
