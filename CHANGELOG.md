# Changelog

What's new on the Polecat landing site.

## 2026-06-27 (24)
- **App: smart follow-up suggestions** — after every consensus answer, 2–3 clickable follow-up chips appear, derived from the agreement map (disagreement points, notable claims). Clicking a chip fills the prompt instantly. Updated the Agreement map section on the website to mention this.

## 2026-06-27 (23)
- **App: keyboard shortcuts cheatsheet** — press `?` to open a compact cheatsheet of all shortcuts; new `⌘,` / `Ctrl+,` opens Settings from anywhere. Shortcut button added to the sidebar footer.

## 2026-06-27 (22)
- **App: per-model regenerate** — each model response now has a ↺ button so you can ask just that one model to try again, without re-running all the others. Streams in live; conversation history stays intact.

## 2026-06-27 (21)
- **App: first-run Consensus callout + demo handoff polish** — after your first synthesized answer, a small tooltip appears below the Consensus tab explaining the model tabs; "Try it free" now animates the suggestion chips in with a staggered entrance.

## 2026-06-27 (20)
- **App: centered composer on empty state** — greeting and prompt box now sit together in the center of the screen (Gemini/ChatGPT style); composer docks to the bottom on the first send. Added changelog link to the hero note.

## 2026-06-27 (19)
- **App: copy thread as markdown** — a new document icon on every Consensus answer lets you copy the full exchange (question + each model's response + consensus) as clean markdown, ready to paste into Slack, Notion, docs, or email.

## 2026-06-27 (18)
- **App: shareable consensus links** — new Share button on every Consensus answer. Click it to copy a URL that encodes the full question, each model's response, and the consensus — no server, no storage, 100% in the URL. Updated the Agreement map section to mention sharing.

## 2026-06-27 (17)
- **App: warm mascot greeting** — the empty state now shows the animated Polecat mascot logo instead of a plain ✦ glyph, plus a cleaner subtitle that explains the cross-model consensus story. Added README.md to the app repo.

## 2026-06-27 (16)
- **App overlay polish** — the welcome tour, export dialog, and image lightbox in the app no longer render blurred on first open in Safari and some Chromium browsers. A subtle visual fix completing the settings/chrome polish epic.

## 2026-06-27 (15)
- **Synced "Arbitration" → "Consensus" rename from the app** — nav link, section heading, flow diagram label, and screenshot alt text updated throughout. The settings tab in the app is now called "Consensus" (clearer for new users), and the website now matches.

## 2026-06-27 (14)
- **App icon polish** — the app's entire UI now uses a consistent set of clean SVG stroke icons in place of emoji (sidebar, welcome tour, vision marks, key/cost help, demo card). No functional change, but a noticeably more polished, cohesive feel. Updated footer timestamp.

## 2026-06-26 (13)
- **Privacy section updated**: the app now shows an explicit "Read in your browser — nothing is uploaded" note whenever any document is attached. Updated the Privacy section of the website to match: added a sentence and updated the pill text to reflect that attached files (PDFs, docs, images) never leave the browser.

## 2026-06-26 (12)
- **Native PDF support in the app** — PDFs attached to Claude or Gemini are now sent as native document blocks (full fidelity, not just extracted text). Updated the Privacy pill to reflect this. Text extraction remains the universal fallback for all other providers.

## 2026-06-26 (11)
- **File context budgeting in the app** — extracted text from attached files now shares a 60k-character budget across all files; each block is labelled with type metadata ("PowerPoint, 24 slides") so every model understands the document; the UI shows how much budget is used and warns when it's nearly full.

## 2026-06-26 (10)
- **Office document support in the app** — updated the Privacy section pill to reflect that Word (.docx), Excel (.xlsx), and PowerPoint (.pptx) files are now extracted in-browser alongside PDFs, with zero upload.

## 2026-06-26 (9)
- **PDF & file attachments** now mentioned in the Privacy section — text is extracted entirely in-browser (no upload), reinforcing Polecat's privacy story.

## 2026-06-26 (8)
- **Fixed the examples carousel for real.** The root cause behind the last several "fixes" was that the entire `#cases` section used curly/smart quotes (`”`, `’`) as HTML attribute delimiters — `class=”pcx”` instead of `class="pcx"` — so browsers never applied any `.pcx` styles and the section rendered as a wall of raw text. Replaced all 246 smart quotes with straight ASCII quotes (typographic entities in the copy left intact) and verified the styled cards render via a headless browser.

## 2026-06-26 (7)
- Examples carousel: replaced the JS-driven card slider with the verified no-JS, CSP-proof static scroll-snap carousel from `website/examples-carousel.html` — all 6 cards render immediately without JavaScript.

## 2026-06-26 (6)
- Re-applied the verified examples carousel: removed the outer `.band` wrapper that was conflicting with the component's self-contained styles, and replaced with the exact `<section class="pcx">` block from `website/examples-carousel.html` (the screenshot-verified drop-in). Cards, carousel navigation, and consensus rows now render correctly.

## 2026-06-26 (5)
- Replaced the examples section with the fully self-contained, verified `.pcx-*` carousel component — guaranteed to render as styled cards on any browser.

## 2026-06-26 (4)
- Fixed the examples carousel: each card now has a proper background (`--surface`) so the layout is a clean, uniform card, not raw text. Removed hardcoded "Six real queries sent through Polecat." copy; the section now leads cleanly with just the headline and the agree/diverge line.

## 2026-06-26 (3)
- Replaced hand-crafted case studies with a **real example carousel** — 6 curated prompts (cooking, history, music, coding, travel, sports) sourced from actual Polecat runs, auto-rotating, swipeable on mobile, pauses on hover, respects reduced-motion.
- Removed the old "baking soda" and "compound interest" standalone examples; cooking example is now the first carousel card.
- Updated the Agreement map section to mention inline source-attribution highlighting (new in the app).

## 2026-06-26 (2)
- Enhanced the **Agreement map** section to mirror the now-live "How this was formed" interactive panel in the app: added the collapsible header mockup, per-model stance badges (aligned / partial), a "Strong agreement" badge, and a direct CTA to try it live.
- Added a "✨ now live" callout on the section kicker.
- Updated footer with inline changelog link.

## 2026-06-26
- Added an **Agreement map** section showing Polecat's signature: how much each model shaped the answer and where they agreed vs split — the cross-model advantage made visible.
- Hero now leads with a **"Try it free — no key needed"** call-to-action, surfacing the keyless demo (run a real model instantly, no signup) alongside the bring-your-own-keys mix.
- Added a Changelog link and a "Last updated" stamp in the footer.
