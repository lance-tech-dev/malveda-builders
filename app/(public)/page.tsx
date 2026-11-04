import HomeHero from "@/components/home-hero";
import AboutSection from "@/components/home/about-section";
import ServicesSection from "@/components/home/services-section";
import ProjectsSection from "@/components/home/projects-section";
import ContactSection from "@/components/home/contact-section";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <HomeHero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
