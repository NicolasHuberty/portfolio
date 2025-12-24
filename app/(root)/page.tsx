"use client"

import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { ShiftingContent } from "@/components/shifting-content"
import WelcomePopup from "@/components/welcome-popup"

export default function Home() {
  return (
    <>
      {/* Welcome popup */}
      <WelcomePopup />

      {/* Hero section - always full-width */}
      <HeroSection />

      {/* Content after hero - shifts when sidebar appears */}
      <ShiftingContent>
        <ServicesSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </ShiftingContent>
    </>
  )
}
