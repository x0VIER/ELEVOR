import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import {
  GradientSphere,
  TypewriterEffect,
  TiltCard,
  AnimatedCounter,
  ChromeButton,
  TextGlowHover,
} from "@/components/framer";
import {
  Zap,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bot,
  BarChart3,
  Workflow,
} from "lucide-react";

interface HomeProps {
  setPage: (page: string) => void;
  setCategory: (category: string) => void;
}

export default function Home({ setPage, setCategory }: HomeProps) {
  const { data: services } = trpc.services.list.useQuery();
  const { data: caseStudies } = trpc.caseStudies.list.useQuery({ category: "All" });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    setPage("Contact");
  };

  const handleViewServices = () => {
    setPage("Services");
  };

  const handleViewCaseStudies = () => {
    setPage("CaseStudies");
  };

  const handleViewLiveDashboard = () => {
    setPage("LiveDashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-sm font-medium text-primary">Enterprise AI Engineering</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Scale Operations with{" "}
                <TypewriterEffect
                  words={["Autonomous AI", "Smart Agents", "AI Automation", "Intelligent Workflows"]}
                  className="block"
                />
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We build custom AI workforces that integrate seamlessly into your existing stack,
                automating complex workflows to reduce costs and accelerate growth.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <ChromeButton onClick={handleGetStarted}>
                  Start Building
                  <ArrowRight className="w-5 h-5" />
                </ChromeButton>
                <ChromeButton onClick={handleViewLiveDashboard} variant="secondary">
                  <Sparkles className="w-5 h-5" />
                  View Live Dashboard
                </ChromeButton>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-5 h-5 text-primary glow-icon" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary glow-icon" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary glow-icon" />
                  <span>24/7 Global Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Gradient Sphere with Dashboard Preview */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <GradientSphere size={500}>
                {/* Mini Dashboard Preview */}
                <div className="dashboard-preview w-80 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">Live Operations</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400">Active</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Agents Running</p>
                      <p className="text-2xl font-bold text-white">247</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Tasks/Hour</p>
                      <p className="text-2xl font-bold text-white">1.2K</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 mb-2">Efficiency Gain</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[87%] bg-gradient-to-r from-primary to-secondary rounded-full" />
                      </div>
                      <span className="text-sm font-semibold text-white">87%</span>
                    </div>
                  </div>
                </div>
              </GradientSphere>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Deployments", value: 500, suffix: "+" },
              { label: "Cost Savings", value: 87, suffix: "%" },
              { label: "Automation Rate", value: 95, suffix: "%" },
              { label: "Client Satisfaction", value: 98, suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedCounter to={stat.value} suffix={stat.suffix} className="mb-2" />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets ELEVOR Apart */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">EXCEPTIONALITIES</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What sets <TextGlowHover>ELEVOR</TextGlowHover> apart
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Smarter, faster, and more adaptive than traditional AI solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Speed",
                description:
                  "Faster time-to-value with our enterprise AI solutions and AI agent marketplace.",
              },
              {
                icon: Bot,
                title: "Deep Capabilities",
                description:
                  "An agent platform with the depth to adapt to every interaction, workflow, behavior, and enterprise.",
              },
              {
                icon: Workflow,
                title: "Seamless Integration",
                description:
                  "Connect custom or pre-built connectors to your enterprise and third-party apps effortlessly.",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description:
                  "Monitor performance, track ROI, and optimize workflows with comprehensive dashboards.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 glow-blue">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gradient-to-b from-card to-background">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              All-in-one AI for <span className="gradient-text">enterprise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Simplify, accelerate, and transform with one connected AI ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services?.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard className="h-full">
                  <div>
                    <div className="text-4xl mb-4">{service.iconName}</div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {service.category}
                      </span>
                      <span className="text-muted-foreground">
                        {service.deployedCount}+ deployed
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <ChromeButton onClick={handleViewServices}>
              View All Services
              <ArrowRight className="w-5 h-5" />
            </ChromeButton>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Trusted by <span className="gradient-text">industry leaders</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proven outcomes shared by innovators across industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {caseStudies?.slice(0, 2).map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {study.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                    {study.tech}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{study.title}</h3>
                <p className="text-muted-foreground mb-6">{study.challenge}</p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm font-semibold text-primary mb-2">Result:</p>
                  <p className="text-muted-foreground">{study.result}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <ChromeButton onClick={handleViewCaseStudies}>
              View All Case Studies
              <ArrowRight className="w-5 h-5" />
            </ChromeButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">transform</span> your business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's make this happen. We're ready when you are.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <ChromeButton onClick={handleGetStarted}>
                Schedule a Call
                <ArrowRight className="w-5 h-5" />
              </ChromeButton>
              <ChromeButton onClick={() => setPage("About")} variant="secondary">
                Learn More About Us
              </ChromeButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
