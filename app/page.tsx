import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { NewArrivalsSection } from "@/components/new-arrivals-section";
import { ProductShowcase } from "@/components/product-showcase";
import { AboutSection } from "@/components/about-section";
import { DistributorInfo } from "@/components/distributor-info";
import { OrderSection } from "@/components/order-section";
import { ContactSection } from "@/components/contact-section";
import { SocialSection } from "@/components/social-section";
import { Footer } from "@/components/footer";
import { isMundialTheme } from "@/lib/theme";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation isMundial={isMundialTheme} />
      <HeroSection isMundial={isMundialTheme} />
      <NewArrivalsSection />
      <ProductShowcase />
      <AboutSection />
      <DistributorInfo />
      <OrderSection />
      <ContactSection />
      <SocialSection />
      <Footer />
    </main>
  );
}
