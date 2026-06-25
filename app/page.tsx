import { About } from "@/components/portfolio/about"
import { Contact } from "@/components/portfolio/contact"
import { Hero } from "@/components/portfolio/hero"
import { SiteNav } from "@/components/portfolio/site-nav"
import { Stack } from "@/components/portfolio/stack"
import { Work } from "@/components/portfolio/work"

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
    </>
  )
}
