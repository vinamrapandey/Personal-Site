"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24"
    >
      {/* Aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute left-1/2 top-[-6rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[90px]" />
        <div
          className="animate-aurora absolute right-[8%] top-[2rem] h-[20rem] w-[20rem] rounded-full bg-[#5B6CFF]/20 blur-[90px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="animate-aurora absolute left-[10%] top-[6rem] h-[18rem] w-[18rem] rounded-full bg-[#12B3A6]/15 blur-[90px]"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
          Available — open for new work
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        >
          <span className="text-muted">Seven products.</span>{" "}
          <span className="text-ink">One person.</span>{" "}
          <span className="text-muted">Every</span>{" "}
          <span className="text-ink">layer.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base text-muted sm:text-lg"
        >
          Product manager, brand strategist, AI consultant, and full-stack
          builder. I take AI products from blueprint to shipped — alone.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
          >
            Get in touch
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href="#work"
            className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30"
          >
            See the work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
