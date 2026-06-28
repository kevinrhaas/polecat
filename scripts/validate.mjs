#!/usr/bin/env node
// validate.mjs — pre-commit / CI guard for the Polecat marketing site.
//
// The site is static HTML/CSS. Its production-breaking bug class is curly/"smart"
// quotes used as HTML *attribute delimiters* — e.g. class=”pcx” — which browsers
// can't match to CSS selectors, so the section renders as unstyled raw text. This
// silently broke the homepage examples section before. Smart quotes are also fatal
// inside <style> and <script> blocks. (Smart quotes in visible prose are fine and
// intentional — we only flag them where they break rendering.)
//
// Usage:  node scripts/validate.mjs        (exit 0 = clean, 1 = problems)

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SMART = /[‘’“”]/;
const ATTR_SMART = /=\s*[‘’“”]/;        // attribute opened with a smart quote
const problems = [];

function htmlFiles(dir = '.') {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function checkHtml(file) {
  const lines = readFileSync(file, 'utf8').split('\n');
  // Track whether we're inside a <style> or <script> block (smart quotes fatal there).
  let inCode = null; // 'style' | 'script' | null
  lines.forEach((line, i) => {
    const ln = i + 1;
    if (ATTR_SMART.test(line)) {
      problems.push(`Smart-quote HTML attribute in ${file}:${ln}  →  ${line.trim().slice(0, 100)}`);
    }
    const lower = line.toLowerCase();
    if (!inCode && /<style[\s>]/.test(lower)) inCode = 'style';
    if (!inCode && /<script[\s>]/.test(lower)) inCode = 'script';
    if (inCode && SMART.test(line)) {
      problems.push(`Smart quote inside <${inCode}> in ${file}:${ln}  →  ${line.trim().slice(0, 100)}`);
    }
    if (inCode === 'style' && lower.includes('</style>')) inCode = null;
    if (inCode === 'script' && lower.includes('</script>')) inCode = null;
  });
}

for (const f of htmlFiles()) checkHtml(f);

if (problems.length) {
  console.error(`\n✗ validate.mjs found ${problems.length} problem(s):\n`);
  for (const p of problems) console.error('  • ' + p + '\n');
  console.error('Replace smart quotes (‘ ’ “ ”) with straight ASCII (\' ") before committing.\n');
  process.exit(1);
}
console.log('✓ validate.mjs: no smart quotes in HTML attributes or style/script blocks.');
