// Renders a workbook content object into a print-ready A4 HTML document.
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function field(f) {
  switch (f.t) {
    case 'lines':
      return `<div class="f">${f.label ? `<p class="lbl">${esc(f.label)}</p>` : ''}${'<div class="ln"></div>'.repeat(f.n || 1)}</div>`;
    case 'list':
      return `<ol class="f flist">${Array.from({ length: f.n }, () => `<li>${f.prefix ? `<span>${esc(f.prefix)}</span>` : ''}</li>`).join('')}</ol>`;
    case 'scale':
      return `<table class="f scale"><tbody>${f.items.map((it) => `<tr><td>${esc(it)}</td><td class="dots">${[1, 2, 3, 4, 5].map((n) => `<span>${n}</span>`).join('')}</td></tr>`).join('')}</tbody></table>`;
    case 'check':
      return `<ul class="f check">${f.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    case 'grid':
      return `<table class="f grid"><thead><tr><th></th>${f.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${f.rows.map((r) => `<tr><th>${esc(r)}</th>${f.cols.map(() => '<td></td>').join('')}</tr>`).join('')}</tbody></table>`;
    case 'table':
      return `<div class="f">${f.label ? `<p class="lbl">${esc(f.label)}</p>` : ''}<table class="tbl${f.tall ? ' tall' : ''}"><thead><tr>${f.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: f.rows }, () => `<tr>${f.cols.map(() => '<td></td>').join('')}</tr>`).join('')}</tbody></table></div>`;
    default:
      return '';
  }
}

const CSS = `
:root{--paper:#fbf8f3;--ink:#1f1b16;--ink2:#4a4239;--muted:#7a6f63;--line:#d9cdbb;--soft:#efe7da;--esp:#2e211a;--brass:#a8834f;--brass2:#c9a774;
--serif:'Cormorant Garamond','Times New Roman',serif;--sans:'Inter',system-ui,sans-serif}
*{box-sizing:border-box}
html{background:#e7e0d5}
body{margin:0;font:400 10.5pt/1.55 var(--sans);color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.doc{max-width:210mm;margin:0 auto;background:var(--paper)}
.sheet{padding:20mm 18mm 18mm;break-before:page;position:relative}
@page{size:A4;margin:16mm 16mm 18mm;
  @bottom-left{content:'Mise en Place';font:italic 9pt 'Cormorant Garamond',serif;color:#7a6f63}
  @bottom-right{content:counter(page);font:500 8pt Inter,sans-serif;color:#7a6f63}}
@page :first{margin:0;@bottom-left{content:none}@bottom-right{content:none}}
@media print{html{background:none}.doc{max-width:none;background:none}.sheet{padding:0}.toolbar{display:none!important}}
@media screen{.doc{box-shadow:0 20px 60px -20px rgba(46,33,26,.35);margin:24px auto}.sheet+.sheet{border-top:1px dashed var(--line)}}
h1,h2,h3{font-family:var(--serif);font-weight:500;line-height:1.05;margin:0}
p{margin:0 0 3mm}
.cover{background:var(--esp);color:var(--paper);min-height:297mm;padding:26mm 22mm;display:flex;flex-direction:column;justify-content:space-between;break-before:auto}
@media print{.cover{padding:26mm 22mm}}
.cover .top{font:600 8pt var(--sans);letter-spacing:.24em;text-transform:uppercase;color:var(--brass2);display:flex;justify-content:space-between}
.cover h1{font-size:68pt;letter-spacing:-.01em}
.cover h1 i{color:var(--brass2)}
.cover .subt{font:italic 26pt var(--serif);color:#e6dccd;margin-top:4mm}
.cover .tag{font-size:11pt;color:#cfc3b3;max-width:120mm;margin-top:10mm;border-top:1px solid rgba(246,241,233,.25);padding-top:6mm}
.cover .own{display:grid;grid-template-columns:1fr 1fr;gap:10mm;font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;color:#b9ab99}
.cover .own div{border-top:1px solid rgba(246,241,233,.4);padding-top:3mm;height:16mm}
.eb{font:600 7.5pt var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--brass);margin-bottom:4mm}
.toc h2{font-size:34pt;margin-bottom:10mm}
.toc ol{list-style:none;padding:0;margin:0}
.toc li{display:grid;grid-template-columns:16mm 1fr;padding:4mm 0;border-top:1px solid var(--line);font:500 15pt var(--serif)}
.toc li span{color:var(--brass)}
.toc li small{display:block;font:400 9pt var(--sans);color:var(--muted);margin-top:1mm}
.intro h2{font-size:34pt;margin-bottom:8mm}
.intro p{font-size:11.5pt;color:var(--ink2);max-width:150mm}
.mhead{display:grid;grid-template-columns:34mm 1fr;gap:6mm;align-items:end;border-bottom:1px solid var(--ink);padding-bottom:6mm;margin-bottom:7mm}
.mhead .num{font:400 88pt/0.8 var(--serif);color:var(--brass)}
.mhead h2{font-size:32pt}
.idea{font:italic 17pt/1.3 var(--serif);color:var(--ink);margin:0 0 6mm;max-width:160mm}
.body p{color:var(--ink2)}
.keys{background:var(--soft);padding:5mm 6mm;margin:6mm 0 4mm;break-inside:avoid}
.keys ul{margin:0;padding-left:5mm}
.keys li{margin:1.5mm 0;color:var(--ink2)}
.ex{margin-top:8mm;break-inside:avoid-page}
.ex h3{font-size:18pt;margin-bottom:2mm}
.ex .intro-t{color:var(--ink2);font-size:10pt}
.f{margin:3mm 0 4mm}
.lbl{font:500 9pt var(--sans);color:var(--ink2);margin:3mm 0 1mm}
.ln{height:8.5mm;border-bottom:1px solid var(--line)}
.flist{padding-left:7mm;margin:3mm 0}
.flist li{height:9mm;border-bottom:1px solid var(--line);color:var(--brass);font:500 11pt var(--serif);padding-top:2.5mm}
.flist li span{color:var(--muted);font:400 9.5pt var(--sans);margin-left:1mm}
table{width:100%;border-collapse:collapse}
.tbl th{font:600 7pt var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-align:left;padding:2mm 2mm 2mm 0;border-bottom:1px solid var(--ink)}
.tbl td{height:9mm;border-bottom:1px solid var(--line);border-right:1px solid var(--soft)}
.tbl td:last-child{border-right:0}
.tbl.tall td{height:15mm}
.scale td{padding:2.6mm 0;border-bottom:1px solid var(--line);color:var(--ink2);font-size:10pt}
.scale .dots{width:52mm;text-align:right;white-space:nowrap}
.scale .dots span{display:inline-grid;place-items:center;width:7mm;height:7mm;border:1px solid var(--line);border-radius:50%;margin-left:2mm;font-size:7.5pt;color:var(--muted)}
.check{list-style:none;padding:0}
.check li{padding:2mm 0 2mm 8mm;position:relative;color:var(--ink2)}
.check li::before{content:'';position:absolute;left:0;top:2.8mm;width:3.6mm;height:3.6mm;border:1px solid var(--ink2)}
.grid th{font:600 7.5pt var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-align:left;padding:2mm}
.grid tbody th{width:34mm;font:italic 11pt var(--serif);text-transform:none;letter-spacing:0;color:var(--ink);vertical-align:top;padding-top:3mm}
.grid td{height:42mm;border:1px solid var(--line);background:#fff8}
.practice{margin-top:9mm;border-top:1px solid var(--ink);padding-top:4mm;display:grid;grid-template-columns:40mm 1fr;gap:6mm;break-inside:avoid}
.practice .eb{margin:1mm 0 0}
.practice p{font:italic 13pt/1.4 var(--serif);margin:0}
.divider{min-height:240mm;display:flex;flex-direction:column;justify-content:center}
.divider h2{font-size:56pt}
.divider p{font:italic 15pt var(--serif);color:var(--ink2);max-width:130mm;margin-top:6mm}
.tool h2{font-size:28pt;margin-bottom:1mm}
.tool .sub{color:var(--muted);font-size:10pt;margin-bottom:6mm;border-bottom:1px solid var(--ink);padding-bottom:4mm}
.closing{min-height:240mm;display:flex;align-items:center}
.closing p{font:italic 20pt/1.4 var(--serif);max-width:140mm}
.toolbar{position:sticky;top:0;z-index:2;background:var(--esp);color:var(--paper);display:flex;justify-content:space-between;align-items:center;padding:10px 20px;font:500 13px var(--sans)}
.toolbar a,.toolbar button{color:var(--paper);background:none;border:1px solid rgba(246,241,233,.35);padding:7px 12px;font:inherit;cursor:pointer;text-decoration:none;margin-left:8px}
`;

export function renderWorkbook(w, { fonts = '' } = {}) {
  const num = (n) => String(n).padStart(2, '0');
  let exCount;
  const mod = (m) => {
    exCount = 0;
    return `<section class="sheet" id="m${m.n}">
<div class="mhead"><div class="num">${num(m.n)}</div><div><p class="eb">${esc(w.module)} ${m.n}</p><h2>${esc(m.title)}</h2></div></div>
<p class="idea">${esc(m.idea)}</p>
<div class="body">${m.body.map((p) => `<p>${p}</p>`).join('')}</div>
${m.keys ? `<div class="keys"><p class="eb">${esc(w.keys)}</p><ul>${m.keys.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></div>` : ''}
${m.exercises.map((e) => `<div class="ex"><p class="eb">${esc(w.exercise)} ${m.n}.${++exCount}</p><h3>${esc(e.title)}</h3>${e.intro ? `<p class="intro-t">${esc(e.intro)}</p>` : ''}${e.fields.map(field).join('')}</div>`).join('')}
<div class="practice"><p class="eb">${esc(w.practice)}</p><p>${esc(m.practice)}</p></div>
</section>`;
  };

  return `<!doctype html><html lang="${w.lang === 'pt' ? 'pt-BR' : w.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(w.title)} — ${esc(w.subtitle)}</title>${fonts}<style>${CSS}</style></head><body>
<div class="toolbar"><span>${esc(w.title)} · ${esc(w.subtitle)}</span><span><a href="/members/${w.lang}/">←</a><button onclick="window.print()">${{ en: 'Print / save as PDF', pt: 'Imprimir / salvar PDF', es: 'Imprimir / guardar PDF' }[w.lang]}</button></span></div>
<div class="doc">
<section class="sheet cover">
  <div class="top"><span>${esc(w.subtitle)}</span><span>${w.lang.toUpperCase()}</span></div>
  <div><h1>Mise <i>en</i> Place</h1><p class="subt">${esc(w.subtitle)}</p><p class="tag">${esc(w.tagline)}</p></div>
  <div class="own"><div>${esc(w.owner)}</div><div>${esc(w.started)}</div></div>
</section>
<section class="sheet toc"><p class="eb">${esc(w.title)}</p><h2>${esc(w.contents)}</h2><ol>
<li><span>—</span><div>${esc(w.intro.title)}</div></li>
${w.modules.map((m) => `<li><span>${num(m.n)}</span><div>${esc(m.title)}<small>${esc(m.idea)}</small></div></li>`).join('')}
<li><span>—</span><div>${esc(w.tools)}<small>${w.toolPages.map((t) => esc(t.title)).join(' · ')}</small></div></li>
</ol></section>
<section class="sheet intro"><p class="eb">${esc(w.title)}</p><h2>${esc(w.intro.title)}</h2>${w.intro.body.map((p) => `<p>${p}</p>`).join('')}</section>
${w.modules.map(mod).join('\n')}
<section class="sheet divider"><p class="eb">${esc(w.title)}</p><h2>${esc(w.tools)}</h2><p>${esc(w.toolsIntro)}</p></section>
${w.toolPages.map((t) => `<section class="sheet tool"><p class="eb">${esc(w.tools)}</p><h2>${esc(t.title)}</h2><p class="sub">${esc(t.sub)}</p>${t.fields.map(field).join('')}</section>`).join('\n')}
<section class="sheet closing"><p>${esc(w.closing)}</p></section>
</div></body></html>`;
}
