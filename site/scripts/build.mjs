// Builds the static site into ./dist
//   /             → language redirect
//   /en/ /pt/ /es/            landing pages
//   /{lang}/login/ /{lang}/thanks/
//   /members/{lang}/          members dashboard (protected by edge function)
//   /members/course/*.html    course lessons (from ../course/*.md)
//   /members/workbook/{lang}.html (+ .pdf when generated with `npm run pdf`)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import site from '../src/content/site.mjs';
import config from '../site.config.mjs';
import { renderWorkbook } from './workbook-template.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const courseDir = path.resolve(root, '..', 'course');
const LANGS = ['en', 'pt', 'es'];
const year = new Date().getFullYear();

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function write(rel, html) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">';

function head({ lang, title, description, noindex, alternates }) {
  const alt = alternates
    ? LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${config.siteUrl}${alternates(l)}">`).join('') +
      `<link rel="alternate" hreflang="x-default" href="${config.siteUrl}${alternates('en')}">`
    : '';
  return `<!doctype html><html lang="${lang === 'pt' ? 'pt-BR' : lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description || '')}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description || '')}"><meta property="og:type" content="website">
<meta name="theme-color" content="#f6f1e9">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">${alt}
${FONTS}<link rel="stylesheet" href="/assets/site.css"></head>`;
}

function langSwitch(lang, hrefFor) {
  return `<nav class="langs" aria-label="Language">${LANGS.map((l) =>
    `<a href="${hrefFor(l)}" hreflang="${l}" data-lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('')}</nav>`;
}

function header(lang, t, hrefFor, { landing = true } = {}) {
  const base = `/${lang}/`;
  const links = landing
    ? `<a class="hide-sm" href="#method">${t.nav.method}</a><a class="hide-sm" href="#inside">${t.nav.inside}</a><a class="hide-sm" href="#pricing">${t.nav.pricing}</a><a class="hide-sm" href="#faq">${t.nav.faq}</a>`
    : '';
  return `<header class="site-header"><div class="wrap">
<a class="wordmark" href="${base}">Mise <i>en</i> Place</a>
<div class="nav">${links}<a href="/members/${lang}/">${t.nav.members}</a>${langSwitch(lang, hrefFor)}</div>
</div></header>`;
}

function footer(lang, t) {
  return `<footer class="site-footer rule"><div class="wrap">
<span>© ${year} ${esc(config.brand)}. ${t.footer.rights}</span>
<span><a href="/members/${lang}/">${t.footer.members}</a> · <a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a></span>
</div></footer><script src="/assets/site.js" defer></script></body></html>`;
}

function newsletterForm(lang, t) {
  const nl = config.newsletter;
  const isNetlify = nl.provider === 'netlify';
  const action = isNetlify ? `/${lang}/thanks/` : esc(nl.action);
  return `<form class="form" name="newsletter" method="POST" action="${action}"${isNetlify ? ' data-netlify="true" netlify-honeypot="company"' : ''}>
${isNetlify ? '<input type="hidden" name="form-name" value="newsletter">' : ''}
<input type="hidden" name="language" value="${lang}">
<p class="hp"><label>Company <input name="company" tabindex="-1" autocomplete="off"></label></p>
<label for="nl-name-${lang}">${t.newsletter.name}</label><input class="field" id="nl-name-${lang}" name="${nl.fields.name}" autocomplete="given-name">
<label for="nl-email-${lang}">${t.newsletter.email}</label><input class="field" id="nl-email-${lang}" name="${nl.fields.email}" type="email" required autocomplete="email">
<label class="consent"><input type="checkbox" name="consent" value="yes" required> ${t.newsletter.consent}</label>
<div><button class="btn brass" type="submit">${t.newsletter.submit} <span class="arrow">→</span></button></div>
</form>`;
}

// ---------- Landing ----------
function landing(lang) {
  const t = site[lang];
  const hrefFor = (l) => `/${l}/`;
  const today = { en: 'Today', pt: 'Hoje', es: 'Hoy' }[lang];
  const good = { en: 'Today will be a good day if…', pt: 'Hoje vai ser um bom dia se…', es: 'Hoy será un buen día si…' }[lang];
  const mock = {
    en: [['Send the advisor proposal', 'Must · 09:00–10:30'], ['Final tasting of the winter menu', 'With the team · 15:00'], ['Train, 45 minutes', 'Before the inbox']],
    pt: [['Enviar a proposta aos agentes', 'Essencial · 09h–10h30'], ['Prova final do cardápio de inverno', 'Com a equipe · 15h'], ['Treino, 45 minutos', 'Antes dos e-mails']],
    es: [['Enviar la propuesta a las agencias', 'Esencial · 09:00–10:30'], ['Cata final de la carta de invierno', 'Con el equipo · 15:00'], ['Entrenar, 45 minutos', 'Antes del correo']],
  }[lang];
  const footNote = { en: ['Protected block', '09:00 – 10:30'], pt: ['Bloco protegido', '09h – 10h30'], es: ['Bloque protegido', '09:00 – 10:30'] }[lang];

  return `${head({ lang, title: t.meta.title, description: t.meta.description, alternates: (l) => `/${l}/` })}<body>
${header(lang, t, hrefFor)}
<main>
<section class="hero"><div class="wrap">
  <div class="reveal">
    <p class="eyebrow">${t.hero.eyebrow}</p>
    <h1>${t.hero.title}</h1>
    <p class="sub">${t.hero.sub}</p>
    <div class="actions"><a class="btn" href="#pricing">${t.hero.cta} <span class="arrow">→</span></a><a class="btn ghost" href="#letter">${t.hero.secondary}</a></div>
  </div>
  <div class="card-mock reveal" aria-hidden="true">
    <div class="head"><span>${today}</span><span>Mise en Place</span></div>
    <p class="q">${good}</p>
    <ol>${mock.map(([a, b], i) => `<li><div>${esc(a)}<small>${esc(b)}</small></div><span class="box${i === 0 ? ' done' : ''}"></span></li>`).join('')}</ol>
    <div class="foot"><span>${footNote[0]}</span><span>${footNote[1]}</span></div>
  </div>
</div></section>

<section class="problem rule"><div class="wrap">
  <h2 class="reveal">${t.problem.title}</h2>
  <div class="reveal">${t.problem.body.map((p) => `<p>${p}</p>`).join('')}</div>
</div></section>

<section class="method" id="method"><div class="wrap">
  <p class="eyebrow">${t.method.eyebrow}</p>
  <h2 class="reveal">${t.method.title}</h2>
  <div class="trio">${t.method.items.map((m, i) => `<article class="reveal"><div class="k">${['I', 'II', 'III'][i]}</div><h3>${m.k} — <i>${m.q}</i></h3><p>${m.d}</p></article>`).join('')}</div>
</div></section>

<section id="inside"><div class="wrap">
  <p class="eyebrow">${t.inside.eyebrow}</p>
  <h2 class="reveal">${t.inside.title}</h2>
  <p class="lead">${t.inside.sub}</p>
  <ol class="modules">${t.inside.modules.map(([h, d]) => `<li class="reveal"><h3>${h}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>

<section class="rule"><div class="wrap">
  <p class="eyebrow">${t.includes.eyebrow}</p>
  <h2 class="reveal">${t.includes.title}</h2>
  <div class="grid3">${t.includes.items.map(([h, d]) => `<div class="reveal"><h3>${h}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>

<section class="dark"><div class="wrap">
  <h2 class="reveal">${t.audience.title}</h2>
  <ul class="ticks">${t.audience.items.map((i) => `<li>${i}</li>`).join('')}</ul>
</div></section>

<section><div class="wrap two">
  <div class="reveal">
    <p class="eyebrow">${t.sources.eyebrow}</p>
    <h2>${t.sources.title}</h2>
    <p>${t.sources.body}</p>
    <p class="small-note">${t.sources.note}</p>
  </div>
  <div class="reveal">
    <p class="eyebrow">${t.author.eyebrow}</p>
    <h2>${t.author.title}</h2>
    ${t.author.body.map((p) => `<p>${p}</p>`).join('')}
    <p class="signature">${t.author.sign}</p>
  </div>
</div></section>

<section class="pricing" id="pricing"><div class="wrap center">
  <p class="eyebrow">${t.pricing.eyebrow}</p>
  <h2 class="reveal">${t.pricing.title}</h2>
  <div class="price-card reveal">
    <p class="price">${esc(config.price[lang])}</p>
    <p class="period">${t.pricing.period}</p>
    <ul>${t.pricing.list.map((i) => `<li>${i}</li>`).join('')}</ul>
    <a class="btn" style="width:100%" href="${esc(config.checkoutUrl[lang])}">${t.pricing.cta} <span class="arrow">→</span></a>
    ${config.guarantee[lang] ? `<p class="fine">${esc(config.guarantee[lang])}</p>` : ''}
    <p class="fine">${t.pricing.after}</p>
  </div>
</div></section>

<section class="faq" id="faq"><div class="wrap narrow">
  <h2 class="reveal">${t.faq.title}</h2>
  ${t.faq.items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
</div></section>

<section class="dark letter" id="letter"><div class="wrap">
  <div>
    <p class="eyebrow">${t.newsletter.eyebrow}</p>
    <h2>${t.newsletter.title}</h2>
    <p>${t.newsletter.body}</p>
  </div>
  ${newsletterForm(lang, t)}
</div></section>
</main>
${footer(lang, t)}`;
}

// ---------- Simple pages ----------
function thanks(lang) {
  const t = site[lang];
  return `${head({ lang, title: `${t.thanks.title} — ${config.brand}`, noindex: true })}<body>
${header(lang, t, (l) => `/${l}/thanks/`, { landing: false })}
<main class="page"><div class="panel"><h1>${t.thanks.title}</h1><p>${t.thanks.body}</p><a class="btn ghost" href="/${lang}/">${t.thanks.back}</a></div></main>
${footer(lang, t)}`;
}

function login(lang) {
  const t = site[lang];
  return `${head({ lang, title: `${t.login.title} — ${config.brand}`, noindex: true })}<body>
${header(lang, t, (l) => `/${l}/login/`, { landing: false })}
<main class="page"><div class="panel">
<h1>${t.login.title}</h1><p>${t.login.body}</p>
<div class="error" data-login-error hidden>${t.login.error}</div>
<form class="form" method="POST" action="/api/login">
<input type="hidden" name="lang" value="${lang}">
<label for="em">${t.login.email}</label><input class="field" id="em" name="email" type="email" required autocomplete="email">
<label for="cd">${t.login.code}</label><input class="field" id="cd" name="code" required autocomplete="one-time-code">
<div><button class="btn" type="submit">${t.login.submit} <span class="arrow">→</span></button></div>
</form>
<p class="small-note">${t.login.noAccess} <a href="/${lang}/#pricing">${t.login.enrol}</a></p>
</div></main>
${footer(lang, t)}`;
}

// ---------- Course lessons (English) ----------
const lessonFiles = [
  ['README.md', 'overview', 'Course overview'],
  ['modules/00-orientation.md', '00-orientation'],
  ['modules/01-planning-as-design.md', '01-planning-as-design'],
  ['modules/02-why-lists-fail.md', '02-why-lists-fail'],
  ['modules/03-the-three-questions.md', '03-the-three-questions'],
  ['modules/04-capture-to-commitment.md', '04-capture-to-commitment'],
  ['modules/05-leverage.md', '05-leverage'],
  ['modules/06-time-focus-state.md', '06-time-focus-state'],
  ['modules/07-the-long-game.md', '07-the-long-game'],
  ['examples/worked-examples.md', 'worked-examples'],
  ['30-day-plan.md', '30-day-plan'],
  ['prompts.md', 'prompts'],
  ['sources.md', 'sources'],
  ['tools/life-map.md', 'tool-life-map'],
  ['tools/weekly-mise-en-place.md', 'tool-weekly-mise-en-place'],
  ['tools/daily-card.md', 'tool-daily-card'],
  ['tools/leverage-ledger.md', 'tool-leverage-ledger'],
  ['tools/quarterly-review.md', 'tool-quarterly-review'],
];
const slugByFile = Object.fromEntries(lessonFiles.map(([f, s]) => [path.normalize(f), s]));

function lessons() {
  const out = [];
  for (const [file, slug] of lessonFiles) {
    const src = path.join(courseDir, file);
    if (!fs.existsSync(src)) continue;
    const md = fs.readFileSync(src, 'utf8');
    const title = (md.match(/^#\s+(.+)$/m) || [, slug])[1].replace(/[*_]/g, '');
    // Rewrite links between markdown files to lesson pages.
    const renderer = new marked.Renderer();
    const baseLink = renderer.link.bind(renderer);
    renderer.link = (href, ttl, text) => {
      if (href && /\.md(#.*)?$/.test(href) && !/^https?:/.test(href)) {
        const [p, hash] = href.split('#');
        const target = path.normalize(path.join(path.dirname(file), p));
        const s = slugByFile[target];
        if (s) href = `/members/course/${s}.html${hash ? '#' + hash : ''}`;
      }
      return baseLink(href, ttl, text);
    };
    renderer.heading = (text, level, raw) => {
      const id = raw.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');
      return `<h${level} id="${id}">${text}</h${level}>`;
    };
    const html = marked.parse(md, { renderer, gfm: true });
    out.push({ file, slug, title, html });
  }
  out.forEach((l, i) => {
    const prev = out[i - 1], next = out[i + 1];
    const t = site.en;
    write(`members/course/${l.slug}.html`, `${head({ lang: 'en', title: `${l.title} — ${config.brand}`, noindex: true })}<body>
${header('en', t, (x) => `/members/${x}/`, { landing: false })}
<main class="lesson"><div class="wrap">
<p class="crumbs"><a href="/members/en/">Members</a> · Course</p>
<article>${l.html}</article>
<nav class="lesson-nav">${prev ? `<a href="/members/course/${prev.slug}.html">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="/members/course/${next.slug}.html">${esc(next.title)} →</a>` : ''}</nav>
</div></main>
${footer('en', t)}`);
  });
  return out;
}

// ---------- Members dashboard ----------
function members(lang, lessonList) {
  const t = site[lang];
  const m = t.members;
  const coreLessons = lessonList.filter((l) => /^(overview|0\d-)/.test(l.slug));
  const resources = lessonList.filter((l) => ['worked-examples', '30-day-plan', 'prompts', 'sources'].includes(l.slug));
  const tools = lessonList.filter((l) => l.slug.startsWith('tool-'));
  const list = (arr, numbered) => `<ul class="lesson-list">${arr.map((l, i) => `<li><a href="/members/course/${l.slug}.html"><span>${numbered ? (l.slug === 'overview' ? '—' : l.slug.slice(0, 2)) : '·'}</span><strong>${esc(l.title)}</strong></a></li>`).join('')}</ul>`;
  const pdfExists = (l) => fs.existsSync(path.join(root, 'public', 'members', 'workbook', `${l}.pdf`));
  return `${head({ lang, title: `${m.title} — ${config.brand}`, noindex: true })}<body>
${header(lang, t, (l) => `/members/${l}/`, { landing: false })}
<main>
<section class="m-hero"><div class="wrap"><p class="eyebrow">${t.nav.members}</p><h1>${m.title}</h1><p class="lead">${m.sub}</p></div></section>
<div class="wrap m-grid">
  <div>
    <div class="m-card"><h2>${m.start}</h2><p>${m.startBody}</p><a class="btn" href="/members/course/00-orientation.html">${coreLessons[1] ? esc(coreLessons[1].title) : 'Orientation'} <span class="arrow">→</span></a></div>
    <div class="m-card"><h2>${m.course}</h2>${lang !== 'en' ? `<p class="note">${m.courseNote}</p>` : ''}${list(coreLessons, true)}</div>
  </div>
  <div>
    <div class="m-card"><h2>${m.workbook}</h2><p>${m.workbookBody}</p>
      ${LANGS.map((l) => `<div class="wb-row"><strong>${site[l].langName}</strong><a href="/members/workbook/${l}.html">${m.open}</a>${pdfExists(l) ? `<a href="/members/workbook/mise-en-place-workbook-${l}.pdf" download>${m.pdf}</a>` : '<span></span>'}</div>`).join('')}
    </div>
    <div class="m-card"><h2>${m.resources}</h2>${list(resources)}<h3 style="margin-top:28px">${m.tools}</h3>${list(tools)}</div>
    <p class="note" style="margin-top:24px"><a href="/api/logout">${m.logout}</a></p>
  </div>
</div>
</main>
${footer(lang, t)}`;
}

// ---------- Root redirect ----------
function rootPage() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(config.brand)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>(function(){var l=(navigator.language||'en').slice(0,2).toLowerCase();location.replace('/'+(l==='pt'||l==='es'?l:'en')+'/');})();</script>
<noscript><meta http-equiv="refresh" content="0; url=/en/"></noscript>
<link rel="canonical" href="${config.siteUrl}/en/"></head><body style="background:#f6f1e9"><p><a href="/en/">English</a> · <a href="/pt/">Português</a> · <a href="/es/">Español</a></p></body></html>`;
}

// ---------- Run ----------
fs.rmSync(dist, { recursive: true, force: true });
copyDir(path.join(root, 'public'), dist);
// PDFs keep a descriptive download name.
for (const l of LANGS) {
  const p = path.join(dist, 'members', 'workbook', `${l}.pdf`);
  if (fs.existsSync(p)) fs.renameSync(p, path.join(dist, 'members', 'workbook', `mise-en-place-workbook-${l}.pdf`));
}
write('index.html', rootPage());
const lessonList = lessons();
for (const lang of LANGS) {
  write(`${lang}/index.html`, landing(lang));
  write(`${lang}/thanks/index.html`, thanks(lang));
  write(`${lang}/login/index.html`, login(lang));
  write(`members/${lang}/index.html`, members(lang, lessonList));
  const wb = (await import(`../src/content/workbook.${lang}.mjs`)).default;
  write(`members/workbook/${lang}.html`, renderWorkbook(wb, { fonts: FONTS }));
}
write('members/index.html', `<!doctype html><meta http-equiv="refresh" content="0; url=/members/en/">`);
write('login/index.html', `<!doctype html><meta http-equiv="refresh" content="0; url=/en/login/">`);
write('404.html', `${head({ lang: 'en', title: `Page not found — ${config.brand}`, noindex: true })}<body>${header('en', site.en, (l) => `/${l}/`, { landing: false })}<main class="page"><div class="panel"><h1>Not on the menu.</h1><p>That page doesn’t exist. <a href="/en/">Back to the course</a> · <a href="/pt/">Português</a> · <a href="/es/">Español</a></p></div></main>${footer('en', site.en)}`);
console.log(`Built ${lessonList.length} lessons, 3 landing pages, 3 workbooks → dist/`);
