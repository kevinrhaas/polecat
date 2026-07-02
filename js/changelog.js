// AUTO-GENERATED — do not edit by hand. Source: CHANGELOG.md.
// Regenerate with:  node scripts/gen-changelog.mjs
// Published changelog for the Polecat fleet manager at /js/changelog.js.
// Entries are newest-first; `ts` is an ISO-8601 UTC string.
export const CHANGELOG = [
  {
    v: 68,
    title: 'SEO: added robots.txt and sitemap.xml',
    ts: '2026-07-02T20:43:00.000Z',
    items: [
      'SEO: added robots.txt and sitemap.xml — search engines previously had no explicit crawl guidance or a discoverable list of pages, which can slow how quickly a new or updated site gets indexed. Both are now published at the site root, pointing crawlers at polecat.live and the sitemap.',
    ],
  },
  {
    v: 67,
    title: 'Accessibility + cleanup pass',
    ts: '2026-07-02T19:57:00.000Z',
    items: [
      'Accessibility + cleanup pass — added a visible keyboard-focus ring to every link and button on the page (previously relied on inconsistent browser defaults), sharpened the nav\'s "Open app" CTA to "Try it free" so the strongest conversion hook is visible before any scrolling, and removed ~50 lines of dead CSS left over from a retired carousel implementation.',
    ],
  },
  {
    v: 66,
    title: 'Copy fix: stale "Consensus tab" reference',
    ts: '2026-07-02T17:02:00.000Z',
    items: [
      'Copy fix: stale "Consensus tab" reference — the agreement-map section described the live strong/mixed/diverse badge as living in a "Consensus tab," but the app merged Models and Consensus into one Settings tab a while back, and this badge actually appears right on the answer itself. Reworded to match reality.',
    ],
  },
  {
    v: 65,
    title: 'Better link previews on X/Slack/Discord',
    ts: '2026-07-02T16:01:00.000Z',
    items: [
      'Better link previews on X/Slack/Discord — added Twitter Card meta tags and a canonical link, so sharing a polecat.live link now shows a proper large-image preview with title and description everywhere, not just on Facebook/LinkedIn (which already read Open Graph tags).',
    ],
  },
  {
    v: 64,
    title: 'Fix: anchor links no longer hide under the sticky nav',
    ts: '2026-07-02T14:02:00.000Z',
    items: [
      'Fix: anchor links no longer hide under the sticky nav — clicking "How it works," "Examples," or "Consensus" in the header used to scroll the target section partly behind the sticky nav bar. Sections now reserve space for it, so the heading you clicked is fully visible after the jump.',
    ],
  },
  {
    v: 63,
    title: 'App: iOS Home Screen nudge',
    ts: '2026-07-02T13:02:00.000Z',
    items: [
      'App: iOS Home Screen nudge — on iPhone/iPad, Polecat\'s sidebar now shows a one-time, dismissible reminder to add it to the Home Screen once you have keys or chats worth keeping — the fix for Safari silently clearing site data after about a week away. Tap "How?" for quick instructions; dismiss it and it won\'t reappear. Privacy section updated to mention it.',
    ],
  },
  {
    v: 62,
    title: 'New: "Polecat vs. a single-model chat" comparison table',
    ts: '2026-07-02T11:12:00.000Z',
    items: [
      'New: "Polecat vs. a single-model chat" comparison table — a plain, scannable table on the homepage lays out the difference next to a single chatbot: models per prompt, cross-checking, agreement map, bring-your-own-keys, where prompts go, and cost to try. Placed right after the agreement-map section, before "Seven providers." Footer updated.',
    ],
  },
  {
    v: 61,
    title: 'App: plain-language strategy names',
    ts: '2026-07-01T16:13:00.000Z',
    items: [
      'App: plain-language strategy names — Polecat\'s consensus strategies got clearer names to match the app: "Comprehensive" is now "Merge Everything," "Validated Synthesis" is "Fact-Checked Merge," "Debate & Synthesize" is "Debate & Merge," and "Sequential Refinement" is "Refine Together." The "Customizable consensus" section here is updated to match. Footer updated.',
    ],
  },
  {
    v: 60,
    title: 'App: installable as a PWA',
    ts: '2026-06-30T20:58:00.000Z',
    items: [
      'App: installable as a PWA — Polecat now ships a web app manifest and Apple meta tags, so it can be added to your Home Screen / installed from Chrome or Edge. Added a "📲 Installable" pill and a line to the Privacy section explaining why it matters: installed apps are exempt from iOS Safari\'s habit of quietly clearing site storage after about a week away, which is the main way people lose saved keys and chats. Footer updated.',
    ],
  },
  {
    v: 59,
    title: 'App: model roles',
    ts: '2026-06-30T17:09:00.000Z',
    items: [
      'App: model roles — Settings → Models now lets you reorder models with up/down arrows, set any model as the Arbiter directly from that screen, and optionally mark it "synthesis only" so it only combines the others\' answers without answering itself. Great for pairing free-tier answerers with a premium synthesizer. Footer updated.',
    ],
  },
  {
    v: 58,
    title: 'App: model race bar',
    ts: '2026-06-30T13:09:00.000Z',
    items: [
      'App: model race bar — the consensus footer now shows a compact horizontal bar with colored dots at relative positions revealing which model responded first and by how much, making the parallel-execution advantage instantly visible. Plus \'c\' keyboard shortcut to open the side-by-side compare modal, and inline expand panels now auto-scroll into view. Footer updated.',
    ],
  },
  {
    v: 57,
    title: 'App: number key tab shortcuts',
    ts: '2026-06-30T09:31:00.000Z',
    items: [
      'App: number key tab shortcuts — press 1-9 to jump to model tab 1-9, or 0 for the Consensus tab, from anywhere in the app. Also adds aria-controls/aria-labelledby/tabindex to complete the ARIA tablist pattern. Keyboard shortcuts panel (?) now has a Navigation section. Footer updated.',
    ],
  },
  {
    v: 56,
    title: 'App: stacked contribution bar',
    ts: '2026-06-30T05:43:00.000Z',
    items: [
      'App: stacked contribution bar — the "How this was formed" panel now shows a single horizontal bar split into colored segments, one per model, so you can see each model\'s share of the consensus at a glance. Hover a segment for model name and %; a legend below carries names and percentages so it\'s never color-only. Footer updated.',
    ],
  },
  {
    v: 55,
    title: 'App: draft auto-save',
    ts: '2026-06-30T01:27:00.000Z',
    items: [
      'App: draft auto-save — the composer now quietly saves whatever you are typing to your browser\'s local storage. If you close or refresh the tab mid-thought, your prompt is waiting when you come back. Cleared on send so stale text never shows up. Footer updated.',
    ],
  },
  {
    v: 54,
    title: 'App: edit prompt button',
    ts: '2026-06-29T21:00:00.000Z',
    items: [
      'App: edit prompt button — hover any message you sent and a pencil icon appears; click it to copy that prompt back to the composer so you can tweak and resend without retyping. Works in every tab including the consensus view. Footer updated.',
    ],
  },
  {
    v: 53,
    title: 'App: stop generation button',
    ts: '2026-06-29T17:23:00.000Z',
    items: [
      'App: stop generation button — a red Stop button now appears while models are streaming, replacing Send. Click it (or press Esc) to abort all in-flight requests; any text that already arrived is kept with a subtle "(stopped)" label. Footer updated.',
    ],
  },
  {
    v: 52,
    title: 'App: prompt history recall',
    ts: '2026-06-29T13:54:00.000Z',
    items: [
      'App: prompt history recall — press the up arrow key in the empty composer to load your last prompt; press again to go further back through up to 50 stored prompts. Down arrow moves forward; typing exits history mode. Mentioned in the keyboard shortcuts cheatsheet (?). Footer updated.',
    ],
  },
  {
    v: 51,
    title: 'App: model track record in Settings',
    ts: '2026-06-29T10:02:00.000Z',
    items: [
      'App: model track record in Settings — Polecat now quietly tracks each model\'s consensus contribution (stance + %) across sessions. After 3+ sessions, Settings → Models shows a subtle historical hint per model: "Usually aligns", "Often takes a distinct angle", or "Mixed" — with a tooltip giving the exact session count and avg contribution %. Zero extra API calls. Footer updated.',
    ],
  },
  {
    v: 50,
    title: 'App: expand model responses inline',
    ts: '2026-06-29T06:00:00.000Z',
    items: [
      'App: expand model responses inline — each card in "Responses at a glance" now has an expand button. Clicking it shows that model\'s full response in a panel right below the strip, so you can read any model\'s complete answer without switching tabs. Footer updated.',
    ],
  },
  {
    v: 49,
    title: 'App: "Ask about this" on disagreement points',
    ts: '2026-06-29T01:34:00.000Z',
    items: [
      'App: "Ask about this" on disagreement points — each specific disagreement point in the "How this was formed" agreement map panel now has an "Ask about this →" button. Clicking it pre-fills a rich follow-up naming exactly what each model said, so users can dig into any divergence in one click. Agreement map section updated.',
    ],
  },
  {
    v: 48,
    title: 'App: response speed bars',
    ts: '2026-06-28T23:49:00.000Z',
    items: [
      'App: response speed bars — each model card in "Responses at a glance" now shows a thin colored bar whose width represents that model\'s response time relative to the slowest model, making the multi-model race immediately visual. The consensus sources line also shows the response time range (e.g. 2.1s–8.9s), making the parallel-execution advantage tangible. Footer updated.',
    ],
  },
  {
    v: 47,
    title: 'App: live streaming previews',
    ts: '2026-06-28T22:46:00.000Z',
    items: [
      'App: live streaming previews — while models stream, the Consensus tab progress box now shows a one-line preview of each model\'s opening response in real time, so you can read what each AI is saying before synthesis even begins. Footer updated.',
    ],
  },
  {
    v: 46,
    title: 'App: format quick-actions on consensus',
    ts: '2026-06-28T21:48:00.000Z',
    items: [
      'App: format quick-actions on consensus — a "Format" strip below each consensus lets users reformat the answer instantly (Shorter, Bullet points, More detail, Simplify) without re-querying the models. Agreement map section updated to mention it.',
    ],
  },
  {
    v: 45,
    title: 'App: debate chips + clickable model names',
    ts: '2026-06-29T04:30:00.000Z',
    items: [
      'App: debate chips + clickable model names — when models disagreed with named positions, a "Debate:" follow-up chip pre-fills a targeted prompt quoting each model\'s stance so they engage with each other\'s reasoning. Model names in "Where they differed" now link to that model\'s full response tab. Agreement map section updated.',
    ],
  },
  {
    v: 44,
    title: 'App: contribution % in snapshot cards',
    ts: '2026-06-29T04:00:00.000Z',
    items: [
      'App: contribution % in snapshot cards — each model card in "Responses at a glance" now shows ~N% (estimated share of the consensus it shaped), colored in the model\'s brand color. Agreement map section updated to mention this.',
    ],
  },
  {
    v: 43,
    title: 'App: stance badges on model tabs',
    ts: '2026-06-29T03:00:00.000Z',
    items: [
      'App: stance badges on model tabs — after consensus, each model\'s tab now shows a small "aligned", "partial", or "outlier" badge under the model name, making the agreement picture visible at a glance in the tab bar without opening the details panel. Footer updated.',
    ],
  },
  {
    v: 42,
    title: 'App: mobile UX polish',
    ts: '2026-06-28T23:00:00.000Z',
    items: [
      'App: mobile UX polish — "Responses at a glance" now starts collapsed on mobile so follow-up actions are immediately visible without scrolling; follow-up chips scroll horizontally instead of wrapping. Agreement summary now appears right below the answer text for faster reading. Footer updated.',
    ],
  },
  {
    v: 41,
    title: 'App: snapshot card polish',
    ts: '2026-06-28T19:00:00.000Z',
    items: [
      'App: snapshot card polish — each model\'s "Responses at a glance" card now has a copy button to grab that model\'s full response without switching tabs. Follow-up chips and re-synthesis strip now appear before the "How this was formed" panel so the most actionable options are immediately visible. Collapsed toggle shows colored model dots. Updated Agreement map section to mention the copy button.',
    ],
  },
  {
    v: 40,
    title: 'App: accessibility & icon polish',
    ts: '2026-06-28T15:00:00.000Z',
    items: [
      'App: accessibility & icon polish — model response tabs now support ← / → keyboard navigation; proper ARIA tablist roles added throughout. All remaining unicode glyphs (◎, ✦, ✓, ⇄) replaced with SVG icons in the tab empty states, consensus sources label, provenance panel, and welcome slides. Footer updated.',
    ],
  },
  {
    v: 39,
    title: 'App: consensus insight sentence',
    ts: '2026-06-29T03:00:00.000Z',
    items: [
      'App: consensus insight sentence — after each consensus, a brief natural-language summary now appears before the detail panels ("All 3 models were in strong agreement" / "2 of 3 models agreed; GPT-4o had a contrasting perspective") — making the multi-model picture legible without expanding any panels. Zero extra API calls. Also replaced remaining unicode glyphs (✦, ◎) in empty states with proper SVG icons.',
      'Site: Agreement map section updated to mention the new consensus insight sentence.',
    ],
  },
  {
    v: 38,
    title: 'App: snapshot cards show each model\'s distinct take',
    ts: '2026-06-29T11:00:00.000Z',
    items: [
      'App: snapshot cards show each model\'s distinct take — the "Responses at a glance" cards now display a brief italic snippet of each model\'s specific disagreement point (from the arbiter\'s analysis), so you can see at a glance what made each model different without switching tabs. Cards are also now fully clickable. Footer updated.',
    ],
  },
  {
    v: 37,
    title: 'App: restored conversations now as rich as live ones',
    ts: '2026-06-29T07:00:00.000Z',
    items: [
      'App: restored conversations now as rich as live ones — model snapshot cards, follow-up chips, and "Try another synthesis" strip now appear on the most recent consensus when you resume a conversation from history. Footer updated.',
    ],
  },
  {
    v: 36,
    title: 'App: re-synthesize with any strategy',
    ts: '2026-06-29T05:00:00.000Z',
    items: [
      'App: re-synthesize with any strategy — after a consensus answer, a new "Try another synthesis" strip lets you instantly re-synthesize the same model responses (Comprehensive, Best Answer, Validated, Debate) without re-asking the models. Each approach produces a new consensus entry so you can compare strategies side by side. Unique to Polecat\'s multi-response architecture. Footer updated.',
    ],
  },
  {
    v: 35,
    title: 'App: history sidebar polish',
    ts: '2026-06-29T03:00:00.000Z',
    items: [
      'App: history sidebar polish — conversation history is now grouped by Today / Yesterday / This week / This month / Older (matching Claude/ChatGPT/Gemini). Each chat also shows tiny colored provider dots so you can see at a glance which models were used. Footer and CHANGELOG updated.',
    ],
  },
  {
    v: 34,
    title: 'App: tab title notifications',
    ts: '2026-06-29T01:00:00.000Z',
    items: [
      'App: tab title notifications — when you switch to another tab while models are responding, the browser tab counts up: "(2/3 answered) Polecat" → "(synthesizing…) Polecat" — then resets to normal when you come back. Unique to Polecat\'s multi-model nature.',
    ],
  },
  {
    v: 33,
    title: 'App: live agreement signal',
    ts: '2026-06-28T23:00:00.000Z',
    items: [
      'App: live agreement signal — a live "strong agreement / mixed views / divergent views" indicator now appears in the Consensus tab as each model finishes responding, updating in real time before synthesis even starts. Built from text-overlap analysis, zero extra model calls.',
      'App: smarter conversation titles — history sidebar titles now strip common question preambles ("What is", "How do", "Tell me about") so the title gets straight to the topic.',
    ],
  },
  {
    v: 32,
    title: 'App: Compare all responses',
    ts: '2026-06-28T21:00:00.000Z',
    items: [
      'App: Compare all responses — new grid-icon Compare button appears on every consensus answer. Opens a full-screen side-by-side view of all model responses in a responsive column grid (each independently scrollable). Makes Polecat\'s multi-model advantage tangible at a glance without clicking through tabs.',
    ],
  },
  {
    v: 31,
    title: 'App: stance badges + word counts on model cards',
    ts: '2026-06-28T19:00:00.000Z',
    items: [
      'App: stance badges + word counts on model cards — each model\'s preview card in "Responses at a glance" now shows its stance (aligned/partial/outlier) vs. the consensus and an approximate word count, making cross-model comparison instant. Outlier-aware follow-up chips now name the specific model that disagreed.',
      'Site: Agreement map section updated to describe stance badges and outlier-named follow-up chips.',
    ],
  },
  {
    v: 30,
    title: 'App: agreement badge + smarter provenance',
    ts: '2026-06-28T17:00:00.000Z',
    items: [
      'App: agreement badge + smarter provenance — the Consensus tab now shows a live "strong / mixed / diverse" badge after each synthesis so agreement is visible at a glance. When models diverged, the "How this was formed" panel opens automatically. Last remaining emoji in the sidebar replaced with SVG icons.',
      'Site: Agreement map section updated to describe the new tab badge and auto-expand behaviour.',
    ],
  },
  {
    v: 29,
    title: 'App polish',
    ts: '2026-06-27T23:00:00.000Z',
    items: [
      'App polish — the Send button now shows the model count ("Send to 3") instead of "Send to all", making the multi-model nature tangible at a glance. Toast notifications are now announced to screen readers (ARIA live region). Three new debate-friendly example questions added to the greeting chips (AI & future of work, remote vs. office productivity, most overrated tech).',
    ],
  },
  {
    v: 28,
    title: 'App: "Responses at a glance"',
    ts: '2026-06-27T22:15:00.000Z',
    items: [
      'App: "Responses at a glance" — after each consensus, a compact strip of per-model preview cards appears below the answer, showing each model\'s opening paragraph and response time. One tap jumps to the full reply. Makes cross-model comparison instant — no tab-switching required.',
    ],
  },
  {
    v: 27,
    title: 'Site: Polecat Model Server added to providers section',
    ts: '2026-06-27T21:30:00.000Z',
    items: [
      'Site: Polecat Model Server added to providers section — now listed as a first-party free provider alongside Claude, Gemini, ChatGPT, OpenRouter, Groq, and Hugging Face; provider count updated to 7.',
      'App: UI polish — status icons in the consensus progress screen are now animated SVG spinners; the provenance toggle uses consistent stroke chevrons; emoji replaced throughout with SVG icons.',
    ],
  },
  {
    v: 26,
    title: 'App: image context for text-only models',
    ts: '2026-06-27T20:42:00.000Z',
    items: [
      'App: image context for text-only models — non-vision models now receive a short note when the user attached an image they can\'t see, so they can ask for a text description rather than giving a confused non-answer.',
      'Timestamps in CT — app changelog and website footer now show Central Time (CT) on all "updated" stamps.',
    ],
  },
  {
    v: 25,
    title: 'App: custom system prompt',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: custom system prompt — set one system prompt in Settings → Models and it applies to all selected models at once (Claude, Gemini, ChatGPT — each via its native API field).',
    ],
  },
  {
    v: 24,
    title: 'App: smart follow-up suggestions',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: smart follow-up suggestions — after every consensus answer, 2–3 clickable follow-up chips appear, derived from the agreement map (disagreement points, notable claims). Clicking a chip fills the prompt instantly. Updated the Agreement map section on the website to mention this.',
    ],
  },
  {
    v: 23,
    title: 'App: keyboard shortcuts cheatsheet',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: keyboard shortcuts cheatsheet — press `?` to open a compact cheatsheet of all shortcuts; new `⌘,` / `Ctrl+,` opens Settings from anywhere. Shortcut button added to the sidebar footer.',
    ],
  },
  {
    v: 22,
    title: 'App: per-model regenerate',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: per-model regenerate — each model response now has a ↺ button so you can ask just that one model to try again, without re-running all the others. Streams in live; conversation history stays intact.',
    ],
  },
  {
    v: 21,
    title: 'App: first-run Consensus callout + demo handoff polish',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: first-run Consensus callout + demo handoff polish — after your first synthesized answer, a small tooltip appears below the Consensus tab explaining the model tabs; "Try it free" now animates the suggestion chips in with a staggered entrance.',
    ],
  },
  {
    v: 20,
    title: 'App: centered composer on empty state',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: centered composer on empty state — greeting and prompt box now sit together in the center of the screen (Gemini/ChatGPT style); composer docks to the bottom on the first send. Added changelog link to the hero note.',
    ],
  },
  {
    v: 19,
    title: 'App: copy thread as markdown',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: copy thread as markdown — a new document icon on every Consensus answer lets you copy the full exchange (question + each model\'s response + consensus) as clean markdown, ready to paste into Slack, Notion, docs, or email.',
    ],
  },
  {
    v: 18,
    title: 'App: shareable consensus links',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: shareable consensus links — new Share button on every Consensus answer. Click it to copy a URL that encodes the full question, each model\'s response, and the consensus — no server, no storage, 100% in the URL. Updated the Agreement map section to mention sharing.',
    ],
  },
  {
    v: 17,
    title: 'App: warm mascot greeting',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: warm mascot greeting — the empty state now shows the animated Polecat mascot logo instead of a plain ✦ glyph, plus a cleaner subtitle that explains the cross-model consensus story. Added README.md to the app repo.',
    ],
  },
  {
    v: 16,
    title: 'App overlay polish',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App overlay polish — the welcome tour, export dialog, and image lightbox in the app no longer render blurred on first open in Safari and some Chromium browsers. A subtle visual fix completing the settings/chrome polish epic.',
    ],
  },
  {
    v: 15,
    title: 'Synced "Arbitration" → "Consensus" rename from the app',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'Synced "Arbitration" → "Consensus" rename from the app — nav link, section heading, flow diagram label, and screenshot alt text updated throughout. The settings tab in the app is now called "Consensus" (clearer for new users), and the website now matches.',
    ],
  },
  {
    v: 14,
    title: 'App icon polish',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App icon polish — the app\'s entire UI now uses a consistent set of clean SVG stroke icons in place of emoji (sidebar, welcome tour, vision marks, key/cost help, demo card). No functional change, but a noticeably more polished, cohesive feel. Updated footer timestamp.',
    ],
  },
  {
    v: 13,
    title: 'Privacy section updated',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Privacy section updated: the app now shows an explicit "Read in your browser — nothing is uploaded" note whenever any document is attached. Updated the Privacy section of the website to match: added a sentence and updated the pill text to reflect that attached files (PDFs, docs, images) never leave the browser.',
    ],
  },
  {
    v: 12,
    title: 'Native PDF support in the app',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Native PDF support in the app — PDFs attached to Claude or Gemini are now sent as native document blocks (full fidelity, not just extracted text). Updated the Privacy pill to reflect this. Text extraction remains the universal fallback for all other providers.',
    ],
  },
  {
    v: 11,
    title: 'File context budgeting in the app',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'File context budgeting in the app — extracted text from attached files now shares a 60k-character budget across all files; each block is labelled with type metadata ("PowerPoint, 24 slides") so every model understands the document; the UI shows how much budget is used and warns when it\'s nearly full.',
    ],
  },
  {
    v: 10,
    title: 'Office document support in the app',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Office document support in the app — updated the Privacy section pill to reflect that Word (.docx), Excel (.xlsx), and PowerPoint (.pptx) files are now extracted in-browser alongside PDFs, with zero upload.',
    ],
  },
  {
    v: 9,
    title: 'PDF & file attachments',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'PDF & file attachments now mentioned in the Privacy section — text is extracted entirely in-browser (no upload), reinforcing Polecat\'s privacy story.',
    ],
  },
  {
    v: 8,
    title: 'Fixed the examples carousel for real.',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Fixed the examples carousel for real. The root cause behind the last several "fixes" was that the entire `#cases` section used curly/smart quotes (`”`, `’`) as HTML attribute delimiters — `class=”pcx”` instead of `class="pcx"` — so browsers never applied any `.pcx` styles and the section rendered as a wall of raw text. Replaced all 246 smart quotes with straight ASCII quotes (typographic entities in the copy left intact) and verified the styled cards render via a headless browser.',
    ],
  },
  {
    v: 7,
    title: 'Examples carousel: replaced the JS-driven card slider with the verified no-JS, CSP-proof static scroll-snap carousel from `website/examples-carousel.html`',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Examples carousel: replaced the JS-driven card slider with the verified no-JS, CSP-proof static scroll-snap carousel from `website/examples-carousel.html` — all 6 cards render immediately without JavaScript.',
    ],
  },
  {
    v: 6,
    title: 'Re-applied the verified examples carousel: removed the outer `.band` wrapper that was conflicting with the component\'s self-contained styles, and replaced with the exact `<section class="pcx">` block from `website/examples-carousel.html` (the screenshot-verified drop-in). Cards, carousel navigation, and consensus rows now render correctly.',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Re-applied the verified examples carousel: removed the outer `.band` wrapper that was conflicting with the component\'s self-contained styles, and replaced with the exact `<section class="pcx">` block from `website/examples-carousel.html` (the screenshot-verified drop-in). Cards, carousel navigation, and consensus rows now render correctly.',
    ],
  },
  {
    v: 5,
    title: 'Replaced the examples section with the fully self-contained, verified `.pcx-*` carousel component',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Replaced the examples section with the fully self-contained, verified `.pcx-*` carousel component — guaranteed to render as styled cards on any browser.',
    ],
  },
  {
    v: 4,
    title: 'Fixed the examples carousel: each card now has a proper background (`--surface`) so the layout is a clean, uniform card, not raw text. Removed hardcoded "Six real queries sent through Polecat." copy; the section now leads cleanly with just the headline and the agree/diverge line.',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Fixed the examples carousel: each card now has a proper background (`--surface`) so the layout is a clean, uniform card, not raw text. Removed hardcoded "Six real queries sent through Polecat." copy; the section now leads cleanly with just the headline and the agree/diverge line.',
    ],
  },
  {
    v: 3,
    title: 'Replaced hand-crafted case studies with a real example carousel',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Replaced hand-crafted case studies with a real example carousel — 6 curated prompts (cooking, history, music, coding, travel, sports) sourced from actual Polecat runs, auto-rotating, swipeable on mobile, pauses on hover, respects reduced-motion.',
      'Removed the old "baking soda" and "compound interest" standalone examples; cooking example is now the first carousel card.',
      'Updated the Agreement map section to mention inline source-attribution highlighting (new in the app).',
    ],
  },
  {
    v: 2,
    title: 'Enhanced the Agreement map section to mirror the now-live "How this was formed" interactive panel in the app: added the collapsible header mockup, per-model stance badges (aligned / partial), a "Strong agreement" badge, and a direct CTA to try it live.',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Enhanced the Agreement map section to mirror the now-live "How this was formed" interactive panel in the app: added the collapsible header mockup, per-model stance badges (aligned / partial), a "Strong agreement" badge, and a direct CTA to try it live.',
      'Added a "✨ now live" callout on the section kicker.',
      'Updated footer with inline changelog link.',
    ],
  },
  {
    v: 1,
    title: 'Added an Agreement map section showing Polecat\'s signature: how much each model shaped the answer and where they agreed vs split',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Added an Agreement map section showing Polecat\'s signature: how much each model shaped the answer and where they agreed vs split — the cross-model advantage made visible.',
      'Hero now leads with a "Try it free — no key needed" call-to-action, surfacing the keyless demo (run a real model instantly, no signup) alongside the bring-your-own-keys mix.',
      'Added a Changelog link and a "Last updated" stamp in the footer.',
    ],
  },
];
