# Changelog

What's new on the Polecat landing site.

## 2026-06-30 00:43 CT (56)
- **App: stacked contribution bar** — the "How this was formed" panel now shows a single horizontal bar split into colored segments, one per model, so you can see each model's share of the consensus at a glance. Hover a segment for model name and %; a legend below carries names and percentages so it's never color-only. Footer updated.

## 2026-06-29 20:27 CT (55)
- **App: draft auto-save** — the composer now quietly saves whatever you are typing to your browser's local storage. If you close or refresh the tab mid-thought, your prompt is waiting when you come back. Cleared on send so stale text never shows up. Footer updated.

## 2026-06-29 16:00 CT (54)
- **App: edit prompt button** — hover any message you sent and a pencil icon appears; click it to copy that prompt back to the composer so you can tweak and resend without retyping. Works in every tab including the consensus view. Footer updated.

## 2026-06-29 12:23 CT (53)
- **App: stop generation button** — a red Stop button now appears while models are streaming, replacing Send. Click it (or press Esc) to abort all in-flight requests; any text that already arrived is kept with a subtle "(stopped)" label. Footer updated.

## 2026-06-29 08:54 CT (52)
- **App: prompt history recall** — press the up arrow key in the empty composer to load your last prompt; press again to go further back through up to 50 stored prompts. Down arrow moves forward; typing exits history mode. Mentioned in the keyboard shortcuts cheatsheet (?). Footer updated.

## 2026-06-29 05:02 CT (51)
- **App: model track record in Settings** — Polecat now quietly tracks each model's consensus contribution (stance + %) across sessions. After 3+ sessions, Settings → Models shows a subtle historical hint per model: "Usually aligns", "Often takes a distinct angle", or "Mixed" — with a tooltip giving the exact session count and avg contribution %. Zero extra API calls. Footer updated.

## 2026-06-29 01:00 CT (50)
- **App: expand model responses inline** — each card in "Responses at a glance" now has an expand button. Clicking it shows that model's full response in a panel right below the strip, so you can read any model's complete answer without switching tabs. Footer updated.

## 2026-06-28 20:34 CT (49)
- **App: "Ask about this" on disagreement points** — each specific disagreement point in the "How this was formed" agreement map panel now has an "Ask about this →" button. Clicking it pre-fills a rich follow-up naming exactly what each model said, so users can dig into any divergence in one click. Agreement map section updated.

## 2026-06-28 18:49 CT (48)
- **App: response speed bars** — each model card in "Responses at a glance" now shows a thin colored bar whose width represents that model's response time relative to the slowest model, making the multi-model race immediately visual. The consensus sources line also shows the response time range (e.g. 2.1s–8.9s), making the parallel-execution advantage tangible. Footer updated.

## 2026-06-28 17:46 CT (47)
- **App: live streaming previews** — while models stream, the Consensus tab progress box now shows a one-line preview of each model's opening response in real time, so you can read what each AI is saying before synthesis even begins. Footer updated.

## 2026-06-28 16:48 CT (46)
- **App: format quick-actions on consensus** — a "Format" strip below each consensus lets users reformat the answer instantly (Shorter, Bullet points, More detail, Simplify) without re-querying the models. Agreement map section updated to mention it.

## 2026-06-28 23:30 CT (45)
- **App: debate chips + clickable model names** — when models disagreed with named positions, a "Debate:" follow-up chip pre-fills a targeted prompt quoting each model's stance so they engage with each other's reasoning. Model names in "Where they differed" now link to that model's full response tab. Agreement map section updated.

## 2026-06-28 23:00 CT (44)
- **App: contribution % in snapshot cards** — each model card in "Responses at a glance" now shows ~N% (estimated share of the consensus it shaped), colored in the model's brand color. Agreement map section updated to mention this.

## 2026-06-28 22:00 CT (43)
- **App: stance badges on model tabs** — after consensus, each model's tab now shows a small "aligned", "partial", or "outlier" badge under the model name, making the agreement picture visible at a glance in the tab bar without opening the details panel. Footer updated.

## 2026-06-28 18:00 CT (42)
- **App: mobile UX polish** — "Responses at a glance" now starts collapsed on mobile so follow-up actions are immediately visible without scrolling; follow-up chips scroll horizontally instead of wrapping. Agreement summary now appears right below the answer text for faster reading. Footer updated.

## 2026-06-28 14:00 CT (41)
- **App: snapshot card polish** — each model's "Responses at a glance" card now has a copy button to grab that model's full response without switching tabs. Follow-up chips and re-synthesis strip now appear before the "How this was formed" panel so the most actionable options are immediately visible. Collapsed toggle shows colored model dots. Updated Agreement map section to mention the copy button.

## 2026-06-28 10:00 CT (40)
- **App: accessibility & icon polish** — model response tabs now support ← / → keyboard navigation; proper ARIA tablist roles added throughout. All remaining unicode glyphs (◎, ✦, ✓, ⇄) replaced with SVG icons in the tab empty states, consensus sources label, provenance panel, and welcome slides. Footer updated.

## 2026-06-28 22:00 CT (39)
- **App: consensus insight sentence** — after each consensus, a brief natural-language summary now appears before the detail panels ("All 3 models were in strong agreement" / "2 of 3 models agreed; GPT-4o had a contrasting perspective") — making the multi-model picture legible without expanding any panels. Zero extra API calls. Also replaced remaining unicode glyphs (✦, ◎) in empty states with proper SVG icons.
- **Site: Agreement map section updated** to mention the new consensus insight sentence.

## 2026-06-29 06:00 CT (38)
- **App: snapshot cards show each model's distinct take** — the "Responses at a glance" cards now display a brief italic snippet of each model's specific disagreement point (from the arbiter's analysis), so you can see at a glance what made each model different without switching tabs. Cards are also now fully clickable. Footer updated.

## 2026-06-29 02:00 CT (37)
- **App: restored conversations now as rich as live ones** — model snapshot cards, follow-up chips, and "Try another synthesis" strip now appear on the most recent consensus when you resume a conversation from history. Footer updated.

## 2026-06-29 00:00 CT (36)
- **App: re-synthesize with any strategy** — after a consensus answer, a new "Try another synthesis" strip lets you instantly re-synthesize the same model responses (Comprehensive, Best Answer, Validated, Debate) without re-asking the models. Each approach produces a new consensus entry so you can compare strategies side by side. Unique to Polecat's multi-response architecture. Footer updated.

## 2026-06-28 22:00 CT (35)
- **App: history sidebar polish** — conversation history is now grouped by Today / Yesterday / This week / This month / Older (matching Claude/ChatGPT/Gemini). Each chat also shows tiny colored provider dots so you can see at a glance which models were used. Footer and CHANGELOG updated.

## 2026-06-28 20:00 CT (34)
- **App: tab title notifications** — when you switch to another tab while models are responding, the browser tab counts up: "(2/3 answered) Polecat" → "(synthesizing…) Polecat" — then resets to normal when you come back. Unique to Polecat's multi-model nature.

## 2026-06-28 18:00 CT (33)
- **App: live agreement signal** — a live "strong agreement / mixed views / divergent views" indicator now appears in the Consensus tab as each model finishes responding, updating in real time before synthesis even starts. Built from text-overlap analysis, zero extra model calls.
- **App: smarter conversation titles** — history sidebar titles now strip common question preambles ("What is", "How do", "Tell me about") so the title gets straight to the topic.

## 2026-06-28 16:00 CT (32)
- **App: Compare all responses** — new grid-icon Compare button appears on every consensus answer. Opens a full-screen side-by-side view of all model responses in a responsive column grid (each independently scrollable). Makes Polecat's multi-model advantage tangible at a glance without clicking through tabs.

## 2026-06-28 14:00 CT (31)
- **App: stance badges + word counts on model cards** — each model's preview card in "Responses at a glance" now shows its stance (aligned/partial/outlier) vs. the consensus and an approximate word count, making cross-model comparison instant. Outlier-aware follow-up chips now name the specific model that disagreed.
- **Site: Agreement map section updated** to describe stance badges and outlier-named follow-up chips.

## 2026-06-28 12:00 CT (30)
- **App: agreement badge + smarter provenance** — the Consensus tab now shows a live "strong / mixed / diverse" badge after each synthesis so agreement is visible at a glance. When models diverged, the "How this was formed" panel opens automatically. Last remaining emoji in the sidebar replaced with SVG icons.
- **Site: Agreement map section updated** to describe the new tab badge and auto-expand behaviour.

## 2026-06-27 18:00 CT (29)
- **App polish** — the Send button now shows the model count ("Send to 3") instead of "Send to all", making the multi-model nature tangible at a glance. Toast notifications are now announced to screen readers (ARIA live region). Three new debate-friendly example questions added to the greeting chips (AI & future of work, remote vs. office productivity, most overrated tech).

## 2026-06-27 17:15 CT (28)
- **App: "Responses at a glance"** — after each consensus, a compact strip of per-model preview cards appears below the answer, showing each model's opening paragraph and response time. One tap jumps to the full reply. Makes cross-model comparison instant — no tab-switching required.

## 2026-06-27 16:30 CT (27)
- **Site: Polecat Model Server added to providers section** — now listed as a first-party free provider alongside Claude, Gemini, ChatGPT, OpenRouter, Groq, and Hugging Face; provider count updated to 7.
- **App: UI polish** — status icons in the consensus progress screen are now animated SVG spinners; the provenance toggle uses consistent stroke chevrons; emoji replaced throughout with SVG icons.

## 2026-06-27 15:42 CT (26)
- **App: image context for text-only models** — non-vision models now receive a short note when the user attached an image they can't see, so they can ask for a text description rather than giving a confused non-answer.
- **Timestamps in CT** — app changelog and website footer now show Central Time (CT) on all "updated" stamps.

## 2026-06-27 (25)
- **App: custom system prompt** — set one system prompt in Settings → Models and it applies to all selected models at once (Claude, Gemini, ChatGPT — each via its native API field).

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
