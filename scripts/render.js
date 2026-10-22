// Converte o registro do deck (deck.json) em telas HTML de geometria fixa (1 pol = 100 px)
// e monta o index.qmd da apresentação Quarto (revealjs).
const fs = require("fs");
const path = require("path");

const D = JSON.parse(fs.readFileSync(path.join(__dirname, "deck.json"), "utf8"));
const POP = require("./conteudo.js");           // descrições dos popups
require("./ajustes.js")(D, POP);
const OUT = process.argv[2] || path.join(__dirname, "..", "index.qmd");

const PX = 100, PT = 100 / 72;
const TH = { tx1: "1E272C", tx2: "15343D", bg1: "FFFFFF", bg2: "EEF3F2", accent1: "1F7A6C", accent2: "C9862A", accent3: "4E6470", accent4: "9DC3B8", accent5: "A8423A", accent6: "DCE6E3" };
const hex = c => (c ? (TH[c] || c) : "1E272C").replace("#", "");
function rgba(c, tr = 0) {
  const h = hex(c), r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const a = 1 - (tr || 0) / 100;
  return a >= 1 ? "#" + h : `rgba(${r},${g},${b},${a.toFixed(3)})`;
}
function mix(c, to, k) {
  const h = hex(c), t = to === "w" ? 255 : 0;
  const ch = i => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - k) + t * k).toString(16).padStart(2, "0");
  return "#" + ch(0) + ch(2) + ch(4);
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const font = f => {
  if (!f) return null;
  if (f === "+mj-lt" || f === "Cambria") return "var(--pp-head)";
  if (f === "+mn-lt" || f === "Calibri") return "var(--pp-body)";
  if (f === "Courier New") return "var(--pp-mono)";
  return null;
};
const px = v => (v * PX).toFixed(1) + "px";

// ---------- texto ----------
function paragraphs(text, o) {
  const runs = typeof text === "string" ? [{ text, options: {} }] : text;
  const paras = []; let cur = { runs: [], opt: {} };
  runs.forEach((r, i) => {
    const ro = r.options || {};
    if (ro.bullet) cur.opt.bullet = ro.bullet;
    if (ro.paraSpaceAfter != null) cur.opt.space = ro.paraSpaceAfter;
    if (ro.align) cur.opt.align = ro.align;
    cur.runs.push(r);
    if (ro.breakLine) { paras.push(cur); cur = { runs: [], opt: {} }; }
  });
  if (cur.runs.length) paras.push(cur);
  return paras;
}
function runHtml(r, base) {
  const ro = r.options || {};
  const st = [];
  if (ro.fontSize) st.push(`font-size:${(ro.fontSize * PT).toFixed(2)}px`);
  if (ro.color) st.push(`color:${rgba(ro.color)}`);
  if (ro.bold === true) st.push("font-weight:700"); else if (ro.bold === false) st.push("font-weight:400");
  if (ro.italic) st.push("font-style:italic");
  const f = font(ro.fontFace); if (f) st.push(`font-family:${f}`);
  if (ro.underline) st.push("text-decoration:underline");
  let t = esc(r.text).replace(/\n/g, "<br>");
  const span = st.length ? `<span style="${st.join(";")}">${t}</span>` : t;
  if (ro.hyperlink && ro.hyperlink.url) return `<a href="${esc(ro.hyperlink.url)}" target="_blank" rel="noopener">${span}</a>`;
  return span;
}
function textBox(text, o) {
  const st = [`left:${px(o.x)}`, `top:${px(o.y)}`, `width:${px(o.w)}`, `height:${px(o.h)}`];
  const fs_ = (o.fontSize || 18) * PT;
  st.push(`font-size:${fs_.toFixed(2)}px`, `color:${rgba(o.color || "tx1")}`);
  if (o.bold) st.push("font-weight:700");
  if (o.italic) st.push("font-style:italic");
  const f = font(o.fontFace) || (o._head ? "var(--pp-head)" : null); if (f) st.push(`font-family:${f}`);
  if (o.charSpacing) st.push(`letter-spacing:${(o.charSpacing * PT).toFixed(2)}px`);
  const jc = { top: "flex-start", middle: "center", bottom: "flex-end" }[o.valign || "top"];
  st.push(`justify-content:${jc}`, `text-align:${o.align || "left"}`);
  if (o.margin == null) st.push("padding:5px 10px");
  else if (typeof o.margin === "number" && o.margin) st.push(`padding:${(o.margin * PT).toFixed(1)}px`);
  const ps = paragraphs(text, o).map(p => {
    const pst = [];
    const sp = p.opt.space != null ? p.opt.space : (o.paraSpaceAfter || 0);
    if (sp) pst.push(`margin-bottom:${(sp * PT).toFixed(1)}px`);
    if (p.opt.align) pst.push(`text-align:${p.opt.align}`);
    const rfs = p.runs.map(r => (r.options || {}).fontSize).filter(Boolean);
    const rc = (p.runs[0] && p.runs[0].options || {}).color;
    if (rc) pst.push(`color:${rgba(rc)}`);
    if (rfs.length) pst.push(`font-size:${(Math.max(...rfs) * PT).toFixed(2)}px`);
    let cls = "";
    if (p.opt.bullet) { const ind = (p.opt.bullet.indent || 14) * PT; pst.push(`padding-left:${ind.toFixed(1)}px`); cls = ' class="b"'; }
    const inner = p.runs.map(r => runHtml(r, o)).join("") || "&nbsp;";
    return `<p${cls}${pst.length ? ` style="${pst.join(";")}"` : ""}>${inner}</p>`;
  }).join("");
  const nm = o.objectName ? ` data-n="${esc(o.objectName)}"` : "";
  return `<div class="t"${nm} style="${st.join(";")}">${ps}</div>`;
}

// ---------- formas ----------
function shape(sh, o) {
  const x = o.x * PX, y = o.y * PX, w = (o.w || 0) * PX, h = (o.h || 0) * PX;
  const fill = o.fill ? rgba(o.fill.color, o.fill.transparency) : "transparent";
  const lw = o.line ? (o.line.width ? o.line.width * PT : (sh === "line" ? 0.75 : 1)) : 0;
  const lc = o.line ? rgba(o.line.color, o.line.transparency) : "transparent";
  const nm = o.objectName ? ` data-n="${esc(o.objectName)}"` : "";
  if (sh === "rect" || sh === "roundRect" || sh === "ellipse") {
    const r = sh === "ellipse" ? "50%" : sh === "roundRect" ? `${((o.rectRadius ?? 0.08) * PX).toFixed(1)}px` : "0";
    const visible = lw > 0 && (o.line.color !== (o.fill && o.fill.color) || (o.fill && o.fill.transparency) || !o.fill);
    const bd = visible ? `box-shadow:inset 0 0 0 ${lw.toFixed(2)}px ${lc};` : "";
    return `<div class="s"${nm} style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;background:${fill};border-radius:${r};${bd}"></div>`;
  }
  if (sh === "line") {
    const pad = 8;
    let x1 = 0, y1 = 0, x2 = w, y2 = h;
    if (o.flipH) { x1 = w; x2 = 0; }
    const dash = o.line.dashType === "dash" ? `stroke-dasharray="${(lw * 4).toFixed(1)} ${(lw * 3).toFixed(1)}"` : o.line.dashType === "sysDot" ? `stroke-dasharray="${lw.toFixed(1)} ${(lw * 1.5).toFixed(1)}"` : "";
    const id = "a" + Math.random().toString(36).slice(2, 8);
    const arrow = o.line.endArrowType ? `<defs><marker id="${id}" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,3 L0,6 z" fill="${lc}"/></marker></defs>` : "";
    return `<svg class="s"${nm} style="left:${(x - pad).toFixed(1)}px;top:${(y - pad).toFixed(1)}px;width:${(w + 2 * pad).toFixed(1)}px;height:${(h + 2 * pad).toFixed(1)}px;overflow:visible">${arrow}<line x1="${x1 + pad}" y1="${y1 + pad}" x2="${x2 + pad}" y2="${y2 + pad}" stroke="${lc}" stroke-width="${lw.toFixed(2)}" ${dash} ${arrow ? `marker-end="url(#${id})"` : ""}/></svg>`;
  }
  if (sh === "cube") {
    const d = Math.min(w, h) * 0.25;
    const base = o.fill ? o.fill.color : "accent1", tr = o.fill ? o.fill.transparency || 0 : 0;
    const a = (1 - tr / 100).toFixed(3);
    const ln = lw > 0 ? `stroke="${lc}" stroke-width="${lw.toFixed(2)}"` : "";
    return `<svg class="s cube"${nm} data-base="${hex(base)}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;overflow:visible" viewBox="0 0 ${w.toFixed(2)} ${h.toFixed(2)}">`
      + `<polygon class="cf" points="0,${d} ${w - d},${d} ${w - d},${h} 0,${h}" fill="#${hex(base)}" fill-opacity="${a}" ${ln}/>`
      + `<polygon class="ct" points="0,${d} ${d},0 ${w},0 ${w - d},${d}" fill="${mix(base, "w", .35)}" fill-opacity="${a}" ${ln}/>`
      + `<polygon class="cs" points="${w - d},${d} ${w},0 ${w},${h - d} ${w - d},${h}" fill="${mix(base, "k", .28)}" fill-opacity="${a}" ${ln}/></svg>`;
  }
  if (sh === "diamond") {
    return `<svg class="s dia"${nm} style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;overflow:visible" viewBox="0 0 ${w.toFixed(2)} ${h.toFixed(2)}"><polygon points="${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}" fill="${fill}" stroke="${lc}" stroke-width="${lw.toFixed(2)}"/></svg>`;
  }
  return "";
}
function image(o) {
  const nm = o.objectName ? ` data-n="${esc(o.objectName)}"` : "";
  if (!o.data) return `<div class="s brasao"${nm} role="img" aria-label="Brasão da República" style="left:${px(o.x)};top:${px(o.y)};width:${px(o.w)};height:${px(o.h)}"></div>`;
  const src = o.data.replace(/^image\/png;base64,/, "data:image/png;base64,");
  return `<img class="s"${nm} alt="" src="${src}" style="left:${px(o.x)};top:${px(o.y)};width:${px(o.w)};height:${px(o.h)}">`;
}
function chart(type, data, o) {
  const W = o.w * PX, H = o.h * PX, cats = data[0].labels, n = cats.length, ns = data.length;
  const top = 46, bot = 40, plotH = H - top - bot, max = o.valAxisMaxVal || Math.max(...data.flatMap(d => d.values));
  const gw = W / n, bw = gw * (1 / (1 + (o.barGapWidthPct || 100) / 100)) / ns;
  const fsL = (o.dataLabelFontSize || 12) * PT, fsC = (o.catAxisLabelFontSize || 12) * PT, fsG = (o.legendFontSize || 12) * PT;
  let s = `<svg class="s" data-n="${esc(o.objectName || "grafico")}" style="left:${px(o.x)};top:${px(o.y)};width:${W}px;height:${H}px" viewBox="0 0 ${W} ${H}" font-family="var(--pp-body)">`;
  // legenda
  let lx = W / 2 - 150;
  data.forEach((d, j) => {
    s += `<rect x="${lx}" y="10" width="11" height="11" fill="#${o.chartColors[j]}"/><text x="${lx + 16}" y="20" font-size="${fsG}" fill="#${o.legendColor || "1E272C"}">${esc(d.name)}</text>`;
    lx += 26 + d.name.length * fsG * 0.5;
  });
  cats.forEach((c, i) => {
    const gx = i * gw + (gw - bw * ns) / 2;
    data.forEach((d, j) => {
      const v = d.values[i], bh = plotH * v / max, bx = gx + j * bw, by = top + plotH - bh;
      s += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${bh.toFixed(1)}" fill="#${o.chartColors[j]}"/>`;
      s += `<text x="${(bx + bw / 2 - 1).toFixed(1)}" y="${(by - 6).toFixed(1)}" text-anchor="middle" font-size="${fsL}" fill="#${o.dataLabelColor || "1E272C"}">${v}</text>`;
    });
    s += `<text x="${(i * gw + gw / 2).toFixed(1)}" y="${(top + plotH + 26).toFixed(1)}" text-anchor="middle" font-size="${fsC}" fill="#${o.catAxisLabelColor || "4E6470"}">${esc(c)}</text>`;
  });
  s += `<line x1="0" y1="${top + plotH}" x2="${W}" y2="${top + plotH}" stroke="#${o.catAxisLineColor || "9DC3B8"}" stroke-width="1"/>`;
  return s + "</svg>";
}

// ---------- telas ----------
function renderItem(it, master) {
  const o = it.o;
  if (it.kind === "text") {
    if (o.placeholder) {
      const ph = master.objects.find(m => m.placeholder && m.placeholder.options.name === o.placeholder);
      const po = ph ? { ...ph.placeholder.options } : {};
      if (po.type === "title") po._head = true;
      const merged = { ...po, ...o };
      return textBox(it.text, merged);
    }
    return textBox(it.text, o);
  }
  if (it.kind === "shape") return shape(it.shape, o);
  if (it.kind === "image") return image(o);
  if (it.kind === "chart") return chart(it.type, it.data, o);
  return "";
}
function rectOf(it) { const o = it.o; return { x: o.x, y: o.y, w: o.w || 0, h: o.h || 0 }; }
function union(a, b) { const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y); return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y }; }

const ordem = [1, 6, 7, 5, 2, 3, 4, ...Array.from({ length: 18 }, (_, i) => i + 8)];
const slidesHtml = ordem.map((orig, idx) => {
  const s = D.slides[orig - 1];
  const n = idx + 1;
  const master = D.masters[s.master];
  const bg = hex(master.background.color);
  let html = `<div class="pp-slide" data-slide="${n}" data-original-slide="${orig}" style="background:#${bg}">`;
  master.objects.forEach(ob => {
    if (ob.image) html += image(ob.image);
    if (ob.text) html += textBox(ob.text.text, ob.text.options);
  });
  s.items.forEach(it => { html += renderItem(it, master); });
  if (master.slideNumber) { const sn = master.slideNumber; html += textBox(String(n), { ...sn, x: sn.x - 0.95, valign: "middle", margin: 0 }); }
  // áreas clicáveis
  const pops = POP.slides[orig] || {};
  const named = {};
  s.items.forEach(it => { const nm = it.o.objectName; if (nm) named[nm] = named[nm] ? union(named[nm], rectOf(it)) : rectOf(it); });
  const keys = Object.keys(pops).sort((a, b) => (pops[a].z || 0) - (pops[b].z || 0));
  let hits = "";
  keys.forEach(k => {
    const p = pops[k];
    const rects = [];
    (p.with || [k]).forEach(nm => { if (named[nm]) rects.push(named[nm]); else console.warn("sem objeto:", n, nm); });
    const bx = p.box ? (Array.isArray(p.box[0]) ? p.box : [p.box]) : [];
    bx.forEach(b => rects.push({ x: b[0], y: b[1], w: b[2], h: b[3] }));
    if (!rects.length) { console.warn("sem geometria:", n, k); return; }
    const kind = p.kind || "card";
    const hl = (p.hl || (p.with || [k]).slice(0, 1)).join(" ");
    rects.forEach(r => {
      const pad = kind === "dia" ? 0.05 : 0.03;
      hits += `<button type="button" class="pp-hit k-${kind}" data-key="${orig}|${esc(k)}" data-hl="${esc(hl)}" aria-label="${esc(p.t)}" style="left:${px(r.x - pad)};top:${px(r.y - pad)};width:${px(r.w + 2 * pad)};height:${px(r.h + 2 * pad)}"></button>`;
    });
  });
  html += hits;
  if (keys.length) html += `<div class="pp-hint">${esc(POP.hints[orig] || "Clique nos elementos para ver detalhes")}</div>`;
  html += "</div>";
  return { html, bg, notes: s.notes, title: (s.items.find(i => i.o.placeholder === "title") || {}).text };
});

// ---------- qmd ----------
const yaml = `---
pagetitle: "Novo PAR · Histórico da construção dos cubos de dados"
lang: pt-BR
author: "Victor Gabriel Alcantara"
format:
  revealjs:
    width: 1334
    height: 750
    margin: 0
    center: false
    controls: true
    controls-layout: bottom-right
    progress: true
    slide-number: false
    hash: true
    history: true
    transition: fade
    transition-speed: fast
    embed-resources: true
    css: assets/novopar.css
    include-after-body: assets/interacao.html
    menu: false
    auto-stretch: false
    preview-links: false
    html-math-method: plain
---
`;
let qmd = yaml + "\n";
slidesHtml.forEach((s, i) => {
  qmd += `## {.pp-sec background-color="#${s.bg}"}\n\n\`\`\`{=html}\n${s.html}\n\`\`\`\n\n`;
  if (s.notes) qmd += `::: {.notes}\n${s.notes}\n:::\n\n`;
});
fs.writeFileSync(OUT, qmd);
// dados dos popups
const tpl = fs.readFileSync(path.join(__dirname, "interacao.tpl.html"), "utf8");
fs.writeFileSync(path.join(path.dirname(OUT), "assets", "interacao.html"),
  tpl.replace("/*__DADOS__*/", "window.PP_DADOS = " + JSON.stringify({ slides: POP.slides, root: POP.root }).replace(/</g, "\\u003c") + ";"));
console.log("telas:", slidesHtml.length, "popups:", Object.values(POP.slides).reduce((a, b) => a + Object.keys(b).length, 0));
