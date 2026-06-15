<div align="center">
  <img src="assets/polecat.svg" width="96" alt="Polecat">
  <h1>Polecat</h1>
  <p><strong>Ask once. Hear from everyone.</strong></p>
  <p><a href="https://polecat.live">polecat.live</a> · app at <a href="https://app.polecat.live">app.polecat.live</a></p>
</div>

Polecat sends one prompt to several AI models at the same time, then synthesizes a single
**consensus** answer — keeping what the models agree on and flagging where they don't. It runs
**entirely in your browser** with **your own API keys**: no server, nothing stored by anyone but you.

## Why

One model can be wrong; several rarely miss the same way. Polecat lets you cross-check answers across
providers, see each model's take side by side, and get one reconciled result instead of juggling tabs.

## Features

- **Run N models at once** — mix providers freely, or run two from the same provider (e.g. Opus *and* Sonnet).
- **Combine paid and free providers** — Claude, Gemini, ChatGPT alongside free/open models via OpenRouter, Groq, and Hugging Face.
- **Live model browse & search** — pull a provider's current catalog (OpenRouter is public; Groq/HF use your key) with free + context-length badges; or type any model id.
- **Model availability testing** — one-tap probe marks each model ✓ / ✗ so you don't pick a dead one.
- **Configurable arbitration** — choose how the consensus is formed:
  - *Sequential Refinement* — each model refines a running draft.
  - *Single Judge — Comprehensive* — one arbiter merges everything.
  - *Single Judge — Best Answer* — arbiter picks the strongest answer.
  - *Validated Synthesis* — merges but cross-checks claims and flags disagreements.
  - *Debate & Synthesize* — models critique each other, then a final synthesis.

  Pick which model is the **final arbiter**, edit/duplicate strategies, or **turn consensus off** to just compare models side by side.
- **Live progress** — the Consensus tab shows real-time status: which models are streaming/done/failed and what the arbitration step is doing.
- **Conversation history** — every chat is saved **on your device** in the ☰ sidebar; click any to **restore and continue** it. **Search** past chats, **rename** them, and **pin** favorites to the top. Includes **Private mode** (don't record), plus delete and clear.
- **Copy** any answer (per model and the consensus) with one click.
- **Export / import** — choose what to include (settings, API keys, conversation history) to move between browsers or devices.
- **Light / dark themes**, keyboard send (⌘/Ctrl + ↵), and a responsive mobile layout.

## Providers

| Provider | Type | Get a key |
|---|---|---|
| Claude (Anthropic) | paid | [console.anthropic.com](https://console.anthropic.com) |
| Gemini (Google) | paid | [aistudio.google.com](https://aistudio.google.com) |
| ChatGPT (OpenAI) | paid | [platform.openai.com](https://platform.openai.com) |
| OpenRouter | free + paid | [openrouter.ai/keys](https://openrouter.ai/keys) |
| Groq | free tier | [console.groq.com/keys](https://console.groq.com/keys) |
| Hugging Face | free credits | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |

## Privacy

Everything stays on your device. API keys **and conversation history** live only in your browser's
`localStorage`; prompts go **directly to each provider** (or a proxy you configure) — never to us.
Use **Private mode** to skip recording a chat, and **Export** to move your setup + history to another
device. Settings carry over across new versions; clearing site data or switching browsers starts fresh.

## Getting started

1. Open **[polecat.live](https://polecat.live)** and hit **Open app** (the app lives at **[app.polecat.live](https://app.polecat.live)**).
2. In **☰ → Settings → Keys**, paste at least one API key (a free OpenRouter key is the easiest start).
3. In **Settings → Models**, add the models you want (browse/search, or pick from the dropdown).
4. Type a prompt and **Send to all** — read each model, then the synthesized **Consensus**. Past chats live in the **☰** sidebar.

## Tech

Two static sites — no build step, no framework, no bundler — deployed to GitHub Pages as-is:
- **Landing** → `polecat.live` (this repo): `index.html` + `css/site.css`.
- **App** → `app.polecat.live` (the `polecat-app` repo): `index.html` + `css/` + ES-module `js/` (`config`, `providers`, `arbitration`, `ui`, `app`).

The provider layer is data-driven with overridable base URLs, so a thin serverless proxy (e.g. a Cloudflare
Worker) can be added later without touching the rest of the app.

## License

Free and open. Tips welcome via [Ko-fi](https://ko-fi.com/polecatlive) — entirely optional.
