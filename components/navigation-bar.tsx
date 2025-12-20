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
      <div className="container mx-auto max-w-5xl px-6">
        <nav className="rounded-full border border-slate-800 bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Name as logo */}
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Nicolas Huberty
            </Link>

            {/* Navigation links */}
            <ul className="hidden gap-8 lg:flex">
              {navLinks.map(link => (
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
              className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 sm:inline-flex"
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
