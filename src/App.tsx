import React, { useState } from 'react';
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

const AppContent: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleOpenGallery = (idx: number) => {
    setGalleryIndex(idx);
    setGalleryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Top Navbar */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

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
