import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { ArrowUp } from 'lucide-react';

// Import migrated components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import CaseStudies from './pages/CaseStudies';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import LiveDashboard from './pages/LiveDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [targetServiceId, setTargetServiceId] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on page change, unless we are targeting a specific service
  useEffect(() => {
    if (!targetServiceId) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, targetServiceId]);

  // Handle scroll visibility for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (page !== 'CaseStudies' && page !== 'Blog') {
      setSelectedCategory('All');
    }
    // Clear target if navigating away or generally changing pages without a specific target
    if (page !== 'Services') {
      setTargetServiceId(null);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('CaseStudies');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home': 
        return <Home setPage={handlePageChange} setCategory={handleCategoryChange} />;
      case 'Services': 
        return <Services setPage={handlePageChange} targetId={targetServiceId} clearTarget={() => setTargetServiceId(null)} />;
      case 'Portfolio': 
        return <Portfolio />; // Legacy route
      case 'CaseStudies': 
        return <CaseStudies initialCategory={selectedCategory} setPage={handlePageChange} />;
      case 'Blog': 
        return <CaseStudies initialCategory="Blog" setPage={handlePageChange} />;
      case 'Pricing': 
        return <Pricing setPage={handlePageChange} />;
      case 'About': 
        return <About setPage={handlePageChange} />;
      case 'Contact': 
        return <Contact />;
      case 'Admin':
        return <Admin />;
      case 'LiveDashboard':
        return <LiveDashboard />;
      default: 
        return <Home setPage={handlePageChange} setCategory={handleCategoryChange} />;
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen bg-background text-foreground font-sans flex flex-col relative">
            <Header setPage={handlePageChange} currentPage={currentPage} setTargetServiceId={setTargetServiceId} />
            <main className="flex-grow">
              {renderPage()}
            </main>
            <Footer setPage={handlePageChange} setTargetServiceId={setTargetServiceId} />

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
              }`}
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} />
            </button>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
