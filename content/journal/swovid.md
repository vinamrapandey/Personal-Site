---
title: "SwoVid"
kind: project
date: "2026-05-28"
excerpt: "An AI content authenticity platform that detects whether images and videos are AI-generated or human-made — ambient, in your browser, across every major provenance standard at once."
tags: ["AI", "Chrome extension", "C2PA", "TypeScript"]
liveUrl: ""
repoUrl: "https://github.com/vinamrapandey/SwoVid"
pdf: ""
---

**SwoVid** (from Sanskrit *Swopajna* — created by one's own; *Videshiya* —
foreign) is an AI content authenticity platform. It detects whether images,
videos, documents, and text are AI-generated or human-created, and it does it
where you actually encounter content — in the browser, ambiently, with zero
manual action.

Rather than relying on a single detector, SwoVid reads every major open
provenance standard simultaneously: **C2PA** cryptographic content credentials
(the highest-certainty signal), **IPTC / EXIF** metadata, invisible watermarks
(**Stable Signature** from Stability AI and **Video Seal** from Meta AI), and a
proprietary fine-tuned detection model exported to **ONNX** to run in-browser,
in the extension, and on-device with no server dependency.

Every verdict is one of five honest states with a confidence level — *Verified
Human*, *Verified AI*, *Likely AI*, *Possibly AI*, or *Unverifiable* — rather
than a misleading binary. The product ships as a Chrome extension, a web app,
and a mobile app from a single **Turborepo** monorepo, all sharing one
`DetectionOrchestrator` abstraction so any detection layer can be swapped or
added without touching application code.

Built solo — architecture, detection-stack research, UI/UX, and go-to-market.
