import React from 'react';
import Header from '../components/ui/Header';
import HeroSection from '../components/ui/HeroSection';
import FeaturesSection from '../components/ui/FeaturesSection';
import AboutSection from '../components/ui/AboutSection';
import EligibilitySection from '../components/ui/EligibilitySection';
import ApplicationProcess from '../components/ui/ApplicationProcess';
import ImportantDates from '../components/ui/ImportantDates';
import CTASection from '../components/ui/CTASection';
// import Footer from '../components/ui/Footer';

const PMInternshipPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <EligibilitySection />
      <ApplicationProcess />
      <ImportantDates />
      <CTASection />
      {/* <Footer /> */}
    </div>
  );
};

export default PMInternshipPage;