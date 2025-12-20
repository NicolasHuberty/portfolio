import Link from "next/link"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const Navbar = () => {
  return (
    <header className="fixed top-0 z-[100] w-full py-4 lg:py-5">
      <div className="container max-w-5xl mx-auto px-6">
        <nav className="rounded-full border border-slate-800 bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Name as logo */}
            <Link href="/" className="text-white font-semibold text-lg tracking-tight">
              Nicolas Huberty
            </Link>

            {/* Navigation links */}
            <ul className="hidden gap-8 lg:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
