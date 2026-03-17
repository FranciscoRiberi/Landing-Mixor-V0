import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProductShowcase } from "@/components/product-showcase";
import { AboutSection } from "@/components/about-section";
import { DistributorInfo } from "@/components/distributor-info";
import { OrderSection } from "@/components/order-section";
import { ContactSection } from "@/components/contact-section";
import { SocialSection } from "@/components/social-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
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
