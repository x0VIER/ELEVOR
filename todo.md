# ELEVOR V7 Full-Stack Migration TODO

## Database Schema
- [x] Create services table for service offerings
- [x] Create case_studies table with category support
- [x] Create portfolio_items table
- [x] Create pricing_plans table
- [x] Create contact_submissions table
- [x] Create blog_posts table with category filtering

## Frontend Component Migration
- [x] Migrate Header component with navigation
- [x] Migrate Footer component
- [x] Migrate Home page with all sections
- [x] Migrate Services page with service targeting
- [x] Migrate Portfolio page
- [x] Migrate CaseStudies page with category filtering
- [x] Migrate Pricing page
- [x] Migrate About page
- [x] Migrate Contact page with form
- [x] Migrate Blog page integration
- [x] Preserve scroll-to-top button functionality

## Tailwind Design System Integration
- [x] Configure Tailwind with blue accent colors
- [x] Set up gray color palette
- [x] Configure Inter font family
- [ ] Add custom animations (marquee, fadeIn)
- [ ] Configure custom spacing and keyframes

## tRPC API Endpoints
- [x] Create services router with list/get endpoints
- [x] Create case studies router with category filtering
- [x] Create portfolio router
- [x] Create pricing router
- [x] Create contact form submission endpoint
- [x] Create blog posts router with filtering

## Admin Dashboard
- [x] Create admin layout with sidebar navigation
- [x] Implement services CRUD operations
- [x] Implement case studies CRUD operations
- [x] Implement portfolio items CRUD operations
- [x] Implement pricing plans CRUD operations
- [x] View contact form submissions
- [x] Role-based access control for admin routes

## Contact Form & Notifications
- [x] Build contact form with validation
- [x] Implement backend validation with Zod
- [x] Set up email notification to project owner
- [x] Store contact submissions in database

## Authentication & Authorization
- [x] Configure Manus OAuth integration
- [x] Set up protected routes for admin dashboard
- [x] Set up public routes for marketing pages
- [x] Implement role-based access control

## Testing & Deployment
- [x] Write vitest tests for tRPC procedures
- [x] Test all CRUD operations
- [x] Test contact form submission
- [x] Test authentication flow
- [ ] Create deployment checkpoint
