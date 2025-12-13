# CosmoQ-Inspired Design System for ELEVOR AI

## Color Palette

### Primary Colors
- **Background**: `#000000` to `#0A0A0A` (pure black to very dark gray)
- **Chrome Blue**: `#4A9EFF` (bright, metallic blue)
- **Deep Blue**: `#1E3A8A` (darker blue for accents)
- **Orange Accent**: `#FF8C42` to `#FFA500` (warm orange for gradients)

### Gradients
1. **Hero Sphere Gradient**: `linear-gradient(135deg, #FF8C42 0%, #4A9EFF 50%, #1E3A8A 100%)`
2. **Card Gradient**: `linear-gradient(180deg, rgba(74, 158, 255, 0.1) 0%, rgba(255, 140, 66, 0.05) 100%)`
3. **Glow Effect**: `radial-gradient(circle, rgba(74, 158, 255, 0.3) 0%, transparent 70%)`

### Text Colors
- **Primary Text**: `#FFFFFF` (white)
- **Secondary Text**: `#A0A0A0` (light gray)
- **Muted Text**: `#666666` (medium gray)

## Typography

### Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Headings**: 600-700 weight
- **Body**: 400-500 weight

### Scale
- **H1 (Hero)**: 64px, line-height 1.1, weight 700
- **H2 (Section)**: 48px, line-height 1.2, weight 600
- **H3 (Card Title)**: 24px, line-height 1.3, weight 600
- **Body**: 18px, line-height 1.6, weight 400
- **Small**: 14px, line-height 1.5, weight 400

## Components

### Glass Morphism Cards
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Gradient Sphere
- Large 3D sphere with orange-to-blue gradient
- Positioned in hero section
- Subtle glow effect around edges
- Can contain dashboard preview or icon

### Chrome Button
```css
background: linear-gradient(135deg, #4A9EFF 0%, #1E3A8A 100%);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 12px;
padding: 14px 32px;
color: white;
font-weight: 600;
box-shadow: 0 4px 16px rgba(74, 158, 255, 0.3);
transition: all 0.3s ease;
```

Hover state:
```css
transform: translateY(-2px);
box-shadow: 0 6px 24px rgba(74, 158, 255, 0.5);
```

### Feature Card
- Dark background with subtle gradient
- Glass morphism effect
- Icon with glow
- Title and description
- Hover: slight lift and increased glow

### Dashboard Preview Card
- Embedded in hero section
- Shows mini analytics/charts
- Glass morphism background
- Subtle animations

## Layout Principles

### Spacing
- **Section Padding**: 120px vertical, 80px on mobile
- **Card Gap**: 32px
- **Container Max Width**: 1280px
- **Content Padding**: 24px inside cards

### Grid System
- **Hero**: Full-width with centered content
- **Features**: 3-column grid on desktop, 1-column on mobile
- **Stats**: 4-column grid on desktop, 2-column on tablet, 1-column on mobile

## Visual Effects

### Glow Effects
- Subtle glow around spheres: `box-shadow: 0 0 60px rgba(74, 158, 255, 0.4)`
- Card hover glow: `box-shadow: 0 0 40px rgba(74, 158, 255, 0.2)`
- Button glow: `box-shadow: 0 4px 16px rgba(74, 158, 255, 0.3)`

### Animations
- **Fade In Up**: Elements fade in and slide up on scroll
- **Sphere Rotation**: Subtle rotation animation on hero sphere
- **Counter Animation**: Numbers count up on scroll into view
- **Hover Lift**: Cards lift slightly on hover

## Key Differentiators from Generic AI Themes

### What to AVOID
- ❌ Purple/indigo gradients
- ❌ Excessive neon glows
- ❌ Brain/circuit board illustrations
- ❌ 3D floating abstract shapes everywhere
- ❌ Particle effects

### What to USE
- ✅ Chrome blue with warm orange accents
- ✅ Subtle, purposeful glows
- ✅ Gradient spheres/orbs as focal points
- ✅ Glass morphism for depth
- ✅ Dark, sophisticated backgrounds
- ✅ Real dashboard previews
- ✅ Clean, professional typography

## Implementation Notes

1. **Dark Theme**: Entire site uses dark background
2. **Contrast**: Ensure text has sufficient contrast (WCAG AA minimum)
3. **Performance**: Use CSS gradients instead of images where possible
4. **Accessibility**: Maintain focus states, keyboard navigation
5. **Mobile**: Simplify effects on mobile for performance
6. **Loading**: Add skeleton screens with gradient shimmer

## Component Library to Build

1. **GradientSphere** - Hero sphere component
2. **GlassCard** - Reusable glass morphism card
3. **ChromeButton** - Primary CTA button
4. **FeatureCard** - Feature showcase card
5. **StatsCounter** - Animated number counter
6. **LogoMarquee** - Infinite scrolling logo carousel
7. **DashboardPreview** - Mini dashboard embed
8. **GlowIcon** - Icon with glow effect
