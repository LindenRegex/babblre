import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const CASES_LIST = JSON.parse(readFileSync(new URL('../web/cases.json', import.meta.url), 'utf8'));
const SOURCE_ORDER = [...new Set(CASES_LIST.map((c) => c.source))];
const FEATURED = CASES_LIST.filter((c) => c.featured);
const CORE_MIN = 18, TOTAL_MIN = 60;

async function openMatrix(page) {
  await page.goto('/web/index.html');
  await page.waitForFunction((min) => document.querySelectorAll('table.mtx tbody tr').length >= min, CORE_MIN, { timeout: 60000 });
  return page.locator('table.mtx tbody tr').count();
}
const cell = (page, engine, c) => page.locator(`[data-engine="${engine}"][data-case="${c}"]`);
const exact = (s) => new RegExp('^' + s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$');
async function showAll(page) {
  if (!FEATURED.length) return;
  for (const s of SOURCE_ORDER) await page.locator('.srcfilter button', { hasText: exact(s) }).click();
  await page.locator('.srcfilter button', { hasText: exact('default') }).click();
}

test('home (swapped matrix): core engines render; selector lists the roster; C1 captures; D1 empty group', async ({ page }) => {
  const n = await openMatrix(page);
  await showAll(page);
  expect(n).toBeGreaterThanOrEqual(CORE_MIN);
  expect(await page.locator('.selector .chk').count()).toBeGreaterThanOrEqual(TOTAL_MIN);
  await expect(cell(page, 'boost-posix', 'live')).toHaveCount(1);
  await expect(cell(page, 'boost-posix', 'C1').locator('.g[data-g="1"]')).toHaveText('ba');
  await expect(cell(page, 'boost-pcre', 'C1').locator('.g[data-g="1"]')).toHaveText('a');
  await expect(cell(page, 'boost-posix', 'D1').locator('.g.empty[data-g="2"]')).toBeVisible();
  const nameLink = page.locator('table.mtx tbody th.enghead .library a.liblink').first();
  await expect(nameLink).toHaveAttribute('target', '_blank');
  await expect(nameLink).toHaveAttribute('href', /^https?:\/\//);
  await expect(page.locator('.selector .chk a.extlink').first()).toHaveAttribute('target', '_blank');
});

test('on-demand select: accept/reject ✓/✗ + group-0 in the live column', async ({ page }) => {
  await openMatrix(page);
  await page.fill('#re', 'a.c'); await page.fill('#str', 'abc');
  await expect(cell(page, 'tiny-regex-c', 'live').locator('.g[data-g="0"]')).toHaveText('abc');
  await expect(page.locator('[data-engine="subreg"]')).toHaveCount(0);
  await page.locator('.selector .chk', { hasText: 'subreg' }).locator('input').check();
  await expect(cell(page, 'subreg', 'live').locator('.boolmark.yes')).toHaveText('✓');
  await page.fill('#str', 'xyz');
  await expect(cell(page, 'subreg', 'live').locator('.boolmark.no')).toHaveText('✗');
});

test('catastrophic input: engine limit vs native timeout, then the worker recovers', async ({ page }) => {
  await openMatrix(page);
  await page.fill('#re', '(a+)+$');
  await page.fill('#str', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
  await expect(cell(page, 'boost-posix', 'live').locator('.note.limit')).toBeVisible();
  await expect(cell(page, 'actual-ecma', 'live').locator('.note.killed')).toContainText('timeout');
  await page.fill('#re', 'a.c'); await page.fill('#str', 'abc');
  await expect(cell(page, 'actual-ecma', 'live').locator('.g[data-g="0"]')).toHaveText('abc');
});

test('each separately-built runtime loads on demand and matches', async ({ page }) => {
  test.setTimeout(480000);
  await openMatrix(page);
  await showAll(page);
  // one engine per lazily-loaded module
  for (const [label, id] of [
    ['regex-tdfa', 'regex-tdfa'],            // GHC wasm reactor
    ['java.util.regex', 'java-util'],        // TeaVM module
    ['Swift Regex', 'swift-regex'],          // SwiftWasm reactor
    ['ICU', 'icu'],
    ['memoized backtracking', 'memo-regex'],
    ['REmatch', 'rematch'],
    ['re2c / TDFA', 're2c-tdfa'],
    ['NonBacktracking', 'dotnet-nb'],        // .NET runtime
    ['CPython re', 'python-re'],             // Pyodide
  ]) {
    await page.locator('.selector .chk', { hasText: label }).locator('input').check();
    await expect(cell(page, id, 'A1').locator('.g[data-g="0"]').first()).toBeVisible({ timeout: 120000 });
  }
});
