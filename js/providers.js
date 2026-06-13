// ─────────────────────────────────────────────────────────────────────────
// providers.js — provider catalog, model lists, and streaming API generators.
//
// `kind` drives which generator runs:
//   anthropic          → apiClaude          (x-api-key + direct-browser header)
//   gemini             → apiGemini          (?key= query param, streamGenerateContent)
//   openai-compatible  → apiOpenAICompatible (Bearer key, /chat/completions SSE)
//
// CORS for browser-direct calls verified June 2026 for OpenRouter / Groq / HF
// (all return access-control-allow-origin: * and accept the authorization header).
// baseUrl is intentionally overridable so a future serverless proxy can be
// dropped in without touching call sites.
// ─────────────────────────────────────────────────────────────────────────

import { providerKey } from './config.js';

export const PROVIDERS = {
  claude: {
    id: 'claude', name: 'Claude', short: 'Claude', vendor: 'Anthropic',
    color: '#d4773b', kind: 'anthropic',
    placeholder: 'sk-ant-api03-…',
    keyUrl: 'https://console.anthropic.com', keyLabel: 'console.anthropic.com',
    openUrl: 'https://claude.ai/new',
    models: [
      { value: 'claude-opus-4-8',            label: 'Opus 4.8',   price: '$$$$' },
      { value: 'claude-sonnet-4-6',          label: 'Sonnet 4.6', price: '$$$'  },
      { value: 'claude-haiku-4-5-20251001',  label: 'Haiku 4.5',  price: '$$'   },
      { value: 'claude-opus-4-7',            label: 'Opus 4.7',   price: '$$$$' },
      { value: 'claude-sonnet-4-5-20250929', label: 'Sonnet 4.5', price: '$$$'  },
      { value: 'claude-opus-4-1-20250805',   label: 'Opus 4.1',   price: '$$$$' },
    ],
  },
  gemini: {
    id: 'gemini', name: 'Gemini', short: 'Gemini', vendor: 'Google',
    color: '#4285f4', kind: 'gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    placeholder: 'AIzaSy…',
    keyUrl: 'https://aistudio.google.com', keyLabel: 'aistudio.google.com',
    openUrl: 'https://gemini.google.com/app',
    models: [
      { value: 'gemini-3.5-flash',       label: '3.5 Flash', price: '$$'  },
      { value: 'gemini-3.1-pro-preview', label: '3.1 Pro',   price: '$$$' },
      { value: 'gemini-3-flash-preview', label: '3 Flash',   price: '$$'  },
      { value: 'gemini-3.1-flash-lite',  label: '3.1 Lite',  price: '$'   },
      { value: 'gemini-2.5-pro',         label: '2.5 Pro',   price: '$$$' },
      { value: 'gemini-2.5-flash',       label: '2.5 Flash', price: '$'   },
      { value: 'gemini-2.5-flash-lite',  label: '2.5 Lite',  price: '$'   },
      { value: 'gemini-2.0-flash',       label: '2.0 Flash', price: '$'   },
      { value: 'gemini-2.0-flash-lite',  label: '2.0 Lite',  price: '$'   },
    ],
  },
  openai: {
    id: 'openai', name: 'ChatGPT', short: 'GPT', vendor: 'OpenAI',
    color: '#10a37f', kind: 'openai-compatible',
    baseUrl: 'https://api.openai.com/v1',
    placeholder: 'sk-proj-…',
    keyUrl: 'https://platform.openai.com', keyLabel: 'platform.openai.com',
    openUrl: 'https://chatgpt.com/',
    models: [
      { value: 'gpt-5.5',      label: 'GPT-5.5',  price: '$$$' },
      { value: 'gpt-5.4',      label: 'GPT-5.4',  price: '$$$' },
      { value: 'gpt-5.4-mini', label: '5.4 mini', price: '$$'  },
      { value: 'gpt-4o',       label: 'GPT-4o',   price: '$$$' },
      { value: 'gpt-4o-mini',  label: '4o mini',  price: '$'   },
    ],
  },

  // ── Free / public-model providers (OpenAI-compatible) ───────────────────
  openrouter: {
    id: 'openrouter', name: 'OpenRouter', short: 'OpenRouter', vendor: 'OpenRouter',
    color: '#8b5cf6', kind: 'openai-compatible',
    baseUrl: 'https://openrouter.ai/api/v1',
    placeholder: 'sk-or-v1-…',
    keyUrl: 'https://openrouter.ai/keys', keyLabel: 'openrouter.ai/keys',
    allowCustomModel: true,
    rateNote: 'Free models: ~20 req/min, ~200/day. 337+ models — type any model id.',
    extraHeaders: { 'HTTP-Referer': 'https://polecat.live', 'X-Title': 'Polecat' },
    models: [
      { value: 'meta-llama/llama-3.3-70b-instruct:free',      label: 'Llama 3.3 70B',   price: 'free', free: true },
      { value: 'openai/gpt-oss-120b:free',                    label: 'GPT-OSS 120B',    price: 'free', free: true },
      { value: 'openai/gpt-oss-20b:free',                     label: 'GPT-OSS 20B',     price: 'free', free: true },
      { value: 'qwen/qwen3-coder:free',                       label: 'Qwen3 Coder',     price: 'free', free: true },
      { value: 'qwen/qwen3-next-80b-a3b-instruct:free',       label: 'Qwen3 Next 80B',  price: 'free', free: true },
      { value: 'nvidia/nemotron-3-super-120b-a12b:free',      label: 'Nemotron 120B',   price: 'free', free: true },
      { value: 'nousresearch/hermes-3-llama-3.1-405b:free',   label: 'Hermes 3 405B',   price: 'free', free: true },
      { value: 'google/gemma-4-31b-it:free',                  label: 'Gemma 4 31B',     price: 'free', free: true },
    ],
  },
  groq: {
    id: 'groq', name: 'Groq', short: 'Groq', vendor: 'Groq',
    color: '#f55036', kind: 'openai-compatible',
    baseUrl: 'https://api.groq.com/openai/v1',
    placeholder: 'gsk_…',
    keyUrl: 'https://console.groq.com/keys', keyLabel: 'console.groq.com/keys',
    allowCustomModel: true,
    rateNote: 'Ultra-fast LPU inference. Free tier ~30 req/min.',
    models: [
      { value: 'llama-3.3-70b-versatile',  label: 'Llama 3.3 70B', price: 'free', free: true },
      { value: 'llama-3.1-8b-instant',     label: 'Llama 3.1 8B',  price: 'free', free: true },
      { value: 'openai/gpt-oss-120b',      label: 'GPT-OSS 120B',  price: 'free', free: true },
      { value: 'openai/gpt-oss-20b',       label: 'GPT-OSS 20B',   price: 'free', free: true },
      { value: 'qwen/qwen3-32b',           label: 'Qwen3 32B',     price: 'free', free: true },
      { value: 'moonshotai/kimi-k2-instruct', label: 'Kimi K2',    price: 'free', free: true },
    ],
  },
  hf: {
    id: 'hf', name: 'Hugging Face', short: 'HF', vendor: 'Hugging Face',
    color: '#ffb000', kind: 'openai-compatible',
    baseUrl: 'https://router.huggingface.co/v1',
    placeholder: 'hf_…',
    keyUrl: 'https://huggingface.co/settings/tokens', keyLabel: 'huggingface.co/settings/tokens',
    allowCustomModel: true,
    rateNote: 'Routes to 15+ open-source inference partners. Monthly free credits.',
    models: [
      { value: 'meta-llama/Llama-3.3-70B-Instruct',   label: 'Llama 3.3 70B',  price: 'open', free: true },
      { value: 'Qwen/Qwen3-235B-A22B-Instruct-2507',  label: 'Qwen3 235B',     price: 'open', free: true },
      { value: 'deepseek-ai/DeepSeek-V3.1',           label: 'DeepSeek V3.1',  price: 'open', free: true },
      { value: 'openai/gpt-oss-120b',                 label: 'GPT-OSS 120B',   price: 'open', free: true },
    ],
  },
};

export const PROVIDER_IDS = Object.keys(PROVIDERS);

export function modelLabel(providerId, value) {
  const p = PROVIDERS[providerId];
  return p?.models.find(m => m.value === value)?.label || value;
}
export function defaultModel(providerId) {
  return PROVIDERS[providerId]?.models[0]?.value;
}
export function selectionLabel(selection) {
  const p = PROVIDERS[selection?.provider];
  if (!p) return selection?.model || 'Model';
  return `${p.short} · ${modelLabel(selection.provider, selection.model)}`;
}

// ── SSE reader (shared) ─────────────────────────────────────────────────────
async function* sseReader(response, extract) {
  const reader = response.body.getReader();
  const dec = new TextDecoder();
  let buf = '', evtName = null;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n'); buf = lines.pop() ?? '';
    for (const line of lines) {
      if (line.startsWith('event:'))     { evtName = line.slice(6).trim(); }
      else if (line.startsWith('data:')) {
        const raw = line.slice(5).trim();
        if (raw === '[DONE]') return;
        try { const d = JSON.parse(raw); const c = extract(evtName, d); if (c) yield c; } catch {}
        evtName = null;
      } else if (line === '') { evtName = null; }
    }
  }
}

// ── Anthropic ───────────────────────────────────────────────────────────────
async function* apiClaude(messages, key, model) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key, 'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true', 'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'claude-opus-4-8', max_tokens: 8096, stream: true,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  if (!resp.ok) { const e = await resp.json().catch(() => ({})); throw new Error(e.error?.message || `HTTP ${resp.status}`); }
  yield* sseReader(resp, (_, d) => d?.type === 'content_block_delta' && d?.delta?.type === 'text_delta' ? d.delta.text : null);
}

// ── Gemini ──────────────────────────────────────────────────────────────────
function geminiContents(messages) {
  const merged = [];
  for (const m of messages) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    if (merged.length && merged[merged.length - 1].role === role)
      merged[merged.length - 1].parts[0].text += '\n\n' + m.content;
    else merged.push({ role, parts: [{ text: m.content }] });
  }
  return merged;
}
async function* apiGemini(messages, key, model) {
  const m = model || 'gemini-3.5-flash';
  const resp = await fetch(
    `${PROVIDERS.gemini.baseUrl}/models/${m}:streamGenerateContent?key=${key}&alt=sse`,
    { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ contents: geminiContents(messages) }) }
  );
  if (!resp.ok) { const e = await resp.json().catch(() => ({})); throw new Error(e.error?.message || `HTTP ${resp.status}`); }
  yield* sseReader(resp, (_, d) => d?.candidates?.[0]?.content?.parts?.[0]?.text ?? null);
}

// ── OpenAI-compatible (OpenAI / OpenRouter / Groq / HF) ──────────────────────
async function* apiOpenAICompatible(messages, key, model, provider) {
  const resp = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${key}`, 'content-type': 'application/json',
      ...(provider.extraHeaders || {}),
    },
    body: JSON.stringify({
      model, stream: true,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  if (!resp.ok) { const e = await resp.json().catch(() => ({})); throw new Error(e.error?.message || e.message || `HTTP ${resp.status}`); }
  yield* sseReader(resp, (_, d) => d?.choices?.[0]?.delta?.content ?? null);
}

// ── Dispatch ─────────────────────────────────────────────────────────────────
// selection = { id, provider, model }
export function makeGen(selection, messages, cfg) {
  const p   = PROVIDERS[selection.provider];
  const key = providerKey(cfg, selection.provider);
  if (!p) throw new Error(`Unknown provider: ${selection.provider}`);
  if (p.kind === 'anthropic') return apiClaude(messages, key, selection.model);
  if (p.kind === 'gemini')    return apiGemini(messages, key, selection.model);
  return apiOpenAICompatible(messages, key, selection.model, p);
}
