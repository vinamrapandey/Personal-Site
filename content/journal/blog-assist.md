---
title: "Blog Assist"
kind: project
date: "2026-02-08"
excerpt: "An autonomous agent that researches, writes, and publishes blog content on a schedule — with dual-LLM support and direct WordPress publishing."
tags: ["AI", "Python", "Streamlit", "Automation"]
liveUrl: "https://blogassist.streamlit.app"
repoUrl: "https://github.com/vinamrapandey/Blog-Assist"
pdf: ""
---

**Blog Assist** is an autonomous content agent that researches, drafts, and
publishes blog posts on a schedule — removing the hours content teams burn on
research and first drafts.

It runs a multi-threaded scheduler independent of Streamlit's rerun cycle, so
scheduled jobs keep firing regardless of UI state, and supports both Gemini and
OpenAI as interchangeable generation backends. Finished posts publish straight
to WordPress through its REST API. In production it reached 100+ daily active
users.
