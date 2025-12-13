import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

// Admin-only procedure that checks for admin role
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ 
      code: 'FORBIDDEN',
      message: 'Admin access required'
    });
  }
  return next({ ctx });
});

export const adminRouter = router({
  // Contact submissions management
  contactSubmissions: router({
    list: adminProcedure.query(async () => {
      return await db.getAllContactSubmissions();
    }),
    
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "closed"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.updateContactSubmissionStatus(input.id, input.status, input.notes);
        return { success: true };
      }),
  }),

  // Services management
  services: router({
    list: adminProcedure.query(async () => {
      return await db.getAllServices();
    }),
    
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        category: z.enum(["AI Agents", "Advisory & Tech"]),
        description: z.string(),
        impact: z.string(),
        engine: z.string(),
        workflowSteps: z.string(),
        deployedCount: z.number().default(0),
        iconName: z.string(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await db.createService(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          title: z.string().optional(),
          category: z.enum(["AI Agents", "Advisory & Tech"]).optional(),
          description: z.string().optional(),
          impact: z.string().optional(),
          engine: z.string().optional(),
          workflowSteps: z.string().optional(),
          deployedCount: z.number().optional(),
          iconName: z.string().optional(),
          displayOrder: z.number().optional(),
          isActive: z.boolean().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        await db.updateService(input.id, input.data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteService(input.id);
        return { success: true };
      }),
  }),

  // Case studies management
  caseStudies: router({
    list: adminProcedure.query(async () => {
      return await db.getAllCaseStudies();
    }),
    
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        category: z.string(),
        challenge: z.string(),
        solution: z.string(),
        result: z.string(),
        tech: z.string(), // JSON string
        imageUrl: z.string().optional(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await db.createCaseStudy(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          title: z.string().optional(),
          category: z.string().optional(),
          challenge: z.string().optional(),
          solution: z.string().optional(),
          result: z.string().optional(),
          tech: z.string().optional(),
          imageUrl: z.string().optional(),
          displayOrder: z.number().optional(),
          isActive: z.boolean().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        await db.updateCaseStudy(input.id, input.data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteCaseStudy(input.id);
        return { success: true };
      }),
  }),

  // Pricing plans management
  pricing: router({
    list: adminProcedure.query(async () => {
      return await db.getAllPricingPlans();
    }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        subtitle: z.string().optional(),
        price: z.string(),
        period: z.string().optional(),
        description: z.string().optional(),
        features: z.string(), // JSON string
        highlighted: z.boolean().default(false),
        ctaText: z.string().default("Get Started"),
        ctaLink: z.string().optional(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await db.createPricingPlan(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          subtitle: z.string().optional(),
          price: z.string().optional(),
          period: z.string().optional(),
          description: z.string().optional(),
          features: z.string().optional(),
          highlighted: z.boolean().optional(),
          ctaText: z.string().optional(),
          ctaLink: z.string().optional(),
          displayOrder: z.number().optional(),
          isActive: z.boolean().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        await db.updatePricingPlan(input.id, input.data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deletePricingPlan(input.id);
        return { success: true };
      }),
  }),
});
