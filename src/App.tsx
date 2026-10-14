import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StateInauguration } from './components/StateInauguration';
import { AboutSAF } from './components/AboutSAF';
import { CafeSection } from './components/CafeSection';
import { NurserySection } from './components/NurserySection';
import { FarmExperience } from './components/FarmExperience';
import { GallerySection } from './components/GallerySection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { CartDrawer } from './components/CartDrawer';
import { VisitPlannerModal } from './components/VisitPlannerModal';
import { GalleryModal } from './components/GalleryModal';
import { LoginModal } from './components/LoginModal';
import { EmbeddedPortal } from './components/EmbeddedPortal';

const AppContent: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [view, setView] = useState<'home' | 'portal'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('saf_portal_authenticated') === 'true';
  });

  // Handle URL query ?view=portal or path /portal on initial mount and popstate
  useEffect(() => {
    const checkUrlView = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isPortalParam = searchParams.get('view') === 'portal';
      const isPortalPath = window.location.pathname.startsWith('/portal');

      if (isPortalParam || isPortalPath) {
        if (localStorage.getItem('saf_portal_authenticated') === 'true') {
          setView('portal');
          setIsAuthenticated(true);
        } else {
          setIsLoginOpen(true);
          setView('home');
        }
      } else {
        setView('home');
      }
    };

    checkUrlView();
    window.addEventListener('popstate', checkUrlView);
    return () => window.removeEventListener('popstate', checkUrlView);
  }, []);

  const handleOpenGallery = (idx: number) => {
    setGalleryIndex(idx);
    setGalleryOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setView('portal');
    window.history.pushState({ view: 'portal' }, '', '/?view=portal');
  };

  const handleBackToHome = () => {
    setView('home');
    window.history.pushState({ view: 'home' }, '', '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('saf_portal_authenticated');
    localStorage.removeItem('saf_portal_user');
    localStorage.removeItem('saf_portal_login_time');
    setIsAuthenticated(false);
    setView('home');
    window.history.pushState({ view: 'home' }, '', '/');
  };

  const handleOpenPortalFromNav = () => {
    setView('portal');
    window.history.pushState({ view: 'portal' }, '', '/?view=portal');
  };

  // If user is viewing the embedded management portal
  if (view === 'portal') {
    return (
      <>
        <EmbeddedPortal 
          onBackToHome={handleBackToHome} 
          onLogout={handleLogout} 
        />
        <LoginModal 
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Top Navbar */}
      <Navbar 
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        isAuthenticated={isAuthenticated}
        onOpenPortal={handleOpenPortalFromNav}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero 
          onOpenBooking={() => setIsBookingOpen(true)} 
          onOpenGallery={handleOpenGallery} 
        />

        {/* State Inauguration by TYT Yang di-Pertua Negeri Melaka */}
        <div id="inauguration">
          <StateInauguration 
            onOpenGallery={handleOpenGallery}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </div>

        {/* 4 Pillars from Official Signboard */}
        <AboutSAF 
          onOpenBooking={() => setIsBookingOpen(true)} 
          onOpenGallery={handleOpenGallery} 
        />

        {/* Legasi Coffee Menu & Interactive Ordering */}
        <CafeSection 
          onOpenGallery={handleOpenGallery} 
        />

        {/* Nursery & Organic Soil Inventory */}
        <NurserySection 
          onOpenGallery={handleOpenGallery} 
          onOpenBooking={() => setIsBookingOpen(true)} 
        />

        {/* Farm Ambience & Visitor Experience (Buggy, Pavilion, Workshops) */}
        <FarmExperience 
          onOpenBooking={() => setIsBookingOpen(true)} 
          onOpenGallery={handleOpenGallery} 
        />

        {/* Authentic Photo Gallery (12 Photos) */}
        <GallerySection 
          onOpenGallery={handleOpenGallery} 
        />

        {/* Location, Hours & Contact */}
        <ContactLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Floating Actions (WhatsApp & Cart) */}
      <FloatingActions />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Visit Booking Modal */}
      <VisitPlannerModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      {/* Staff & Admin Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Lightbox Gallery Modal */}
      <GalleryModal
        isOpen={galleryOpen}
        currentIndex={galleryIndex}
        onClose={() => setGalleryOpen(false)}
        onNavigate={(idx) => setGalleryIndex(idx)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
