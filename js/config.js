// ─────────────────────────────────────────────────────────────────────────
// config.js — persistence, schema, migration
// Schema (localStorage key `polecat_v1`):
//   { providers: { <id>: { key } },
//     selections: [ { id, provider, model } ],
//     arbitration: { activeId, custom: [strategy] },
//     theme }
// ─────────────────────────────────────────────────────────────────────────

export const STORAGE_KEY = 'polecat_v1';
export const THEME_KEY   = 'polecat_theme';
export const WELCOME_KEY = 'polecat_welcomed';
export const LEGACY_KEY  = 'polychat_v2';      // migrate from PolyChat v1

export const MAX_SELECTIONS = 8;

let _idc = 0;
export function newId() { return 's' + Date.now().toString(36) + (_idc++).toString(36); }
export function mkSelection(provider, model) { return { id: newId(), provider, model }; }

function normalize(cfg) {
  cfg = cfg || {};
  cfg.providers   = (cfg.providers && typeof cfg.providers === 'object') ? cfg.providers : {};
  cfg.selections  = Array.isArray(cfg.selections) ? cfg.selections : [];
  cfg.arbitration = (cfg.arbitration && typeof cfg.arbitration === 'object') ? cfg.arbitration : {};
  if (!cfg.arbitration.activeId) cfg.arbitration.activeId = 'sequential';
  if (!Array.isArray(cfg.arbitration.custom)) cfg.arbitration.custom = [];
  // ensure every selection has an id
  cfg.selections.forEach(s => { if (!s.id) s.id = newId(); });
  return cfg;
}

export function loadCfg() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalize(JSON.parse(raw));
  } catch {}
  const migrated = migrateFromLegacy();
  if (migrated) { saveCfg(migrated); return migrated; }
  return normalize({});
}

export function saveCfg(cfg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

// One-way import of PolyChat v1 settings on first load of Polecat.
export function migrateFromLegacy() {
  let old = null;
  try { old = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null'); } catch {}
  if (!old) return null;
  const providers = {};
  const selections = [];
  const map = [
    ['claude', old.claude_key, old.claudeModel || 'claude-opus-4-8'],
    ['gemini', old.gemini_key, old.geminiModel || 'gemini-3.5-flash'],
    ['openai', old.openai_key, old.openaiModel || 'gpt-5.5'],
  ];
  for (const [id, key, model] of map) {
    if (!key) continue;
    providers[id] = { key };
    selections.push(mkSelection(id, model));
  }
  if (!Object.keys(providers).length) return null;
  return normalize({ providers, selections, arbitration: { activeId: 'sequential', custom: [] } });
}

// ── Helpers ────────────────────────────────────────────────────────────────
export function providerKey(cfg, providerId) {
  return cfg.providers?.[providerId]?.key || '';
}
export function setProviderKey(cfg, providerId, key) {
  cfg.providers = cfg.providers || {};
  if (key) cfg.providers[providerId] = { ...(cfg.providers[providerId] || {}), key };
  else delete cfg.providers[providerId];
}
export function configuredProviders(cfg) {
  return Object.keys(cfg.providers || {}).filter(id => cfg.providers[id]?.key);
}
// Selections whose provider currently has a key — the ones we actually run.
export function activeSelections(cfg) {
  return (cfg.selections || []).filter(s => providerKey(cfg, s.provider));
}
