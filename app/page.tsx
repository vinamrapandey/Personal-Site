import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import LogoMarquee from "@/components/LogoMarquee";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const CONTACT_EMAIL = "vinamrapandey22@gmail.com";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <StatsBar />
        </Reveal>
        <LogoMarquee />
        <Reveal>
          <WorkGrid />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Process />
        </Reveal>

        {/* Dark contact section */}
        <section id="contact" className="px-4 py-12 sm:px-6">
          <div className="mx-auto w-full max-w-content rounded-[2rem] bg-dark p-8 text-canvas sm:p-14">
            <p className="text-center font-accent text-xl italic text-white/60">
              Contact
            </p>
            <h2 className="mt-2 text-center font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Get in touch
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/60">
              Open to product, brand, vibe coding, and AI consulting work. Tell
              me a little about what you&apos;re building.
            </p>

            <div className="mx-auto mt-10 max-w-xl">
              <ContactForm />
            </div>

            <div className="mx-auto mt-6 grid max-w-xl gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "Let's book a call",
                )}`}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-white/30"
              >
                <span className="text-sm">
                  <span className="block text-white/50">Talk to me</span>
                  <span className="font-medium">Book a call</span>
                </span>
                <span
                  aria-hidden
                  className="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white px-5 py-4 text-ink transition-opacity hover:opacity-90"
              >
                <span className="text-sm">
                  <span className="block text-ink/50">Email me</span>
                  <span className="font-medium">{CONTACT_EMAIL}</span>
                </span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
