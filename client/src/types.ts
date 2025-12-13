import { LucideIcon } from 'lucide-react';

export interface Service {
  id: number;
  title: string;
  category: 'AI Agents' | 'Advisory & Tech';
  description: string;
  impact: string;     // Replaces 'proof' - measured operational impact
  engine: string;     // Replaces 'workflow' - terminal style system ref
  workflowImage: string; // New 3D isometric workflow visualization
  deployedCount: number; // Base number for live counter
  icon: LucideIcon;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  tech: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}