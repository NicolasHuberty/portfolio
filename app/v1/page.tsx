"use client"

import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { ShiftingContent } from "@/components/shifting-content"

export default function V1Home() {
  return (
    <>
      <HeroSection />
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
