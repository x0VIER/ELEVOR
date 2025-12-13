import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Services API", () => {
  it("should list all active services", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const services = await caller.services.list();

    expect(services).toBeDefined();
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
    
    // Verify service structure
    if (services.length > 0) {
      const service = services[0];
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('category');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('impact');
      expect(service).toHaveProperty('engine');
      expect(service.isActive).toBe(true);
    }
  });

  it("should get service by id", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const service = await caller.services.getById({ id: 1 });

    expect(service).toBeDefined();
    if (service) {
      expect(service.id).toBe(1);
      expect(service.title).toBeDefined();
    }
  });
});

describe("Case Studies API", () => {
  it("should list all case studies", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const caseStudies = await caller.caseStudies.list();

    expect(caseStudies).toBeDefined();
    expect(Array.isArray(caseStudies)).toBe(true);
  });

  it("should filter case studies by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const caseStudies = await caller.caseStudies.list({ category: "Real Estate" });

    expect(caseStudies).toBeDefined();
    expect(Array.isArray(caseStudies)).toBe(true);
    
    // All returned items should match the category
    caseStudies.forEach(cs => {
      expect(cs.category).toBe("Real Estate");
    });
  });
});

describe("Pricing API", () => {
  it("should list all pricing plans", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const plans = await caller.pricing.list();

    expect(plans).toBeDefined();
    expect(Array.isArray(plans)).toBe(true);
    expect(plans.length).toBeGreaterThan(0);
    
    // Verify pricing plan structure
    if (plans.length > 0) {
      const plan = plans[0];
      expect(plan).toHaveProperty('id');
      expect(plan).toHaveProperty('name');
      expect(plan).toHaveProperty('price');
      expect(plan).toHaveProperty('features');
      expect(plan.isActive).toBe(true);
    }
  });
});

describe("Contact Form API", () => {
  it("should accept valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      company: "Test Company",
      message: "This is a test message for the contact form.",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("should reject contact form with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "invalid-email",
        message: "This is a test message.",
      })
    ).rejects.toThrow();
  });

  it("should reject contact form with short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        message: "Short",
      })
    ).rejects.toThrow();
  });
});

describe("Portfolio API", () => {
  it("should list all portfolio items", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const items = await caller.portfolio.list();

    expect(items).toBeDefined();
    expect(Array.isArray(items)).toBe(true);
  });
});

describe("Blog API", () => {
  it("should list published blog posts", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const posts = await caller.blog.list();

    expect(posts).toBeDefined();
    expect(Array.isArray(posts)).toBe(true);
  });
});
