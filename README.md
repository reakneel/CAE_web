# CAE Web — ReakNeel Professional Site

A static-first personal engineering site for **CAE / computational engineering / software architecture / automation**.

The repository is intentionally designed so the website is not dependent on a runtime server. The public site is generated from versioned Markdown and deployed to GitHub Pages.

## Architecture

```text
content/posts/*.md
       │
       ▼
 scripts/build-content.mjs
       │
       ▼
 src/data/generated.ts
       │
       ▼
 React + Vite static build
       │
       ├── GitHub Pages (primary)
       └── recovery branch (disaster snapshot)
```

### Content-first publishing

Write or update a Markdown file under `content/posts/`:

```yaml
---
title: "My New Engineering Note"
date: "2026-09-13"
category: "CAE"
tags: ["Simulation", "Automation"]
author: "ReakNeel"
featured: false
---

Your article...
```

Then push to `main`. GitHub Actions regenerates the content index, builds the static site, and deploys it. **No database and no server-side blog runtime are required.**

## Local development

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Type check:

```bash
npm run lint
```

## GitHub Pages

The `Deploy CAE Web` workflow builds the Vite application and publishes `dist/` through GitHub Pages. The project-site base path is configured as `/CAE_web/` in CI.

In repository settings, enable Pages with **GitHub Actions** as the source if it has not already been selected.

Primary URL:

`https://reakneel.github.io/CAE_web/`

## Disaster recovery

The `CAE Web Disaster Backup` workflow maintains a separate `recovery` branch containing the latest static source snapshot. It runs on every push to `main`, nightly, and manually.

Recovery procedure:

1. Stop publishing from the compromised `main` branch.
2. Inspect the latest `recovery` snapshot and `recovery/manifest.txt`.
3. Restore `main` from a known-good recovery commit, or create a fresh deployment from the recovery branch.
4. Re-enable the Pages workflow after verification.

### Recommended second-level access

A branch inside the same repository protects against accidental breakage and gives a fast rollback path, but it is **not independent infrastructure**. For true isolation, mirror the built `dist/` output to a second Git repository or an external static host using a deploy token stored as a GitHub Actions secret. That secondary host should be treated as the emergency read-only endpoint.

The important separation is:

```text
Primary:  GitHub Pages / main
              │
              ├── source + history
              └── automated build

Recovery: recovery branch
              │
              └── known-good static source snapshot

Isolated DR (recommended next step):
              │
              └── separate repo / external static host
```

## Design direction

The visual system is intentionally restrained and technical: editorial typography, warm neutral surfaces, strong grid lines, generous whitespace, compact metadata, responsive reading, and a dark mode. The site is a **professional engineering archive**, not a generic template blog.

## Security posture

- No API keys are required by the public static build.
- No server runtime is exposed by GitHub Pages.
- Content is version-controlled and reproducible.
- CI creates recovery snapshots automatically.
- The recommended isolated backup keeps recovery independent from the primary deployment.
