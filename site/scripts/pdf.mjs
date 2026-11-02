// Renders the three workbooks to PDF with Playwright (run locally: `npm run build && npm run pdf`).
// The PDFs are saved to public/members/workbook/ so the next build ships them to members.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = await import('playwright')); }

const out = path.join(root, 'public', 'members', 'workbook');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const lang of ['en', 'pt', 'es']) {
  const file = path.join(root, 'dist', 'members', 'workbook', `${lang}.html`);
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(out, `${lang}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('PDF', lang, (fs.statSync(path.join(out, `${lang}.pdf`)).size / 1024).toFixed(0) + ' KB');
}
await browser.close();
