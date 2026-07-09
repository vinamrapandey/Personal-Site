import Link from "next/link";

// TODO: confirm these before launch — placeholders pending real profile URLs.
const SOCIALS = {
  email: "mailto:vinamrapandey22@gmail.com",
  linkedin: "#",
  github: "#",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-dark px-6 pb-10 pt-16 text-canvas sm:px-10">
      <div className="mx-auto w-full max-w-content">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Sitemap
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Elsewhere
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={SOCIALS.email}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Resume
            </h3>
            <a
              href={`${basePath}/resume.pdf`}
              download
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              Download résumé ↓
            </a>
            <p className="mt-6 text-xs text-white/40">
              Based in India · Open to remote
            </p>
          </div>
        </div>

        <div className="pt-10">
          <p className="font-display text-[15vw] font-semibold leading-none tracking-tight text-white sm:text-[10rem]">
            Vinamra
            <br />
            Pandey.
          </p>
        </div>

        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} Vinamra Pandey. Built with Next.js,
          Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
