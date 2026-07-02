// Generate js/changelog.js (the published, relay-style ES module) from the
// site's working source, CHANGELOG.md. This publishes a machine-readable
// changelog at /js/changelog.js — matching the convention used across the other
// Polecat properties (e.g. relay.polecat.live/js/changelog.js) — always in sync
// with CHANGELOG.md, with zero hand-maintenance.
//
// Run it after editing CHANGELOG.md (the hourly self-improve loop does this):
//   node scripts/gen-changelog.mjs
//
// CHANGELOG.md entry shape it parses:
//   ## 2026-06-28 22:00 CT (43)
//   - **Lead in bold** — description...
//   - another bullet
//
// Output (newest first): export const CHANGELOG = [ { v, title, ts, items }, ... ]
// where `ts` is an ISO-8601 UTC string derived from the entry's Central time.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const md = readFileSync(join(root, 'CHANGELOG.md'), 'utf8').split('\n');

// Wall-clock Central time -> real UTC instant, honouring US DST at that date.
function ctToUtcISO(dateStr, timeStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr || '');
  if (!m) return '';
  const [, y, mo, d] = m.map(Number);
  const hm = /(\d{1,2}):(\d{2})/.exec(timeStr || '') || [null, '12', '00'];
  const h = Number(hm[1]), mi = Number(hm[2]);
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  const offsetMin = (instant) => {
    const p = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).formatToParts(instant).reduce((a, x) => (a[x.type] = x.value, a), {});
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return (asUTC - instant.getTime()) / 60000;
  };
  let ts = wall;
  for (let i = 0; i < 2; i++) ts = wall - offsetMin(new Date(ts)) * 60000;
  return new Date(ts).toISOString();
}

// Accepts all three historical header shapes:
//   ## 2026-06-28 22:00 CT (43)   — date + time + version
//   ## 2026-06-27 (20)            — date + version (no time → defaults to noon CT)
//   ## 2026-06-26                 — date only (genesis entry, version 1)
const HDR = /^##\s+(\d{4}-\d{2}-\d{2})(?:\s+(\d{1,2}:\d{2})\s*CT)?(?:\s*\((\d+)\))?\s*$/;
const entries = [];
let cur = null;
for (const line of md) {
  const h = HDR.exec(line);
  if (h) { cur = { date: h[1], time: h[2] || '', v: h[3] ? Number(h[3]) : 1, items: [] }; entries.push(cur); continue; }
  if (cur && /^\s*-\s+/.test(line)) cur.items.push(line.replace(/^\s*-\s+/, '').trim());
}

// Title = the first bullet's bold lead (e.g. "App: stance badges on model tabs"),
// falling back to the first several words. Items keep their text, minus md bold.
const stripBold = (s) => s.replace(/\*\*/g, '').trim();
function titleOf(items) {
  if (!items.length) return 'Update';
  const b = /^\*\*(.+?)\*\*/.exec(items[0]);
  const t = b ? b[1] : items[0].split(/\s[—-]\s/)[0];
  return stripBold(t).replace(/[\s:—-]+$/, '').trim() || 'Update';
}

const out = entries.map(e => ({
  v: e.v,
  title: titleOf(e.items),
  ts: ctToUtcISO(e.date, e.time),
  items: e.items.map(stripBold),
}));

// Serialize as a SINGLE-quoted JS string literal — the fleet convention the
// Polecat manager's changelog sync parses. Double quotes are left literal; only
// backslashes, apostrophes and newlines are escaped. (JSON.stringify's
// double-quoted output looked valid but the manager only reads single-quoted.)
function jsStr(s) {
  return "'" + String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n') + "'";
}

const body = out.map(e =>
  '  {\n' +
  `    v: ${e.v},\n` +
  `    title: ${jsStr(e.title)},\n` +
  `    ts: ${jsStr(e.ts)},\n` +
  '    items: [\n' +
  e.items.map(it => `      ${jsStr(it)},\n`).join('') +
  '    ],\n' +
  '  },'
).join('\n');

const header =
  '// AUTO-GENERATED — do not edit by hand. Source: CHANGELOG.md.\n' +
  '// Regenerate with:  node scripts/gen-changelog.mjs\n' +
  '// Published changelog for the Polecat fleet manager at /js/changelog.js.\n' +
  '// Entries are newest-first; `ts` is an ISO-8601 UTC string.\n';

mkdirSync(join(root, 'js'), { recursive: true });
writeFileSync(join(root, 'js', 'changelog.js'), `${header}export const CHANGELOG = [\n${body}\n];\n`);
console.log(`gen-changelog: wrote js/changelog.js (${out.length} entries).`);
