# ELEVOR AI - Enterprise Artificial Intelligence Platform

![ELEVOR AI](https://img.shields.io/badge/ELEVOR-AI%20Platform-0066FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Overview

ELEVOR AI is a cutting-edge enterprise artificial intelligence platform that bridges the gap between autonomous technology and enterprise-grade reliability. This repository contains the complete website codebase featuring:

- **Live Operations Dashboard** with real-time metrics
- **Realistic Data Fluctuations** using localStorage persistence
- **Responsive Design** optimized for all devices
- **Modern UI/UX** with smooth animations and transitions
- **Enterprise-grade Security** (SOC 2, ISO 27001, CMMI Level 3 certified)

## ✨ Key Features

### 🎯 Live Dashboard
- Real-time metrics that update every 2-3 seconds
- Natural number fluctuations with upward trend
- Persistent data across sessions using localStorage
- Dynamic percentage calculations
- Beautiful gradient icons and hover animations

### 🎨 Design System
- **Color Scheme**: ELEVOR Blue (#0066FF) with green accents
- **Typography**: Professional sans-serif fonts
- **Components**: Reusable UI components with shadcn/ui
- **Animations**: Subtle float, pulse, and transition effects
- **Icons**: Lucide React icons with custom styling

### 📊 Pages
- **Homepage**: Hero section with rotating headlines, stats, case studies
- **Live Dashboard**: Real-time operations monitoring
- **Services**: AI automation services showcase
- **Case Studies**: Client success stories (Zigbang, LOTTE REIT, ESR)
- **Pricing**: Transparent pricing tiers
- **About**: Company story and vision
- **Contact**: Get in touch form

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Vite** - Fast build tool
- **Wouter** - Lightweight routing

### Backend
- **Express 4** - Web server
- **tRPC 11** - End-to-end typesafe APIs
- **Drizzle ORM** - TypeScript ORM
- **MySQL/TiDB** - Database

### UI Components
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

## 📁 Project Structure

```
elevor-v7-fullstack/
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   │   └── logos/           # Company and certification logos
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities and tRPC client
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # Global styles
├── server/                   # Backend application
│   ├── routers.ts           # tRPC procedures
│   ├── db.ts                # Database helpers
│   └── _core/               # Core server functionality
├── drizzle/                  # Database schema
│   └── schema.ts            # Table definitions
└── shared/                   # Shared types and constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js 22.x
- pnpm 9.x
- MySQL or TiDB database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/x0VIER/ELEVOR.git
cd ELEVOR
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
pnpm db:push
```

5. Start the development server:
```bash
pnpm dev
```

6. Open your browser:
```
http://localhost:3000
```

## 🎨 Design Assets

### Logos
All logos are stored in `client/public/logos/`:
- Company logos: Zigbang, LOTTE REIT, ESR
- Tech stack: OpenAI, Anthropic, Llama, Pinecone, LangChain, Python, React, AWS
- Certifications: SOC 2 Type II, ISO 27001, CMMI Level 3

### Color Palette
```css
/* Primary Colors */
--elevor-blue: #0066FF;
--elevor-blue-light: #3B82F6;
--elevor-blue-dark: #1E40AF;

/* Accent Colors */
--green-accent: #10B981;
--purple-accent: #8B5CF6;
--yellow-accent: #F59E0B;

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-900: #111827;
```

### Typography
- **Headings**: font-bold, leading-tight
- **Body**: font-normal, leading-relaxed
- **Sizes**: text-sm to text-5xl

## 📊 Live Dashboard Metrics

The dashboard displays real-time metrics with natural fluctuations:

| Metric | Base Value | Volatility | Update Frequency |
|--------|-----------|-----------|------------------|
| Leads Captured | 480 | ±5 | 2-3 seconds |
| Deals Closed | 57 | ±2 | 2-3 seconds |
| Actions Today | 7,543 | ±20 | 2-3 seconds |
| Calls Connected | 1,326 | ±8 | 2-3 seconds |
| Messages Sent | 2,872 | ±15 | 2-3 seconds |
| Appointments | 164 | ±1 | 2-3 seconds |
| AI Agents Active | 91 | ±2 | 2-3 seconds |

## 🔒 Security & Compliance

- **SOC 2 Type II** - Security & Compliance
- **ISO 27001** - Information Security
- **CMMI Level 3** - Process Maturity
- End-to-end encryption
- 24/7 monitoring & support

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

This is a private repository for ELEVOR AI. For questions or contributions, please contact the development team.

## 📄 License

Copyright © 2024 ELEVOR AI. All rights reserved.

## 🔗 Links

- **Live Website**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Support**: [Coming Soon]

## 📞 Contact

For inquiries about ELEVOR AI:
- **Website**: [elevor.ai]
- **Email**: [contact@elevor.ai]
- **GitHub**: [@x0VIER](https://github.com/x0VIER)

---

Built with ❤️ by the ELEVOR AI team
