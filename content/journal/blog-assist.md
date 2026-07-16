---
title: "Blog Assist"
kind: project
date: "2026-07-15"
excerpt: "A weekend Streamlit script for auto-posting to WordPress, grown into a self-hosted, multi-tenant blogging agent that researches, writes, and publishes on autopilot — and learns your writing style from feedback."
tags: ["AI", "FastAPI", "Automation", "WordPress"]
liveUrl: "https://blogassist.vinamra.dev"
repoUrl: "https://github.com/vinamrapandey/Blog-Assist"
pdf: "blog-assist.pdf"
---

![BlogAssist landing page](/journal/blog-assist/hero.webp)
*BlogAssist landing page*

---

## Content creation doesn't scale by itself

Writing high-quality, SEO-optimized blog posts consistently takes real time, effort, and domain expertise — and it's the first thing that gets dropped when an agency or a solo founder gets busy. The obvious digital shortcuts don't quite fit the job either.

**Raw LLMs** are powerful, but they hand you a wall of text. Someone still has to copy it, format it, and log into WordPress to upload it — every single time. **Heavy SaaS writers**, on the other hand, come with bloated dashboards, recurring subscriptions, and your content and credentials living on someone else's server instead of yours.

BlogAssist Pro starts from a different premise: **configure it once, and let it run forever in the background.** It keeps the workflow a blogger already trusts — drafting, editing, WordPress publishing — but removes the subscription, the manual babysitting, and the learning curve. It's self-hosted, so your API keys, your WordPress credentials, and your generated content never leave your own database. And it's built for zero daily touch: set a topic and an interval — anywhere from once a minute (for testing) to once a week — and the agent takes it from there.

---

## A self-hosted engine built for hands-free content

BlogAssist Pro pairs a decoupled FastAPI backend with a Vanilla JS + Tailwind frontend around one goal: generate, review, and publish blog content without anyone sitting at a keyboard.

The dashboard is the command center — a total-posts counter, a Weekly Activity chart of real published posts, a pulse-animated "Auto-Pilot Active" badge with a live countdown to the next run, and four agent controls: Start Auto, Stop Auto, Preview Draft, and Instant Publish.

![BlogAssist dashboard with weekly activity chart and agent controls](/journal/blog-assist/dashboard.webp)
*BlogAssist dashboard with weekly activity chart and agent controls*

Everything else lives behind a real settings screen — AI provider and API key, WordPress URL/user/app-password, topic, word count, a schedule anywhere from 1 minute to 168 hours, post status, and even a Google Analytics ID. Every field is validated live, against both the LLM provider and the WordPress REST API, before it's saved.

![BlogAssist settings screen](/journal/blog-assist/settings.webp)
*BlogAssist settings screen*

And because a background agent is only trustworthy if you can see what it's doing, there's a live, scrolling Activity Log — every generation cycle, every WordPress publish, every start and stop, timestamped and polled in real time.

![BlogAssist activity log terminal feed](/journal/blog-assist/activity.webp)
*BlogAssist activity log terminal feed*

### How it compares

| Feature | BlogAssist Pro | Manual WordPress | SaaS AI Writers |
|---|---|---|---|
| Fully Autonomous | **Yes** | No | Rarely |
| Data Ownership | Local / Self-hosted | Yes | Cloud Vendor |
| Background Scheduling | Yes (APScheduler) | No | Varies |
| Learns Your Style | Yes (Feedback → Rule) | N/A | Rarely |
| Multi-User Ready | Yes (JWT accounts) | No | Yes |

---

## From a personal script to a multi-tenant product

The original build proved the concept for one user, on one machine. The current codebase turns that into an actual product surface — accounts, a real landing page, and a feedback loop the agent can learn from.

- **Accounts & Multi-Tenancy** — JWT-based login and registration (OAuth2 password flow, bcrypt hashing). Every `Config`, `Log`, `Post`, and `StyleGuideline` row is scoped to a `user_id`, and each user's scheduler job runs under its own namespaced job ID (`auto_post_{user_id}`), so one server can safely run many agents in parallel.
- **Guided Onboarding** — a three-step wizard (Connect your AI → Connect WordPress → Define Strategy) replaces a blank settings page for first-time users, with credentials validated live before the account is marked ready.
- **Style Feedback Loop** — critiquing a draft doesn't just rewrite it. The same call asks the model to extract one generalized, under-15-word style rule, which is stored and silently re-injected into every future prompt.
- **Public Landing Page** — a proper marketing front door sitting in front of the authenticated app, in the same orange-and-black visual language as the dashboard.

Multi-tenant support was on the "Next" list in the original roadmap. It's now shipped: the scheduler, the database models, and the auth layer were all rebuilt around `user_id` as a first-class citizen rather than bolted on afterward.

---

## Four calls that shaped the architecture

**1. Decoupled FastAPI + Vanilla JS over Streamlit.** The first version was a Streamlit script; it proved the idea but couldn't run true background jobs. Every screen now talks to a REST API instead. Trading React/Vue for plain HTML/JS was deliberate — zero build step, instant iteration.

**2. APScheduler with thread-safe DB sessions.** Background loops crash easily on detached SQLAlchemy instances. Config values are extracted into plain variables before they're closed over by the scheduler thread, and a FastAPI startup hook re-arms any agent that was mid-run when the server restarted.

**3. Zero-plugin WordPress auth.** Instead of shipping a custom WP plugin, the agent authenticates with native WordPress Application Passwords over Basic Auth — one less moving part to install, update, or break.

**4. Prompt-injected style memory over fine-tuning.** Rather than fine-tuning a model per user, feedback is distilled by the LLM itself into a short rule and stored as plain rows. Every future prompt replays the accumulated rules — personalization with no training cost.

---

## Watching the agent learn

The two screens that make BlogAssist feel less like a script and more like a collaborator: a reviewable draft, and a growing memory of how you like things written.

Every draft opens in an editable Preview & Critique modal — the title and body are directly editable, quick-critique chips ("More Professional," "More Casual," "Shorter Sentences," "More Lists") sit next to a free-text box, and two buttons close the loop: **Rewrite & Learn** or **Approve & Publish**.

![Preview and Critique modal with editable draft and feedback panel](/journal/blog-assist/preview_critique.webp)
*Preview and Critique modal with editable draft and feedback panel*

Whatever gets typed into that feedback box doesn't just reshape the current draft — it gets distilled into a permanent rule. In one real run, a single round of feedback ("more casual, more lists") was enough for the agent to permanently learn: *"Use short sentences, a casual tone, and frequent bulleted lists."* That rule now lives in the AI Brain screen — a running, deletable list of everything the agent has picked up from feedback — and gets silently re-injected into every generation from that point forward.

![AI Brain screen showing a learned style rule](/journal/blog-assist/ai_brain.webp)
*AI Brain screen showing a learned style rule*

---

## From agent to a live WordPress post

The full loop, closed: the agent runs on its schedule, the post lands in WordPress with the right status, and it renders on the live site — no manual copy-paste anywhere in between.

![WordPress posts list showing 4 posts published autonomously](/journal/blog-assist/wp_posts.webp)
*WordPress posts list showing 4 posts published autonomously*

![Live published blog post, mid-article, with real headings and bullet lists](/journal/blog-assist/wp_blog_mid.webp)
*Live published blog post, mid-article, with real headings and bullet lists*

*"Beyond the Cloud: Why Edge Computing is the Next Frontier for Enterprise Technology"* — drafted, formatted with real headings and bullet lists, and pushed live to `jumbledstep.s3-tastewp.com` entirely by the scheduled agent.

---

## The build story

The project's fix log reads like a running journal — one issue, one status, one action per entry — the exact record an agentic coding tool leaves behind while working through a punch list.

| Phase | Milestone | Status |
|---|---|---|
| 1 | Streamlit MVP — basic LLM → WordPress connectivity | ✅ Done |
| 2 | FastAPI migration — Vanilla JS frontend with Tailwind | ✅ Done |
| 3 | Scheduling hardening — APScheduler + DetachedInstanceError fix | ✅ Done |
| 4 | UI overhaul — countdown timers, Auto-Pilot active states | ✅ Done |
| 5 | Multi-tenant + AI Brain — JWT accounts, onboarding, feedback loop, landing page | ✅ Done |
| Next | Image generation + advanced SEO | 🕓 Planned |

**By the numbers:** 5 DB models (User, Config, Log, Post, Guidelines) · 10 configurable settings · 4 agent controls · 24/7 autonomous runtime · a 1-minute-to-168-hour schedule range · 2 LLM providers plus a Simulated mode for testing without burning API credits.

---

## Built with real agentic help, end to end

This project leaned on agentic coding tools for both implementation and debugging, while every product decision traced back to a concrete workflow need.

**Human — ideation & product decisions.** Choosing WordPress Application Passwords over a plugin, decoupling from Streamlit, adding a "fire and forget" countdown timer, and later — rebuilding the whole thing around accounts — all came from the builder's own workflow, not a template.

**AI — implementation, via Google Antigravity.** Google's agentic IDE handled the architectural migration: writing the FastAPI backend, styling the Vanilla JS frontend, diagnosing SQLAlchemy `DetachedInstanceError`s from raw log traces, and later implementing the JWT auth layer and the feedback-to-rule extraction logic.

What it excelled at: refactoring a monolithic Streamlit script into a decoupled, multi-tenant API architecture; diagnosing specific ORM threading bugs from log traces and fixing them directly; translating UI requirements into working Vanilla JS logic — the live countdown timer, the contenteditable draft preview, the polling activity log; and handling Git operations, `.gitignore` hygiene, and clean, incremental commits autonomously.

**What's next:** auto-attaching DALL·E or Midjourney feature images to every post, and auto-generated meta descriptions, tags, and internal linking between posts.

---

## Closing thought

BlogAssist Pro is a working answer to a specific problem — built, hardened, and now running on autopilot.

**Links:** [blogassist.vinamra.dev](https://blogassist.vinamra.dev) · [github.com/vinamrapandey/Blog-Assist](https://github.com/vinamrapandey/Blog-Assist) · MIT License · [vinamra.dev](https://vinamra.dev)
