---
title: "HireUltra"
kind: project
date: "2026-02-28"
excerpt: "I got tired of watching recruiters copy-paste LinkedIn profiles, so I built an AI sourcing tool — a three-tier search platform that takes a recruiter from blank sidebar to a ranked, scored candidate list in under 60 seconds."
tags: ["AI", "Python", "Streamlit", "Recruitment"]
liveUrl: "https://hireultra.streamlit.app"
repoUrl: "https://github.com/vinamrapandey/Hire-Ultra"
pdf: "hireultra.pdf"
---

If you've ever sat next to a recruiter for an afternoon, you've probably watched something painful: dozens of browser tabs, endless `site:linkedin.com` Google searches, and a spreadsheet that's one Ctrl+C away from chaos. Sourcing — the process of finding and shortlisting candidates before any actual outreach happens — eats **40–60% of a recruiter's time**, and almost none of it is standardized. Two recruiters given the same job description will often shortlist completely different people, not because one is wrong, but because there's no consistent method behind the search.

That gap is what led me to build **HireUltra**: an AI-powered candidate sourcing and scoring platform written in Python and Streamlit. Over about two months (January–February 2026), it grew from a single hardcoded API script into a three-tier search platform with its own scoring engine, JD parser, and a small suite of verification scripts to keep it honest. Here's how it works, why I made the decisions I made, and what broke along the way.

---

## The Problem: Sourcing Doesn't Scale

Three things make candidate sourcing miserable at scale:

- **Inconsistency** — every recruiter applies their own mental heuristics; there's no standardized scoring mechanism.
- **API access barriers** — LinkedIn simply doesn't offer public People Search API access. It's gated behind expensive enterprise partnerships most individuals and small teams will never qualify for.
- **Cost** — third-party ATS and recruiting platforms charge thousands of dollars a month for features that, underneath, are mostly search and pattern matching.

At the same time, there's a growing ecosystem of free and affordable search APIs, and Python + Streamlit make it trivial to spin up a working tool in days, not months. The hypothesis behind HireUltra was simple: if a tool can programmatically query the open web, extract profile data, match it against a job description, and rank candidates by relevance, it can meaningfully cut sourcing time — without an enterprise contract.

---

## What It Actually Looks Like

HireUltra uses a two-panel layout: a narrow sidebar for configuration, and a wide main panel for results. The sidebar flow is deliberately sequential — **Upload → Refine → Optimise → Execute** — which mirrors how a recruiter actually thinks through a search and prevents premature, half-configured queries.

![HireUltra dashboard](/journal/hireultra/dashboard.webp)
*The HireUltra dashboard: a three-section sidebar (JD Upload → Refine Criteria → Search Optimisation) alongside the main panel showing system status and a live search prompt.*

The star of the sidebar is the **Search Optimisation** dropdown — a three-tier mode selector that's really the architectural core of the whole project.

![Search Optimisation dropdown](/journal/hireultra/search-modes.webp)
*Three search tiers: Basic (DuckDuckGo, free), Intermediate (Serper API), and Advanced (LinkedIn API).*

A few small UI decisions did a lot of work here:

- **Conditional API key fields** — password-masked key inputs only appear when the relevant tier is selected, so free-tier users never see irrelevant fields.
- **Context-aware status badges** — green/info/warning banners tell you at a glance which mode you're in and what it costs.
- **CTA positioning** — the "Find Candidates" button sits below all three configuration sections, so you physically can't fire off a search before you've set your parameters.

---

## The Architecture: Three Tiers, One Interface

| Layer | Technology | Why |
|---|---|---|
| UI Framework | Streamlit | Python-native, rapid iteration, no frontend build step |
| Core Logic | Python 3.12 | Rich ecosystem, async support |
| Free Search | DuckDuckGo (DDGS) | Zero cost, no API key, public index access |
| Paid Search | Serper.dev API | Reliable Google proxying, clean JSON, fair pricing |
| Enterprise | LinkedIn API v2 | Industry source-of-truth for professional data |
| JD Parsing | PyPDF + Regex | Lightweight, deterministic, zero API cost |
| Data Layer | Pandas | Tabular manipulation, CSV export |

The codebase splits cleanly into two modules, plus a verification layer that lives outside the app entirely:

- **`scout.py` — the intelligence layer.** Every external API call, the scoring algorithm, and JD parsing live here: `search_candidates_duckduckgo()`, `search_candidates_google()`, `search_candidates_linkedin()`, `score_candidates()`, `parse_jd()`.
- **`app.py` — the presentation layer.** Streamlit UI, session state, sidebar config, and result rendering. It orchestrates calls into `scout.py` based on whatever tier the user picked.
- **Verification scripts — root level.** `debug_search.py`, `debug_search_v2.py`, `verify_serper.py`, `verify_failover.py`, and a `test_jd.txt` fixture — kept deliberately outside the app package so each layer can be tested from the command line, independent of the Streamlit runtime.

Why three tiers instead of one provider? Because not everyone has the same budget or access. A student building a portfolio project, a freelance recruiter, and an enterprise talent team have wildly different cost tolerances — a tiered architecture serves all three without forcing anyone into a paid API just to try the tool.

---

## Nine Phases, Nine Lessons

The most honest way to describe how HireUltra got built is phase by phase — because almost every phase was a direct response to something that broke or something that felt wrong in the previous version.

### Phase 1 — Initial Build: Serper API with a Hardcoded Key
The first version used Serper.dev exclusively, with a `SERPER_API_KEY` constant hardcoded directly into source. This is also where the core **X-Ray search pattern** was established — the Google dork that makes the whole thing work:

```
site:linkedin.com/in/ "Role" "Location" Skills
```

Hardcoding the key was a mistake I caught quickly: once a secret is committed to any repository, it's permanently exposed, full stop. It also meant the whole tool only worked for people willing to pay for Serper — a hard cost barrier baked into the architecture.

### Phase 2 — Removing Stale Imports
A leftover `from googlesearch import search as gsearch` from an earlier prototype was still sitting in the code, silently rotting. Python evaluates every top-level import at load time — whether or not it's ever called — so an unused import of an uninstalled package will crash the *entire app* on startup with a `ModuleNotFoundError`. It's a non-obvious failure mode that's easy to introduce and easy to miss until someone else clones your repo.

### Phase 3 — The Three-Tier Search Architecture
This is where the real design took shape. Three modes went in: **Basic** (DuckDuckGo, free), **Intermediate** (Serper, user-supplied key), **Advanced** (LinkedIn API v2, OAuth bearer token). The hardcoded key came out for good — keys are now collected at runtime through masked password inputs and held only in session memory.

### Phase 4 — Killing Subjective Seniority Labels
Early versions used a dropdown of "Junior / Mid-Level / Senior / Lead." The problem: those labels mean something different at every company. They got replaced with explicit year ranges — 0-1, 1-3, 3-5, 5-10, 10-15, 15+ years — which are unambiguous, feed cleanly into the search query, and actually match how job descriptions are written in the real world.

### Phase 5 — The "Judge" Algorithm
This is the scoring engine, and it's intentionally simple: `score_candidates()` tokenizes the required skills, scans each candidate's snippet for matches, and computes a percentage. Anything above 70% gets tagged **Top Match**, above 40% is **Potential**, and everything else is a likely **Mismatch** — sorted descending by score. A raw, unranked list of search results isn't actionable for a recruiter; a sorted, scored one is.

### Phase 6 — JD Auto-Parsing
`parse_jd()` accepts PDF or plain-text job descriptions, scans for 40+ common technical skills via regex word-boundary matching, and pulls a role title out of predictable headers (`Role|Title|Position`). I chose regex over an NLP approach deliberately — structured JDs use predictable formats, regex is deterministic and instant, and it doesn't add a cent of inference cost.

### Phase 7 — Debugging DuckDuckGo's Query Format
The free tier occasionally returned thin or empty result sets, and it wasn't obvious whether the query syntax or the provider itself was the problem. So I wrote `debug_search.py` and `debug_search_v2.py` — standalone scripts that hit `DDGS().text()` directly, outside the Streamlit runtime, looping through four different query phrasings (full X-Ray syntax, an unquoted variant, a reordered `site:` clause, and a bare keyword search) with a two-second delay between calls to avoid getting rate-limited mid-test. Isolating the search layer from the UI layer this way made it obvious very quickly which query shapes actually worked.

### Phase 8 — Building a Verification Layer
Manually re-testing every change through the full Streamlit UI is slow, and it doesn't tell you *which* layer broke. So I added `verify_serper.py` and `verify_failover.py`, plus a small `test_jd.txt` fixture. `verify_serper.py` runs `search_candidates_google()` end-to-end and pipes the result through `score_candidates()`, checking that `score` and `skills_found` land on the top result. `verify_failover.py` checks that the search entry point always returns a well-formed list, regardless of which provider answered. These are deliberately not a full pytest suite — for a two-month solo build, lightweight CLI scripts that catch data-shape regressions were the right amount of process, not too little, not too much.

### Phase 9 — Git History Rewrite & Repo Hygiene
The final phase was almost entirely cosmetic but mattered a lot for the project's life *after* the build: commit history was rewritten with `git filter-branch` to correctly attribute authorship, a `.gitignore` went in to exclude `__pycache__/`, and the repo was pushed clean to GitHub. Contribution graphs and code attribution depend entirely on commit authorship — get it wrong and none of the work registers as yours.

---

## Security, Honestly

A few decisions were made specifically to avoid embarrassing myself later:

- API keys are never hardcoded — they're collected at runtime and live only in Streamlit's session memory, never written to disk or logs.
- Compiled Python bytecode (`__pycache__/`) is excluded from version control via `.gitignore`, since it's machine-specific and shouldn't be tracked anyway.
- The verification scripts catch search/scoring regressions *before* they'd ever surface in the UI.

---

## What I'd Do Differently Next

No project this size ships without a list of things you already know you'll fix later:

- **Keyword-only scoring** is a blunt instrument. The plan is to bring in sentence-transformers for cosine-similarity scoring so matches reflect meaning, not just exact keyword overlap.
- **No persistent storage** — every search starts from zero. SQLite or Supabase would let the tool remember candidate history and cache searches.
- **DuckDuckGo rate limits** are a real constraint on the free tier; exponential backoff and rotating user agents are the next fix.
- **The verification layer is script-based, not automated** — migrating `debug_search.py` and the `verify_*.py` scripts into a real pytest suite with CI is the natural next step.
- **No auth or multi-user support** yet, which matters the moment this stops being a personal tool.

---

## The Actual Point

HireUltra isn't trying to replace a full ATS. What it demonstrates is narrower and, I think, more useful: that a tiered, zero-to-enterprise search architecture, a deterministic scoring layer, and a JD parser that costs nothing to run can get a recruiter from blank sidebar to a ranked, scored candidate list in **under 60 seconds** — with no manual query construction, and without a five-figure annual contract standing in the way.

The code is open source and MIT-friendly by nature of the stack — no vendor lock-in, no proprietary black box, just Python you can read top to bottom in an afternoon.

**Repository:** [github.com/vinamrapandey/Hire-Ultra](https://github.com/vinamrapandey/Hire-Ultra)
**Stack:** Python · Streamlit · Serper API · DuckDuckGo · LinkedIn API
**Author:** Vinamra Pandey
