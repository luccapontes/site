---
title: "Currículo AI"
year: 2026
type: mix
description: "Web platform that automates LinkedIn resume screening with AI — HR teams register openings, upload PDFs and get Claude-generated evaluations straight in the UI."
tech: ["next.js", "typescript", "firebase", "python", "anthropic", "cloud run"]
github: "https://github.com/luccapontes/curriculo_ai"
featured: true
lang: en
---

## About the project

Internal SaaS for HR teams that receive dozens of resumes per opening from LinkedIn. The platform removes the manual screening step: the recruiter registers the role with criteria, uploads PDFs, and the AI returns structured evaluations with a score and justification for each candidate.

## Architecture

- **Frontend + API:** Next.js 14 (App Router) with TypeScript and Tailwind
- **Auth + Database + Storage:** Firebase (Authentication, Firestore, Cloud Storage)
- **Processing queue:** Cloud Tasks (up to 5 retries per resume)
- **Extraction worker:** Python + Flask + pdfplumber, isolated in its own service
- **AI:** Anthropic API with `claude-sonnet-4` and prompt caching to drop per-resume cost
- **Infra:** Cloud Run (scale-to-zero) + Cloud Build on push to `main`

## Technical decisions

- **Separate worker** from Next.js because PDF parsing is CPU-bound and memory-heavy — needs to scale independently
- **Anthropic prompt caching** to reuse the job description across many resumes for the same opening
- **SHA-256 hash** of the PDF before parsing to dedupe candidates who submit the same file to different openings
- **Schema validation** of the AI response before writing to Firestore — fails gracefully if the model returns invalid JSON
