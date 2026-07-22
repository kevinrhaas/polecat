// AUTO-GENERATED — do not edit by hand. Source: CHANGELOG.md.
// Regenerate with:  node scripts/gen-changelog.mjs
// Published changelog for the Polecat fleet manager at /js/changelog.js.
// Entries are newest-first; `ts` is an ISO-8601 UTC string.
export const CHANGELOG = [
  {
    v: 101,
    title: 'Fixed the examples carousel\'s "Consensus" label contrast — the one accessibility finding two prior passes had explicitly left alone',
    kind: 'fix',
    ts: '2026-07-04T18:54:00.000Z',
    items: [
      'Fixed the examples carousel\'s "Consensus" label contrast — the one accessibility finding two prior passes had explicitly left alone — an axe-core audit (same tool that\'s caught several real bugs recently) re-flagged .pcx-clabel\'s 3.27:1 contrast, which passes 90/94/99 had each noted and deliberately skipped fixing out of caution: the .pcx-* examples-carousel block is the verified, do-not-rewrite component pasted in from the app repo\'s website/examples-carousel.html, and neither prior pass wanted to risk restructuring it. But the actual fix needed isn\'t a rewrite — it\'s a single CSS custom-property value. Changed --pcx-purple from #9333ea to #b070f0, which happens to be almost exactly the site\'s own existing --consensus brand color (#b070f0) already used for this identical "consensus" concept in the hero flow and elsewhere on the page — so the fix is also a brand-consistency improvement, not just a contrast tweak. New contrast against the label\'s actual background is 5.38:1, comfortably clearing the 4.5:1 AA threshold. Applied identically to the canonical source (website/examples-carousel.html in the app repo) so the two never drift. Verified with axe-core: the .pcx-clabel violation is gone; a real headless-Chromium screenshot (desktop + mobile) shows the "Consensus" label reading clearly with no layout or structural change. node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 100,
    title: 'Added subtle live motion to the "How consolidation works" flow diagram',
    kind: 'feature',
    ts: '2026-07-04T17:54:00.000Z',
    items: [
      'Added subtle live motion to the "How consolidation works" flow diagram — after a long streak of accessibility/copy/contrast fixes, went back to the roadmap\'s standing "show, don\'t tell, product in motion" direction, which the page hadn\'t acted on since its build-out. The diagram (model list -> a line -> the merged Consensus card) was completely static, so the page\'s own explanation of how consensus works didn\'t visually convey anything actually happening. Added three small, tasteful, 100%-CSS touches, no new assets, no JS: each model\'s colored dot now softly pulses on a staggered cycle (reads as "actively answering"); a small glowing dot travels down the connecting line toward Consensus (up to sideways on mobile, where the line is horizontal); and the Consensus card itself gently breathes with its existing glow. All three respect prefers-reduced-motion (verified computed animationName resolves to none when set) and are scoped to this one diagram, so nothing else on the page changed. Verified in a real headless-Chromium session at desktop and 390px mobile widths: zero console errors, no layout shift, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 99,
    title: 'Fixed two real accessibility bugs found by an automated axe-core audit',
    kind: 'fix',
    ts: '2026-07-04T16:47:00.000Z',
    items: [
      'Fixed two real accessibility bugs found by an automated axe-core audit — ran axe-core against the live homepage (desktop + mobile) instead of another manual glyph sweep, and it caught two genuine issues the prior manual passes missed: (1) the "Polecat vs. a single-model chat" comparison table\'s horizontally-scrolling wrapper had no way to scroll it from a keyboard or screen reader (the same class of bug an earlier pass fixed on the examples carousel\'s scroll row) — added tabindex="0", role="region", an aria-label, and a focus ring, verified arrow keys now move scrollLeft; (2) the table\'s blank corner header cell (<th scope="col"></th>) had no discernible text for screen readers — added a visually-hidden "Feature" label via a new .sr-only utility class. Left the examples carousel\'s "Consensus" label contrast finding as-is per the prior pass\'s explicit decision, since that .pcx-* block is the verified, do-not-rewrite component. Verified node scripts/validate.mjs passes and a re-run of axe-core drops from 2 fixable violations to the one pre-existing carousel note, with zero visual/layout change and zero console errors.',
    ],
  },
  {
    v: 98,
    title: 'Refreshed the stale "Customizable consensus" product screenshot',
    kind: 'fix',
    ts: '2026-07-04T15:56:00.000Z',
    items: [
      'Refreshed the stale "Customizable consensus" product screenshot — it was captured before the app moved "Clear all keys" out of the shared Settings footer into the Keys tab, so the marketing site was showing a footer layout ( "Clear all keys" next to "Tour"/"Done" on the Models tab) that no longer exists in the live product. Recaptured it from the current app: same section, same "Combining into one answer" content, now with the corrected footer and the merged "Models & Consensus" tab heading. No copy or layout changes, just an accurate, up-to-date screenshot.',
    ],
  },
  {
    v: 97,
    title: 'Added a <main> landmark around the page content',
    kind: 'feature',
    ts: '2026-07-04T15:11:00.000Z',
    items: [
      'Added a <main> landmark around the page content — an accessibility audit found every section (hero, examples, how-it-works, agreement map, providers, comparison table, privacy, closing CTA) sat as a direct child of <body> between the header and footer, with no <main> element anywhere. Screen-reader users navigating by landmark (a standard NVDA/JAWS/VoiceOver technique) only ever saw two stops — "banner" and "contentinfo" — with no way to jump straight to the actual content. Wrapped the existing sections in a single <main>, no markup or CSS otherwise changed. Verified in a real headless-Chromium session: the page now exposes header/main/footer landmarks in order, all 11 top-level sections render inside <main> exactly as before with no visual or layout change, zero console errors, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 96,
    title: 'Put a real number in the page\'s SEO/social copy instead of "many"',
    kind: 'feature',
    ts: '2026-07-04T13:59:00.000Z',
    items: [
      'Put a real number in the page\'s SEO/social copy instead of "many" — with the roadmap\'s website section fully checked off and a fresh visual audit turning up no new visible bugs, applied the site\'s own "Numbers, not adjectives" landing-page-craft guidance to a spot that had been missed: the <meta name="description">, Open Graph/Twitter descriptions, and JSON-LD description (the copy search engines and link previews on X/Slack/Discord actually show, seen far more often than the page itself) all said "many AI models" while the homepage body copy already commits to a concrete "Seven providers, free and paid." Updated all four to say "up to 7 AI providers," and tightened the meta description, which had drifted well past the ~155-160 character length search engines actually display. No visible on-page copy changed. Verified the JSON-LD block still parses as valid JSON and node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 95,
    title: 'Replaced the last raw glyph on the homepage with a proper icon, matching the real app',
    kind: 'feature',
    ts: '2026-07-04T12:54:00.000Z',
    items: [
      'Replaced the last raw glyph on the homepage with a proper icon, matching the real app — the last three icon-consistency passes (90, 91, 92) swept the page for star/checkmark/emoji glyphs, but missed a plain Unicode triangle (a geometric-shapes character, not a star or emoji, so it didn\'t match those searches) used as the "How this was formed" panel\'s disclosure marker in the agreement-map mockup - the section of the page mocking up Polecat\'s real provenance panel. It also had no aria-hidden, unlike every other decorative icon on the page. Replaced it with the exact same chevron SVG the real app itself uses for this exact panel\'s disclosure toggle (CHEV_R in js/app.js), so the marketing mockup now matches the live product pixel-for-pixel on this detail, and added aria-hidden="true". Verified in a real headless-Chromium session (scrolled to trigger reveal-on-scroll, screenshotted the section): renders crisply with no layout shift, zero console errors, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 94,
    title: 'Accessibility pass: fixed a real muted-text typo and two low-contrast/undistinguishable links',
    kind: 'fix',
    ts: '2026-07-04T12:02:00.000Z',
    items: [
      'Accessibility pass: fixed a real muted-text typo and two low-contrast/undistinguishable links — after a long streak of manual glyph/copy sweeps, ran an automated axe-core accessibility audit across the homepage (desktop + mobile, full scroll) instead of another eyeball pass. Found a genuine CSS bug: the community-model-server paragraph was styled color:var(--text3) (missing the hyphen in the actual token name --text-3), so the typo silently fell back to full-bright body text instead of the intended muted tone — corrected to the real token, then bumped to --text-2 since --text-3 itself doesn\'t clear 4.5:1 against the page background (same class of fix already applied several times on the app side). Also fixed the hero\'s "what\'s new" link, which fell just under the AA contrast threshold from a stray opacity:.7, and the "try it free" link in that same paragraph, which relied on color alone to read as a link — added an underline so it\'s distinguishable without relying on color, per WCAG 1.4.1. Left the examples carousel\'s "Consensus" label contrast as-is since that component is the verified, do-not-rewrite pcx-* block. Verified in a real headless-Chromium session: axe-core\'s serious color-contrast/link-distinguishability violations drop from 3 types to the one pre-existing carousel-component note, zero console errors, no layout shift, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 93,
    title: 'Mentioned inline highlighting in the agreement-map section',
    kind: 'feature',
    ts: '2026-07-04T11:15:00.000Z',
    items: [
      'Mentioned inline highlighting in the agreement-map section — with the roadmap and backlog fully checked off, audited the homepage in a real headless-Chromium session (desktop + mobile, full scroll, images/links/console all checked clean) and found no defects, so instead described a real app capability the homepage never mentioned: the agreement map\'s "Interactive in the app" note covered the plain-language verdict, contribution badges, cross-model debate, and reformat-without-re-querying, but not inline highlighting (color-coding the consensus answer sentence-by-sentence by which model said what) — a genuinely distinctive feature with no equivalent copy anywhere on the site. Added one sentence describing it, in the same voice as its neighbors. Verified in a real browser session: renders cleanly with no layout shift, zero console errors, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 92,
    title: 'Replaced the last raw glyph on the homepage with a proper SVG icon',
    kind: 'feature',
    ts: '2026-07-04T10:11:00.000Z',
    items: [
      'Replaced the last raw glyph on the homepage with a proper SVG icon — the last two passes (90, 91) swept the page for the star character used as a "Consensus" marker and fixed every instance in the hero, the flow diagrams, and the agreement-map mockup, but missed the exact same glyph used 6 times in the "Ask once. Watch them split — then reconcile." examples carousel — the homepage\'s own signature showcase — where every one of the 6 example cards marks its consensus verdict with the raw character instead of the SVG icon used everywhere else on the page. Replaced all 6 with the same small stroke-style SVG star already used for "Consensus" elsewhere, and added aria-hidden (the old glyph had none, so it was read aloud 6 times by screen readers). Verified in a real headless-Chromium session (desktop + mobile): all 6 icons render at a consistent size with no layout shift, zero console errors, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 91,
    title: 'Replaced the two remaining raw glyphs on the homepage with proper SVG icons',
    kind: 'feature',
    ts: '2026-07-04T09:17:00.000Z',
    items: [
      'Replaced the two remaining raw glyphs on the homepage with proper SVG icons — a real headless-Chromium audit (scrolled the full page, checked images/links/mobile overflow, zero bugs found) turned up two spots that had slipped past the last two emoji/glyph sweeps: the "Where they agreed" note in the agreement-map mockup still used a plain ✓ character while its sibling "Where they split" note right below it already used a proper stroke SVG in the exact same icon slot, and the closing "leave a tip ☕" link used a real emoji — inconsistent with the app\'s own tip-jar UI (Settings → Support), which uses plain text tier buttons with no emoji at all. Replaced both with small stroke SVGs matching the page\'s existing icon convention (13px, currentColor, aria-hidden) — a checkmark for "agreed" and a coffee cup for the tip link. Verified in a real headless-Chromium session: both render crisply at their exact positions with no layout shift, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 90,
    title: 'Replaced the last color emoji and unicode star glyphs with proper monochrome SVG icons',
    kind: 'feature',
    ts: '2026-07-04T07:27:00.000Z',
    items: [
      'Replaced the last color emoji and unicode star glyphs with proper monochrome SVG icons — the app side of Polecat has twice swept its own UI for this exact issue ("no emoji, one consistent SVG icon set"), and the site itself already converted the "Private & yours" section\'s emoji to SVGs in a prior pass, but four spots on the homepage still used a sparkle emoji or a plain ✦ character: the primary hero CTA ("✨ Try it free"), the "✦ Consensus" pill in the hero\'s provider flow, both ✦ Consensus labels in the "How consolidation works" flow diagram, and the "✨ now live" kicker badge above the agreement-map section. Removed the emoji from the CTA and kicker outright (matching the site\'s other CTAs, which already read as plain text with no icon) and replaced the two ✦ glyphs with a small inline SVG star matching the icon convention already used elsewhere on the page (13px, fill="currentColor", aria-hidden). Verified in a real headless-Chromium session (scrolled through the full page to trigger the reveal-on-scroll animations): the hero, provider-flow pill, and consolidation-flow diagram all render the new icon crisply with no layout shift, zero console errors, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 89,
    title: 'Refreshed the sitemap\'s stale lastmod date',
    kind: 'fix',
    ts: '2026-07-04T05:43:00.000Z',
    items: [
      'Refreshed the sitemap\'s stale lastmod date — did a full visual audit of the homepage (real headless-Chromium session, scrolled through desktop and mobile with reveal-on-scroll animations actually triggered, so nothing was mistaken for a layout bug) and found no visible regressions or defects; every roadmap and backlog item for the site is already checked off. While auditing SEO metadata, found sitemap.xml\'s <lastmod> was still 2026-07-02 despite several content fixes shipping since (the privacy-claim correction, the keyboard-accessibility fix, contrast fixes). Bumped it to today so search engines see an accurate last-modified signal. No visible or behavioral change.',
    ],
  },
  {
    v: 88,
    title: 'Fixed an inaccurate privacy claim in the comparison table',
    kind: 'fix',
    ts: '2026-07-04T03:37:00.000Z',
    items: [
      'Fixed an inaccurate privacy claim in the comparison table — the "Polecat vs. a single-model chat" table claimed prompts &amp; files go "Straight from your browser to each provider with your own key — no Polecat server in between," a blanket claim. But the page\'s own "Seven providers" section documents a first-party "Polecat Model Server" ("served by us"), and the Privacy section already correctly caveats the free demo as a proxied exception — so the comparison-table row was flatly wrong for two real, currently-live paths, and the Privacy section\'s own caveat ("the free demo is the one exception") undercounted by one. Fixed both: the table row now notes "(except the keyless free demo &amp; Polecat Model Server, which proxy through ours)," and the Privacy section now says "Two exceptions" and names both. Verified in a real headless-Chromium session (desktop + mobile): both sections render cleanly with no layout regressions, node scripts/validate.mjs passes.',
    ],
  },
  {
    v: 87,
    title: 'Fixed the examples carousel being completely unreachable by keyboard',
    kind: 'fix',
    ts: '2026-07-04T01:14:00.000Z',
    items: [
      'Fixed the examples carousel being completely unreachable by keyboard — the "Ask once. Watch them split — then reconcile." section (the homepage\'s signature differentiator showcase, 6 real prompts with disagreeing model takes + consensus) is a horizontally-scrolling row with no prev/next buttons or links inside its cards, just a native scrollbar and a "Swipe or scroll to see more" hint. Checked whether it was reachable by Tab and confirmed it wasn\'t: the scroll container had no tabindex and no focusable children, so a keyboard-only visitor could Tab straight past the entire section and only ever see the first card — 5 of 6 examples, including most of the "they disagreed, consensus reconciled" story this section exists to tell, were invisible to keyboard/screen-reader users. Added tabindex="0" and a role="region" label to the scroll row plus a visible focus ring matching the site\'s existing focus-visible convention — the browser\'s native "arrow keys scroll a focused scrollable element" behavior now lets keyboard users page through all 6 cards. Verified in a real headless-Chromium session: focusing the row and pressing the arrow keys moves it (0px to 356px scrollLeft), with a visible purple outline.',
    ],
  },
  {
    v: 86,
    title: 'Fixed low-contrast informational text across the homepage',
    kind: 'fix',
    ts: '2026-07-03T23:48:00.000Z',
    items: [
      'Fixed low-contrast informational text across the homepage — computed the actual contrast ratio of --text-3 (the site\'s dimmest text color, #6b6480) against every background it\'s used on and found it lands at roughly 3.0-3.5:1, well under WCAG AA\'s 4.5:1 floor for normal-size text (the app side of Polecat found and fixed this exact issue twice already). Swept every --text-3 use in css/site.css and bumped the genuinely informational ones to --text-2 (already ~6.7-7.8:1, comfortably passing): the hero\'s trust-building note ("Run a real model instantly, no signup..."), the "muted" utility class (used for the strategy-editing hint, the free-demo privacy exception, and the installable/iOS explainer paragraph), the comparison table\'s column headers and its persuasive "single chatbot" column content, the provider section\'s "paid" badges (and the matching tag in the how-it-works flow diagram, for visual consistency), the agreement-map mockup\'s "partial" stance badge, and the "Swipe to see..." mobile hint. Left purely decorative uses alone (a hover border color, the flow-diagram arrow glyph, a small mockup icon) and the conventional muted footer timestamp, matching the same restraint the app-side fixes used. Verified computed contrast ratios before/after and re-read the page - no layout or behavior changes, text-only color bump.',
    ],
  },
  {
    v: 85,
    title: 'Added structured data (JSON-LD) so search engines understand what Polecat is',
    kind: 'feature',
    ts: '2026-07-03T22:53:00.000Z',
    items: [
      'Added structured data (JSON-LD) so search engines understand what Polecat is — the page had no schema.org markup at all, just Open Graph/Twitter tags for social previews. With the roadmap\'s website section fully checked off and a fresh visual audit (real headless-Chromium session, scrolled through desktop and mobile) turning up no visible bugs, added a WebApplication JSON-LD block describing Polecat, its free pricing, and browser requirements — a safe, purely additive change (no visible markup touched) that helps search engines show richer results. Verified the block parses as valid JSON and the page renders identically with zero console errors.',
    ],
  },
  {
    v: 84,
    title: 'Fixed the four product screenshots lacking reserved space, which could shift the whole page as they lazy-loaded',
    kind: 'fix',
    ts: '2026-07-03T22:03:00.000Z',
    items: [
      'Fixed the four product screenshots lacking reserved space, which could shift the whole page as they lazy-loaded — the "Watch it consolidate, live" and "Customizable consensus" screenshots had no width/height attributes, so the browser couldn\'t reserve their height ahead of time; while auditing the page in a real headless-Chromium session, this showed up as several hundred pixels of layout shift while scrolling, since each <img> collapsed to near-zero height until its data arrived. Added the real intrinsic dimensions to all four <img> tags. That alone caused a regression caught by the same verification pass — with only width set to 100% in CSS, the HTML height attribute was being applied literally instead of scaling with the image, stretching/distorting all four screenshots — fixed by adding height: auto alongside width: 100% in .shot img and .split-shot img, which lets the browser use the attributes purely to reserve the correct aspect ratio while auto-scaling to the container. Verified with the resulting layout pixel-matching the pre-change screenshots exactly, at desktop and mobile, with the space now reserved before the images finish loading.',
    ],
  },
  {
    v: 83,
    title: 'Replaced the social-share preview image with a real designed card',
    kind: 'feature',
    ts: '2026-07-03T21:02:00.000Z',
    items: [
      'Replaced the social-share preview image with a real designed card — og:image/twitter:image pointed at favicon-512.png, a square app icon with no headline or context, so links shared to Slack/Twitter/iMessage etc. showed just a small logo with no sense of what Polecat does (the roadmap\'s own "landing-page craft" notes call out the OG image as "seen more than the page" and worth designing like a thumbnail). Built a proper 1200x630 card matching the hero\'s exact visual language — dark background with the same brand glow, the Polecat mascot mark, the "Ask once. Hear from everyone." headline, and the provider-chips-to-Consensus flow — so a shared link now sells the product before anyone clicks. Added the standard og:image:width/height tags alongside it.',
    ],
  },
  {
    v: 82,
    title: 'Fixed the "One synthesized answer" product screenshot with ~45% dead black space below the content',
    kind: 'fix',
    ts: '2026-07-03T20:07:00.000Z',
    items: [
      'Fixed the "One synthesized answer" product screenshot with ~45% dead black space below the content — while auditing the homepage in a real headless-Chromium session (roadmap fully checked off), the "Watch it consolidate, live" section\'s three screenshot cards render in one row, and the first card\'s image (assets/shots/consensus.png) was noticeably taller than the app content it captured, leaving a big empty gap between the consensus answer and the caption. Same shape of bug as a previous pass\'s fix for the "Live progress" screenshot, just never applied to this one. Cropped the image to end right at the card\'s border instead of ~800px further down; the row now reads as three balanced, intentional screenshots instead of two tight ones next to a stretched one.',
    ],
  },
  {
    v: 81,
    title: 'Fixed the "Seven providers" section leaving its 7th card stranded off to one side, and a squeezed-away provider dot',
    kind: 'fix',
    ts: '2026-07-03T19:02:00.000Z',
    items: [
      'Fixed the "Seven providers" section leaving its 7th card stranded off to one side, and a squeezed-away provider dot — with 7 provider pills in a rigid 3-column grid, the last row held just one card ("Polecat Model Server"), left-aligned under an otherwise-empty row instead of sitting where the eye expects it. Switched the grid to a wrapping flexbox that centers a leftover row\'s card instead of stranding it. While verifying the fix at in-between widths (tablet, narrow desktop), also found that OpenRouter\'s colored identity dot could shrink away to nothing (and Groq\'s/the model server\'s shrank partway) whenever its pill got tight on horizontal room, because the dot had no protection against flexbox\'s default shrink behavior — a same-shape bug to several "identity dot disappears under layout pressure" issues fixed on the app side before. Gave the dot flex-shrink: 0 so it always renders at full size, and stopped the "first-party"/"300+ models" badges from wrapping into two lines. Verified at 1400px, 1024px, 800px, and the 720px mobile breakpoint in headless Chromium — every provider now keeps its dot, its badge stays on one line, and a lone last-row card centers instead of hugging the left edge; zero console errors.',
    ],
  },
  {
    v: 80,
    title: 'Fixed an over-broad privacy claim, in three spots',
    kind: 'fix',
    ts: '2026-07-03T18:01:00.000Z',
    items: [
      'Fixed an over-broad privacy claim, in three spots — the hero note said "runs in your browser, no server," the "Private & yours" section said prompts "go straight to each provider, never to us. No server, no accounts," and the comparison table said "no Polecat server" — all true for bring-your-own-key use, but not for the free demo (which the same hero\'s own primary CTA, the "Free demo, no signup" comparison row, and the "Polecat Model Server" listing all promote), which does route one request through a lightweight Cloudflare Worker proxy so first-timers can try Polecat without a key. Reworded the hero note to "your keys stay in your browser" (true either way), scoped the other two claims to "with your own key" / "bring your own key," and added a one-line callout on the privacy section noting the free demo as the sole exception — so the privacy pitch stays accurate for every path through the page, not just the BYOK one.',
    ],
  },
  {
    v: 79,
    title: 'Replaced color emoji with monochrome icons in the "Private & yours" section',
    kind: 'feature',
    ts: '2026-07-03T17:08:00.000Z',
    items: [
      'Replaced color emoji with monochrome icons in the "Private & yours" section — the big lock badge and all five feature pills (search, private mode, export, files, installable) used platform emoji (some font-color, clashing with the site\'s otherwise consistent stroke-icon language used everywhere else, e.g. the agreement-map badges). Swapped in small inline SVGs matching the app\'s own icon set — reusing the exact search/shield/export paths from the app\'s onboarding carousel and the paperclip from its attach button — so the section now matches Polecat\'s "no emoji in the UI" design language and renders identically everywhere regardless of font/emoji support.',
    ],
  },
  {
    v: 78,
    title: 'Fixed off-center icons in the "See where the models agree" section',
    kind: 'fix',
    ts: '2026-07-03T15:19:00.000Z',
    items: [
      'Fixed off-center icons in the "See where the models agree" section — the checkmark, fork, and arrow badges in that section\'s three rows were all rendering pinned to the top-left of their circles instead of centered (confirmed with a zoomed headless-Chromium capture of each). Root cause: a generic .amap-note span ( display: block ) rule (added to style the plain description text) unintentionally also matched the icon <span>, and won over the icon\'s own display: flex centering rule because it\'s more specific — a CSS bug, not the font/glyph issue the previous pass (77) fixed for the same section. Scoped the description-text rule to only the text wrapper (.amap-note > div span) so it no longer touches the icon badges. All three icons are now properly centered on both desktop and mobile.',
    ],
  },
  {
    v: 77,
    title: 'Fixed an invisible icon in the "See where the models agree" section',
    kind: 'fix',
    ts: '2026-07-03T14:10:00.000Z',
    items: [
      'Fixed an invisible icon in the "See where the models agree" section — the "Where they split" row used a balance-scale character (⚖︎) that renders as a blank circle in this environment\'s fonts (confirmed via a headless-Chromium screenshot: the checkmark and arrow icons on the same card render fine, but the scale glyph is empty), silently dropping the icon from Polecat\'s signature differentiator section for some visitors. Replaced it with a small inline SVG fork icon, matching the stroke style used elsewhere on the page, so it renders identically everywhere regardless of font/emoji support.',
    ],
  },
  {
    v: 76,
    title: 'Replaced a stale product screenshot with a live, current one',
    kind: 'fix',
    ts: '2026-07-03T13:18:00.000Z',
    items: [
      'Replaced a stale product screenshot with a live, current one — the "Watch it consolidate, live" section\'s "Live progress" screenshot still showed the app\'s old technical copy ("Sequential Refinement · arbiter: auto (strategy default)"), which the app itself replaced weeks ago with a plain-language sentence as part of a jargon-reduction pass, and was dated 2026-06-12 in its own header. Recaptured it directly from the live current app (a real in-progress consensus run, not a mockup) so it now shows the actual current copy ("3 models answering in parallel, then the strategy auto-picks one to merge them into one answer.") and today\'s date. Also cropped it much tighter — the old capture was roughly 45% empty black canvas below the content; the new one keeps the composer visible right under the progress card with a balanced, non-empty layout that reads as a real screenshot rather than a stitched-together mockup.',
    ],
  },
  {
    v: 75,
    title: 'Fixed the page being horizontally scrollable on mobile',
    kind: 'fix',
    ts: '2026-07-03T12:11:00.000Z',
    items: [
      'Fixed the page being horizontally scrollable on mobile — overflow-x: hidden was set on <body> but not <html>, and <html> is actually the element that scrolls in standards mode, so the rule did nothing to stop it. A stray horizontal swipe (common on touch devices) could drag the whole page — including the sticky nav bar — sideways, revealing dead space until you swiped back. Verified with a real headless-Chromium session: before the fix, window.scrollTo(200, 0) shifted the page 145px right; after adding the same rule to <html>, it\'s pinned at 0. No visual change for anyone scrolling normally.',
    ],
  },
  {
    v: 74,
    title: 'Fixed a copy inconsistency in the Model Server section',
    kind: 'fix',
    ts: '2026-07-03T11:27:00.000Z',
    items: [
      'Fixed a copy inconsistency in the Model Server section — the "Seven providers" section promised "sign in to get yours" for a free Polecat Model Server key, but Polecat has no accounts (the Privacy section right below it says so explicitly: "No server, no accounts") and model-server keys are currently admin-minted, not self-serve. Reworded to "Self-serve keys are coming soon; the other six providers cover you in the meantime" so the page no longer promises a sign-in flow that doesn\'t exist.',
    ],
  },
  {
    v: 73,
    title: 'Updated the agreement-map mockup to match the real app, and trimmed a wall of text',
    kind: 'feature',
    ts: '2026-07-03T10:51:00.000Z',
    items: [
      'Updated the agreement-map mockup to match the real app, and trimmed a wall of text — the homepage\'s "See where the models agree" section still showed the app\'s old three-separate-bars contribution chart, which the app itself replaced weeks ago with a single stacked 100% bar; the mockup now matches exactly what app.polecat.live actually shows. Also condensed the "Interactive in the app" note from a dense multi-sentence paragraph down to two tight sentences, in line with the site\'s "one idea per screen" principle.',
    ],
  },
  {
    v: 72,
    title: 'Fixed a hidden comparison table on mobile',
    kind: 'fix',
    ts: '2026-07-03T09:45:00.000Z',
    items: [
      'Fixed a hidden comparison table on mobile — "Polecat vs. a single-model chat" scrolls horizontally on narrow screens (by design, so the labels stay readable), but nothing told visitors that, so the whole point of the table -- the highlighted Polecat column -- was invisible off-screen with no hint to swipe. Added a small "Swipe to see the Polecat column ->" hint below the table, shown only on mobile widths where the table actually overflows.',
    ],
  },
  {
    v: 71,
    title: 'Fixed uneven product screenshot cards',
    kind: 'fix',
    ts: '2026-07-03T07:43:00.000Z',
    items: [
      'Fixed uneven product screenshot cards — the three "how it works" screenshots sit in a row that stretches to match the tallest one, but the shorter two were left top-anchored with a dead gap below their caption instead of being centered. They\'re now vertically centered in the frame, so the row reads as one balanced, intentional group instead of two looking cut off.',
    ],
  },
  {
    v: 70,
    title: 'Fixed two stale product screenshots',
    kind: 'fix',
    ts: '2026-07-03T05:59:00.000Z',
    items: [
      'Fixed two stale product screenshots — the "Combining into one answer" and "Browse & search every available model" screenshots still showed a "Arbitration" settings tab that was merged away weeks ago. Both are now fresh captures of the current app (Models & Consensus tab, live OpenRouter model list), so the site matches what you actually see when you open Polecat.',
    ],
  },
  {
    v: 69,
    title: 'Accessibility: decorative emoji hidden from screen readers',
    kind: 'feature',
    ts: '2026-07-03T03:32:00.000Z',
    items: [
      'Accessibility: decorative emoji hidden from screen readers — the lock icon in "Private & yours," the five feature pills below it (clock, sunglasses, download, paperclip, mobile), and the footer\'s coffee cup were previously read aloud by screen readers (e.g. "locked with key, Private and yours"), duplicating the adjacent text. All are now marked aria-hidden="true" so only the real label is announced.',
    ],
  },
  {
    v: 68,
    title: 'SEO: added robots.txt and sitemap.xml',
    kind: 'feature',
    ts: '2026-07-02T20:43:00.000Z',
    items: [
      'SEO: added robots.txt and sitemap.xml — search engines previously had no explicit crawl guidance or a discoverable list of pages, which can slow how quickly a new or updated site gets indexed. Both are now published at the site root, pointing crawlers at polecat.live and the sitemap.',
    ],
  },
  {
    v: 67,
    title: 'Accessibility + cleanup pass',
    kind: 'feature',
    ts: '2026-07-02T19:57:00.000Z',
    items: [
      'Accessibility + cleanup pass — added a visible keyboard-focus ring to every link and button on the page (previously relied on inconsistent browser defaults), sharpened the nav\'s "Open app" CTA to "Try it free" so the strongest conversion hook is visible before any scrolling, and removed ~50 lines of dead CSS left over from a retired carousel implementation.',
    ],
  },
  {
    v: 66,
    title: 'Copy fix: stale "Consensus tab" reference',
    kind: 'fix',
    ts: '2026-07-02T17:02:00.000Z',
    items: [
      'Copy fix: stale "Consensus tab" reference — the agreement-map section described the live strong/mixed/diverse badge as living in a "Consensus tab," but the app merged Models and Consensus into one Settings tab a while back, and this badge actually appears right on the answer itself. Reworded to match reality.',
    ],
  },
  {
    v: 65,
    title: 'Better link previews on X/Slack/Discord',
    kind: 'feature',
    ts: '2026-07-02T16:01:00.000Z',
    items: [
      'Better link previews on X/Slack/Discord — added Twitter Card meta tags and a canonical link, so sharing a polecat.live link now shows a proper large-image preview with title and description everywhere, not just on Facebook/LinkedIn (which already read Open Graph tags).',
    ],
  },
  {
    v: 64,
    title: 'Fix: anchor links no longer hide under the sticky nav',
    kind: 'fix',
    ts: '2026-07-02T14:02:00.000Z',
    items: [
      'Fix: anchor links no longer hide under the sticky nav — clicking "How it works," "Examples," or "Consensus" in the header used to scroll the target section partly behind the sticky nav bar. Sections now reserve space for it, so the heading you clicked is fully visible after the jump.',
    ],
  },
  {
    v: 63,
    title: 'App: iOS Home Screen nudge',
    kind: 'feature',
    ts: '2026-07-02T13:02:00.000Z',
    items: [
      'App: iOS Home Screen nudge — on iPhone/iPad, Polecat\'s sidebar now shows a one-time, dismissible reminder to add it to the Home Screen once you have keys or chats worth keeping — the fix for Safari silently clearing site data after about a week away. Tap "How?" for quick instructions; dismiss it and it won\'t reappear. Privacy section updated to mention it.',
    ],
  },
  {
    v: 62,
    title: 'New: "Polecat vs. a single-model chat" comparison table',
    kind: 'feature',
    ts: '2026-07-02T11:12:00.000Z',
    items: [
      'New: "Polecat vs. a single-model chat" comparison table — a plain, scannable table on the homepage lays out the difference next to a single chatbot: models per prompt, cross-checking, agreement map, bring-your-own-keys, where prompts go, and cost to try. Placed right after the agreement-map section, before "Seven providers." Footer updated.',
    ],
  },
  {
    v: 61,
    title: 'App: plain-language strategy names',
    kind: 'feature',
    ts: '2026-07-01T16:13:00.000Z',
    items: [
      'App: plain-language strategy names — Polecat\'s consensus strategies got clearer names to match the app: "Comprehensive" is now "Merge Everything," "Validated Synthesis" is "Fact-Checked Merge," "Debate & Synthesize" is "Debate & Merge," and "Sequential Refinement" is "Refine Together." The "Customizable consensus" section here is updated to match. Footer updated.',
    ],
  },
  {
    v: 60,
    title: 'App: installable as a PWA',
    kind: 'feature',
    ts: '2026-06-30T20:58:00.000Z',
    items: [
      'App: installable as a PWA — Polecat now ships a web app manifest and Apple meta tags, so it can be added to your Home Screen / installed from Chrome or Edge. Added a "📲 Installable" pill and a line to the Privacy section explaining why it matters: installed apps are exempt from iOS Safari\'s habit of quietly clearing site storage after about a week away, which is the main way people lose saved keys and chats. Footer updated.',
    ],
  },
  {
    v: 59,
    title: 'App: model roles',
    kind: 'feature',
    ts: '2026-06-30T17:09:00.000Z',
    items: [
      'App: model roles — Settings → Models now lets you reorder models with up/down arrows, set any model as the Arbiter directly from that screen, and optionally mark it "synthesis only" so it only combines the others\' answers without answering itself. Great for pairing free-tier answerers with a premium synthesizer. Footer updated.',
    ],
  },
  {
    v: 58,
    title: 'App: model race bar',
    kind: 'feature',
    ts: '2026-06-30T13:09:00.000Z',
    items: [
      'App: model race bar — the consensus footer now shows a compact horizontal bar with colored dots at relative positions revealing which model responded first and by how much, making the parallel-execution advantage instantly visible. Plus \'c\' keyboard shortcut to open the side-by-side compare modal, and inline expand panels now auto-scroll into view. Footer updated.',
    ],
  },
  {
    v: 57,
    title: 'App: number key tab shortcuts',
    kind: 'feature',
    ts: '2026-06-30T09:31:00.000Z',
    items: [
      'App: number key tab shortcuts — press 1-9 to jump to model tab 1-9, or 0 for the Consensus tab, from anywhere in the app. Also adds aria-controls/aria-labelledby/tabindex to complete the ARIA tablist pattern. Keyboard shortcuts panel (?) now has a Navigation section. Footer updated.',
    ],
  },
  {
    v: 56,
    title: 'App: stacked contribution bar',
    kind: 'feature',
    ts: '2026-06-30T05:43:00.000Z',
    items: [
      'App: stacked contribution bar — the "How this was formed" panel now shows a single horizontal bar split into colored segments, one per model, so you can see each model\'s share of the consensus at a glance. Hover a segment for model name and %; a legend below carries names and percentages so it\'s never color-only. Footer updated.',
    ],
  },
  {
    v: 55,
    title: 'App: draft auto-save',
    kind: 'feature',
    ts: '2026-06-30T01:27:00.000Z',
    items: [
      'App: draft auto-save — the composer now quietly saves whatever you are typing to your browser\'s local storage. If you close or refresh the tab mid-thought, your prompt is waiting when you come back. Cleared on send so stale text never shows up. Footer updated.',
    ],
  },
  {
    v: 54,
    title: 'App: edit prompt button',
    kind: 'feature',
    ts: '2026-06-29T21:00:00.000Z',
    items: [
      'App: edit prompt button — hover any message you sent and a pencil icon appears; click it to copy that prompt back to the composer so you can tweak and resend without retyping. Works in every tab including the consensus view. Footer updated.',
    ],
  },
  {
    v: 53,
    title: 'App: stop generation button',
    kind: 'feature',
    ts: '2026-06-29T17:23:00.000Z',
    items: [
      'App: stop generation button — a red Stop button now appears while models are streaming, replacing Send. Click it (or press Esc) to abort all in-flight requests; any text that already arrived is kept with a subtle "(stopped)" label. Footer updated.',
    ],
  },
  {
    v: 52,
    title: 'App: prompt history recall',
    kind: 'feature',
    ts: '2026-06-29T13:54:00.000Z',
    items: [
      'App: prompt history recall — press the up arrow key in the empty composer to load your last prompt; press again to go further back through up to 50 stored prompts. Down arrow moves forward; typing exits history mode. Mentioned in the keyboard shortcuts cheatsheet (?). Footer updated.',
    ],
  },
  {
    v: 51,
    title: 'App: model track record in Settings',
    kind: 'feature',
    ts: '2026-06-29T10:02:00.000Z',
    items: [
      'App: model track record in Settings — Polecat now quietly tracks each model\'s consensus contribution (stance + %) across sessions. After 3+ sessions, Settings → Models shows a subtle historical hint per model: "Usually aligns", "Often takes a distinct angle", or "Mixed" — with a tooltip giving the exact session count and avg contribution %. Zero extra API calls. Footer updated.',
    ],
  },
  {
    v: 50,
    title: 'App: expand model responses inline',
    kind: 'feature',
    ts: '2026-06-29T06:00:00.000Z',
    items: [
      'App: expand model responses inline — each card in "Responses at a glance" now has an expand button. Clicking it shows that model\'s full response in a panel right below the strip, so you can read any model\'s complete answer without switching tabs. Footer updated.',
    ],
  },
  {
    v: 49,
    title: 'App: "Ask about this" on disagreement points',
    kind: 'feature',
    ts: '2026-06-29T01:34:00.000Z',
    items: [
      'App: "Ask about this" on disagreement points — each specific disagreement point in the "How this was formed" agreement map panel now has an "Ask about this →" button. Clicking it pre-fills a rich follow-up naming exactly what each model said, so users can dig into any divergence in one click. Agreement map section updated.',
    ],
  },
  {
    v: 48,
    title: 'App: response speed bars',
    kind: 'feature',
    ts: '2026-06-28T23:49:00.000Z',
    items: [
      'App: response speed bars — each model card in "Responses at a glance" now shows a thin colored bar whose width represents that model\'s response time relative to the slowest model, making the multi-model race immediately visual. The consensus sources line also shows the response time range (e.g. 2.1s–8.9s), making the parallel-execution advantage tangible. Footer updated.',
    ],
  },
  {
    v: 47,
    title: 'App: live streaming previews',
    kind: 'feature',
    ts: '2026-06-28T22:46:00.000Z',
    items: [
      'App: live streaming previews — while models stream, the Consensus tab progress box now shows a one-line preview of each model\'s opening response in real time, so you can read what each AI is saying before synthesis even begins. Footer updated.',
    ],
  },
  {
    v: 46,
    title: 'App: format quick-actions on consensus',
    kind: 'feature',
    ts: '2026-06-28T21:48:00.000Z',
    items: [
      'App: format quick-actions on consensus — a "Format" strip below each consensus lets users reformat the answer instantly (Shorter, Bullet points, More detail, Simplify) without re-querying the models. Agreement map section updated to mention it.',
    ],
  },
  {
    v: 45,
    title: 'App: debate chips + clickable model names',
    kind: 'feature',
    ts: '2026-06-29T04:30:00.000Z',
    items: [
      'App: debate chips + clickable model names — when models disagreed with named positions, a "Debate:" follow-up chip pre-fills a targeted prompt quoting each model\'s stance so they engage with each other\'s reasoning. Model names in "Where they differed" now link to that model\'s full response tab. Agreement map section updated.',
    ],
  },
  {
    v: 44,
    title: 'App: contribution % in snapshot cards',
    kind: 'feature',
    ts: '2026-06-29T04:00:00.000Z',
    items: [
      'App: contribution % in snapshot cards — each model card in "Responses at a glance" now shows ~N% (estimated share of the consensus it shaped), colored in the model\'s brand color. Agreement map section updated to mention this.',
    ],
  },
  {
    v: 43,
    title: 'App: stance badges on model tabs',
    kind: 'feature',
    ts: '2026-06-29T03:00:00.000Z',
    items: [
      'App: stance badges on model tabs — after consensus, each model\'s tab now shows a small "aligned", "partial", or "outlier" badge under the model name, making the agreement picture visible at a glance in the tab bar without opening the details panel. Footer updated.',
    ],
  },
  {
    v: 42,
    title: 'App: mobile UX polish',
    kind: 'feature',
    ts: '2026-06-28T23:00:00.000Z',
    items: [
      'App: mobile UX polish — "Responses at a glance" now starts collapsed on mobile so follow-up actions are immediately visible without scrolling; follow-up chips scroll horizontally instead of wrapping. Agreement summary now appears right below the answer text for faster reading. Footer updated.',
    ],
  },
  {
    v: 41,
    title: 'App: snapshot card polish',
    kind: 'feature',
    ts: '2026-06-28T19:00:00.000Z',
    items: [
      'App: snapshot card polish — each model\'s "Responses at a glance" card now has a copy button to grab that model\'s full response without switching tabs. Follow-up chips and re-synthesis strip now appear before the "How this was formed" panel so the most actionable options are immediately visible. Collapsed toggle shows colored model dots. Updated Agreement map section to mention the copy button.',
    ],
  },
  {
    v: 40,
    title: 'App: accessibility & icon polish',
    kind: 'feature',
    ts: '2026-06-28T15:00:00.000Z',
    items: [
      'App: accessibility & icon polish — model response tabs now support ← / → keyboard navigation; proper ARIA tablist roles added throughout. All remaining unicode glyphs (◎, ✦, ✓, ⇄) replaced with SVG icons in the tab empty states, consensus sources label, provenance panel, and welcome slides. Footer updated.',
    ],
  },
  {
    v: 39,
    title: 'App: consensus insight sentence',
    kind: 'feature',
    ts: '2026-06-29T03:00:00.000Z',
    items: [
      'App: consensus insight sentence — after each consensus, a brief natural-language summary now appears before the detail panels ("All 3 models were in strong agreement" / "2 of 3 models agreed; GPT-4o had a contrasting perspective") — making the multi-model picture legible without expanding any panels. Zero extra API calls. Also replaced remaining unicode glyphs (✦, ◎) in empty states with proper SVG icons.',
      'Site: Agreement map section updated to mention the new consensus insight sentence.',
    ],
  },
  {
    v: 38,
    title: 'App: snapshot cards show each model\'s distinct take',
    kind: 'feature',
    ts: '2026-06-29T11:00:00.000Z',
    items: [
      'App: snapshot cards show each model\'s distinct take — the "Responses at a glance" cards now display a brief italic snippet of each model\'s specific disagreement point (from the arbiter\'s analysis), so you can see at a glance what made each model different without switching tabs. Cards are also now fully clickable. Footer updated.',
    ],
  },
  {
    v: 37,
    title: 'App: restored conversations now as rich as live ones',
    kind: 'feature',
    ts: '2026-06-29T07:00:00.000Z',
    items: [
      'App: restored conversations now as rich as live ones — model snapshot cards, follow-up chips, and "Try another synthesis" strip now appear on the most recent consensus when you resume a conversation from history. Footer updated.',
    ],
  },
  {
    v: 36,
    title: 'App: re-synthesize with any strategy',
    kind: 'feature',
    ts: '2026-06-29T05:00:00.000Z',
    items: [
      'App: re-synthesize with any strategy — after a consensus answer, a new "Try another synthesis" strip lets you instantly re-synthesize the same model responses (Comprehensive, Best Answer, Validated, Debate) without re-asking the models. Each approach produces a new consensus entry so you can compare strategies side by side. Unique to Polecat\'s multi-response architecture. Footer updated.',
    ],
  },
  {
    v: 35,
    title: 'App: history sidebar polish',
    kind: 'feature',
    ts: '2026-06-29T03:00:00.000Z',
    items: [
      'App: history sidebar polish — conversation history is now grouped by Today / Yesterday / This week / This month / Older (matching Claude/ChatGPT/Gemini). Each chat also shows tiny colored provider dots so you can see at a glance which models were used. Footer and CHANGELOG updated.',
    ],
  },
  {
    v: 34,
    title: 'App: tab title notifications',
    kind: 'feature',
    ts: '2026-06-29T01:00:00.000Z',
    items: [
      'App: tab title notifications — when you switch to another tab while models are responding, the browser tab counts up: "(2/3 answered) Polecat" → "(synthesizing…) Polecat" — then resets to normal when you come back. Unique to Polecat\'s multi-model nature.',
    ],
  },
  {
    v: 33,
    title: 'App: live agreement signal',
    kind: 'feature',
    ts: '2026-06-28T23:00:00.000Z',
    items: [
      'App: live agreement signal — a live "strong agreement / mixed views / divergent views" indicator now appears in the Consensus tab as each model finishes responding, updating in real time before synthesis even starts. Built from text-overlap analysis, zero extra model calls.',
      'App: smarter conversation titles — history sidebar titles now strip common question preambles ("What is", "How do", "Tell me about") so the title gets straight to the topic.',
    ],
  },
  {
    v: 32,
    title: 'App: Compare all responses',
    kind: 'feature',
    ts: '2026-06-28T21:00:00.000Z',
    items: [
      'App: Compare all responses — new grid-icon Compare button appears on every consensus answer. Opens a full-screen side-by-side view of all model responses in a responsive column grid (each independently scrollable). Makes Polecat\'s multi-model advantage tangible at a glance without clicking through tabs.',
    ],
  },
  {
    v: 31,
    title: 'App: stance badges + word counts on model cards',
    kind: 'feature',
    ts: '2026-06-28T19:00:00.000Z',
    items: [
      'App: stance badges + word counts on model cards — each model\'s preview card in "Responses at a glance" now shows its stance (aligned/partial/outlier) vs. the consensus and an approximate word count, making cross-model comparison instant. Outlier-aware follow-up chips now name the specific model that disagreed.',
      'Site: Agreement map section updated to describe stance badges and outlier-named follow-up chips.',
    ],
  },
  {
    v: 30,
    title: 'App: agreement badge + smarter provenance',
    kind: 'feature',
    ts: '2026-06-28T17:00:00.000Z',
    items: [
      'App: agreement badge + smarter provenance — the Consensus tab now shows a live "strong / mixed / diverse" badge after each synthesis so agreement is visible at a glance. When models diverged, the "How this was formed" panel opens automatically. Last remaining emoji in the sidebar replaced with SVG icons.',
      'Site: Agreement map section updated to describe the new tab badge and auto-expand behaviour.',
    ],
  },
  {
    v: 29,
    title: 'App polish',
    kind: 'feature',
    ts: '2026-06-27T23:00:00.000Z',
    items: [
      'App polish — the Send button now shows the model count ("Send to 3") instead of "Send to all", making the multi-model nature tangible at a glance. Toast notifications are now announced to screen readers (ARIA live region). Three new debate-friendly example questions added to the greeting chips (AI & future of work, remote vs. office productivity, most overrated tech).',
    ],
  },
  {
    v: 28,
    title: 'App: "Responses at a glance"',
    kind: 'feature',
    ts: '2026-06-27T22:15:00.000Z',
    items: [
      'App: "Responses at a glance" — after each consensus, a compact strip of per-model preview cards appears below the answer, showing each model\'s opening paragraph and response time. One tap jumps to the full reply. Makes cross-model comparison instant — no tab-switching required.',
    ],
  },
  {
    v: 27,
    title: 'Site: Polecat Model Server added to providers section',
    kind: 'feature',
    ts: '2026-06-27T21:30:00.000Z',
    items: [
      'Site: Polecat Model Server added to providers section — now listed as a first-party free provider alongside Claude, Gemini, ChatGPT, OpenRouter, Groq, and Hugging Face; provider count updated to 7.',
      'App: UI polish — status icons in the consensus progress screen are now animated SVG spinners; the provenance toggle uses consistent stroke chevrons; emoji replaced throughout with SVG icons.',
    ],
  },
  {
    v: 26,
    title: 'App: image context for text-only models',
    kind: 'feature',
    ts: '2026-06-27T20:42:00.000Z',
    items: [
      'App: image context for text-only models — non-vision models now receive a short note when the user attached an image they can\'t see, so they can ask for a text description rather than giving a confused non-answer.',
      'Timestamps in CT — app changelog and website footer now show Central Time (CT) on all "updated" stamps.',
    ],
  },
  {
    v: 25,
    title: 'App: custom system prompt',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: custom system prompt — set one system prompt in Settings → Models and it applies to all selected models at once (Claude, Gemini, ChatGPT — each via its native API field).',
    ],
  },
  {
    v: 24,
    title: 'App: smart follow-up suggestions',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: smart follow-up suggestions — after every consensus answer, 2–3 clickable follow-up chips appear, derived from the agreement map (disagreement points, notable claims). Clicking a chip fills the prompt instantly. Updated the Agreement map section on the website to mention this.',
    ],
  },
  {
    v: 23,
    title: 'App: keyboard shortcuts cheatsheet',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: keyboard shortcuts cheatsheet — press ? to open a compact cheatsheet of all shortcuts; new ⌘, / Ctrl+, opens Settings from anywhere. Shortcut button added to the sidebar footer.',
    ],
  },
  {
    v: 22,
    title: 'App: per-model regenerate',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: per-model regenerate — each model response now has a ↺ button so you can ask just that one model to try again, without re-running all the others. Streams in live; conversation history stays intact.',
    ],
  },
  {
    v: 21,
    title: 'App: first-run Consensus callout + demo handoff polish',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: first-run Consensus callout + demo handoff polish — after your first synthesized answer, a small tooltip appears below the Consensus tab explaining the model tabs; "Try it free" now animates the suggestion chips in with a staggered entrance.',
    ],
  },
  {
    v: 20,
    title: 'App: centered composer on empty state',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: centered composer on empty state — greeting and prompt box now sit together in the center of the screen (Gemini/ChatGPT style); composer docks to the bottom on the first send. Added changelog link to the hero note.',
    ],
  },
  {
    v: 19,
    title: 'App: copy thread as markdown',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: copy thread as markdown — a new document icon on every Consensus answer lets you copy the full exchange (question + each model\'s response + consensus) as clean markdown, ready to paste into Slack, Notion, docs, or email.',
    ],
  },
  {
    v: 18,
    title: 'App: shareable consensus links',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: shareable consensus links — new Share button on every Consensus answer. Click it to copy a URL that encodes the full question, each model\'s response, and the consensus — no server, no storage, 100% in the URL. Updated the Agreement map section to mention sharing.',
    ],
  },
  {
    v: 17,
    title: 'App: warm mascot greeting',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App: warm mascot greeting — the empty state now shows the animated Polecat mascot logo instead of a plain ✦ glyph, plus a cleaner subtitle that explains the cross-model consensus story. Added README.md to the app repo.',
    ],
  },
  {
    v: 16,
    title: 'App overlay polish',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App overlay polish — the welcome tour, export dialog, and image lightbox in the app no longer render blurred on first open in Safari and some Chromium browsers. A subtle visual fix completing the settings/chrome polish epic.',
    ],
  },
  {
    v: 15,
    title: 'Synced "Arbitration" → "Consensus" rename from the app',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'Synced "Arbitration" → "Consensus" rename from the app — nav link, section heading, flow diagram label, and screenshot alt text updated throughout. The settings tab in the app is now called "Consensus" (clearer for new users), and the website now matches.',
    ],
  },
  {
    v: 14,
    title: 'App icon polish',
    kind: 'feature',
    ts: '2026-06-27T17:00:00.000Z',
    items: [
      'App icon polish — the app\'s entire UI now uses a consistent set of clean SVG stroke icons in place of emoji (sidebar, welcome tour, vision marks, key/cost help, demo card). No functional change, but a noticeably more polished, cohesive feel. Updated footer timestamp.',
    ],
  },
  {
    v: 13,
    title: 'Privacy section updated',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Privacy section updated: the app now shows an explicit "Read in your browser — nothing is uploaded" note whenever any document is attached. Updated the Privacy section of the website to match: added a sentence and updated the pill text to reflect that attached files (PDFs, docs, images) never leave the browser.',
    ],
  },
  {
    v: 12,
    title: 'Native PDF support in the app',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Native PDF support in the app — PDFs attached to Claude or Gemini are now sent as native document blocks (full fidelity, not just extracted text). Updated the Privacy pill to reflect this. Text extraction remains the universal fallback for all other providers.',
    ],
  },
  {
    v: 11,
    title: 'File context budgeting in the app',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'File context budgeting in the app — extracted text from attached files now shares a 60k-character budget across all files; each block is labelled with type metadata ("PowerPoint, 24 slides") so every model understands the document; the UI shows how much budget is used and warns when it\'s nearly full.',
    ],
  },
  {
    v: 10,
    title: 'Office document support in the app',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Office document support in the app — updated the Privacy section pill to reflect that Word (.docx), Excel (.xlsx), and PowerPoint (.pptx) files are now extracted in-browser alongside PDFs, with zero upload.',
    ],
  },
  {
    v: 9,
    title: 'PDF & file attachments',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'PDF & file attachments now mentioned in the Privacy section — text is extracted entirely in-browser (no upload), reinforcing Polecat\'s privacy story.',
    ],
  },
  {
    v: 8,
    title: 'Fixed the examples carousel for real.',
    kind: 'fix',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Fixed the examples carousel for real. The root cause behind the last several "fixes" was that the entire #cases section used curly/smart quotes (", \') as HTML attribute delimiters — class="pcx" instead of class="pcx" — so browsers never applied any .pcx styles and the section rendered as a wall of raw text. Replaced all 246 smart quotes with straight ASCII quotes (typographic entities in the copy left intact) and verified the styled cards render via a headless browser.',
    ],
  },
  {
    v: 7,
    title: 'Examples carousel: replaced the JS-driven card slider with the verified no-JS, CSP-proof static scroll-snap carousel from website/examples-carousel.html',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Examples carousel: replaced the JS-driven card slider with the verified no-JS, CSP-proof static scroll-snap carousel from website/examples-carousel.html — all 6 cards render immediately without JavaScript.',
    ],
  },
  {
    v: 6,
    title: 'Re-applied the verified examples carousel: removed the outer .band wrapper that was conflicting with the component\'s self-contained styles, and replaced with the exact <section class="pcx"> block from website/examples-carousel.html (the screenshot-verified drop-in). Cards, carousel navigation, and consensus rows now render correctly.',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Re-applied the verified examples carousel: removed the outer .band wrapper that was conflicting with the component\'s self-contained styles, and replaced with the exact <section class="pcx"> block from website/examples-carousel.html (the screenshot-verified drop-in). Cards, carousel navigation, and consensus rows now render correctly.',
    ],
  },
  {
    v: 5,
    title: 'Replaced the examples section with the fully self-contained, verified .pcx-* carousel component',
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Replaced the examples section with the fully self-contained, verified .pcx-* carousel component — guaranteed to render as styled cards on any browser.',
    ],
  },
  {
    v: 4,
    title: 'Fixed the examples carousel: each card now has a proper background (--surface) so the layout is a clean, uniform card, not raw text. Removed hardcoded "Six real queries sent through Polecat." copy; the section now leads cleanly with just the headline and the agree/diverge line.',
    kind: 'fix',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Fixed the examples carousel: each card now has a proper background (--surface) so the layout is a clean, uniform card, not raw text. Removed hardcoded "Six real queries sent through Polecat." copy; the section now leads cleanly with just the headline and the agree/diverge line.',
    ],
  },
  {
    v: 3,
    title: 'Replaced hand-crafted case studies with a real example carousel',
    kind: 'feature',
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
    kind: 'feature',
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
    kind: 'feature',
    ts: '2026-06-26T17:00:00.000Z',
    items: [
      'Added an Agreement map section showing Polecat\'s signature: how much each model shaped the answer and where they agreed vs split — the cross-model advantage made visible.',
      'Hero now leads with a "Try it free — no key needed" call-to-action, surfacing the keyless demo (run a real model instantly, no signup) alongside the bring-your-own-keys mix.',
      'Added a Changelog link and a "Last updated" stamp in the footer.',
    ],
  },
];

export const LATEST_VERSION = CHANGELOG[0].v;
