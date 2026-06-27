import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PainPointsSection from './components/PainPointsSection';
import ServicesSection from './components/ServicesSection';
import HowItWorks from './components/HowItWorks';
import DifferentialsSection from './components/DifferentialsSection';
import AuthoritySection from './components/AuthoritySection';
import AboutSection from './components/AboutSection';
import CoverageSection from './components/CoverageSection';
import FAQSection from './components/FAQSection';
import CTAFinal from './components/CTAFinal';
import ContactSection from './components/ContactSection';
import PrivacySection from './components/PrivacySection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ExitIntentPopup from './components/ExitIntentPopup';
import BackToTop from './components/BackToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <HeroSection />

        {/* Transição: hero escuro → PainPoints branco gelo */}
        <div className="h-20 bg-gradient-to-b from-[#0F172A] to-background" aria-hidden="true" />
        <PainPointsSection />

        <ServicesSection />

        {/* Transição: azul claro → branco puro */}
        <div className="h-12 bg-gradient-to-b from-primary-light to-white" aria-hidden="true" />
        <HowItWorks />

        {/* Transição: branco puro → azul escuro */}
        <div className="h-16 bg-gradient-to-b from-white to-text-primary" aria-hidden="true" />
        <DifferentialsSection />

        {/* Transição: azul escuro → branco gelo */}
        <div className="h-16 bg-gradient-to-b from-text-primary to-background" aria-hidden="true" />
        <AuthoritySection />

        <AboutSection />
        <CoverageSection />

        {/* Transição: azul institucional → branco gelo */}
        <div className="h-12 bg-gradient-to-b from-primary to-background" aria-hidden="true" />
        <FAQSection />

        {/* Transição: branco gelo → azul muito escuro */}
        <div className="h-16 bg-gradient-to-b from-background to-text-primary" aria-hidden="true" />
        <CTAFinal />

        {/* Transição: azul muito escuro → branco puro */}
        <div className="h-16 bg-gradient-to-b from-text-primary to-white" aria-hidden="true" />
        <ContactSection />
        <PrivacySection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ExitIntentPopup />
      <BackToTop />
    </div>
  );
}