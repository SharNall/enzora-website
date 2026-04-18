import { AboutSection } from "@/components/landing/about-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FooterSection } from "@/components/landing/footer-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { Navbar } from "@/components/landing/navbar";
import { OrderSection } from "@/components/landing/order-section";
import { ProductShowcaseSection } from "@/components/landing/product-showcase-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f8ff] via-[#ffffff] to-[#f5f8ff] text-slate-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ProductShowcaseSection />
      <OrderSection />
      <FooterSection />
    </main>
  );
}
