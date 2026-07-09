---
title: "Preschool Hub"
kind: project
date: "2026-06-07"
excerpt: "A multi-tenant school management platform for preschools and daycares — five roles, one Flutter codebase, each school an isolated white-labeled tenant on shared Firebase infrastructure."
tags: ["Mobile", "Flutter", "Firebase", "Multi-tenant SaaS"]
liveUrl: ""
repoUrl: "https://github.com/vinamrapandey/PreSchool_Hub"
pdf: ""
---

**Preschool Hub** is a multi-tenant school management platform for preschools
and daycare centers. It replaces the WhatsApp groups and paper diaries most
schools still rely on with a single, structured record of a child's day —
attendance, activities, meals, naps, and notices — shared between schools,
teachers, and parents.

It's built as **one Flutter codebase** serving five distinct roles (Parent,
Teacher, Admin, Management, and a developer-only Super Admin) across Android,
iOS, and Web. Each school is an **isolated, white-labeled tenant** on shared
Firebase infrastructure: every Firestore document is scoped by `schoolId`, and
entering a school code at login re-themes the entire UI — logo and colors — in
real time, with no separate builds.

Role-based routing is handled entirely through `go_router` redirect guards,
privileged operations (like creating staff accounts) run server-side through
Cloud Functions, and India's **DPDP Act 2023** consent flow is built directly
into the first-login experience. Designed, architected, and shipped solo —
including learning Flutter from scratch during the build.
