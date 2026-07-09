---
title: "Mimries"
kind: project
date: "2025-12-01"
excerpt: "An edge-native platform for instant, branded guest galleries at live events — no app download required, guests submit via WhatsApp or direct upload."
tags: ["Web", "Cloudflare", "Edge", "Next.js"]
liveUrl: "https://mimries.com"
repoUrl: ""
pdf: ""
---

**Mimries** gives event hosts a shared, curated photo experience without forcing
guests through an app install. Guests submit photos via WhatsApp or a direct
upload link, an admin curates them, and the gallery updates live.

It's built entirely on Cloudflare's edge — Workers with Hono.js, D1 for data, and
R2 for media — with Supabase handling auth, a Next.js admin portal, and a
lightweight vanilla-JS guest app. It supports both English and Hindi, and has
been validated through a live production deployment.
