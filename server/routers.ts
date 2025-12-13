import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { adminRouter } from "./adminRouters";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  admin: adminRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Services router
  services: router({
    list: publicProcedure.query(async () => {
      return await db.getAllServices();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getServiceById(input.id);
      }),
  }),

  // Case studies router
  caseStudies: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getAllCaseStudies(input?.category);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getCaseStudyById(input.id);
      }),
  }),

  // Portfolio router
  portfolio: router({
    list: publicProcedure.query(async () => {
      return await db.getAllPortfolioItems();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getPortfolioItemById(input.id);
      }),
  }),

  // Pricing router
  pricing: router({
    list: publicProcedure.query(async () => {
      return await db.getAllPricingPlans();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getPricingPlanById(input.id);
      }),
  }),

  // Contact form router
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        company: z.string().optional(),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await db.createContactSubmission(input);
        
        // Send notification to owner
        try {
          await notifyOwner({
            title: `New Contact Form Submission from ${input.name}`,
            content: `Name: ${input.name}\nEmail: ${input.email}\n${input.phone ? `Phone: ${input.phone}\n` : ''}${input.company ? `Company: ${input.company}\n` : ''}\n\nMessage:\n${input.message}`,
          });
        } catch (error) {
          console.error("Failed to send notification:", error);
        }
        
        return { success: true };
      }),
  }),

  // Blog posts router
  blog: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getAllBlogPosts(input?.category, true);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getBlogPostById(input.id);
      }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogPostBySlug(input.slug);
      }),
  }),
});

export type AppRouter = typeof appRouter;
