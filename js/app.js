// ─────────────────────────────────────────────────────────────────────────
// app.js — controller. State is keyed by SELECTION id (a {provider, model}
// instance), so the same provider can appear multiple times (Opus + Sonnet).
// ─────────────────────────────────────────────────────────────────────────
import {
  loadCfg, saveCfg, activeSelections, configuredProviders, providerKey, setProviderKey,
  mkSelection, MAX_SELECTIONS,
} from './config.js';
import {
  PROVIDERS, PROVIDER_IDS, makeGen, modelLabel, defaultModel, selectionLabel,
} from './providers.js';
import {
  allStrategies, activeStrategy, getStrategy, DEFAULT_STRATEGIES,
  runArbitration, exportSettings, importSettings,
} from './arbitration.js';
import { $, el, escapeHtml, nl2br, renderMarkdown, highlightBubble, toast, applyTheme, currentTheme } from './ui.js';

const DONATE_URL = 'https://ko-fi.com/polecatlive';
const WELCOME_KEY = 'polecat_welcomed';

let cfg = loadCfg();
const convos = {};                  // selectionId -> [{role, content}]
let lastPrompt = '', results = {}, order = [];
let activeTab = null;

const persist     = () => saveCfg(cfg);
const sels        = () => activeSelections(cfg);
const selById     = (id) => (cfg.selections || []).find(s => s.id === id);
const getConvo    = (id) => (convos[id] ||= []);

// ── Model chips (prompt footer) ─────────────────────────────────────────────
function buildChips() {
  const row = $('modelChips'), send = $('sendBtn');
  row.innerHTML = '';
  const list = sels();

  if (!list.length) {
    const why = configuredProviders(cfg).length ? 'No models selected' : 'No models';
    row.innerHTML = `<span class="no-config-hint">${why} — <button id="hintAdd">add one ⚙</button></span>`;
    $('hintAdd').onclick = () => openConfig('models');
    send.disabled = true;
    return;
  }
  send.disabled = false;

  list.forEach(sel => {
    const p = PROVIDERS[sel.provider];
    const chip = el('span', 'm-chip');
    chip.id = 'chip_' + sel.id;
    chip.style.setProperty('--c', p.color);
    chip.innerHTML =
      `<span class="m-chip-dot"></span>` +
      `<span class="m-chip-label">${escapeHtml(selectionLabel(sel))}</span>` +
      `<button class="m-chip-x" title="Remove" aria-label="Remove ${escapeHtml(selectionLabel(sel))}">×</button>`;
    chip.querySelector('.m-chip-x').onclick = (e) => { e.stopPropagation(); removeSelection(sel.id); };
    row.appendChild(chip);
  });

  if (list.length < MAX_SELECTIONS) {
    const add = el('button', 'm-chip m-chip-add', '+ Add');
    add.title = 'Add a model';
    add.onclick = () => openConfig('models');
    row.appendChild(add);
  }
}
function setChipsDisabled(disabled) {
  document.querySelectorAll('.m-chip').forEach(c => c.classList.toggle('disabled', disabled));
}
function removeSelection(id) {
  cfg.selections = (cfg.selections || []).filter(s => s.id !== id);
  persist();
  $('tab_' + id)?.remove();
  $('panel_' + id)?.remove();
  delete convos[id];
  if (activeTab === id) { const f = sels()[0]; if (f) switchTab(f.id); }
  buildChips(); renderModels();
}

// ── Tabs ─────────────────────────────────────────────────────────────────
function pruneTabs() {
  const liveIds = new Set(sels().map(s => s.id));
  document.querySelectorAll('.tab[data-svc]').forEach(t => {
    const id = t.dataset.svc;
    if (id !== 'consensus' && !liveIds.has(id)) {
      $('panel_' + id)?.remove(); t.remove();
      if (activeTab === id) activeTab = null;
    }
  });
}
function ensureTabs() {
  const tabBar = $('tabBar'), panels = $('tabPanels');
  sels().forEach(sel => {
    if ($('tab_' + sel.id)) return;
    const p = PROVIDERS[sel.provider];
    const btn = el('button', 'tab');
    btn.id = 'tab_' + sel.id; btn.dataset.svc = sel.id;
    btn.onclick = () => switchTab(sel.id);
    btn.innerHTML = `<span class="tab-dot" id="tdot_${sel.id}" style="background:${p.color};--dot-c:${p.color}"></span><span class="tab-label">${escapeHtml(selectionLabel(sel))}</span>`;
    // consensus tab (if present) should stay last
    const consTab = $('tab_consensus');
    tabBar.insertBefore(btn, consTab || null);

    const panel = el('div', 'tab-panel');
    panel.id = 'panel_' + sel.id;
    panel.innerHTML =
      `<div class="conversation" id="conv_${sel.id}"><div class="empty-state" id="empty_${sel.id}">` +
      `<div class="empty-icon">◎</div><div>Send a prompt to see ${escapeHtml(selectionLabel(sel))}</div></div></div>`;
    panels.appendChild(panel);
  });

  if (!$('tab_consensus')) {
    const btn = el('button', 'tab');
    btn.id = 'tab_consensus'; btn.dataset.svc = 'consensus';
    btn.onclick = () => switchTab('consensus');
    btn.innerHTML =
      `<span class="tab-dot" id="tdot_consensus" style="background:var(--consensus);--dot-c:var(--consensus)"></span>` +
      `<div class="tab-inner">Consensus<span class="tab-step" id="consensus-tab-step"></span></div>`;
    tabBar.appendChild(btn);

    const panel = el('div', 'tab-panel');
    panel.id = 'panel_consensus';
    panel.innerHTML =
      `<div class="conversation" id="conv_consensus"><div class="empty-state" id="empty_consensus">` +
      `<div class="empty-icon consensus-glyph">✦</div><div id="consensus-status">Consensus appears here after all models respond</div></div></div>`;
    panels.appendChild(panel);
  }
  if (!activeTab && sels().length) switchTab(sels()[0].id);
}
function switchTab(id) {
  activeTab = id;
  const color = id === 'consensus' ? 'var(--consensus)' : PROVIDERS[selById(id)?.provider]?.color;
  document.querySelectorAll('.tab').forEach(t => {
    const on = t.dataset.svc === id;
    t.classList.toggle('active', on);
    t.style.borderBottomColor = on ? color : 'transparent';
    t.style.color = on ? 'var(--text)' : '';
  });
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel_' + id));
}

// ── Stream a response into a tab ────────────────────────────────────────────
async function streamTo(sel, userContent) {
  const co = getConvo(sel.id);
  co.push({ role: 'user', content: userContent });

  const conv = $('conv_' + sel.id);
  $('empty_' + sel.id)?.remove();

  const pair = el('div', 'qa-pair');
  pair.innerHTML =
    `<div class="msg user"><span class="msg-label">You</span><div class="msg-bubble">${nl2br(userContent)}</div></div>` +
    `<div class="msg assistant"><span class="msg-label">${escapeHtml(selectionLabel(sel))}</span>` +
    `<div class="msg-bubble" id="bub_${sel.id}"><div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>`;
  conv.prepend(pair); conv.scrollTop = 0;

  const dot = $('tdot_' + sel.id); dot?.classList.add('loading');
  const bubble = $('bub_' + sel.id);
  let full = '';
  try {
    const gen = makeGen(sel, co, cfg);
    bubble.innerHTML = '';
    for await (const chunk of gen) { full += chunk; bubble.innerHTML = renderMarkdown(full); }
    if (!full) bubble.textContent = '(no response)'; else highlightBubble(bubble);
    co.push({ role: 'assistant', content: full });
    return full;
  } catch (err) {
    bubble.innerHTML = `<span class="msg-error">Error: ${escapeHtml(err.message)}</span>`;
    co.pop();
    return null;
  } finally {
    if (dot) { dot.classList.remove('loading'); dot.classList.add('done'); setTimeout(() => dot.classList.remove('done'), 350); }
  }
}

// ── Broadcast ───────────────────────────────────────────────────────────────
async function sendAll() {
  const text = $('promptInput').value.trim();
  if (!text) return;
  const list = sels();
  if (!list.length) { openConfig('models'); return; }

  lastPrompt = text; results = {}; order = [];
  $('promptInput').value = ''; $('promptInput').style.height = 'auto';
  $('sendBtn').disabled = true; $('responses').style.display = '';
  setChipsDisabled(true);
  pruneTabs(); ensureTabs();

  await Promise.allSettled(list.map(async sel => {
    const r = await streamTo(sel, text);
    order.push(sel.id); results[sel.id] = r;
  }));

  setConsensusDot(true);
  await runConsensus();
  setConsensusDot(false); setConsensusStep('');
  setChipsDisabled(false); $('sendBtn').disabled = false;
}

function resetApp() {
  Object.keys(convos).forEach(k => delete convos[k]);
  lastPrompt = ''; results = {}; order = [];
  document.querySelectorAll('.conversation').forEach(conv => {
    const id = conv.id.replace('conv_', '');
    const isCons = id === 'consensus';
    const label = isCons ? 'Consensus appears here after all models respond'
                         : `Send a prompt to see ${escapeHtml(selectionLabel(selById(id) || {}))}`;
    const icon = isCons ? `<div class="empty-icon consensus-glyph">✦</div>` : `<div class="empty-icon">◎</div>`;
    conv.innerHTML = `<div class="empty-state" id="empty_${id}">${icon}<div id="${isCons ? 'consensus-status' : ''}">${label}</div></div>`;
  });
  document.querySelectorAll('.tab-dot').forEach(d => d.classList.remove('loading', 'done'));
  setConsensusStep('');
  setChipsDisabled(false);
  $('promptInput').focus();
}

// ── Consensus tab helpers ───────────────────────────────────────────────────
const setConsensusStatus = (m) => { const e = $('consensus-status'); if (e) e.textContent = m; };
const setConsensusStep   = (l) => { const e = $('consensus-tab-step'); if (e) e.textContent = l || ''; };
function setConsensusDot(loading) {
  const dot = $('tdot_consensus'); if (!dot) return;
  if (loading) dot.classList.add('loading');
  else { dot.classList.remove('loading'); dot.classList.add('done'); setTimeout(() => dot.classList.remove('done'), 350); }
}
async function getSilentText(sel, messages) {
  let text = '';
  for await (const chunk of makeGen(sel, messages, cfg)) text += chunk;
  return text;
}
async function streamToConsensus(sel, messages) {
  const conv = $('conv_consensus');
  $('empty_consensus')?.remove();
  const pair = el('div', 'qa-pair');
  pair.innerHTML =
    `<div class="msg user"><span class="msg-label">You</span><div class="msg-bubble">${nl2br(lastPrompt)}</div></div>` +
    `<div class="msg assistant"><span class="msg-label">Consensus</span><div class="msg-bubble" id="consensus-bubble"></div></div>`;
  conv.prepend(pair); conv.scrollTop = 0;
  const bubble = $('consensus-bubble');
  let full = '';
  for await (const chunk of makeGen(sel, messages, cfg)) { full += chunk; bubble.innerHTML = renderMarkdown(full); conv.scrollTop = 0; }
  if (!full) bubble.textContent = '(no response)'; else highlightBubble(bubble);
  return full;
}
function showConsensusStatic(text, isError = false) {
  const conv = $('conv_consensus');
  $('empty_consensus')?.remove();
  const pair = el('div', 'qa-pair');
  pair.innerHTML =
    `<div class="msg user"><span class="msg-label">You</span><div class="msg-bubble">${nl2br(lastPrompt)}</div></div>` +
    `<div class="msg assistant"><span class="msg-label">Consensus</span>` +
    `<div class="msg-bubble">${isError ? `<span class="msg-error">${escapeHtml(text)}</span>` : renderMarkdown(text)}</div></div>`;
  conv.prepend(pair); conv.scrollTop = 0;
  if (!isError) highlightBubble(pair);
}
async function runConsensus() {
  const ordered = order.filter(id => results[id]).map(id => ({ selection: selById(id) || { id, provider: 'openai', model: '' }, text: results[id] }));
  const strat = activeStrategy(cfg);
  await runArbitration(strat, {
    prompt: lastPrompt,
    results: ordered,
    labelOf: (sel) => selectionLabel(sel),
    silent: (sel, msgs) => getSilentText(sel, msgs),
    stream: (sel, msgs) => streamToConsensus(sel, msgs),
    status: setConsensusStatus,
    step: setConsensusStep,
    showStatic: (t) => showConsensusStatic(t, false),
    fail: (t) => showConsensusStatic(t, true),
  });
}

// ════════════════════════════════════════════════════════════════════════════
//  SETTINGS MODAL  (live-persisting; sections: Models, Keys, Arbitration, Support)
// ════════════════════════════════════════════════════════════════════════════
function openConfig(section) {
  renderModels(); renderKeys(); renderArbitration(); renderDonate();
  $('configModal').classList.add('open');
  if (section) {
    const map = { models: 'sec-models', keys: 'sec-keys', arbitration: 'sec-arb', support: 'sec-support' };
    $(map[section])?.scrollIntoView({ block: 'start' });
  }
}
function closeConfig() { $('configModal').classList.remove('open'); }

// ── Models section ──────────────────────────────────────────────────────────
function modelOptionsHtml(providerId, selected) {
  const p = PROVIDERS[providerId];
  const known = p.models.some(m => m.value === selected);
  let html = '';
  if (selected && !known)
    html += `<option value="${escapeHtml(selected)}" selected>${escapeHtml(selected)} (custom)</option>`;
  html += p.models.map(m =>
    `<option value="${escapeHtml(m.value)}"${m.value === selected ? ' selected' : ''}>${escapeHtml(m.label)}${m.price ? ' — ' + m.price : ''}</option>`
  ).join('');
  if (p.allowCustomModel) html += `<option value="__custom__">Custom model id…</option>`;
  return html;
}
function renderModels() {
  const list = $('selList');
  list.innerHTML = '';
  (cfg.selections || []).forEach(sel => {
    const p = PROVIDERS[sel.provider]; if (!p) return;
    const hasKey = !!providerKey(cfg, sel.provider);
    const row = el('div', 'sel-row' + (hasKey ? '' : ' needs-key'));
    row.innerHTML =
      `<span class="sel-dot" style="background:${p.color}"></span>` +
      `<span class="sel-name">${escapeHtml(p.short)}</span>` +
      `<select class="field-input sel-model"></select>` +
      (hasKey ? '' : `<span class="sel-warn" title="Add an API key for ${escapeHtml(p.name)} below">no key</span>`) +
      `<button class="sel-x" title="Remove">×</button>`;
    const select = row.querySelector('.sel-model');
    select.innerHTML = modelOptionsHtml(sel.provider, sel.model);
    select.onchange = () => onSelModelChange(sel.id, sel.provider, select);
    row.querySelector('.sel-x').onclick = () => removeSelection(sel.id);
    list.appendChild(row);
  });
  if (!(cfg.selections || []).length)
    list.innerHTML = `<div class="muted-hint">No models yet — add one below.</div>`;
  renderAddRow();
}
function onSelModelChange(id, provider, select) {
  let val = select.value;
  if (val === '__custom__') {
    val = prompt(`Enter a ${PROVIDERS[provider].name} model id:`, '');
    if (!val) { renderModels(); return; }
  }
  const sel = selById(id); if (!sel) return;
  sel.model = val; persist();
  buildChips(); renderModels();
  const lbl = $('tab_' + id)?.querySelector('.tab-label');
  if (lbl) lbl.textContent = selectionLabel(sel);
}
function renderAddRow() {
  const area = $('addModelArea');
  const atMax = (cfg.selections || []).length >= MAX_SELECTIONS;
  if (atMax) { area.innerHTML = `<div class="muted-hint">Maximum of ${MAX_SELECTIONS} models reached.</div>`; return; }
  area.innerHTML =
    `<div class="add-row">` +
    `<select class="field-input" id="addProvider">${PROVIDER_IDS.map(id => `<option value="${id}">${escapeHtml(PROVIDERS[id].name)}</option>`).join('')}</select>` +
    `<select class="field-input" id="addModel"></select>` +
    `<button class="btn btn-solid" id="addModelBtn">Add</button>` +
    `</div><input class="field-input add-custom" id="addCustom" placeholder="custom model id" style="display:none">`;
  const provSel = $('addProvider'), modSel = $('addModel'), custom = $('addCustom');
  const refreshModels = () => {
    const pid = provSel.value;
    modSel.innerHTML = modelOptionsHtml(pid, defaultModel(pid));
    custom.style.display = 'none'; custom.value = '';
  };
  provSel.onchange = refreshModels;
  modSel.onchange = () => { custom.style.display = modSel.value === '__custom__' ? '' : 'none'; };
  $('addModelBtn').onclick = () => {
    const pid = provSel.value;
    let model = modSel.value;
    if (model === '__custom__') { model = custom.value.trim(); if (!model) { toast('Enter a model id'); return; } }
    cfg.selections = cfg.selections || [];
    cfg.selections.push(mkSelection(pid, model));
    persist(); buildChips(); renderModels();
    if (!providerKey(cfg, pid)) toast(`Added — add a ${PROVIDERS[pid].name} key to use it`);
  };
  refreshModels();
}

// ── Keys section ────────────────────────────────────────────────────────────
function renderKeys() {
  const wrap = $('keyFields');
  wrap.innerHTML = '';
  PROVIDER_IDS.forEach(id => {
    const p = PROVIDERS[id];
    const has = !!providerKey(cfg, id);
    const field = el('div', 'key-field');
    field.innerHTML =
      `<div class="key-head"><span class="svc-dot" style="background:${p.color}"></span>` +
      `<span class="key-name">${escapeHtml(p.name)}</span><span class="key-vendor">${escapeHtml(p.vendor)}</span>` +
      `<span class="key-status ${has ? 'on' : ''}">${has ? '● connected' : '○ no key'}</span></div>` +
      `<input type="password" class="field-input" id="key_${id}" placeholder="${escapeHtml(p.placeholder)}" autocomplete="off" value="${escapeHtml(providerKey(cfg, id))}">` +
      `<span class="field-hint">Key at <a href="${p.keyUrl}" target="_blank" rel="noopener">${escapeHtml(p.keyLabel)}</a>${p.rateNote ? ' · ' + escapeHtml(p.rateNote) : ''}</span>`;
    const input = field.querySelector('input');
    input.oninput  = () => { setProviderKey(cfg, id, input.value.trim()); persist(); };
    input.onchange = () => { buildChips(); renderModels(); refreshKeyStatus(id, !!input.value.trim()); };
    wrap.appendChild(field);
  });
}
function refreshKeyStatus(id, on) {
  const f = $('key_' + id)?.closest('.key-field')?.querySelector('.key-status');
  if (f) { f.textContent = on ? '● connected' : '○ no key'; f.classList.toggle('on', on); }
}

// ── Arbitration section ─────────────────────────────────────────────────────
function renderArbitration() {
  const wrap = $('arbControls');
  const strat = activeStrategy(cfg);
  const opts = allStrategies(cfg).map(s =>
    `<option value="${escapeHtml(s.id)}"${s.id === strat.id ? ' selected' : ''}>${escapeHtml(s.name)}${s.builtin ? '' : ' (custom)'}</option>`
  ).join('');
  const editable = !strat.builtin;
  const promptFields = Object.entries(strat.prompts || {}).map(([k, v]) =>
    `<label class="arb-plabel">${escapeHtml(k)}</label>` +
    `<textarea class="field-input arb-ptext" data-key="${escapeHtml(k)}" rows="4"${editable ? '' : ' readonly'}>${escapeHtml(v)}</textarea>`
  ).join('');

  wrap.innerHTML =
    `<select class="field-input" id="arbSelect">${opts}</select>` +
    `<div class="arb-desc">${escapeHtml(strat.description || '')}</div>` +
    `<div class="arb-meta">structure: <b>${escapeHtml(strat.structure)}</b> · arbiter: <b>${escapeHtml(strat.arbiter)}</b></div>` +
    `<details class="arb-prompts"${editable ? ' open' : ''}><summary>Prompt template${Object.keys(strat.prompts||{}).length > 1 ? 's' : ''}</summary>${promptFields}` +
      (editable ? `<input class="field-input" id="arbName" value="${escapeHtml(strat.name)}" placeholder="Strategy name">` : '') +
    `</details>` +
    `<div class="arb-actions">` +
      (editable
        ? `<button class="btn btn-ghost" id="arbSave">Save edits</button><button class="btn btn-danger" id="arbDelete">Delete</button>`
        : `<button class="btn btn-ghost" id="arbDup">Duplicate &amp; edit</button>`) +
      `<span class="arb-spacer"></span>` +
      `<button class="btn btn-ghost" id="arbExport">Export…</button>` +
      `<button class="btn btn-ghost" id="arbImport">Import…</button>` +
    `</div>`;

  $('arbSelect').onchange = (e) => { cfg.arbitration.activeId = e.target.value; persist(); renderArbitration(); };
  $('arbDup') && ($('arbDup').onclick = () => duplicateStrategy(strat));
  $('arbSave') && ($('arbSave').onclick = () => saveStrategyEdits(strat.id));
  $('arbDelete') && ($('arbDelete').onclick = () => deleteStrategy(strat.id));
  $('arbExport').onclick = openExport;
  $('arbImport').onclick = openImport;
}
function duplicateStrategy(strat) {
  const copy = JSON.parse(JSON.stringify(strat));
  copy.id = 'custom-' + Math.random().toString(36).slice(2, 8);
  copy.name = strat.name + ' (copy)';
  copy.builtin = false;
  cfg.arbitration.custom.push(copy);
  cfg.arbitration.activeId = copy.id;
  persist(); renderArbitration();
  toast('Custom strategy created — edit and save');
}
function saveStrategyEdits(id) {
  const s = cfg.arbitration.custom.find(x => x.id === id); if (!s) return;
  document.querySelectorAll('#arbControls .arb-ptext').forEach(t => { s.prompts[t.dataset.key] = t.value; });
  const name = $('arbName'); if (name && name.value.trim()) s.name = name.value.trim();
  persist(); renderArbitration(); toast('Strategy saved');
}
function deleteStrategy(id) {
  if (!confirm('Delete this custom strategy?')) return;
  cfg.arbitration.custom = cfg.arbitration.custom.filter(x => x.id !== id);
  if (cfg.arbitration.activeId === id) cfg.arbitration.activeId = 'sequential';
  persist(); renderArbitration();
}

// ── Export / Import settings ────────────────────────────────────────────────
function openExport() {
  const includeKeys = confirm('Include API keys in the export?\n\nOK = include keys (keep this file private)\nCancel = exclude keys (safe to share)');
  const json = exportSettings(cfg, { includeKeys });
  const blob = new Blob([json], { type: 'application/json' });
  const a = el('a'); a.href = URL.createObjectURL(blob);
  a.download = 'polecat-settings.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast(includeKeys ? 'Exported (with keys)' : 'Exported (no keys)');
}
function openImport() {
  const inp = el('input'); inp.type = 'file'; inp.accept = 'application/json,.json';
  inp.onchange = () => {
    const file = inp.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        cfg = importSettings(cfg, reader.result);
        persist();
        buildChips(); renderModels(); renderKeys(); renderArbitration();
        toast('Settings imported');
      } catch (e) { toast('Import failed: ' + e.message); }
    };
    reader.readAsText(file);
  };
  inp.click();
}

// ── Support / donate ────────────────────────────────────────────────────────
function renderDonate() {
  const wrap = $('donateArea');
  if (!wrap) return;
  const tiers = [['☕ $1', 1], ['$2', 2], ['$5', 5], ['More', '']];
  wrap.innerHTML =
    `<div class="donate-copy">Polecat is free and runs on your own API keys — tips just help offset hosting &amp; dev costs. Thank you! 🦡</div>` +
    `<div class="donate-row">` +
    tiers.map(([label]) => `<a class="donate-btn" href="${DONATE_URL}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`).join('') +
    `</div>`;
}

// ════════════════════════════════════════════════════════════════════════════
//  WELCOME TOUR
// ════════════════════════════════════════════════════════════════════════════
let _wslide = 1; const W_TOTAL = 3;
function showWelcome() { _wslide = 1; gotoWelcome(1); $('welcomeOverlay').classList.add('open'); }
function dismissWelcome(openCfg = false) {
  localStorage.setItem(WELCOME_KEY, '1');
  $('welcomeOverlay').classList.remove('open');
  if (openCfg) setTimeout(() => openConfig('keys'), 200);
  else if (!configuredProviders(cfg).length) setTimeout(() => openConfig('keys'), 400);
}
function welcomeNext() { if (_wslide < W_TOTAL) gotoWelcome(++_wslide, 'forward'); else dismissWelcome(true); }
function welcomeBack() { if (_wslide > 1) gotoWelcome(--_wslide, 'back'); }
function gotoWelcome(n, dir) {
  document.querySelectorAll('.welcome-slide').forEach((s, i) => {
    s.classList.remove('active', 'going-back');
    if (i + 1 === n) { if (dir === 'back') s.classList.add('going-back'); s.classList.add('active'); }
  });
  document.querySelectorAll('.wd').forEach((d, i) => d.classList.toggle('active', i + 1 === n));
  const nxt = $('wNext'); if (nxt) nxt.textContent = n === W_TOTAL ? 'Get Started →' : 'Next →';
  const bk = $('wBack'); if (bk) bk.style.visibility = n > 1 ? 'visible' : 'hidden';
}

// ════════════════════════════════════════════════════════════════════════════
//  INIT + EVENT WIRING
// ════════════════════════════════════════════════════════════════════════════
function init() {
  if (typeof marked !== 'undefined') marked.setOptions({ breaks: true, gfm: true });
  applyTheme(localStorage.getItem('polecat_theme') || 'dark');
  buildChips();

  $('configBtn').onclick  = () => openConfig();
  $('closeConfig').onclick = closeConfig;
  $('doneConfig').onclick  = closeConfig;
  $('configModal').onclick = (e) => { if (e.target === $('configModal')) closeConfig(); };
  $('tourBtn').onclick = () => { closeConfig(); setTimeout(showWelcome, 200); };

  $('clearKeys').onclick = () => {
    if (!confirm('Remove all saved API keys? (Your model picks and strategies stay.)')) return;
    cfg.providers = {}; persist();
    renderKeys(); buildChips(); renderModels();
    toast('Keys cleared');
  };

  $('resetBtn').onclick = () => {
    if (order.length || Object.keys(results).length) {
      if (!confirm('Start a new chat? This clears all current responses.')) return;
    }
    resetApp();
  };

  $('sendBtn').onclick = sendAll;
  $('promptInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); sendAll(); }
  });
  $('promptInput').addEventListener('input', function () {
    this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 260) + 'px';
  });

  $('themeBtn').onclick = () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');

  // welcome controls
  $('wNext').onclick = welcomeNext; $('wBack').onclick = welcomeBack;
  $('wSkip').onclick = () => dismissWelcome(); $('wClose').onclick = () => dismissWelcome();
  $('wDonate') && ($('wDonate').onclick = () => window.open(DONATE_URL, '_blank', 'noopener'));

  const hasKeys = configuredProviders(cfg).length > 0;
  const seen = !!localStorage.getItem(WELCOME_KEY);
  if (!hasKeys && !seen) setTimeout(showWelcome, 350);
  else if (!hasKeys) setTimeout(() => openConfig('keys'), 400);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
