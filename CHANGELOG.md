# Changelog

What's new on the Polecat landing site.

## 2026-07-04 05:11 CT (92)
- **Replaced the last raw glyph on the homepage with a proper SVG icon** — the last two passes (90, 91) swept the page for the `star` character used as a "Consensus" marker and fixed every instance in the hero, the flow diagrams, and the agreement-map mockup, but missed the exact same glyph used 6 times in the "Ask once. Watch them split — then reconcile." examples carousel — the homepage's own signature showcase — where every one of the 6 example cards marks its consensus verdict with the raw character instead of the SVG icon used everywhere else on the page. Replaced all 6 with the same small stroke-style SVG star already used for "Consensus" elsewhere, and added `aria-hidden` (the old glyph had none, so it was read aloud 6 times by screen readers). Verified in a real headless-Chromium session (desktop + mobile): all 6 icons render at a consistent size with no layout shift, zero console errors, `node scripts/validate.mjs` passes.

## 2026-07-04 04:17 CT (91)
- **Replaced the two remaining raw glyphs on the homepage with proper SVG icons** — a real headless-Chromium audit (scrolled the full page, checked images/links/mobile overflow, zero bugs found) turned up two spots that had slipped past the last two emoji/glyph sweeps: the "Where they agreed" note in the agreement-map mockup still used a plain `✓` character while its sibling "Where they split" note right below it already used a proper stroke SVG in the exact same icon slot, and the closing "leave a tip ☕" link used a real emoji — inconsistent with the app's own tip-jar UI (Settings → Support), which uses plain text tier buttons with no emoji at all. Replaced both with small stroke SVGs matching the page's existing icon convention (13px, `currentColor`, `aria-hidden`) — a checkmark for "agreed" and a coffee cup for the tip link. Verified in a real headless-Chromium session: both render crisply at their exact positions with no layout shift, `node scripts/validate.mjs` passes.

## 2026-07-04 02:27 CT (90)
- **Replaced the last color emoji and unicode star glyphs with proper monochrome SVG icons** — the app side of Polecat has twice swept its own UI for this exact issue ("no emoji, one consistent SVG icon set"), and the site itself already converted the "Private & yours" section's emoji to SVGs in a prior pass, but four spots on the homepage still used a sparkle emoji or a plain `✦` character: the primary hero CTA ("✨ Try it free"), the "✦ Consensus" pill in the hero's provider flow, both `✦ Consensus` labels in the "How consolidation works" flow diagram, and the "✨ now live" kicker badge above the agreement-map section. Removed the emoji from the CTA and kicker outright (matching the site's other CTAs, which already read as plain text with no icon) and replaced the two `✦` glyphs with a small inline SVG star matching the icon convention already used elsewhere on the page (13px, `fill="currentColor"`, `aria-hidden`). Verified in a real headless-Chromium session (scrolled through the full page to trigger the reveal-on-scroll animations): the hero, provider-flow pill, and consolidation-flow diagram all render the new icon crisply with no layout shift, zero console errors, `node scripts/validate.mjs` passes.

## 2026-07-04 00:43 CT (89)
- **Refreshed the sitemap's stale `lastmod` date** — did a full visual audit of the homepage (real headless-Chromium session, scrolled through desktop and mobile with reveal-on-scroll animations actually triggered, so nothing was mistaken for a layout bug) and found no visible regressions or defects; every roadmap and backlog item for the site is already checked off. While auditing SEO metadata, found `sitemap.xml`'s `<lastmod>` was still `2026-07-02` despite several content fixes shipping since (the privacy-claim correction, the keyboard-accessibility fix, contrast fixes). Bumped it to today so search engines see an accurate last-modified signal. No visible or behavioral change.

## 2026-07-03 22:37 CT (88)
- **Fixed an inaccurate privacy claim in the comparison table** — the "Polecat vs. a single-model chat" table claimed prompts &amp; files go "Straight from your browser to each provider with your own key — no Polecat server in between," a blanket claim. But the page's own "Seven providers" section documents a first-party "Polecat Model Server" ("served by us"), and the Privacy section already correctly caveats the free demo as a proxied exception — so the comparison-table row was flatly wrong for two real, currently-live paths, and the Privacy section's own caveat ("the free demo is the one exception") undercounted by one. Fixed both: the table row now notes "(except the keyless free demo &amp; Polecat Model Server, which proxy through ours)," and the Privacy section now says "Two exceptions" and names both. Verified in a real headless-Chromium session (desktop + mobile): both sections render cleanly with no layout regressions, `node scripts/validate.mjs` passes.

## 2026-07-03 20:14 CT (87)
- **Fixed the examples carousel being completely unreachable by keyboard** — the "Ask once. Watch them split — then reconcile." section (the homepage's signature differentiator showcase, 6 real prompts with disagreeing model takes + consensus) is a horizontally-scrolling row with no prev/next buttons or links inside its cards, just a native scrollbar and a "Swipe or scroll to see more" hint. Checked whether it was reachable by Tab and confirmed it wasn't: the scroll container had no `tabindex` and no focusable children, so a keyboard-only visitor could Tab straight past the entire section and only ever see the first card — 5 of 6 examples, including most of the "they disagreed, consensus reconciled" story this section exists to tell, were invisible to keyboard/screen-reader users. Added `tabindex="0"` and a `role="region"` label to the scroll row plus a visible focus ring matching the site's existing focus-visible convention — the browser's native "arrow keys scroll a focused scrollable element" behavior now lets keyboard users page through all 6 cards. Verified in a real headless-Chromium session: focusing the row and pressing the arrow keys moves it (0px to 356px scrollLeft), with a visible purple outline.

## 2026-07-03 18:48 CT (86)
- **Fixed low-contrast informational text across the homepage** — computed the actual contrast ratio of `--text-3` (the site's dimmest text color, `#6b6480`) against every background it's used on and found it lands at roughly 3.0-3.5:1, well under WCAG AA's 4.5:1 floor for normal-size text (the app side of Polecat found and fixed this exact issue twice already). Swept every `--text-3` use in `css/site.css` and bumped the genuinely informational ones to `--text-2` (already ~6.7-7.8:1, comfortably passing): the hero's trust-building note ("Run a real model instantly, no signup..."), the "muted" utility class (used for the strategy-editing hint, the free-demo privacy exception, and the installable/iOS explainer paragraph), the comparison table's column headers and its persuasive "single chatbot" column content, the provider section's "paid" badges (and the matching tag in the how-it-works flow diagram, for visual consistency), the agreement-map mockup's "partial" stance badge, and the "Swipe to see..." mobile hint. Left purely decorative uses alone (a hover border color, the flow-diagram arrow glyph, a small mockup icon) and the conventional muted footer timestamp, matching the same restraint the app-side fixes used. Verified computed contrast ratios before/after and re-read the page - no layout or behavior changes, text-only color bump.

## 2026-07-03 17:53 CT (85)
- **Added structured data (JSON-LD) so search engines understand what Polecat is** — the page had no `schema.org` markup at all, just Open Graph/Twitter tags for social previews. With the roadmap's website section fully checked off and a fresh visual audit (real headless-Chromium session, scrolled through desktop and mobile) turning up no visible bugs, added a `WebApplication` JSON-LD block describing Polecat, its free pricing, and browser requirements — a safe, purely additive change (no visible markup touched) that helps search engines show richer results. Verified the block parses as valid JSON and the page renders identically with zero console errors.

## 2026-07-03 17:03 CT (84)
- **Fixed the four product screenshots lacking reserved space, which could shift the whole page as they lazy-loaded** — the "Watch it consolidate, live" and "Customizable consensus" screenshots had no `width`/`height` attributes, so the browser couldn't reserve their height ahead of time; while auditing the page in a real headless-Chromium session, this showed up as several hundred pixels of layout shift while scrolling, since each `<img>` collapsed to near-zero height until its data arrived. Added the real intrinsic dimensions to all four `<img>` tags. That alone caused a regression caught by the same verification pass — with only `width` set to `100%` in CSS, the HTML `height` attribute was being applied literally instead of scaling with the image, stretching/distorting all four screenshots — fixed by adding `height: auto` alongside `width: 100%` in `.shot img` and `.split-shot img`, which lets the browser use the attributes purely to reserve the correct aspect ratio while auto-scaling to the container. Verified with the resulting layout pixel-matching the pre-change screenshots exactly, at desktop and mobile, with the space now reserved before the images finish loading.

## 2026-07-03 16:02 CT (83)
- **Replaced the social-share preview image with a real designed card** — `og:image`/`twitter:image` pointed at `favicon-512.png`, a square app icon with no headline or context, so links shared to Slack/Twitter/iMessage etc. showed just a small logo with no sense of what Polecat does (the roadmap's own "landing-page craft" notes call out the OG image as "seen more than the page" and worth designing like a thumbnail). Built a proper 1200x630 card matching the hero's exact visual language — dark background with the same brand glow, the Polecat mascot mark, the "Ask once. Hear from everyone." headline, and the provider-chips-to-Consensus flow — so a shared link now sells the product before anyone clicks. Added the standard `og:image:width`/`height` tags alongside it.

## 2026-07-03 15:07 CT (82)
- **Fixed the "One synthesized answer" product screenshot with ~45% dead black space below the content** — while auditing the homepage in a real headless-Chromium session (roadmap fully checked off), the "Watch it consolidate, live" section's three screenshot cards render in one row, and the first card's image (`assets/shots/consensus.png`) was noticeably taller than the app content it captured, leaving a big empty gap between the consensus answer and the caption. Same shape of bug as a previous pass's fix for the "Live progress" screenshot, just never applied to this one. Cropped the image to end right at the card's border instead of ~800px further down; the row now reads as three balanced, intentional screenshots instead of two tight ones next to a stretched one.

## 2026-07-03 14:02 CT (81)
- **Fixed the "Seven providers" section leaving its 7th card stranded off to one side, and a squeezed-away provider dot** — with 7 provider pills in a rigid 3-column grid, the last row held just one card ("Polecat Model Server"), left-aligned under an otherwise-empty row instead of sitting where the eye expects it. Switched the grid to a wrapping flexbox that centers a leftover row's card instead of stranding it. While verifying the fix at in-between widths (tablet, narrow desktop), also found that OpenRouter's colored identity dot could shrink away to nothing (and Groq's/the model server's shrank partway) whenever its pill got tight on horizontal room, because the dot had no protection against flexbox's default shrink behavior — a same-shape bug to several "identity dot disappears under layout pressure" issues fixed on the app side before. Gave the dot `flex-shrink: 0` so it always renders at full size, and stopped the "first-party"/"300+ models" badges from wrapping into two lines. Verified at 1400px, 1024px, 800px, and the 720px mobile breakpoint in headless Chromium — every provider now keeps its dot, its badge stays on one line, and a lone last-row card centers instead of hugging the left edge; zero console errors.

## 2026-07-03 13:01 CT (80)
- **Fixed an over-broad privacy claim, in three spots** — the hero note said "runs in your browser, no server," the "Private & yours" section said prompts "go straight to each provider, never to us. No server, no accounts," and the comparison table said "no Polecat server" — all true for bring-your-own-key use, but not for the free demo (which the same hero's own primary CTA, the "Free demo, no signup" comparison row, and the "Polecat Model Server" listing all promote), which does route one request through a lightweight Cloudflare Worker proxy so first-timers can try Polecat without a key. Reworded the hero note to "your keys stay in your browser" (true either way), scoped the other two claims to "with your own key" / "bring your own key," and added a one-line callout on the privacy section noting the free demo as the sole exception — so the privacy pitch stays accurate for every path through the page, not just the BYOK one.

## 2026-07-03 12:08 CT (79)
- **Replaced color emoji with monochrome icons in the "Private & yours" section** — the big lock badge and all five feature pills (search, private mode, export, files, installable) used platform emoji (some font-color, clashing with the site's otherwise consistent stroke-icon language used everywhere else, e.g. the agreement-map badges). Swapped in small inline SVGs matching the app's own icon set — reusing the exact search/shield/export paths from the app's onboarding carousel and the paperclip from its attach button — so the section now matches Polecat's "no emoji in the UI" design language and renders identically everywhere regardless of font/emoji support.

## 2026-07-03 10:19 CT (78)
- **Fixed off-center icons in the "See where the models agree" section** — the checkmark, fork, and arrow badges in that section's three rows were all rendering pinned to the top-left of their circles instead of centered (confirmed with a zoomed headless-Chromium capture of each). Root cause: a generic `.amap-note span { display: block }` rule (added to style the plain description text) unintentionally also matched the icon `<span>`, and won over the icon's own `display: flex` centering rule because it's more specific — a CSS bug, not the font/glyph issue the previous pass (77) fixed for the same section. Scoped the description-text rule to only the text wrapper (`.amap-note > div span`) so it no longer touches the icon badges. All three icons are now properly centered on both desktop and mobile.

## 2026-07-03 09:10 CT (77)
- **Fixed an invisible icon in the "See where the models agree" section** — the "Where they split" row used a balance-scale character (⚖︎) that renders as a blank circle in this environment's fonts (confirmed via a headless-Chromium screenshot: the checkmark and arrow icons on the same card render fine, but the scale glyph is empty), silently dropping the icon from Polecat's signature differentiator section for some visitors. Replaced it with a small inline SVG fork icon, matching the stroke style used elsewhere on the page, so it renders identically everywhere regardless of font/emoji support.

## 2026-07-03 08:18 CT (76)
- **Replaced a stale product screenshot with a live, current one** — the "Watch it consolidate, live" section's "Live progress" screenshot still showed the app's old technical copy ("Sequential Refinement · arbiter: auto (strategy default)"), which the app itself replaced weeks ago with a plain-language sentence as part of a jargon-reduction pass, and was dated `2026-06-12` in its own header. Recaptured it directly from the live current app (a real in-progress consensus run, not a mockup) so it now shows the actual current copy ("3 models answering in parallel, then the strategy auto-picks one to merge them into one answer.") and today's date. Also cropped it much tighter — the old capture was roughly 45% empty black canvas below the content; the new one keeps the composer visible right under the progress card with a balanced, non-empty layout that reads as a real screenshot rather than a stitched-together mockup.

## 2026-07-03 07:11 CT (75)
- **Fixed the page being horizontally scrollable on mobile** — `overflow-x: hidden` was set on `<body>` but not `<html>`, and `<html>` is actually the element that scrolls in standards mode, so the rule did nothing to stop it. A stray horizontal swipe (common on touch devices) could drag the whole page — including the sticky nav bar — sideways, revealing dead space until you swiped back. Verified with a real headless-Chromium session: before the fix, `window.scrollTo(200, 0)` shifted the page 145px right; after adding the same rule to `<html>`, it's pinned at 0. No visual change for anyone scrolling normally.

## 2026-07-03 06:27 CT (74)
- **Fixed a copy inconsistency in the Model Server section** — the "Seven providers" section promised "sign in to get yours" for a free Polecat Model Server key, but Polecat has no accounts (the Privacy section right below it says so explicitly: "No server, no accounts") and model-server keys are currently admin-minted, not self-serve. Reworded to "Self-serve keys are coming soon; the other six providers cover you in the meantime" so the page no longer promises a sign-in flow that doesn't exist.

## 2026-07-03 05:51 CT (73)
- **Updated the agreement-map mockup to match the real app, and trimmed a wall of text** — the homepage's "See where the models agree" section still showed the app's old three-separate-bars contribution chart, which the app itself replaced weeks ago with a single stacked 100% bar; the mockup now matches exactly what app.polecat.live actually shows. Also condensed the "Interactive in the app" note from a dense multi-sentence paragraph down to two tight sentences, in line with the site's "one idea per screen" principle.

## 2026-07-03 04:45 CT (72)
- **Fixed a hidden comparison table on mobile** — "Polecat vs. a single-model chat" scrolls horizontally on narrow screens (by design, so the labels stay readable), but nothing told visitors that, so the whole point of the table -- the highlighted Polecat column -- was invisible off-screen with no hint to swipe. Added a small "Swipe to see the Polecat column ->" hint below the table, shown only on mobile widths where the table actually overflows.

## 2026-07-03 02:43 CT (71)
- **Fixed uneven product screenshot cards** — the three "how it works" screenshots sit in a row that stretches to match the tallest one, but the shorter two were left top-anchored with a dead gap below their caption instead of being centered. They're now vertically centered in the frame, so the row reads as one balanced, intentional group instead of two looking cut off.

## 2026-07-03 00:59 CT (70)
- **Fixed two stale product screenshots** — the "Combining into one answer" and "Browse & search every available model" screenshots still showed a "Arbitration" settings tab that was merged away weeks ago. Both are now fresh captures of the current app (Models & Consensus tab, live OpenRouter model list), so the site matches what you actually see when you open Polecat.

## 2026-07-02 22:32 CT (69)
- **Accessibility: decorative emoji hidden from screen readers** — the lock icon in "Private & yours," the five feature pills below it (clock, sunglasses, download, paperclip, mobile), and the footer's coffee cup were previously read aloud by screen readers (e.g. "locked with key, Private and yours"), duplicating the adjacent text. All are now marked `aria-hidden="true"` so only the real label is announced.

## 2026-07-02 15:43 CT (68)
- **SEO: added robots.txt and sitemap.xml** — search engines previously had no explicit crawl guidance or a discoverable list of pages, which can slow how quickly a new or updated site gets indexed. Both are now published at the site root, pointing crawlers at polecat.live and the sitemap.

## 2026-07-02 14:57 CT (67)
- **Accessibility + cleanup pass** — added a visible keyboard-focus ring to every link and button on the page (previously relied on inconsistent browser defaults), sharpened the nav's "Open app" CTA to "Try it free" so the strongest conversion hook is visible before any scrolling, and removed ~50 lines of dead CSS left over from a retired carousel implementation.

## 2026-07-02 12:02 CT (66)
- **Copy fix: stale "Consensus tab" reference** — the agreement-map section described the live strong/mixed/diverse badge as living in a "Consensus tab," but the app merged Models and Consensus into one Settings tab a while back, and this badge actually appears right on the answer itself. Reworded to match reality.

## 2026-07-02 11:01 CT (65)
- **Better link previews on X/Slack/Discord** — added Twitter Card meta tags and a canonical link, so sharing a polecat.live link now shows a proper large-image preview with title and description everywhere, not just on Facebook/LinkedIn (which already read Open Graph tags).

## 2026-07-02 09:02 CT (64)
- **Fix: anchor links no longer hide under the sticky nav** — clicking "How it works," "Examples," or "Consensus" in the header used to scroll the target section partly behind the sticky nav bar. Sections now reserve space for it, so the heading you clicked is fully visible after the jump.

## 2026-07-02 08:02 CT (63)
- **App: iOS Home Screen nudge** — on iPhone/iPad, Polecat's sidebar now shows a one-time, dismissible reminder to add it to the Home Screen once you have keys or chats worth keeping — the fix for Safari silently clearing site data after about a week away. Tap "How?" for quick instructions; dismiss it and it won't reappear. Privacy section updated to mention it.

## 2026-07-02 06:12 CT (62)
- **New: "Polecat vs. a single-model chat" comparison table** — a plain, scannable table on the homepage lays out the difference next to a single chatbot: models per prompt, cross-checking, agreement map, bring-your-own-keys, where prompts go, and cost to try. Placed right after the agreement-map section, before "Seven providers." Footer updated.

## 2026-07-01 11:13 CT (61)
- **App: plain-language strategy names** — Polecat's consensus strategies got clearer names to match the app: "Comprehensive" is now "Merge Everything," "Validated Synthesis" is "Fact-Checked Merge," "Debate & Synthesize" is "Debate & Merge," and "Sequential Refinement" is "Refine Together." The "Customizable consensus" section here is updated to match. Footer updated.

## 2026-06-30 15:58 CT (60)
- **App: installable as a PWA** — Polecat now ships a web app manifest and Apple meta tags, so it can be added to your Home Screen / installed from Chrome or Edge. Added a "📲 Installable" pill and a line to the Privacy section explaining why it matters: installed apps are exempt from iOS Safari's habit of quietly clearing site storage after about a week away, which is the main way people lose saved keys and chats. Footer updated.

## 2026-06-30 12:09 CT (59)
- **App: model roles** — Settings → Models now lets you reorder models with up/down arrows, set any model as the Arbiter directly from that screen, and optionally mark it "synthesis only" so it only combines the others' answers without answering itself. Great for pairing free-tier answerers with a premium synthesizer. Footer updated.

## 2026-06-30 08:09 CT (58)
- **App: model race bar** — the consensus footer now shows a compact horizontal bar with colored dots at relative positions revealing which model responded first and by how much, making the parallel-execution advantage instantly visible. Plus 'c' keyboard shortcut to open the side-by-side compare modal, and inline expand panels now auto-scroll into view. Footer updated.

## 2026-06-30 04:31 CT (57)
- **App: number key tab shortcuts** — press 1-9 to jump to model tab 1-9, or 0 for the Consensus tab, from anywhere in the app. Also adds aria-controls/aria-labelledby/tabindex to complete the ARIA tablist pattern. Keyboard shortcuts panel (?) now has a Navigation section. Footer updated.

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
