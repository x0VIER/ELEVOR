import { 
  Bot, Search, BarChart3, MessageSquare, Calendar, CreditCard, 
  Users, Mic, PieChart, Wrench, Brain, ShieldCheck, Code, 
  Layout, Database, Smartphone, GitBranch, Gamepad2, 
  MessageCircle, Briefcase, Stethoscope, Truck, ShoppingBag, Coins, GraduationCap, Car
} from 'lucide-react';
import { Service, PortfolioItem, BlogPost, FaqItem, StatItem } from './types';

// --- ADVANCED ISOMETRIC DIAGRAM GENERATOR ---
const getWorkflowImage = (stepsString: string) => {
  const steps = stepsString.split(/\s*>\s*/);
  const width = 800;
  const height = 450;
  
  // Center point
  const centerX = width / 2;
  const centerY = height / 2;

  // Isometric projection helper
  // x, y are grid coordinates. z is height up.
  const toIso = (x: number, y: number, z: number = 0) => ({
    x: centerX + (x - y) * 1.5, // Spread out horizontally
    y: centerY + (x + y) * 0.8 - z // Spread out vertically
  });

  // Shape Generators
  const drawCylinder = (x: number, y: number, color: string, label: string) => {
    const pos = toIso(x, y);
    const w = 45; const h = 18; const d = 35;
    return `
      <g>
        <!-- Bottom Cap -->
        <path d="M${pos.x-w},${pos.y+d} a${w},${h} 0 0,0 ${w*2},0 a${w},${h} 0 0,0 -${w*2},0" fill="${color}" opacity="0.5"/>
        <!-- Body -->
        <path d="M${pos.x-w},${pos.y} v${d} a${w},${h} 0 0,0 ${w*2},0 v-${d}" fill="${color}" fill-opacity="0.8" stroke="#1e3a8a" stroke-width="1.5"/>
        <!-- Top Cap -->
        <path d="M${pos.x-w},${pos.y} a${w},${h} 0 0,0 ${w*2},0 a${w},${h} 0 0,0 -${w*2},0" fill="${color}" stroke="#1e3a8a" stroke-width="1.5"/>
        <!-- Label -->
        <rect x="${pos.x - 50}" y="${pos.y + d + 15}" width="100" height="20" rx="4" fill="white" fill-opacity="0.8"/>
        <text x="${pos.x}" y="${pos.y + d + 29}" font-family="Roboto" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">${label}</text>
      </g>
    `;
  };

  const drawDiamond = (x: number, y: number, color: string, label: string) => {
    const pos = toIso(x, y);
    const s = 40; // size
    return `
      <g>
        <!-- Shadow -->
        <path d="M${pos.x},${pos.y+40} L${pos.x+s},${pos.y+40+s/2} L${pos.x},${pos.y+40+s} L${pos.x-s},${pos.y+40+s/2} Z" fill="black" opacity="0.1"/>
        <!-- 3D Sides -->
        <path d="M${pos.x-s},${pos.y} L${pos.x},${pos.y+s/2} L${pos.x},${pos.y+s/2+15} L${pos.x-s},${pos.y+15} Z" fill="#1e293b" fill-opacity="0.2"/>
        <path d="M${pos.x+s},${pos.y} L${pos.x},${pos.y+s/2} L${pos.x},${pos.y+s/2+15} L${pos.x+s},${pos.y+15} Z" fill="#0f172a" fill-opacity="0.3"/>
        <!-- Top Face -->
        <path d="M${pos.x},${pos.y-s/2} L${pos.x+s},${pos.y} L${pos.x},${pos.y+s/2} L${pos.x-s},${pos.y} Z" fill="${color}" stroke="#1e3a8a" stroke-width="1.5"/>
        <!-- Label -->
        <rect x="${pos.x - 50}" y="${pos.y + 35}" width="100" height="20" rx="4" fill="white" fill-opacity="0.8"/>
        <text x="${pos.x}" y="${pos.y + 49}" font-family="Roboto" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">${label}</text>
      </g>
    `;
  };

  const drawBox = (x: number, y: number, color: string, label: string) => {
    const pos = toIso(x, y);
    const s = 35; const h = 20;
    return `
      <g>
        <!-- Shadow -->
        <path d="M${pos.x-s},${pos.y+30} L${pos.x+s},${pos.y+30} L${pos.x+2*s},${pos.y+30-h} L${pos.x},${pos.y+30-h} Z" fill="black" opacity="0.05" transform="translate(0, 10)"/>
        <!-- Left Face -->
        <path d="M${pos.x-s},${pos.y} L${pos.x-s},${pos.y+15} L${pos.x},${pos.y+h+15} L${pos.x},${pos.y+h} Z" fill="#93C5FD" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Right Face -->
        <path d="M${pos.x+s},${pos.y} L${pos.x+s},${pos.y+15} L${pos.x},${pos.y+h+15} L${pos.x},${pos.y+h} Z" fill="#60A5FA" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Top Face -->
        <path d="M${pos.x},${pos.y-h} L${pos.x+s},${pos.y} L${pos.x},${pos.y+h} L${pos.x-s},${pos.y} Z" fill="white" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Label -->
        <rect x="${pos.x - 50}" y="${pos.y - 45}" width="100" height="20" rx="4" fill="white" fill-opacity="0.9" stroke="#e2e8f0" stroke-width="0.5"/>
        <text x="${pos.x}" y="${pos.y - 31}" font-family="Roboto" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">${label}</text>
      </g>
    `;
  };

  const getShape = (text: string, x: number, y: number) => {
    const t = text.toLowerCase();
    const label = text.trim();
    
    if (t.includes('db') || t.includes('store') || t.includes('crm') || t.includes('ledger') || t.includes('data')) {
      return drawCylinder(x, y, '#bfdbfe', label);
    } else if (t.includes('check') || t.includes('verify') || t.includes('risk') || t.includes('decide') || t.includes('scan') || t.includes('nlp')) {
      return drawDiamond(x, y, '#93c5fd', label);
    } else {
      return drawBox(x, y, '#dbeafe', label);
    }
  };

  let elements = '';
  let connections = '';

  // Calculate layout to center perfectly
  const stepCount = steps.length;
  const spacing = 60;
  
  // Create a staggered grid pattern centered around (0,0)
  const coords = steps.map((_, i) => {
    // x increases, y oscillates to create a "flow" chart look
    const xOffset = (i - (stepCount - 1) / 2) * spacing;
    const yOffset = Math.sin(i * 2) * 20; 
    return { x: xOffset, y: yOffset };
  });

  // Draw Connections first so they are behind nodes
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = toIso(coords[i].x, coords[i].y);
    const next = toIso(coords[i+1].x, coords[i+1].y);
    
    // Draw pipe
    connections += `
      <path d="M${curr.x},${curr.y+10} L${next.x},${next.y+10}" 
            fill="none" stroke="#cbd5e1" stroke-width="6" />
      <path d="M${curr.x},${curr.y+10} L${next.x},${next.y+10}" 
            fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
      </path>
    `;
  }

  // Draw Nodes
  coords.forEach((c, i) => {
    elements += getShape(steps[i].replace(/[>]/g, '').trim(), c.x, c.y);
  });

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
          <stop offset="0%" stop-color="#f8fafc" stop-opacity="1" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
        <pattern id="grid" width="60" height="34" patternUnits="userSpaceOnUse">
           <path d="M30 0 L60 17 L30 34 L0 17 Z" fill="none" stroke="#f1f5f9" stroke-width="1.5"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="white" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="${centerX}" cy="${centerY}" r="300" fill="url(#glow)" />

      <!-- Diagram -->
      <g transform="translate(0, 20)"> <!-- Nudge down slightly -->
        ${connections}
        ${elements}
      </g>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const SERVICES: Service[] = [
  // AI Agents (1-10)
  {
    id: 1,
    title: "Autonomous Lead Acquisition Ecosystem",
    category: "AI Agents",
    description: "Deploy a 24/7 autonomous pipeline that ingests raw market data, enriches profiles with 99% accuracy, and scores intent using predictive modeling—syncing only sales-ready leads to your CRM.",
    impact: "Reduces CAC by 64% in <90 days.",
    engine: "sys.ingest(raw_data) >> identity.resolve() >> model.predict(intent) >> crm.sync()",
    workflowImage: getWorkflowImage("Ingest Stream > Identity Resolve > AI Scoring > CRM Sync"),
    deployedCount: 842,
    icon: Search
  },
  {
    id: 2,
    title: "Predictive Deal Analysis Engine",
    category: "AI Agents",
    description: "Eliminate emotional bias. Computer vision agents assess property conditions from photos while financial agents cross-reference 50+ market indicators to calculate ARV/MAO with institutional precision.",
    impact: "Risk assessment error < 3%.",
    engine: "vision.scan(img) >> comp.retrieve(loc) >> fin.model(arv) >> offer.gen(pdf)",
    workflowImage: getWorkflowImage("Vision Scan > Market Comps > Risk Model > Gen Offer"),
    deployedCount: 1250,
    icon: BarChart3
  },
  {
    id: 3,
    title: "Asset Sentinel Dashboard",
    category: "AI Agents",
    description: "The eyes of your portfolio. Creates a continuous monitoring loop comparing real-time asset performance against historical baselines, flagging anomalies before they become liabilities.",
    impact: "Monitors $4B+ autonomously.",
    engine: "monitor.watch(stream) >> anomaly.detect(ml) >> alert.dispatch() >> report.gen()",
    workflowImage: getWorkflowImage("Monitor Loop > Detect Anomaly > Alert Dispatch > Gen Report"),
    deployedCount: 535,
    icon: Layout
  },
  {
    id: 4,
    title: "Brand Reputation Guardian",
    category: "AI Agents",
    description: "Turn sentiment into strategy. NLP agents scour the web for mentions, interpreting context and intent to automatically resolve issues or amplify positive feedback across all channels.",
    impact: "Response latency: < 5s.",
    engine: "crawl.web(targets) >> nlp.sentiment(txt) >> context.map() >> reply.deploy()",
    workflowImage: getWorkflowImage("Web Crawl > NLP Sentiment > Context Map > Auto Reply"),
    deployedCount: 3436,
    icon: MessageSquare
  },
  {
    id: 5,
    title: "Intelligent Scheduling Matrix",
    category: "AI Agents",
    description: "Stop playing email tag. This agent negotiates time, resolves multi-party conflicts, and locks in appointments based on priority logic, filling your calendar with high-value activities.",
    impact: "Recovers 15hrs/week/agent.",
    engine: "req.parse(nlp) >> slot.check(cal) >> negotiate.lock() >> notify.all()",
    workflowImage: getWorkflowImage("Parse Req > Check Slots > Lock Cal > Notify"),
    deployedCount: 6766,
    icon: Calendar
  },
  {
    id: 6,
    title: "Trustless Transaction Protocol",
    category: "AI Agents",
    description: "Secure revenue streams with banking-grade validation workflows. Authenticates identities, authorizes funds via encrypted gateways, and creates immutable audit trails on a private ledger.",
    impact: "Zero fraud in 100k+ txns.",
    engine: "auth.verify(id) >> aml.check(db) >> contract.sign(zk) >> ledger.commit()",
    workflowImage: getWorkflowImage("Verify ID > AML Check > Sign Contract > Ledger DB"),
    deployedCount: 420,
    icon: CreditCard
  },
  {
    id: 7,
    title: "Swarm Intelligence Orchestrator",
    category: "AI Agents",
    description: "Coordinate a digital workforce. This hub assigns complex tasks to specialized sub-agents, aggregates findings, and synthesizes executive outputs—running entire departments via software.",
    impact: "300% operational throughput.",
    engine: "hub.delegate(task) >> swarm.exec(parallel) >> merge.result() >> report.out()",
    workflowImage: getWorkflowImage("Master Hub > Split Task > Agent Swarm > Merge Result"),
    deployedCount: 215,
    icon: Users
  },
  {
    id: 8,
    title: "Conversational Voice Interface",
    category: "AI Agents",
    description: "Scale phone presence infinitely. Voice agents handle thousands of simultaneous calls with human-like latency, qualifying leads and handling support tickets without human operators.",
    impact: "50k+ daily calls @ 98% uptime.",
    engine: "voice.in(stream) >> llm.reason(ctx) >> tts.synth(audio) >> voice.out()",
    workflowImage: getWorkflowImage("Voice In > AI Reason > TTS Synth > Voice Out"),
    deployedCount: 2343,
    icon: Mic
  },
  {
    id: 9,
    title: "Executive Intelligence Suite",
    category: "AI Agents",
    description: "Transform raw database streams into actionable intelligence. Automatically generates and distributes C-suite dashboards highlighting KPIs and strategic opportunities.",
    impact: "100% automated reporting.",
    engine: "db.connect(sql) >> kpi.agg(logic) >> trend.analyze() >> email.push()",
    workflowImage: getWorkflowImage("DB Connect > Agg KPIs > Analyze > Push Email"),
    deployedCount: 890,
    icon: PieChart
  },
  {
    id: 10,
    title: "System Health Auto-Scaler",
    category: "AI Agents",
    description: "Self-healing infrastructure. Runs perpetual diagnostics, applies patches, optimizes queries, and scales resources up or down based on real-time load requirements.",
    impact: "Guaranteed 99.99% uptime.",
    engine: "diag.scan(sys) >> health.check() >> scale.up(nodes) >> log.archive()",
    workflowImage: getWorkflowImage("Scan Diag > Check Health > Auto Scale > Archive"),
    deployedCount: 633,
    icon: Wrench
  },
  // Advisory & Tech (11-21)
  {
    id: 11,
    title: "Virtual CTO & Strategy Audit",
    category: "Advisory & Tech",
    description: "Align technology with business velocity. We audit your entire stack, identify bottlenecks, and design a phased AI implementation roadmap ensuring every dollar spent yields measurable ROI.",
    impact: "Avg 5x ROI on tech spend.",
    engine: "audit.deep(stack) >> gap.id(matrix) >> roadmap.gen() >> roi.calc()",
    workflowImage: getWorkflowImage("Deep Audit > ID Gaps > Map Stack > Calc ROI"),
    deployedCount: 150,
    icon: Brain
  },
  {
    id: 12,
    title: "Blockchain Verification Layer",
    category: "Advisory & Tech",
    description: "Mathematical trust for high-stakes assets. Implement consensus mechanisms and cryptographic proofs to verify asset ownership and transfer, eliminating intermediaries.",
    impact: "Settlement: T+3 -> T+0.",
    engine: "hash.gen(data) >> node.verify(p2p) >> consensus.reach() >> block.add()",
    workflowImage: getWorkflowImage("Hash Data > Node Verify > Consensus > Add Block"),
    deployedCount: 95,
    icon: ShieldCheck
  },
  {
    id: 13,
    title: "Rapid MVP Acceleration",
    category: "Advisory & Tech",
    description: "From napkin sketch to market-ready in weeks. Utilizing pre-built modules and AI-assisted coding to launch functional, scalable products faster than traditional dev shops.",
    impact: "Time-to-market down 70%.",
    engine: "spec.ingest(doc) >> mod.select(lib) >> code.gen(ai) >> deploy.ci()",
    workflowImage: getWorkflowImage("Ingest Spec > Gen Code > Auto Test > CI Deploy"),
    deployedCount: 310,
    icon: Code
  },
  {
    id: 14,
    title: "Enterprise ERP Backbone",
    category: "Advisory & Tech",
    description: "The central nervous system of your company. Architecting robust, scalable platforms that connect disparate tools into a unified operational layer handling millions of transactions.",
    impact: "Supports $100M+ volume.",
    engine: "api.gateway(rest) >> load.bal(l7) >> logic.core() >> db.shard(sql)",
    workflowImage: getWorkflowImage("Gateway > Load Bal > Core Logic > Shard DB"),
    deployedCount: 112,
    icon: Database
  },
  {
    id: 15,
    title: "Unstructured Data Extractor",
    category: "Advisory & Tech",
    description: "Unlock value trapped in documents. Advanced OCR and LLMs turn PDFs, images, and handwritten notes into structured, queryable data for downstream systems.",
    impact: "99.8% extraction accuracy.",
    engine: "doc.load(pdf) >> ocr.vision(img) >> entity.extract() >> json.out()",
    workflowImage: getWorkflowImage("Load Doc > OCR Vision > Extract > JSON Out"),
    deployedCount: 745,
    icon: Bot
  },
  {
    id: 16,
    title: "Field Ops Mobile Extension",
    category: "Advisory & Tech",
    description: "Empower your workforce at the edge. Offline-first mobile apps sync seamlessly with your central core, allowing field agents to execute workflows from anywhere.",
    impact: "Data latency reduced to 0.",
    engine: "local.store(sqlite) >> sync.delta() >> conflict.resolve() >> server.push()",
    workflowImage: getWorkflowImage("Local Store > Sync Delta > Resolve > UI Update"),
    deployedCount: 560,
    icon: Smartphone
  },
  {
    id: 17,
    title: "Data Lake Infrastructure",
    category: "Advisory & Tech",
    description: "A single source of truth. Resilient pipelines ingest, clean, and warehouse data from all sources, preparing it for advanced analytics and ML models.",
    impact: "Data availability: 99.999%.",
    engine: "etl.extract(src) >> clean.pipe(py) >> lake.store(s3) >> query.serve()",
    workflowImage: getWorkflowImage("ETL Source > Clean > Lake Store > Serve Query"),
    deployedCount: 220,
    icon: GitBranch
  },
  {
    id: 18,
    title: "Digital Twin Simulation",
    category: "Advisory & Tech",
    description: "Test the future before building it. Physics-based simulations of operational environments allow you to run scenarios and optimize outcomes without real-world risk.",
    impact: "Prevented $2M in errors.",
    engine: "param.in(vars) >> sim.run(physics) >> viz.render(gl) >> opt.loop()",
    workflowImage: getWorkflowImage("Params In > Calc Phys > Sim State > Viz Loop"),
    deployedCount: 88,
    icon: Gamepad2
  },
  {
    id: 19,
    title: "Omnichannel Context Engine",
    category: "Advisory & Tech",
    description: "Seamless conversation across platforms. Maintains user context whether on WhatsApp, Email, or Web, ensuring agents always know the full history.",
    impact: "CSAT scores +40%.",
    engine: "msg.in(webhook) >> id.match(redis) >> context.fetch() >> reply.gen()",
    workflowImage: getWorkflowImage("Msg In > ID Match > Fetch Ctx > Reply Gen"),
    deployedCount: 415,
    icon: MessageCircle
  },
  {
    id: 20,
    title: "Senior Engineering Augmentation",
    category: "Advisory & Tech",
    description: "Inject elite talent instantly. Deploy senior engineers who integrate directly into your workflows, bringing specialized AI expertise to your existing projects.",
    impact: "Velocity increased 3x.",
    engine: "req.match(skill) >> onboard.fast() >> code.ship(git) >> transfer.know()",
    workflowImage: getWorkflowImage("Match Req > Onboard > Ship Code > Transfer"),
    deployedCount: 100,
    icon: Users
  },
  {
    id: 21,
    title: "Project Assurance Framework",
    category: "Advisory & Tech",
    description: "Delivery is a science. Rigorous project management and automated QA pipelines ensure software is delivered on time, on budget, and bug-free.",
    impact: "100% on-time delivery.",
    engine: "scope.lock(doc) >> sprint.exec() >> ci.test(auto) >> release.prod()",
    workflowImage: getWorkflowImage("Lock Scope > Run Sprint > Verify > Release"),
    deployedCount: 330,
    icon: Briefcase
  },
  // NEW INDUSTRY-SPECIFIC SERVICES
  {
    id: 22,
    title: "Clinical Patient Triage Agent",
    category: "AI Agents",
    description: "Revolutionize healthcare intake. HIPAA-compliant agents handle scheduling, symptom pre-screening, and insurance verification automatically.",
    impact: "Intake time cut by 75%.",
    engine: "intake.form(phi) >> nlp.triage(med) >> verify.ins() >> emr.sync()",
    workflowImage: getWorkflowImage("Intake Form > NLP Triage > Verify Ins > EMR Sync"),
    deployedCount: 145,
    icon: Stethoscope
  },
  {
    id: 23,
    title: "Supply Chain Predictive Brain",
    category: "AI Agents",
    description: "Anticipate disruptions. Logistics agents analyze routes, weather, and inventory to predict delays and automatically reroute shipments.",
    impact: "Efficiency boost: 30%.",
    engine: "track.data(gps) >> predict.delay(ml) >> route.opt() >> order.adj()",
    workflowImage: getWorkflowImage("Route Data > Predict Delay > Opt Route > Adj Order"),
    deployedCount: 210,
    icon: Truck
  },
  {
    id: 24,
    title: "Retail Personalization Omni-Bot",
    category: "AI Agents",
    description: "Deliver VIP experiences. Tracks behavior across web/mobile to recommend products and handle support with context-aware responses.",
    impact: "Conversion up 22%.",
    engine: "track.user(pixel) >> model.beh(ai) >> rec.gen() >> chat.support()",
    workflowImage: getWorkflowImage("Track User > Model Beh > Recommend > Support Chat"),
    deployedCount: 360,
    icon: ShoppingBag
  },
  {
    id: 25,
    title: "Algorithmic Risk Guardian",
    category: "AI Agents",
    description: "Fintech security at scale. Monitors transaction streams in real-time, instantly freezing suspicious activities to prevent fraud losses.",
    impact: "Fraud detection: 99.5%.",
    engine: "stream.tx(wss) >> scan.anom(ml) >> risk.calc() >> freeze.act()",
    workflowImage: getWorkflowImage("TX Stream > Scan Anom > Risk Score > Freeze Act"),
    deployedCount: 180,
    icon: Coins
  },
  {
    id: 26,
    title: "Adaptive Learning Curriculum Gen",
    category: "AI Agents",
    description: "Personalized education. Analyzes student performance to generate custom lesson plans and quizzes, adapting to knowledge gaps in real-time.",
    impact: "Retention improved 40%.",
    engine: "data.student(lms) >> gap.analyze() >> gen.lesson(llm) >> track.prog()",
    workflowImage: getWorkflowImage("Student Data > Gap Analysis > Gen Lesson > Track"),
    deployedCount: 120,
    icon: GraduationCap
  },
  {
    id: 27,
    title: "Predictive Maintenance Twin",
    category: "AI Agents",
    description: "Keep fleets running. Digital twins predict part failures based on telemetry, scheduling maintenance before breakdowns occur.",
    impact: "Downtime reduced 50%.",
    engine: "telemetry.in(iot) >> twin.sim(phys) >> fail.pred() >> maint.sched()",
    workflowImage: getWorkflowImage("Telemetry > Twin Sim > Predict Fail > Sched Maint"),
    deployedCount: 95,
    icon: Car
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: "Wholesaler Lead Swarm",
    category: "Real Estate",
    challenge: "Client struggled with manual skip tracing and high false positive rates.",
    solution: "Deployed a swarm of autonomous agents for semantic search and verification.",
    result: "70% faster processing, 150% retention increase.",
    tech: ["LangChain", "Python", "GPT-4"]
  },
  {
    id: 2,
    title: "Automated Deal Analyzer",
    category: "Investment",
    challenge: "Analysis paralysis caused missed opportunities in fast-moving markets.",
    solution: "Computer vision enabled ARV calculator with risk assessment matrix.",
    result: "40% risk reduction in acquisitions.",
    tech: ["RAG", "Kafka", "Computer Vision"]
  },
  {
    id: 3,
    title: "Inventory Dashboard",
    category: "SaaS",
    challenge: "Data fragmentation led to poor visibility of asset performance.",
    solution: "Real-time visualization platform aggregating multiple data streams.",
    result: "10x scaling of managed assets.",
    tech: ["React", "Node.js", "D3.js"]
  },
  {
    id: 4,
    title: "Reputation Bot",
    category: "Marketing",
    challenge: "Negative sentiment was going unnoticed across fragmented social channels.",
    solution: "Aggregated chatbot system for instant review management and response.",
    result: "Significant engagement boost and brand protection.",
    tech: ["spaCy", "NLP", "Webhooks"]
  },
  {
    id: 5,
    title: "Mobile Property Tour",
    category: "Mobile",
    challenge: "Static images failed to convert remote buyers effectively.",
    solution: "Immersive mobile app experience with AI-guided tours.",
    result: "Higher conversion rates for unseen properties.",
    tech: ["Flutter", "Firebase", "Unity"]
  },
  {
    id: 6,
    title: "Secure Blockchain Contracts",
    category: "FinTech",
    challenge: "Contract tampering and slow closing times.",
    solution: "Zero-Knowledge Proof smart contracts for instant, secure closing.",
    result: "Immutable security and faster transaction times.",
    tech: ["Rust", "Solidity", "ZK-Rollups"]
  }
];

export const STATS: StatItem[] = [
  { label: "Services", value: "21", suffix: "+" },
  { label: "NPS Score", value: "93", suffix: "%" },
  { label: "Retention", value: "150", suffix: "%" },
  { label: "Projects", value: "100", suffix: "+" },
];

export const FAQS: FaqItem[] = [
  { question: "What agents do you build?", answer: "We build custom agents for lead gen, deal analysis, and operational workflows specifically for real estate." },
  { question: "What is the delivery speed?", answer: "Our agile 5x methodology allows us to ship prototypes in weeks, not months." },
  { question: "What are the costs?", answer: "Starter packages begin at $5K for setup. See our Pricing page for details." },
  { question: "What is your methodology?", answer: "We use daily stand-ups, deep-dive audits, and iterative sprints to ensure alignment." },
  { question: "How do you handle security?", answer: "We are SOC 2 and GDPR compliant, utilizing enterprise-grade encryption." },
  { question: "Do you offer support?", answer: "Yes, we offer ongoing maintenance retainers to keep your agents tuned and effective." },
  { question: "Which industries do you serve?", answer: "Our primary focus is Real Estate, PropTech, and Service-based businesses." },
  { question: "Do you have proofs of success?", answer: "Yes, we boast a 93% NPS and 150% client retention rate." },
  { question: "How does onboarding work?", answer: "It starts with a Virtual CTO audit to map your current infrastructure and opportunities." },
  { question: "Why choose ELEVOR AI?", answer: "We combine deep real estate domain expertise with cutting-edge autonomous agent technology." },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: "RAG for Property Comps", date: "Dec 12, 2025", category: "AI Tips", excerpt: "How Retrieval Augmented Generation is changing the way we value properties instantly." },
  { id: 2, title: "Agentic Workflows for Wholesaling", date: "Dec 10, 2025", category: "Real Estate Wins", excerpt: "Replacing manual VA teams with autonomous agents that never sleep." },
  { id: 3, title: "LLM vs. Traditional Programming", date: "Dec 4, 2025", category: "Tech Practices", excerpt: "Why probabilistic code is the future of complex decision making in business." },
];