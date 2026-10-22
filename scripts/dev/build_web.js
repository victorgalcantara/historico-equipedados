// Novo PAR | Histórico da construção dos cubos de dados dos painéis de diagnóstico
const path = require("path");
const pptxgen = require("./shim.js");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const SKILL = "/root/.claude/skills/synced/2fbb0f0f-6542-4952-920d-29bf79dbc38f_438584de-5be4-40e2-a99f-95a60134e973/pptx";
const applyTheme = async () => {};

const OUT = process.argv[2] || "deck.pptx";
const BRASAO = path.join(__dirname, "brasao.png");

const THEME = {
  name: "Novo PAR Equipe de Dados",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1E272C", lt1: "FFFFFF", dk2: "15343D", lt2: "EEF3F2",
    accent1: "1F7A6C", accent2: "C9862A", accent3: "4E6470",
    accent4: "9DC3B8", accent5: "A8423A", accent6: "DCE6E3",
    hlink: "1F7A6C", folHlink: "4E6470",
  },
};
const H = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Novo PAR: histórico da construção dos cubos de dados";
pres.author = "Victor Gabriel Alcantara";
pres.subject = "Etapa de Diagnóstico: produção e gestão dos dados";
const C = pres.SchemeColor;
const HEAD = "+mj-lt";

const L = 0.6, W = 12.133, RX = L + W;

// ---------- helpers ----------
const iconCache = {};
async function icon(name, hex, size = 256) {
  const k = name + hex;
  if (iconCache[k]) return iconCache[k];
  const svg = RDS.renderToStaticMarkup(React.createElement(fa[name], { color: "#" + hex, size }));
  const buf = await sharp(Buffer.from(svg)).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  iconCache[k] = "image/png;base64," + buf.toString("base64");
  return iconCache[k];
}
async function badge(slide, x, y, d, fill, iconName, iconHex = "FFFFFF", name = "badge") {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: name + "-circulo" });
  const p = d * 0.25;
  slide.addImage({ data: await icon(iconName, iconHex), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name + "-icone" });
}
function numBadge(slide, x, y, d, fill, n, fs = 16, name = "numero") {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: name });
  slide.addText(String(n), { x, y, w: d, h: d, align: "center", valign: "middle", fontSize: fs, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: name + "-texto" });
}
function card(slide, x, y, w, h, fill = C.background2, name = "cartao", opts = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: opts.r ?? 0.08, fill: { color: fill, transparency: opts.transparency ?? 0 }, line: opts.line || { color: fill, width: 0 }, objectName: name });
}
function txt(slide, text, o) {
  slide.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", color: C.text1, fontSize: 14 }, o));
}
function bullets(items, o = {}) {
  return items.map((t, i) => ({ text: t, options: Object.assign({ bullet: { indent: 14 }, breakLine: i < items.length - 1, paraSpaceAfter: o.space ?? 6 }, o.run || {}) }));
}
function arrowR(slide, x, y, w, color = C.accent3) {
  slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width: 1.75, endArrowType: "triangle" }, objectName: "seta" });
}
function arrowL(slide, x, y, w, color = C.accent3) {
  slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, flipH: true, line: { color, width: 1.75, endArrowType: "triangle" }, objectName: "seta" });
}
function arrowD(slide, x, y, h, color = C.accent3) {
  slide.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color, width: 1.75, endArrowType: "triangle" }, objectName: "seta" });
}
function chip(slide, x, y, w, h, text, fill, fs = 12, color = C.background1, name = "etiqueta") {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: name });
  slide.addText(text, { x, y, w, h, align: "center", valign: "middle", fontSize: fs, bold: true, color, margin: 0, isTextBox: true, objectName: name + "-texto" });
}
function cubes(slide, x0, y0, s, set) {
  // pilha decorativa de cubos (motivo visual do deck)
  set.forEach(([dx, dy, k, tr], i) => {
    slide.addShape(pres.shapes.CUBE, { x: x0 + dx * s, y: y0 + dy * s, w: s * k, h: s * k, fill: { color: i % 3 === 0 ? C.accent2 : C.accent1, transparency: tr }, line: { color: C.accent4, width: 0.75, transparency: 40 }, objectName: "cubo-decorativo-" + i });
  });
}

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "CAPA",
  background: { color: C.text2 },
  objects: [
    { image: { x: 0.8, y: 0.6, w: 1.25, h: 1.256, path: BRASAO } },
    { text: { text: "MINISTÉRIO DA EDUCAÇÃO  ·  SECRETARIA DE EDUCAÇÃO BÁSICA", options: { x: 2.25, y: 0.95, w: 8, h: 0.5, fontSize: 13, bold: true, color: C.accent4, charSpacing: 2, margin: 0, valign: "middle" } } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.85, w: 8.2, h: 1.75, fontSize: 40, bold: true, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "subtitle", type: "body", x: 0.8, y: 4.7, w: 8.0, h: 0.95, fontSize: 18, color: C.accent4, valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTEUDO",
  background: { color: C.background1 },
  margin: [0.5, 0.6, 0.7, 0.6],
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: L, y: 0.3, w: 10, h: 0.32, fontSize: 12, bold: true, color: C.accent1, valign: "middle", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: L, y: 0.62, w: W, h: 0.82, fontSize: 32, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { image: { x: L, y: 6.98, w: 0.3, h: 0.302, path: BRASAO } },
    { text: { text: "Novo PAR  ·  Etapa de Diagnóstico  ·  Histórico da produção e gestão dos dados", options: { x: 1.02, y: 6.98, w: 9, h: 0.3, fontSize: 10, color: C.accent3, margin: 0, valign: "middle" } } },
  ],
  slideNumber: { x: 12.23, y: 6.98, w: 0.5, h: 0.3, fontSize: 10, color: C.accent3, align: "right" },
});
pres.defineSlideMaster({
  title: "FECHO",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: L, y: 0.6, w: 8.5, h: 0.9, fontSize: 36, bold: true, color: C.background1, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { image: { x: L, y: 6.98, w: 0.3, h: 0.302, path: BRASAO } },
    { text: { text: "Novo PAR  ·  Etapa de Diagnóstico  ·  Histórico da produção e gestão dos dados", options: { x: 1.02, y: 6.98, w: 9, h: 0.3, fontSize: 10, color: C.accent4, margin: 0, valign: "middle" } } },
  ],
  slideNumber: { x: 12.23, y: 6.98, w: 0.5, h: 0.3, fontSize: 10, color: C.accent4, align: "right" },
});

function content(section, kicker, title) {
  const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: section });
  s.addText(kicker, { placeholder: "kicker", charSpacing: 1.5 });
  s.addText(title, { placeholder: "title" });
  return s;
}

(async () => {
  // =====================================================================
  // ABERTURA
  // =====================================================================
  pres.addSection({ title: "Abertura" });

  // 1. Capa
  {
    const s = pres.addSlide({ masterName: "CAPA", sectionTitle: "Abertura" });
    txt(s, "NOVO PAR  ·  ETAPA DE DIAGNÓSTICO", { x: 0.8, y: 2.35, w: 8, h: 0.4, fontSize: 15, bold: true, color: C.accent2, charSpacing: 2, valign: "middle" });
    s.addText("Histórico da construção dos cubos de dados dos painéis", { placeholder: "title", fontFace: HEAD });
    s.addText("Procedimentos de produção e gestão dos dados, gargalos e pontos de atenção para a gestão (dezembro de 2024 a outubro de 2026)", { placeholder: "subtitle" });
    txt(s, [
      { text: "Victor Gabriel Alcantara", options: { bold: true, breakLine: true } },
      { text: "Consultor da Equipe de Dados do Novo PAR  ·  Outubro de 2026" },
    ], { x: 0.8, y: 6.15, w: 8.5, h: 0.75, fontSize: 15, color: C.background1 });
    cubes(s, 9.55, 2.2, 1.0, [
      [0.9, 0.0, 1.25, 10], [2.25, 0.55, 1.0, 35], [0.0, 1.25, 1.0, 45],
      [1.2, 1.45, 1.55, 0], [2.65, 1.95, 0.9, 55], [0.35, 2.55, 0.8, 65], [1.65, 3.05, 0.75, 75],
    ]);
    s.addNotes("Apresentação do histórico de construção dos cubos de dados dos painéis da Etapa de Diagnóstico do Novo PAR, desde a entrada na consultoria (dez/2024). Conforme as regras de defeso eleitoral, a única marca usada é o Brasão da República.");
  }

  // 2. Em síntese
  {
    const s = content("Abertura", "VISÃO GERAL", "O percurso em síntese");
    const stats = [
      ["252", "indicadores de rede catalogados na CUI: Insumos 186, Contexto 54, Resultados 12"],
      ["3", "edições do Censo Escolar processadas nos painéis: 2023, 2024 e 2025"],
      ["229 mi", "linhas no cubo do Painel de Escolas na carga de 10/08/2026"],
      ["24", "ofícios e contestações recebidos e registrados por ente, com análise técnica"],
    ];
    const cw = 2.8, gap = (W - 4 * cw) / 3;
    stats.forEach(([n, l], i) => {
      const x = L + i * (cw + gap), y = 1.65;
      card(s, x, y, cw, 1.9, C.background2, "estatistica-" + i);
      txt(s, n, { x: x + 0.25, y: y + 0.18, w: cw - 0.5, h: 0.75, fontSize: 40, bold: true, fontFace: HEAD, color: C.accent1, valign: "middle", objectName: "estatistica-numero-" + i });
      txt(s, l, { x: x + 0.25, y: y + 0.98, w: cw - 0.5, h: 0.8, fontSize: 13, color: C.text1 });
    });
    const msgs = [
      ["FaSyncAlt", C.accent1, "Produção orgânica: a lista de indicadores foi construída ao mesmo tempo em que os dados eram produzidos, com revisão contínua a partir do uso e da demanda das áreas."],
      ["FaCode", C.accent1, "Arquitetura em R, com códigos mestres, de-paras externos e validação contra a Sinopse do Inep, sustentou três ciclos de atualização e dois consumidores: os painéis e o sistema de planejamento."],
      ["FaExclamationTriangle", C.accent2, "Pontos sensíveis: identificação dos indicadores, alinhamento entre painéis e planejamento, acesso aos microdados e institucionalização ainda em estágio inicial."],
    ];
    for (let i = 0; i < msgs.length; i++) {
      const y = 3.9 + i * 0.95;
      await badge(s, L, y + 0.08, 0.62, msgs[i][1], msgs[i][0], "FFFFFF", "mensagem-" + i);
      txt(s, msgs[i][2], { x: L + 0.85, y, w: W - 0.85, h: 0.8, fontSize: 16, valign: "middle" });
    }
    s.addNotes("Números de referência. CUI: aba CUI de Dicionarios/CUI - Codigo Unico de Indicadores.xlsx (252 linhas de indicadores de rede). Censo: atualização com Censo 2023 no lançamento, Censo 2024 em 05/06/2025 e Censo 2025 em 16/04/2026. Cubo de escolas: carga de 10/08/2026 com 229.261.886 linhas. Ofícios: pastas por ente em Team Channel/Ofícios e contestações.");
  }

  // 3. Linha do tempo
  {
    const s = content("Abertura", "VISÃO GERAL", "Linha do tempo: dezembro de 2024 a outubro de 2026");
    const items = [
      ["dez/2024", "Contrato (13/12) e acesso às bases do Censo (17/12); produção começa"],
      ["jan/2025", "1ª versão para a prévia: 99 de 113 indicadores em 09/01"],
      ["fev/2025", "Homologação (07/02), publicação (10/02) e lançamento do Novo PAR"],
      ["mai/2025", "Nota Técnica v1; primeiras contestações; Censo 2024 recebido (06/05)"],
      ["jun-set/2025", "Painéis com Censo 2024 (05/06); cubo de planejamento e validações"],
      ["out/2025-jan/2026", "Painel de Escolas: inventário, 1ª versão (12/12) e versão com CUI (09/01)"],
      ["fev-mar/2026", "Repasse dos scripts à STIC (09/02); acesso ao Oracle por VPN"],
      ["abr/2026", "Painéis com Censo 2025 (16/04), com as mudanças do IFTP"],
      ["jul-ago/2026", "Harmonização dos códigos (27/07) e revisão do Painel de Escolas"],
      ["set-out/2026", "Escala das metas do planejamento; Segape e EducaDados; NT do PDDE"],
    ];
    const y0 = 4.05, x0 = 1.65, step = 1.115, bw = 2.12;
    const fases = [[0, 2, "Construção e lançamento"], [3, 4, "Censo 2024 e planejamento"], [5, 6, "Escolas, CUI e STIC"], [7, 9, "Revisão e institucionalização"]];
    fases.forEach(([a, b, t], k) => {
      const xa = k === 0 ? L : x0 + (a - 0.5) * step + 0.04;
      const xb = k === fases.length - 1 ? RX : x0 + (b + 0.5) * step - 0.04;
      card(s, xa, 1.62, xb - xa, 0.46, k % 2 === 0 ? C.text2 : C.accent3, "fase-" + k);
      txt(s, t, { x: xa, y: 1.62, w: xb - xa, h: 0.46, fontSize: 13, bold: true, color: C.background1, align: "center", valign: "middle" });
    });
    s.addShape(pres.shapes.LINE, { x: 0.75, y: y0, w: 11.85, h: 0, line: { color: C.accent4, width: 2.5 }, objectName: "eixo-tempo" });
    items.forEach(([d, t], i) => {
      const cx = x0 + i * step;
      const up = i % 2 === 0;
      s.addShape(pres.shapes.CUBE, { x: cx - 0.18, y: y0 - 0.18, w: 0.36, h: 0.36, fill: { color: i === 2 ? C.accent2 : C.accent1 }, line: { color: C.background1, width: 0.75 }, objectName: "marco-" + i });
      if (up) s.addShape(pres.shapes.LINE, { x: cx, y: 3.57, w: 0, h: 0.28, line: { color: C.accent4, width: 1 }, objectName: "conector-" + i });
      else s.addShape(pres.shapes.LINE, { x: cx, y: 4.25, w: 0, h: 0.28, line: { color: C.accent4, width: 1 }, objectName: "conector-" + i });
      txt(s, [
        { text: d, options: { bold: true, color: i === 2 ? C.accent2 : C.accent1, fontSize: 15, breakLine: true } },
        { text: t, options: { fontSize: 13.5, color: C.text1 } },
      ], { x: cx - bw / 2, y: up ? 2.0 : 4.57, w: bw, h: 1.52, valign: up ? "bottom" : "top", align: "center", objectName: "rotulo-marco-" + i });
    });
    s.addNotes("Fontes: Produtos 1 a 5 (OEI, jan a jul/2025) e Produtos 1 a 4 (UNESCO, nov/2025 a mai/2026); Ofício Circular nº 42/2025/SEB (painéis com Censo 2024 a partir de 05/06/2025); relatórios técnicos da pasta Novo PAR - Dados (jul a out/2026).");
  }

  // =====================================================================
  // 1. PONTO DE PARTIDA
  // =====================================================================
  // 3b. Processos da Equipe de Dados (Gantt)
  {
    const s = content("Abertura", "VISÃO GERAL", "Processos conduzidos pela Equipe de Dados da SEB");
    const NP = { prod: "1D4F91", melh: "F2B705", valid: "D9372B", doc: "2E9D57", aten: "2BA3D9", ink: "1E272C" };
    const cats = [["prod", "Produção"], ["melh", "Melhoria"], ["valid", "Validação"], ["doc", "Documentação"], ["aten", "Atendimento"]];
    const t0 = new Date(2024, 11, 1), months = 25; // dez/2024 a dez/2026
    const cx0 = 3.55, cw = RX - cx0;
    const mx = (y, m, d = 1) => { const dt = new Date(y, m - 1, d); const mm = (dt.getFullYear() - 2024) * 12 + (dt.getMonth() - 11) + (d - 1) / 30; return cx0 + cw * mm / months; };
    const top = 1.55, hy = 2.12, rowsY = 2.2, rh = 0.37;
    const rows = [
      ["Cubo Insumos", "Censo, PDDE, Secadi e outras fontes", "prod", [2024, 12, 13], [["lançamento", 2025, 2, 10], ["Censo 2025", 2026, 4, 16]]],
      ["Planilhas Contexto", "tabelas por tela do painel", "prod", [2025, 2, 1], [["Censo 2024", 2025, 6, 5]]],
      ["Cubo Resultados", "acesso, rendimento e aprendizagem", "prod", [2025, 7, 1], [["piloto STIC", 2026, 2, 9]]],
      ["Cubo Planejamento", "sistema de planejamento", "prod", [2025, 3, 7], [["1ª carga", 2025, 7, 18]]],
      ["Cubo Escolas", "painel agregador por escola", "prod", [2025, 10, 20], [["versão com CUI", 2026, 1, 9]]],
      ["CUI", "Codificação Única de Indicadores", "melh", [2025, 7, 31], []],
      ["Institucionalização", "STIC e Segape", "melh", [2025, 4, 1], [["repasse dos scripts", 2026, 2, 9]]],
      ["Validações e contestações", "Sinopse, ofícios e revisões", "valid", [2025, 1, 27], [["respostas padrão", 2026, 2, 23]]],
      ["Notas Técnicas", "documentação dos indicadores", "doc", [2025, 4, 2], [["NT v1", 2025, 5, 5], ["NT PDDE", 2026, 10, 9]]],
      ["Análises sob demanda", "estudos, recortes e escala das metas", "aten", [2025, 3, 1], [["escala das metas", 2026, 8, 31]]],
    ];
    const today = mx(2026, 10, 22);
    // cabeçalho de anos e semestres
    const yrs = [["2025", mx(2025, 1), mx(2026, 1)], ["2026", mx(2026, 1), mx(2027, 1)]];
    txt(s, "dez", { x: mx(2024, 12), y: top + 0.32, w: mx(2025, 1) - mx(2024, 12), h: 0.22, fontSize: 9.5, color: C.accent3, align: "center", valign: "middle" });
    yrs.forEach(([y, a, b]) => {
      txt(s, y, { x: a, y: top, w: b - a, h: 0.3, fontSize: 14, bold: true, align: "center", valign: "middle" });
      const mid = (a + b) / 2;
      txt(s, "1º sem", { x: a, y: top + 0.32, w: mid - a, h: 0.22, fontSize: 10.5, color: C.accent3, align: "center", valign: "middle" });
      txt(s, "2º sem", { x: mid, y: top + 0.32, w: b - mid, h: 0.22, fontSize: 10.5, color: C.accent3, align: "center", valign: "middle" });
      s.addShape(pres.shapes.LINE, { x: mid, y: hy, w: 0, h: rows.length * rh + 0.05, line: { color: "D5DCDA", width: 0.75, dashType: "sysDot" }, objectName: "grade-semestre" });
    });
    [mx(2024, 12), mx(2025, 1), mx(2026, 1), mx(2027, 1)].forEach((x, i) => s.addShape(pres.shapes.LINE, { x, y: top + 0.02, w: 0, h: hy - top + rows.length * rh + 0.03, line: { color: "D5DCDA", width: 1 }, objectName: "grade-ano-" + i }));
    s.addShape(pres.shapes.LINE, { x: cx0, y: hy, w: cw, h: 0, line: { color: "D5DCDA", width: 1 }, objectName: "base-cabecalho" });
    rows.forEach(([nome, sub, cat, ini, ms], i) => {
      const y = rowsY + i * rh, cy = y + rh / 2;
      txt(s, [{ text: nome, options: { bold: true, fontSize: 12.5, breakLine: true } }, { text: sub, options: { fontSize: 9.5, color: C.accent3 } }], { x: L, y: y - 0.02, w: cx0 - L - 0.15, h: rh + 0.04, align: "right", valign: "middle" });
      const x1 = mx(ini[0], ini[1], ini[2]);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x1, y: cy - 0.11, w: today - x1, h: 0.22, rectRadius: 0.04, fill: { color: NP[cat] }, line: { color: NP[cat], width: 0 }, objectName: "barra-" + i });
      ms.forEach(([lab, yy, mm, dd], k) => {
        const xm = mx(yy, mm, dd);
        s.addShape(pres.shapes.DIAMOND, { x: xm - 0.085, y: cy - 0.085, w: 0.17, h: 0.17, fill: { color: "FFFFFF" }, line: { color: NP.ink, width: 1 }, objectName: "marco-" + i + "-" + k });
        const lw = 1.45, fitsRight = xm + 0.12 + lw * 0.85 < today;
        txt(s, lab, { x: fitsRight ? xm + 0.12 : xm - 0.12 - lw, y: cy - 0.115, w: lw, h: 0.23, fontSize: 9.5, align: fitsRight ? "left" : "right", color: cat === "melh" ? NP.ink : C.background1, valign: "middle", objectName: "rotulo-marco-" + i + "-" + k });
      });
    });
    // linha de hoje
    const yEnd = rowsY + rows.length * rh;
    s.addShape(pres.shapes.LINE, { x: today, y: top + 0.55, w: 0, h: yEnd - top - 0.5, line: { color: NP.valid, width: 1, dashType: "dash" }, objectName: "linha-hoje" });
    txt(s, "out/2026", { x: today - 0.5, y: yEnd + 0.04, w: 1.0, h: 0.22, fontSize: 10, color: NP.valid, align: "center", valign: "middle" });
    // legenda
    const ly = 6.12;
    let lx = L;
    cats.forEach(([k, t]) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: ly + 0.04, w: 0.28, h: 0.18, rectRadius: 0.03, fill: { color: NP[k] }, line: { color: NP[k], width: 0 }, objectName: "legenda-" + k });
      txt(s, t, { x: lx + 0.36, y: ly, w: 1.35, h: 0.26, fontSize: 11.5, valign: "middle" });
      lx += 1.72;
    });
    s.addShape(pres.shapes.DIAMOND, { x: lx + 0.06, y: ly + 0.045, w: 0.17, h: 0.17, fill: { color: "FFFFFF" }, line: { color: NP.ink, width: 1 }, objectName: "legenda-marco" });
    txt(s, "Marco de entrega", { x: lx + 0.36, y: ly, w: 1.6, h: 0.26, fontSize: 11.5, valign: "middle" });
    txt(s, [
      { text: "Fonte: relatórios técnicos da consultoria (OEI e UNESCO) e arquivos do projeto no Team Channel.", options: { breakLine: true } },
      { text: "Nota: cores inspiradas na identidade do Novo PAR; as barras seguem até out/2026 porque os processos continuam em curso." },
    ], { x: L, y: 6.45, w: W, h: 0.46, fontSize: 10, color: C.accent3 });
    s.addNotes("Períodos aproximados, pela data dos registros: Insumos desde o contrato (13/12/2024); Contexto desde fev/2025 (Produto 3, OEI); Planejamento desde a Estrutura Base de 07/03/2025, com carga de 18/07/2025; Resultados assumido pela equipe em jul/2025 (scripts de transição para a Segape); CUI criada por Natália Pires em 31/07/2025; Painel de Escolas desde o inventário de 20/10/2025; Notas Técnicas desde a nota explicativa de abr/2025; validação desde 27/01/2025 e ofícios com respostas padrão em fev/2026; institucionalização desde a integração com a Segape prevista em 2025 e o repasse à STIC em 09/02/2026; análises sob demanda desde mar/2025 (recortes, estudos do Ideb, escala das metas).");
  }

  pres.addSection({ title: "Ponto de partida" });

  // 4. O que encontramos
  {
    const s = content("Ponto de partida", "1  ·  PONTO DE PARTIDA", "Dezembro de 2024: o que encontramos");
    const cards = [
      ["FaTable", "Planilha em construção", [
        { text: "A planilha de controle 20250110_Diagnóstico PAR_Indicadores.xlsx foi elaborada pelo núcleo do IU após discussão direta com as áreas do MEC, a Undime e o Consed. Novos indicadores seguiram entrando ao longo da produção.", options: { breakLine: true } },
        { text: "Abrir a planilha online", options: { hyperlink: { url: "https://mecbrasil.sharepoint.com/:x:/s/PAR5/EZ-wU20iEP9BlgYYzAm037AB-zNp_CwemnXdVpPxaUljBA" }, color: C.accent1, bold: true, underline: { style: "sng" } } },
      ]],
      ["FaCubes", "Formato de cubo definido", [
        { text: "Estrutura acordada entre Fabiano (desenvolvedor da equipe de Lucas, CGDA/STIC) e Rebert (BI): uma linha por território, rede, etapa, modalidade e indicador, com o valor calculado." },
      ]],
      ["FaVial", "Painéis com dados fictícios", [
        { text: "Os painéis já haviam sido desenvolvidos e alimentados com arquivos de teste no formato de cubo. Arquivos marcados como FAKE ainda constam nas pastas de fontes do Contexto e do Resultados." },
      ]],
    ];
    const cw = 3.84, gap = (W - 3 * cw) / 2;
    for (let i = 0; i < 3; i++) {
      const x = L + i * (cw + gap), y = 1.65;
      card(s, x, y, cw, 3.7, C.background2, "cartao-" + i);
      await badge(s, x + 0.3, y + 0.25, 0.66, C.accent1, cards[i][0], "FFFFFF", "icone-cartao-" + i);
      txt(s, cards[i][1], { x: x + 0.3, y: y + 1.02, w: cw - 0.6, h: 0.5, fontSize: 18, bold: true, valign: "middle" });
      txt(s, cards[i][2], { x: x + 0.3, y: y + 1.55, w: cw - 0.6, h: 2.05, fontSize: 14, paraSpaceAfter: 6 });
    }
    card(s, L, 5.55, W, 1.15, C.text2, "faixa-missao");
    await badge(s, L + 0.35, 5.8, 0.65, C.accent2, "FaFlagCheckered", "FFFFFF", "icone-missao");
    txt(s, [
      { text: "Missão: ", options: { bold: true, color: C.accent2 } },
      { text: "substituir os dados fictícios por dados reais, calculados e validados com fontes oficiais, em prazo curto e com a lista de indicadores ainda em definição.", options: { color: C.background1 } },
    ], { x: L + 1.25, y: 5.55, w: W - 1.55, h: 1.15, fontSize: 18, valign: "middle" });
    s.addNotes("A planilha de controle (Team Channel/0_data/0_arquivos_auxiliares/20250110_Diagnóstico PAR_Indicadores.xlsx) foi construída pelo núcleo do IU após discussões com as áreas do MEC, Undime e Consed. Os arquivos fictícios ainda estão em Contexto/00_Fontes_de_Dados (ex.: 'Censo da educação Básica com Etapa e raca e genero_FAKE.xlsx') e Resultados/00_Fontes_de_Dados ('CENSO_ED_BAS_MOD_ALFAB(dados FAKE)').");
  }

  // 5. Equipe
  {
    const s = content("Ponto de partida", "1  ·  PONTO DE PARTIDA", "Equipe inicial e pontos focais");
    const ppl = [
      ["VA", "Victor Alcantara", "Consultor de dados; indicadores com fonte no Censo Escolar. Entrada em dez/2024"],
      ["NP", "Natália Pires", "Consultora de dados; entrada junto com Victor, em dez/2024"],
      ["SM", "Sabrina Medeiros", "Consultora de dados já em atuação; dados do Painel de Resultados"],
      ["SF", "Samuel Franco", "Coordenação técnica da gestão dos dados; referência para avançar na produção"],
      ["RA", "Rebert Tomaz de Aquino", "BI do Novo PAR; ponto focal sobre o que estava em andamento"],
      ["JC", "João César", "CGARE/SEB; referência sobre o contexto do Novo PAR"],
    ];
    const cw = 3.75, ch = 1.55, gx = 0.3, gy = 0.2;
    ppl.forEach(([ini, nome, papel], i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = L + col * (cw + gx), y = 1.65 + row * (ch + gy);
      card(s, x, y, cw, ch, C.background2, "pessoa-" + i);
      s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.42, w: 0.72, h: 0.72, fill: { color: i < 3 ? C.accent1 : C.accent3 }, line: { color: C.background1, width: 0 }, objectName: "iniciais-" + i });
      txt(s, ini, { x: x + 0.25, y: y + 0.42, w: 0.72, h: 0.72, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle" });
      txt(s, nome, { x: x + 1.15, y: y + 0.2, w: cw - 1.35, h: 0.4, fontSize: 15, bold: true, valign: "middle" });
      txt(s, papel, { x: x + 1.15, y: y + 0.62, w: cw - 1.35, h: 0.85, fontSize: 12.5, color: C.text1 });
    });
    const px = L + 2 * cw + gx + 0.35, pw = RX - px;
    card(s, px, 1.65, pw, 5.05, C.text2, "painel-entendimento");
    await badge(s, px + 0.35, 1.95, 0.62, C.accent2, "FaQuoteLeft", "FFFFFF", "icone-citacao");
    txt(s, "Entendemos, na época, que o processo seria orgânico e dinâmico: produção e revisão contínuas, guiadas pelo uso e pela demanda dos usuários e das áreas.", { x: px + 0.35, y: 2.75, w: pw - 0.7, h: 2.35, fontSize: 19, italic: true, fontFace: HEAD, color: C.background1 });
    txt(s, [
      { text: "Desenvolvimento do BI", options: { bold: true, color: C.accent2, breakLine: true } },
      { text: "Fabiano Balduino Barbosa e Davidson Clynton das Chagas, da equipe de Lucas Bordin Teles (CGDA/STIC), responsáveis pela carga dos cubos no Power BI", options: { color: C.accent4 } },
    ], { x: px + 0.35, y: 5.2, w: pw - 0.7, h: 1.4, fontSize: 13 });
    s.addNotes("Pontos focais: Rebert, para o que estava em andamento; João, para o contexto do Novo PAR; Samuel, para como avançar na produção e gestão dos dados e indicadores. A lista de pendências registra Samuel Franco na coordenação técnica (3h semanais) e Radson Lima na coordenação de gestão. Natália desenvolveu depois a Codificação Única dos Indicadores (CUI).");
  }

  // 5b. Interlocutores
  {
    const s = content("Ponto de partida", "1  ·  PONTO DE PARTIDA", "Interlocutores ao longo do processo");
    const grupos = [
      ["FaUsers", "Equipe de Dados (SEB)", ["Victor Gabriel Alcantara", "Natália Pires", "Sabrina Medeiros"], C.accent1],
      ["FaLandmark", "Gestão do Novo PAR (SEB)", ["João César da Fonseca Neto (CGARE/SEB)", "Samuel Franco (coordenação técnica)"], C.accent1],
      ["FaChartBar", "BI dos painéis", ["Rebert Tomaz de Aquino (hoje CGIPEME/DICOPE/SASE/MEC)"], C.accent3],
      ["FaServer", "Desenvolvimento e carga (STIC/CGDA)", ["Lucas Bordin Teles (servidor)", "Fabiano Balduino Barbosa (PRIMEUP)", "Davidson Clynton das Chagas (PRIMEUP)"], C.accent3],
      ["FaProjectDiagram", "Sistema de planejamento", ["Sérgio Henrique de Sousa Silva (UNESCO/CGARE/SEB)", "Gabriela Miranda dos Santos (STIC/CGSA/G4F)"], C.accent2],
      ["FaDatabase", "Gestão de dados do MEC (Segape/DMAPE)", ["Lucas Evencio Soares Dutra (servidor)", "Camila Porto Fasolo (servidora)"], C.accent2],
    ];
    const cw = 3.84, gap = (W - 3 * cw) / 2, ch = 2.2;
    for (let i = 0; i < grupos.length; i++) {
      const [ic, t, nomes, c] = grupos[i];
      const col = i % 3, row = Math.floor(i / 3);
      const x = L + col * (cw + gap), y = 1.65 + row * (ch + 0.25);
      card(s, x, y, cw, ch, C.background2, "grupo-" + i);
      await badge(s, x + 0.25, y + 0.25, 0.56, c, ic, "FFFFFF", "icone-grupo-" + i);
      txt(s, t, { x: x + 0.95, y: y + 0.2, w: cw - 1.15, h: 0.66, fontSize: 15, bold: true, valign: "middle" });
      txt(s, bullets(nomes, { space: 5 }), { x: x + 0.3, y: y + 1.0, w: cw - 0.55, h: ch - 1.1, fontSize: 13.5 });
    }
    txt(s, [
      { text: "Mapeamento de processos: ", options: { bold: true } },
      { text: "Andriênia Rênia Santos de Sousa (FGV) documentou o histórico com as equipes da SEB, da STIC e da Segape." },
    ], { x: L, y: 6.42, w: W, h: 0.32, fontSize: 12, color: C.accent3, valign: "middle" });
    s.addNotes("Nomes e vínculos conforme a lista da equipe. O vínculo de Rebert indicado é o atual; no início do projeto ele respondia pelo BI do Novo PAR na SEB. Gabriela coordenava a equipe do sistema de planejamento; Sérgio enviou o levantamento de indicadores agregados que deu origem à Estrutura Base.");
  }

  // =====================================================================
  // 2. PRODUÇÃO E LANÇAMENTO
  // =====================================================================
  pres.addSection({ title: "Produção e lançamento" });

  // 6. Crescimento da lista
  {
    const s = content("Produção e lançamento", "2  ·  PRODUÇÃO E LANÇAMENTO", "A lista de indicadores cresceu durante a produção");
    s.addChart(pres.charts.BAR, [
      { name: "Mapeados na planilha", labels: ["18/12/2024", "04/01/2025", "09/01/2025", "20/01/2025", "mar/2025"], values: [84, 86, 113, 111, 115] },
      { name: "Calculados", labels: ["18/12/2024", "04/01/2025", "09/01/2025", "20/01/2025", "mar/2025"], values: [27, 59, 99, 100, 105] },
    ], {
      x: L, y: 1.6, w: 7.5, h: 4.2, barDir: "col", barGrouping: "clustered", barGapWidthPct: 60,
      chartColors: [H.accent4, H.accent1], showLegend: true, legendPos: "t", legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: H.dk1,
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt", dataLabelColor: H.dk1,
      catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", catAxisLabelColor: H.accent3,
      valAxisHidden: true, valAxisMaxVal: 130, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      catAxisLineShow: true, catAxisLineColor: H.accent4, showTitle: false, objectName: "grafico-crescimento",
    });
    txt(s, [
      { text: "Indicadores de insumos com fonte no Censo Escolar: mapeados e calculados", options: { bold: true, breakLine: true } },
      { text: "Fonte: Produtos 1 e 3 da consultoria (OEI), relatórios de 20/01/2025 e 19/03/2025.", options: { breakLine: true } },
      { text: "Nota: o total mapeado variou porque a planilha de controle seguia em construção; em mar/2025, 6 indicadores foram excluídos." },
    ], { x: L, y: 5.9, w: 7.5, h: 0.85, fontSize: 11, color: C.accent3 });
    const px = 8.4, pw = RX - px;
    card(s, px, 1.65, pw, 5.05, C.background2, "painel-planilha-hoje");
    txt(s, "Planilha de controle hoje", { x: px + 0.3, y: 1.85, w: pw - 0.6, h: 0.4, fontSize: 17, bold: true });
    txt(s, "Aba Insumos, 186 indicadores", { x: px + 0.3, y: 2.25, w: pw - 0.6, h: 0.3, fontSize: 13, color: C.accent3 });
    const mini = [["163", "feitos", C.accent1], ["17", "pendentes", C.accent2], ["6", "excluídos", C.accent3]];
    mini.forEach(([n, l, c], i) => {
      const mx = px + 0.3 + i * 1.28;
      txt(s, n, { x: mx, y: 2.65, w: 1.2, h: 0.55, fontSize: 28, bold: true, fontFace: HEAD, color: c, valign: "middle" });
      txt(s, l, { x: mx, y: 3.18, w: 1.2, h: 0.3, fontSize: 12, color: C.text1 });
    });
    txt(s, "Fonte dos indicadores", { x: px + 0.3, y: 3.7, w: pw - 0.6, h: 0.35, fontSize: 14, bold: true });
    const fontes = [["Censo Escolar", 117], ["Diag. das Escolas (PDDE)", 36], ["Diag. de Equidade (Secadi)", 17], ["CGTI/MEC", 4], ["SIMEC/CNCA", 4], ["Outras fontes", 8]];
    fontes.forEach(([l, v], i) => {
      const y = 4.12 + i * 0.4;
      txt(s, l, { x: px + 0.3, y, w: 1.9, h: 0.3, fontSize: 11.5, valign: "middle" });
      const bw = Math.max(0.05, 1.3 * v / 117);
      s.addShape(pres.shapes.RECTANGLE, { x: px + 2.25, y: y + 0.05, w: bw, h: 0.2, fill: { color: i === 0 ? C.accent1 : C.accent4 }, line: { color: i === 0 ? C.accent1 : C.accent4, width: 0 }, objectName: "barra-fonte-" + i });
      txt(s, String(v), { x: px + 2.3 + bw, y, w: 0.5, h: 0.3, fontSize: 11.5, bold: true, valign: "middle" });
    });
    s.addNotes("Evolução registrada nos relatórios: 18/12/2024, 27 de 84 indicadores; 04/01/2025, 59 de 86; 09/01/2025, 99 de 113; 20/01/2025, 100 de 111; mar/2025, 105 de 115 (96,5% dos indicadores com fonte no Censo). Situação atual da aba Insumos da planilha de controle: 163 feitos, 12 pendentes por dados, 5 pendentes por dúvidas, 6 excluídos. Outras fontes: FNDE, PNAE, FUNDEB, Demanda Manifesta e indicadores a conferir com a Secadi.");
  }

  // 7. Do prazo curto ao lançamento
  {
    const s = content("Produção e lançamento", "2  ·  PRODUÇÃO E LANÇAMENTO", "Do prazo curto ao lançamento");
    const steps = [
      ["17/12/2024", "Bases do Censo recebidas via STIC: escolas, turmas, matrículas e docentes"],
      ["jan/2025", "Base de gestores (10/01); 1ª versão para a prévia, na 1ª quinzena"],
      ["27/01", "Início da validação, 10 dias antes da homologação"],
      ["29/01 e 07/02", "Retrato da Educação Infantil e CNCA recebidos; pendências produzidas"],
      ["07/02", "Homologação dos dados com as equipes de BI e da SEB"],
      ["10/02/2025", "Painéis publicados; lançamento no Encontro Nacional de Prefeitos e Prefeitas"],
    ];
    const bw = 1.9, gap = (W - 6 * bw) / 5;
    steps.forEach(([d, t], i) => {
      const x = L + i * (bw + gap), y = 1.65, last = i === steps.length - 1;
      card(s, x, y, bw, 1.95, last ? C.text2 : C.background2, "etapa-" + i);
      txt(s, d, { x: x + 0.18, y: y + 0.16, w: bw - 0.36, h: 0.4, fontSize: 15, bold: true, color: last ? C.accent2 : C.accent1, valign: "middle" });
      txt(s, t, { x: x + 0.18, y: y + 0.62, w: bw - 0.36, h: 1.25, fontSize: 13, color: last ? C.background1 : C.text1 });
    });
    // estratégias
    const by = 3.9, bh = 2.8;
    card(s, L, by, 7.2, bh, C.background2, "painel-validacao");
    txt(s, "Estratégias de validação sob prazo", { x: L + 0.3, y: by + 0.2, w: 6.6, h: 0.4, fontSize: 16, bold: true });
    const est = [
      "Combinações de etapa e modalidade restritas às ofertas possíveis em cada escola",
      "Totais de escolas por etapa conferidos com a Sinopse do Censo (178.476 escolas)",
      "Cálculo conferido passo a passo na UF de SP, no município de SP e em Monte Santo do Tocantins",
    ];
    est.forEach((t, i) => {
      const y = by + 0.8 + i * 0.66;
      numBadge(s, L + 0.3, y + 0.05, 0.42, C.accent1, i + 1, 13, "num-validacao-" + i);
      txt(s, t, { x: L + 0.9, y, w: 6.05, h: 0.52, fontSize: 14, valign: "middle" });
    });
    const px = L + 7.5, pw = RX - px;
    card(s, px, by, pw, bh, C.accent2, "painel-percalcos", { transparency: 82 });
    await badge(s, px + 0.3, by + 0.2, 0.48, C.accent2, "FaHourglassHalf", "FFFFFF", "icone-percalcos");
    txt(s, "Percalços", { x: px + 0.9, y: by + 0.2, w: pw - 1.2, h: 0.48, fontSize: 16, bold: true, valign: "middle" });
    txt(s, bullets([
      "Acesso aos dados negociado com as áreas; sala segura do Sedap/Inep agendada (20 a 24/01) e descartada com a chegada das bases",
      "Até a semana de 27/01 ainda havia indicadores em elaboração e dados chegando",
    ], { space: 10 }), { x: px + 0.3, y: by + 0.85, w: pw - 0.55, h: 1.85, fontSize: 14 });
    s.addNotes("O Produto 3 (OEI, 19/03/2025) registra: validação iniciada em 27/01/2025, homologação prevista para 07/02/2025 e lançamento em 10/02; a entrega foi feita para o lançamento do Novo PAR no Encontro Nacional dos Prefeitos e Prefeitas, em Brasília (11 a 13/02/2025). A versão de 09/01/2025 (99 de 113 indicadores), registrada no Produto 1 (OEI), foi a enviada para a prévia. Depois do lançamento houve diversos eventos de apresentação e divulgação dos painéis, com assistência técnica da equipe de dados.");
  }

  // 8. Pós-lançamento
  {
    const s = content("Produção e lançamento", "2  ·  PRODUÇÃO E LANÇAMENTO", "Após o lançamento: produção e revisão contínuas");
    const cols = [
      ["FaPuzzlePiece", "Lacunas preenchidas", [
        "Educação Infantil e alfabetização (25, 27, 42, 44 e 46), com o Retrato da EI e o CNCA",
        "Educação Especial em classe comum e exclusiva (36, 37) e AEE (194 a 196)",
        "Mar/2025: 96,5% dos indicadores do Censo produzidos; 6 excluídos por problemas substantivos",
      ]],
      ["FaSlidersH", "Regras revistas", [
        "Regular passa a 'Geral (Urbana)': as modalidades da escola tornam-se exclusivas",
        "Educação Bilíngue de Surdos suspensa: sem ID_TURMA não há como ligar matrícula e turma",
        "EPT alinhada à Sinopse 2025 (IFTP); tempo integral pelo critério de 35 horas semanais",
      ]],
      ["FaSyncAlt", "Atualizações anuais", [
        "Censo 2024: dados em 06/05/2025, rotinas reexecutadas em cerca de 2 dias, painéis em 05/06/2025",
        "4.060 escolas sem matrícula identificadas pela base de turmas",
        "Censo 2025: VPN pedida em 03/03/2026, base ajustada em 10/04 e painéis em 16/04/2026",
      ]],
    ];
    const cw = 3.84, gap = (W - 3 * cw) / 2;
    for (let i = 0; i < 3; i++) {
      const x = L + i * (cw + gap), y = 1.65;
      card(s, x, y, cw, 3.75, C.background2, "coluna-" + i);
      await badge(s, x + 0.3, y + 0.25, 0.62, C.accent1, cols[i][0], "FFFFFF", "icone-coluna-" + i);
      txt(s, cols[i][1], { x: x + 1.1, y: y + 0.25, w: cw - 1.35, h: 0.62, fontSize: 18, bold: true, valign: "middle" });
      txt(s, bullets(cols[i][2], { space: 10 }), { x: x + 0.3, y: y + 1.05, w: cw - 0.55, h: 2.6, fontSize: 14 });
    }
    card(s, L, 5.6, W, 1.1, C.text2, "faixa-licao");
    await badge(s, L + 0.3, 5.82, 0.66, C.accent2, "FaLightbulb", "FFFFFF", "icone-licao");
    txt(s, [
      { text: "Lição do período: ", options: { bold: true, color: C.accent2 } },
      { text: "com códigos documentados e automatizados, atualizar os painéis leva poucos dias; o prazo passou a depender do acesso aos dados, não da produção dos indicadores.", options: { color: C.background1 } },
    ], { x: L + 1.2, y: 5.6, w: W - 1.5, h: 1.1, fontSize: 16, valign: "middle" });
    s.addNotes("Fontes: Produtos 3, 4 e 5 (OEI) e Produto 4 (UNESCO, 26/05/2026). No Censo 2024, o total de escolas identificadas chegou a 179.065, contra 179.286 da Sinopse, e a STIC foi alertada sobre possíveis novas atualizações. No Censo 2025, a VPN foi liberada em 13/03, a máquina de 16 GB em 20/03 e o primeiro acesso aos dados em 22/03; a nova versão dos arquivos, com as adequações do IFTP, chegou em 10/04. A Educação Bilíngue de Surdos foi desativada no pipeline em 27/07/2026, mantendo o código 8 reservado.");
  }

  // =====================================================================
  // 3. PROCEDIMENTOS
  // =====================================================================
  pres.addSection({ title: "Procedimentos" });

  // 9. Esteira
  {
    const s = content("Procedimentos", "3  ·  PROCEDIMENTOS", "Esteira de produção e publicação");
    const r1 = [
      ["Planilha de controle", "lista, regra e situação de cada indicador"],
      ["Importação", "microdados e bases das áreas"],
      ["Códigos em R", "ETL, regras e cálculo por painel"],
      ["Produção e validação", "conferência com a Sinopse e fontes oficiais"],
      ["Exportação", "cubos e planilhas de dimensão"],
    ];
    const r2 = [
      ["Carga no Power BI", "desenvolvedores da CGDA/STIC"],
      ["Homologação", "conferência no ambiente de teste"],
      ["Aprovação da SEB", "área negocial"],
      ["Produção", "atualização do BI publicado"],
      ["Link público", "painéis disponíveis aos entes"],
    ];
    const bw = 2.07, gap = (W - 5 * bw) / 4;
    txt(s, "EQUIPE DE DADOS", { x: L, y: 1.6, w: 4, h: 0.3, fontSize: 11, bold: true, color: C.accent3, charSpacing: 1.5 });
    r1.forEach(([t, d], i) => {
      const x = L + i * (bw + gap), y = 1.95;
      card(s, x, y, bw, 1.55, C.background2, "passo-" + (i + 1));
      numBadge(s, x + 0.15, y + 0.15, 0.4, C.accent1, i + 1, 13, "num-passo-" + (i + 1));
      txt(s, t, { x: x + 0.62, y: y + 0.12, w: bw - 0.72, h: 0.46, fontSize: 14, bold: true, valign: "middle" });
      txt(s, d, { x: x + 0.15, y: y + 0.7, w: bw - 0.3, h: 0.75, fontSize: 12.5 });
      if (i < 4) arrowR(s, x + bw + 0.06, y + 0.78, gap - 0.12);
    });
    arrowD(s, L + 4 * (bw + gap) + bw / 2, 3.53, 0.74);
    txt(s, "DESENVOLVIMENTO (STIC) E SEB", { x: L, y: 3.92, w: 5, h: 0.3, fontSize: 11, bold: true, color: C.accent3, charSpacing: 1.5 });
    r2.forEach(([t, d], i) => {
      const x = L + (4 - i) * (bw + gap), y = 4.3, seb = i === 2;
      card(s, x, y, bw, 1.55, seb ? C.accent2 : C.background1, "passo-" + (i + 6), { line: { color: seb ? C.accent2 : C.accent4, width: 1.25 }, transparency: seb ? 80 : 0 });
      numBadge(s, x + 0.15, y + 0.15, 0.4, seb ? C.accent2 : C.accent3, i + 6, 13, "num-passo-" + (i + 6));
      txt(s, t, { x: x + 0.62, y: y + 0.12, w: bw - 0.72, h: 0.46, fontSize: 14, bold: true, valign: "middle" });
      txt(s, d, { x: x + 0.15, y: y + 0.7, w: bw - 0.3, h: 0.75, fontSize: 12.5 });
      if (i < 4) arrowL(s, x - gap + 0.06, y + 0.78, gap - 0.12);
    });
    await badge(s, L, 6.12, 0.48, C.accent1, "FaRedo", "FFFFFF", "icone-retro");
    txt(s, "Retroalimentação: ofícios, contestações e revisões internas voltam à planilha de controle e aos códigos, reiniciando a esteira.", { x: L + 0.65, y: 6.12, w: W - 0.65, h: 0.48, fontSize: 14, valign: "middle" });
    s.addNotes("Esteira baseada na apresentação '1 - Novo Par - Sistema de Produção de Indicadores' (pasta 3_docs): a Equipe de Dados cuida da planilha de controle, da importação, dos códigos, da produção e da exportação; a Equipe de Desenvolvimento faz a carga, a homologação e a atualização em produção; a SEB aprova antes da publicação no link público.");
  }

  // 10. Arquitetura R
  {
    const s = content("Procedimentos", "3  ·  PROCEDIMENTOS", "Arquitetura dos códigos em R");
    const lx = L, lw = 1.35, ax = L + 1.5, aw = 8.25 - ax;
    const layer = (label, y, h) => txt(s, label, { x: lx, y, w: lw, h, fontSize: 13, bold: true, color: C.accent1, valign: "middle" });
    // fontes
    layer("Fontes", 1.65, 0.95);
    card(s, ax, 1.65, aw, 0.95, C.background2, "camada-fontes");
    txt(s, "Censo Escolar (microdados via STIC)  ·  Diagnóstico das Escolas (PDDE)  ·  Diagnóstico de Equidade (Secadi)  ·  CNCA  ·  Retrato da EI  ·  Escolas Conectadas  ·  Inep público  ·  IBGE", { x: ax + 0.2, y: 1.65, w: aw - 0.4, h: 0.95, fontSize: 12.5, valign: "middle" });
    arrowD(s, ax + aw / 2, 2.62, 0.22);
    layer("0_etl_dados", 2.88, 0.9);
    card(s, ax, 2.88, aw, 0.9, C.text2, "camada-etl");
    txt(s, "Extração e rótulos  ·  oferta por etapa e modalidade (matrículas, turmas, profissionais)  ·  composição das escolas", { x: ax + 0.2, y: 2.88, w: aw - 0.4, h: 0.9, fontSize: 13, color: C.background1, valign: "middle" });
    arrowD(s, ax + aw / 2, 3.8, 0.22);
    layer("Produção por painel", 4.06, 1.2);
    const pn = [["Contexto", "tabelas por tela"], ["Resultados", "scripts 2_0 a 2_5"], ["Insumos", "scripts 3.0 a 3.11"], ["Escolas", "scripts 4.0 a 4.3.x"]];
    const pw4 = (aw - 3 * 0.15) / 4;
    pn.forEach(([a, b], i) => {
      const x = ax + i * (pw4 + 0.15);
      card(s, x, 4.06, pw4, 1.2, C.accent1, "painel-codigo-" + i);
      txt(s, [{ text: a, options: { bold: true, breakLine: true, fontSize: 14 } }, { text: b, options: { fontSize: 12 } }], { x: x + 0.08, y: 4.06, w: pw4 - 0.16, h: 1.2, color: C.background1, valign: "middle", align: "center" });
    });
    arrowD(s, ax + aw / 2, 5.28, 0.22);
    layer("Saídas", 5.54, 1.15);
    card(s, ax, 5.54, aw, 1.15, C.background2, "camada-saidas");
    txt(s, "Cubos em CSV e Parquet  ·  planilhas de indicadores e de dimensões  ·  faróis  ·  4_dados_planejamento: cubo do sistema de planejamento", { x: ax + 0.2, y: 5.54, w: aw - 0.4, h: 1.15, fontSize: 13, valign: "middle" });
    const px = 8.55, pw = RX - px;
    card(s, px, 1.65, pw, 5.05, C.background2, "painel-convencoes");
    await badge(s, px + 0.3, 1.85, 0.5, C.accent1, "FaRulerCombined", "FFFFFF", "icone-convencoes");
    txt(s, "Convenções", { x: px + 0.95, y: 1.85, w: pw - 1.2, h: 0.5, fontSize: 16, bold: true, valign: "middle" });
    txt(s, bullets([
      "Pastas 0_data, 1_code, 2_outp e 3_docs",
      "Scripts mestres executam a cadeia e gravam metadados de cada etapa",
      "De-paras em Excel, fora do código",
      "Caminho do drive resolvido para qualquer usuário",
      "Validação contra a Sinopse do Inep a cada edição",
      "Referência no OneDrive da consultoria; cópia sincronizada no Team Channel",
    ], { space: 8 }), { x: px + 0.3, y: 2.55, w: pw - 0.55, h: 4.05, fontSize: 13.5 });
    s.addNotes("Código de referência em '0 - PAR5 - pasta Victor/1_code' (OneDrive), com 21 scripts de ETL, 12 de Resultados, 15 de Insumos e 34 do Painel de Escolas. Em 21/10/2026 a cópia do Team Channel foi sincronizada (109 arquivos: 31 novos e 78 atualizados), alterando apenas os apontamentos de diretório. Os metadados de execução registram, por script, número de indicadores, linhas e tempo de processamento.");
  }

  // 11. Formato de cubo
  {
    const s = content("Procedimentos", "3  ·  PROCEDIMENTOS", "O formato de cubo e suas variações");
    const specs = [
      ["Painel de Insumos", "primeira versão, jan/2025", ["IBGE_MUNICIPIO", "TP_DEPENDENCIA", "id_modalidade", "id_etapa", "id_indicador", "VALOR"], "12,5 mi linhas  ·  100 indicadores"],
      ["Painel de Escolas", "cubo consolidado, 2026", ["ANO", "CO_ENTIDADE", "CO_GEOGRAFIA", "TP_DEPENDENCIA", "ID_ETAPA", "ID_MODAL", "ID_INDICADOR", "VALOR", "PAINEL_ORIGEM", "ID_FAROL"], "≈229 mi linhas  ·  CUI e faróis"],
      ["Sistema de planejamento", "cubo agregado por ente", ["cod_ibge", "ID", "Indicador", "Fonte do Indicador", "csd", "ano", "formato", "VALOR", "farol"], "1 ID = 1 valor por ente"],
    ];
    const cw = 3.84, gap = (W - 3 * cw) / 2;
    specs.forEach(([t, sub, cols, foot], i) => {
      const x = L + i * (cw + gap), y = 1.65;
      card(s, x, y, cw, 4.6, C.background2, "especificacao-" + i);
      txt(s, t, { x: x + 0.25, y: y + 0.18, w: cw - 0.5, h: 0.4, fontSize: 17, bold: true, valign: "middle" });
      txt(s, sub, { x: x + 0.25, y: y + 0.56, w: cw - 0.5, h: 0.3, fontSize: 12, color: C.accent3 });
      cols.forEach((c, j) => {
        const cy = y + 0.95 + j * 0.31;
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: cy, w: cw - 0.5, h: 0.26, rectRadius: 0.04, fill: { color: C.background1 }, line: { color: C.accent6, width: 0.75 }, objectName: "coluna-" + i + "-" + j });
        txt(s, c, { x: x + 0.38, y: cy, w: cw - 0.76, h: 0.26, fontSize: 12, fontFace: "Courier New", valign: "middle" });
      });
      txt(s, foot, { x: x + 0.25, y: y + 4.1, w: cw - 0.5, h: 0.38, fontSize: 13, bold: true, color: C.accent1, valign: "middle" });
    });
    txt(s, "As dimensões ficam em tabelas auxiliares (etapa, modalidade, dependência administrativa, geografia, indicadores e faróis), carregadas junto com o cubo.", { x: L, y: 6.38, w: W, h: 0.35, fontSize: 13, color: C.accent3, valign: "middle" });
    s.addNotes("Insumos jan/2025: 12.496.873 linhas e 6 colunas, 100 indicadores, municípios, UFs e Brasil (5.598 códigos). Escolas: estrutura de 10 colunas registrada no Produto 4 (UNESCO). Planejamento: saída do 4_cubo_planejamento.R (Censo_ds_cubo_planejamento.csv). O Painel de Insumos também exporta o cubo de pop-up dos indicadores sintéticos (Censo_ds_popup_insumos.csv).");
  }

  // =====================================================================
  // 4. PLANEJAMENTO
  // =====================================================================
  pres.addSection({ title: "Planejamento" });

  // 12. Cubo de planejamento
  {
    const s = content("Planejamento", "4  ·  PLANEJAMENTO", "Cubo de planejamento: a ponte com o sistema");
    const flow = [
      ["Cubos dos painéis", "desagregados por etapa, modalidade e csd"],
      ["Estrutura Base de Indicadores", "de-para por ID do planejamento"],
      ["Montagem em R", "4_cubo_planejamento.R, regras e faróis"],
      ["Cubo do planejamento", "um valor por ente e ID, em CSV"],
      ["Sistema de planejamento", "carga pela equipe do sistema"],
    ];
    const bw = 2.1, gap = (W - 5 * bw) / 4;
    flow.forEach(([t, d], i) => {
      const x = L + i * (bw + gap), y = 1.65, sys = i === 4;
      card(s, x, y, bw, 1.25, sys ? C.accent3 : C.background2, "fluxo-planejamento-" + i);
      txt(s, [{ text: t, options: { bold: true, breakLine: true, fontSize: 13 } }, { text: d, options: { fontSize: 12 } }], { x: x + 0.15, y, w: bw - 0.3, h: 1.25, valign: "middle", color: sys ? C.background1 : C.text1 });
      if (i < 4) arrowR(s, x + bw + 0.05, y + 0.62, gap - 0.1);
    });
    card(s, L, 3.1, W, 0.95, C.text2, "faixa-chave");
    txt(s, [
      { text: "ID do planejamento  ←  id_indicador + id_modal + id_etapa + csd", options: { fontFace: "Courier New", bold: true, fontSize: 17, color: C.background1, breakLine: true } },
      { text: "Ex.: taxa de abandono nos Anos Finais do EF na Educação do Campo = indicador 4 + etapa 5 + modalidade 3", options: { fontSize: 13, color: C.accent4 } },
    ], { x: L + 0.35, y: 3.1, w: W - 0.7, h: 0.95, valign: "middle" });
    card(s, L, 4.25, 7.3, 2.45, C.background2, "painel-construcao");
    txt(s, "Como foi construído", { x: L + 0.3, y: 4.4, w: 6.7, h: 0.4, fontSize: 16, bold: true });
    txt(s, bullets([
      "Sérgio Henrique de Sousa Silva (UNESCO/CGARE/SEB), com a equipe de Gabriela Miranda dos Santos (STIC/CGSA), enviou o levantamento de indicadores já agregados por etapa e modalidade",
      "Montamos o de-para para puxar os indicadores dos cubos de origem e entregamos o cubo no formato acordado, em R e com documentação",
      "A equipe de dados ficou responsável por atualizar painéis e sistema a cada nova publicação ou correção",
    ], { space: 6 }), { x: L + 0.3, y: 4.85, w: 6.75, h: 1.8, fontSize: 13.5 });
    const px = L + 7.6, pw = RX - px;
    card(s, px, 4.25, pw, 2.45, C.accent2, "painel-riscos", { transparency: 82 });
    await badge(s, px + 0.3, 4.4, 0.48, C.accent2, "FaExclamationTriangle", "FFFFFF", "icone-riscos");
    txt(s, "Riscos alertados na época", { x: px + 0.9, y: 4.4, w: pw - 1.15, h: 0.48, fontSize: 16, bold: true, valign: "middle" });
    txt(s, bullets([
      "Identificação diferente: ID do planejamento e IDs dos painéis não coincidem",
      "Desalinhamento entre painéis de origem e sistema quando um lado é atualizado sem o outro",
    ], { space: 8 }), { x: px + 0.3, y: 5.0, w: pw - 0.55, h: 1.6, fontSize: 13.5 });
    s.addNotes("A Estrutura Base de Indicadores.xlsx (pasta Planejamento) foi criada por Sérgio Henrique de Sousa Silva em 07/03/2025. Há versão do cubo de 18/07/2025 e apresentações de validação de 25/08 (Porto Velho), 02/09 e 15/09/2025. A etapa de planejamento do Novo PAR foi aberta a partir de julho/2025, após o questionário do diagnóstico (Ofício Circular nº 42/2025/SEB). O script em produção é o 4_cubo_planejamento.R; a primeira versão (6.2_cubo_planejamento.R) partiu de um cubo fictício com a estrutura dos dados.");
  }

  // 13. Achados planejamento
  {
    const s = content("Planejamento", "4  ·  PLANEJAMENTO", "O que o acompanhamento revelou em 2026");
    const stats = [
      ["41 de 129", "IDs de Contexto produzidos; os demais entram zerados ou herdados do ciclo anterior", C.accent5],
      ["15", "IDs do planejamento sem linha de de-para nas abas por painel da Estrutura Base", C.accent5],
      ["660", "divergências de campo entre a aba mestre e as abas por painel (revisão de 31/08/2026)", C.accent2],
      ["77,6%", "dos entes (4.338 de 5.593) com ao menos uma meta fora da escala do indicador", C.accent2],
    ];
    const cw = 2.8, gap = (W - 4 * cw) / 3;
    stats.forEach(([n, l, c], i) => {
      const x = L + i * (cw + gap), y = 1.65;
      card(s, x, y, cw, 1.95, C.background2, "achado-" + i);
      txt(s, n, { x: x + 0.25, y: y + 0.18, w: cw - 0.5, h: 0.72, fontSize: 34, bold: true, fontFace: HEAD, color: c, valign: "middle" });
      txt(s, l, { x: x + 0.25, y: y + 0.95, w: cw - 0.5, h: 0.92, fontSize: 12.5 });
    });
    const rows = [
      ["FaRulerCombined", "Metas digitadas na escala errada (percentual num índice de 0 a 5 ou 0 a 10); a linha de base está correta. Em set/2026 foi preparada para a STIC a correção das metas do IN, com regras de divisão por faixa."],
      ["FaUnlink", "O IDEB não integra a estrutura do planejamento; o correspondente de aprendizagem é o IN (IDs 37, 85 e 135)."],
      ["FaFilter", "A imputação de ausentes como zero torna indistinguível um indicador sem fonte de um valor igual a zero."],
    ];
    for (let i = 0; i < rows.length; i++) {
      const y = 3.9 + i * 0.95;
      await badge(s, L, y + 0.1, 0.6, C.accent3, rows[i][0], "FFFFFF", "achado-icone-" + i);
      txt(s, rows[i][1], { x: L + 0.85, y, w: W - 0.85, h: 0.82, fontSize: 15, valign: "middle" });
    }
    s.addNotes("Fontes: revisão do cubo de planejamento (27/07/2026), revisão da Estrutura Base de Indicadores (31/08/2026) e validação de escala da extração Olinda de 06/08/2026 (scripts 6.1 e 6.2). Nos ICO por etapa, 62,2% dos entes que pactuaram metas ficaram fora da escala; no IN, 11,2% (524 entes). A correção estrutural é validar o intervalo no campo de meta do sistema.");
  }

  // =====================================================================
  // 5. DOCUMENTAÇÃO E TRANSPARÊNCIA
  // =====================================================================
  pres.addSection({ title: "Documentação e transparência" });

  // 14. Notas técnicas
  {
    const s = content("Documentação e transparência", "5  ·  DOCUMENTAÇÃO E TRANSPARÊNCIA", "Notas Técnicas e documentação de referência");
    const docs = [
      ["mai/2025", "Nota Técnica da Equipe de Dados, v1 e v2: tipologia de cálculo e fichas dos indicadores de Insumos"],
      ["2025", "Nota explicativa dos indicadores 75 e 76 e registro dos ajustes feitos após o lançamento"],
      ["fev/2026", "NT dos Painéis de Resultados e de Insumos, com versão sem logo em mai/2026"],
      ["2026", "Metodologias de Tempo Integral e de Educação Profissional (Censo 2025)"],
      ["jul/2026", "NT do Painel de Contexto"],
      ["out/2026", "NT dos indicadores do Diagnóstico das Escolas (PDDE)"],
    ];
    const dx = L + 1.3;
    s.addShape(pres.shapes.LINE, { x: dx + 0.09, y: 1.85, w: 0, h: 4.7, line: { color: C.accent4, width: 2 }, objectName: "linha-documentos" });
    docs.forEach(([d, t], i) => {
      const y = 1.7 + i * 0.83;
      txt(s, d, { x: L, y, w: 1.2, h: 0.35, fontSize: 14, bold: true, color: C.accent1, valign: "top" });
      s.addShape(pres.shapes.OVAL, { x: dx, y: y + 0.06, w: 0.18, h: 0.18, fill: { color: C.accent1 }, line: { color: C.background1, width: 1 }, objectName: "ponto-documento-" + i });
      txt(s, t, { x: dx + 0.4, y, w: 5.2, h: 0.72, fontSize: 14 });
    });
    const px = 7.75, pw = RX - px;
    const prin = [
      ["FaBookOpen", "Orientação de leitura sempre que possível, para gestores e equipes técnicas"],
      ["FaLink", "Indicadores secundários: referência e link para a fonte oficial (Inep, IBGE), sem reescrever a metodologia"],
      ["FaLayerGroup", "Tipologia de cálculo: razão simples, razão composta, somatório e indicadores sintéticos"],
      ["FaCodeBranch", "Documento vivo: cada revisão registra o que mudou e por quê"],
    ];
    for (let i = 0; i < prin.length; i++) {
      const y = 1.65 + i * 1.31;
      card(s, px, y, pw, 1.12, C.background2, "principio-" + i);
      await badge(s, px + 0.25, y + 0.28, 0.56, C.accent1, prin[i][0], "FFFFFF", "icone-principio-" + i);
      txt(s, prin[i][1], { x: px + 1.0, y, w: pw - 1.2, h: 1.12, fontSize: 14, valign: "middle" });
    }
    s.addNotes("Arquivos: Team Channel/NT Equipe Dados Novo Par (v1 de 05/05/2025, v2 de maio e junho de 2025, NT de Insumos e Resultados sem logo de 28/05/2026, NT de Contexto de 22/07/2026); 3_docs/Nota Explicativa - Dados e Indicadores; Documentos/2 - Metodologias; Novo PAR - Dados/2026-10-09_Nota_Tecnica_Indicadores_Diagnostico_PDDE.docx. A demanda por Notas Técnicas surgiu depois da publicação e do fornecimento dos dados.");
  }

  // 15. Ofícios
  {
    const s = content("Documentação e transparência", "5  ·  DOCUMENTAÇÃO E TRANSPARÊNCIA", "Ofícios e contestações: resposta padronizada");
    card(s, L, 1.65, 3.4, 5.05, C.text2, "painel-oficios");
    await badge(s, L + 0.35, 2.2, 0.62, C.accent2, "FaEnvelopeOpenText", "FFFFFF", "icone-oficios");
    txt(s, "24", { x: L + 0.35, y: 3.0, w: 2.7, h: 1.2, fontSize: 66, bold: true, fontFace: HEAD, color: C.background1, valign: "middle" });
    txt(s, "demandas formais registradas: 23 redes de ensino e a Undime, além de pedidos de dados por cidadãos e órgãos", { x: L + 0.35, y: 4.3, w: 2.75, h: 1.6, fontSize: 15, color: C.accent4 });
    const ax = L + 3.7, aw = RX - ax;
    const themes = [
      ["FaUsers", "Taxa de atendimento", "Tema mais recorrente. A resposta padrão explica a fórmula e as fontes oficiais."],
      ["FaClock", "Tempo integral", "Escola com oferta tem ao menos uma matrícula de 35 horas semanais ou mais; o Novo PAR não reclassifica."],
      ["FaSchool", "Escolas e matrículas", "Contagens por etapa e modalidade, condições de oferta e divergências com outras plataformas."],
    ];
    const tw = (aw - 2 * 0.3) / 3;
    for (let i = 0; i < 3; i++) {
      const x = ax + i * (tw + 0.3), y = 1.65;
      card(s, x, y, tw, 2.35, C.background2, "tema-" + i);
      await badge(s, x + 0.25, y + 0.25, 0.52, C.accent1, themes[i][0], "FFFFFF", "icone-tema-" + i);
      txt(s, themes[i][1], { x: x + 0.9, y: y + 0.25, w: tw - 1.1, h: 0.52, fontSize: 15, bold: true, valign: "middle" });
      txt(s, themes[i][2], { x: x + 0.25, y: y + 0.92, w: tw - 0.5, h: 1.35, fontSize: 13.5 });
    }
    card(s, ax, 4.2, aw, 0.85, C.accent6, "formula-atendimento");
    txt(s, [
      { text: "Taxa de atendimento  =  ", options: { bold: true } },
      { text: "matrículas da faixa etária na etapa adequada (Censo Escolar)  ÷  população da faixa etária (Censo Demográfico 2022)  ×  100" },
    ], { x: ax + 0.25, y: 4.2, w: aw - 0.5, h: 0.85, fontSize: 13.5, valign: "middle" });
    const proc = ["Registro por ente na pasta de ofícios", "Análise com referência ao código de produção", "Correção quando procedente, com registro", "Dados fornecidos só agregados (LGPD)"];
    const pw4 = (aw - 3 * 0.17) / 4;
    for (let i = 0; i < 4; i++) {
      const x = ax + i * (pw4 + 0.17), y = 5.25;
      card(s, x, y, pw4, 1.45, C.background1, "procedimento-" + i, { line: { color: C.accent4, width: 1 } });
      s.addImage({ data: await icon("FaCheckCircle", H.accent1), x: x + 0.15, y: y + 0.18, w: 0.3, h: 0.3, objectName: "check-" + i });
      txt(s, proc[i], { x: x + 0.15, y: y + 0.58, w: pw4 - 0.3, h: 0.8, fontSize: 13 });
    }
    s.addNotes("A maior parte dos ofícios tratou das taxas de atendimento e da identificação de escolas e matrículas em tempo integral; para elas foram elaboradas respostas padronizadas (Ofícios e contestações/resposta_padrao_tx_atendimento.docx e resposta_padrao_tempo_integral.docx). A resposta de atendimento também explica que a PNAD Contínua não permite estimativa municipal, por isso o denominador é o Censo Demográfico 2022.");
  }

  // =====================================================================
  // 6. CUBOS E CODIFICAÇÃO
  // =====================================================================
  pres.addSection({ title: "Cubos e codificação" });

  // 16. Planilhas -> cubo
  {
    const s = content("Cubos e codificação", "6  ·  CUBOS E CODIFICAÇÃO", "De planilhas avulsas a um cubo unificado");
    const panels = [
      ["Insumos", "Cubo", C.accent1, "Primeiro painel com carga pelo arquivo em formato de cubo, desde o lançamento"],
      ["Resultados", "Cubo em transição", C.accent3, "Cubo produzido e validado; piloto da transição na STIC, já com a CUI"],
      ["Contexto", "Planilhas", C.accent2, "Alimentado por 14 tabelas por tela, guardadas no SharePoint"],
      ["Escolas", "Cubo", C.accent1, "Nasceu como cubo único no nível da escola"],
      ["Planejamento", "Cubo próprio", C.accent1, "Agregado por ente, montado a partir dos painéis"],
    ];
    const cw = 2.25, gap = (W - 5 * cw) / 4;
    panels.forEach(([n, st, c, d], i) => {
      const x = L + i * (cw + gap), y = 1.65;
      card(s, x, y, cw, 2.75, C.background2, "painel-" + i);
      txt(s, n, { x: x + 0.22, y: y + 0.2, w: cw - 0.44, h: 0.45, fontSize: 18, bold: true, valign: "middle" });
      chip(s, x + 0.22, y + 0.78, cw - 0.44, 0.34, st, c, 12, C.background1, "situacao-" + i);
      txt(s, d, { x: x + 0.22, y: y + 1.3, w: cw - 0.44, h: 1.38, fontSize: 14 });
    });
    const fl = [
      ["Muitas planilhas no SharePoint alimentavam Contexto e Resultados, com complexidade de organização e de carga", C.background2],
      ["Iniciamos a conversão para um cubo unificado, seguindo o modelo do Painel de Insumos", C.background2],
      ["Iniciativa interrompida: prioridade para institucionalizar a produção na STIC e na Segape", C.accent2],
    ];
    const fw = 3.7, fg = (W - 3 * fw) / 2;
    fl.forEach(([t, c], i) => {
      const x = L + i * (fw + fg), y = 4.75;
      card(s, x, y, fw, 1.75, c, "etapa-unificacao-" + i, { transparency: i === 2 ? 80 : 0 });
      txt(s, t, { x: x + 0.25, y, w: fw - 0.5, h: 1.75, fontSize: 15, valign: "middle" });
      if (i < 2) arrowR(s, x + fw + 0.06, y + 0.875, fg - 0.12);
    });
    s.addNotes("O Painel de Insumos foi o primeiro com carga pelo arquivo em formato de cubo. Contexto e Resultados eram alimentados por planilhas nas pastas do projeto no SharePoint; o Contexto segue em tabelas como tab_contexto_escolas, tab_contexto_matriculas e tab_contexto_diveinc. A conversão do Resultados para cubo, com validação contra o Inep, está registrada no Produto 3 (UNESCO); o painel foi o primeiro na transição para a STIC por ter menos indicadores e fontes.");
  }

  // 17. Painel de Escolas
  {
    const s = content("Cubos e codificação", "6  ·  CUBOS E CODIFICAÇÃO", "Painel de Escolas: o desafio do agregador");
    const st = [
      ["> 1 bilhão", "de células no cubo publicado: cerca de 229 mi linhas × 10 colunas"],
      ["10,8 GB", "cubo publicado em CSV, em set/2026 (4,0 GB em Parquet)"],
      ["154 de 252", "indicadores de rede com abertura por escola (lista de ago/2026)"],
    ];
    st.forEach(([n, l], i) => {
      const y = 1.65 + i * 1.75;
      card(s, L, y, 3.7, 1.55, C.background2, "escolas-estatistica-" + i);
      txt(s, n, { x: L + 0.25, y: y + 0.12, w: 3.2, h: 0.68, fontSize: 32, bold: true, fontFace: HEAD, color: C.accent1, valign: "middle" });
      txt(s, l, { x: L + 0.25, y: y + 0.82, w: 3.2, h: 0.65, fontSize: 12.5 });
    });
    const tl = [
      ["20/10/2025", "Inventário da área negocial (223 itens) reúne Contexto, Resultados e Insumos no nível da escola"],
      ["12/12/2025", "1ª versão do cubo entregue à STIC para iniciar a construção da página"],
      ["09/01/2026", "Cubo reconstruído em arquivo único com a CUI: cerca de 120 mi linhas"],
      ["27/07/2026", "Harmonização: nove pares de scripts 3.x e 4.3.x passam a ter o mesmo cálculo"],
      ["09 e 10/08/2026", "Revisão completa (19 achados) e nova carga: cerca de 229 mi linhas"],
      ["set/2026", "Visão Geral por etapa e ano (ID de 9 dígitos) e contrato fixo da planilha do BI"],
    ];
    const tx = L + 4.05, lx = tx + 1.75;
    s.addShape(pres.shapes.LINE, { x: lx + 0.09, y: 1.85, w: 0, h: 4.7, line: { color: C.accent4, width: 2 }, objectName: "linha-escolas" });
    tl.forEach(([d, t], i) => {
      const y = 1.7 + i * 0.83;
      txt(s, d, { x: tx, y, w: 1.65, h: 0.35, fontSize: 14, bold: true, color: C.accent1, valign: "top" });
      s.addShape(pres.shapes.CUBE, { x: lx - 0.02, y: y + 0.03, w: 0.24, h: 0.24, fill: { color: C.accent1 }, line: { color: C.background1, width: 0.75 }, objectName: "marco-escolas-" + i });
      txt(s, t, { x: lx + 0.45, y, w: RX - lx - 0.45, h: 0.75, fontSize: 14 });
    });
    s.addNotes("O Painel de Escolas agrega, no nível da escola, todos os indicadores possíveis dos três painéis de origem, o que elevou substantivamente o volume dos arquivos. Registros: Produto 2 (UNESCO, 15/01/2026) para a 1ª versão (12/12/2025) e a reconstrução (09/01/2026, cerca de 120 milhões de linhas e 8 colunas); revisão de 09/08/2026; carga de 10/08/2026 com 229.261.886 linhas. Arquivo atual em Escolas/cubo_escolas/2025. A carga de 23/09/2026 quebrou o painel quando colunas da planilha de indicadores mudaram de posição, o que motivou o contrato fixo de colunas. O volume em células considera as 229 milhões de linhas multiplicadas pelas 10 colunas do cubo, acima de 2 bilhões de células.");
  }

  // 18. Codificação
  {
    const s = content("Cubos e codificação", "6  ·  CUBOS E CODIFICAÇÃO", "Da ID_ORIGEM à Codificação Única (CUI)");
    const ev = [
      ["ID_ORIGEM", "Sequencial da planilha de controle (coluna ID_ORIGINAL)", C.accent3],
      ["10a, 10b, 10c", "Números com letras para indicadores derivados", C.accent2],
      ["ID_SEQ", "Nova sequência numérica para atender à regra de carga", C.accent3],
      ["CUI", "Código único por painel e fonte, desenvolvido por Natália para o Painel de Escolas", C.accent1],
    ];
    const bw = 2.8, gap = (W - 4 * bw) / 3;
    ev.forEach(([k, d, c], i) => {
      const x = L + i * (bw + gap), y = 1.62;
      card(s, x, y, bw, 1.78, C.background2, "codigo-" + i);
      txt(s, k, { x: x + 0.22, y: y + 0.15, w: bw - 0.44, h: 0.5, fontSize: 18, bold: true, fontFace: "Courier New", color: c, valign: "middle" });
      txt(s, d, { x: x + 0.22, y: y + 0.7, w: bw - 0.44, h: 0.95, fontSize: 13 });
      if (i === 1) chip(s, x + 0.22, y + 1.38, 1.9, 0.28, "barrada pela regra de carga", C.accent5, 10.5, C.background1, "etiqueta-barrada");
      if (i < 3) arrowR(s, x + bw + 0.04, y + 0.89, gap - 0.08);
    });
    // anatomia da CUI
    card(s, L, 3.6, W, 2.25, C.text2, "anatomia-cui");
    const dig = [["2", 0.9], ["1", 0.9], ["11", 1.25], ["001", 1.65]];
    let dx = L + 0.4;
    dig.forEach(([d, w], i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: dx, y: 3.85, w, h: 0.95, rectRadius: 0.06, fill: { color: i === 2 ? C.accent2 : C.accent1 }, line: { color: C.accent4, width: 0 }, objectName: "digito-cui-" + i });
      txt(s, d, { x: dx, y: 3.85, w, h: 0.95, fontSize: 34, bold: true, fontFace: "Courier New", color: C.background1, align: "center", valign: "middle" });
      dx += w + 0.12;
    });
    txt(s, [{ text: "2111001", options: { bold: true, fontFace: "Courier New", color: C.accent2, breakLine: true } }, { text: "Painel de Escolas · Insumos · Censo Escolar · indicador 001", options: { color: C.background1 } }], { x: L + 0.4, y: 4.95, w: 5.4, h: 0.8, fontSize: 14 });
    txt(s, bullets([
      "Painel agregador: 0 nenhum, 1 Planejamento, 2 Escolas",
      "Painel fonte: 1 Insumos, 2 Resultados, 3 Contexto, 4 Financiamento",
      "Base fonte: 20 bases, de 01 Diagnóstico das Escolas a 20 PIB dos Municípios; 11 é o Censo Escolar",
      "Indicador: três dígitos dentro da base",
    ], { space: 5, run: { color: C.background1 } }), { x: L + 6.0, y: 3.78, w: W - 6.3, h: 1.95, fontSize: 13.5, valign: "middle" });
    card(s, L, 6.02, W, 0.7, C.accent2, "nota-identificadores", { transparency: 82 });
    txt(s, "A regra de carga só aceita códigos numéricos. Hoje o arquivo de Insumos carrega três identificadores (ID_ORIGEM, ID_SEQ e CUI), convertidos nos códigos de produção; a planilha ainda tem IDs como 6.1, 11.1 e 109.1.", { x: L + 0.3, y: 6.02, w: W - 0.6, h: 0.7, fontSize: 13, valign: "middle" });
    s.addNotes("Histórico: a codificação inicial era sequencial; com novos indicadores associados aos existentes, tentamos identificadores com letras (10a, 10b, 10c), barrados pela regra de carga, que aceita só caracteres numéricos. O ID_ORIGEM (primeira codificação de Insumos) foi convertido em ID_SEQ e, com o Painel de Escolas, Natália desenvolveu a CUI, inspirada no padrão de identificação do IBGE (Produto 2, UNESCO). Regra de correspondência no cubo de escolas: ID de rede = ID da escola menos 2.000.000. A planilha de controle também tem um ID_ORIGEM repetido (164), tratado por origem no 3.0_master_insumos.");
  }

  // =====================================================================
  // 7. INSTITUCIONALIZAÇÃO
  // =====================================================================
  pres.addSection({ title: "Institucionalização" });

  // 19. STIC e Segape
  {
    const s = content("Institucionalização", "7  ·  INSTITUCIONALIZAÇÃO", "Institucionalização na STIC e na Segape");
    const st = [
      ["FaHandshake", "Apoio à STIC", "Regras de cálculo repassadas aos engenheiros de dados; Resultados como piloto; reunião de repasse dos scripts em 09/02/2026"],
      ["FaServer", "Ambiente institucional", "Produção em máquinas da STIC, com o R conectado ao banco Oracle (DBeaver) por VPN desde março de 2026"],
      ["FaLayerGroup", "Arquitetura medalhão", "Camadas bronze, prata e ouro; conversão de R para SQL com validação cruzada indicador a indicador"],
      ["FaLandmark", "Segape", "Gestão dos dados do MEC: Data Lake, Plataforma EducaDados com fichas de qualificação e pedido formal de microdados ao Inep"],
    ];
    const bw = 2.85, gap = (W - 4 * bw) / 3, base = 4.95;
    for (let i = 0; i < 4; i++) {
      const x = L + i * (bw + gap), y = 2.25 - i * 0.22, h = base - y;
      card(s, x, y, bw, h, i === 3 ? C.text2 : C.background2, "estagio-" + i);
      await badge(s, x + 0.25, y + 0.25, 0.56, i === 3 ? C.accent2 : C.accent1, st[i][0], "FFFFFF", "icone-estagio-" + i);
      txt(s, st[i][1], { x: x + 0.95, y: y + 0.25, w: bw - 1.15, h: 0.56, fontSize: 16, bold: true, valign: "middle", color: i === 3 ? C.background1 : C.text1 });
      txt(s, st[i][2], { x: x + 0.25, y: y + 1.0, w: bw - 0.5, h: h - 1.1, fontSize: 13, color: i === 3 ? C.accent4 : C.text1 });
    }
    txt(s, "Estágio atual da institucionalização", { x: L, y: 5.12, w: 6, h: 0.3, fontSize: 13, bold: true, color: C.accent3 });
    const ty = 5.52;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: L, y: ty, w: W, h: 0.18, rectRadius: 0.09, fill: { color: C.accent6 }, line: { color: C.accent6, width: 0 }, objectName: "trilha" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: L, y: ty, w: W * 0.3, h: 0.18, rectRadius: 0.09, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 }, objectName: "trilha-avanco" });
    s.addShape(pres.shapes.OVAL, { x: L + W * 0.3 - 0.17, y: ty - 0.08, w: 0.34, h: 0.34, fill: { color: C.accent2 }, line: { color: C.background1, width: 1.5 }, objectName: "marcador-hoje" });
    txt(s, "hoje: inicial, com avanço expressivo nos últimos meses", { x: L + W * 0.3 + 0.3, y: 5.12, w: 6, h: 0.3, fontSize: 12.5, italic: true, color: C.accent2, bold: true });
    const ms = [["Repasse de regras e scripts", 0, "left"], ["Execução paralela de R e SQL", 0.36, "center"], ["Produção institucional", 0.68, "center"], ["Consultoria em apoio", 1, "right"]];
    ms.forEach(([t, p, al]) => {
      const w = 2.6, x = al === "left" ? L : al === "right" ? RX - w : L + W * p - w / 2;
      txt(s, t, { x, y: 5.76, w, h: 0.36, fontSize: 12, color: C.text1, align: al, valign: "middle" });
    });
    s.addShape(pres.shapes.LINE, { x: L, y: 6.24, w: W, h: 0, line: { color: C.accent6, width: 0.75 }, objectName: "separador-nota" });
    txt(s, [
      { text: "Nota: ", options: { bold: true } },
      { text: "o processo de institucionalização aqui apresentado foi construído com o apoio de Andriênia Rênia Santos de Sousa (FGV, andrienia.sousa@fgv.br), que mapeou os processos produtivos de dados do Novo PAR e documentou o histórico com as equipes da SEB, da STIC e da Segape, para contribuir com a institucionalização da produção e da gestão dos dados." },
    ], { x: L, y: 6.3, w: W, h: 0.55, fontSize: 10.5, italic: true, color: C.accent3, valign: "top" });
    s.addNotes("As tratativas começaram com a STIC, apoiando os engenheiros de dados na definição das regras de cálculo; depois a Segape entrou como secretaria responsável pela gestão dos dados do Ministério. Registros: pastas Transicao_STIC e Transicao_SEGAPE (bases, scripts, listas de arquivos), gravação 'Scripts R Novo PAR' (09/02/2026), Produtos 2, 3 e 4 (UNESCO) e minuta de solicitação à Segape para formalizar o pedido de microdados restritos do Censo Escolar 2025 ao Inep. A Plataforma EducaDados (MEC e MGI) foi anunciada em março de 2026.");
  }

  // =====================================================================
  // 8. PONTOS DE ATENÇÃO
  // =====================================================================
  pres.addSection({ title: "Pontos de atenção" });

  async function grid(s, items) {
    const cw = 5.95, ch = 2.35, gx = W - 2 * cw;
    for (let i = 0; i < items.length; i++) {
      const [ic, title, prio, body] = items[i];
      const col = i % 2, row = Math.floor(i / 2);
      const x = L + col * (cw + gx), y = 1.65 + row * (ch + 0.3);
      const alta = prio === "Alta prioridade";
      card(s, x, y, cw, ch, C.background2, "ponto-" + i);
      await badge(s, x + 0.25, y + 0.25, 0.6, alta ? C.accent5 : C.accent2, ic, "FFFFFF", "icone-ponto-" + i);
      txt(s, title, { x: x + 1.05, y: y + 0.25, w: cw - 2.9, h: 0.6, fontSize: 16, bold: true, valign: "middle" });
      chip(s, x + cw - 1.75, y + 0.38, 1.5, 0.32, prio, alta ? C.accent5 : C.accent2, 11, C.background1, "prioridade-" + i);
      txt(s, body, { x: x + 0.25, y: y + 1.0, w: cw - 0.5, h: ch - 1.1, fontSize: 14.5 });
    }
  }

  // 20. Gargalos 1
  {
    const s = content("Pontos de atenção", "8  ·  PONTOS DE ATENÇÃO", "Gargalos e pontos sensíveis: dados e identificação");
    await grid(s, [
      ["FaDatabase", "Acesso aos microdados", "Alta prioridade", "Os dados públicos não bastam; cada edição depende de STIC, Segape e Inep. Em 2026, do pedido de VPN (03/03) aos painéis (16/04) foram seis semanas. Sem ID_TURMA na base de matrículas, modalidades como a Bilíngue de Surdos ficam inviáveis."],
      ["FaBarcode", "Identificadores múltiplos", "Alta prioridade", "ID_ORIGEM, ID_SEQ, CUI, ID do planejamento e ID derivado convivem. Dicionários divergem sobre os IDs 8, 9 e 10 de Resultados; a decisão está pendente com a DAGE."],
      ["FaUnlink", "Painéis e planejamento", "Alta prioridade", "O de-para é mantido à mão; 88 IDs de Contexto sem produção e 15 sem de-para. O campo de meta do sistema aceita valores fora da escala do indicador."],
      ["FaFileAlt", "Fontes pré-calculadas", "Atenção", "PDDE: a base de dez/2025 não reproduz a série publicada e 18 de 35 indicadores saem com 99,8% das escolas em 1. Secadi: nomes de colunas mudam a cada divulgação."],
    ]);
    s.addNotes("Fontes: Produto 4 (UNESCO), cronologia do Censo 2025; conflito de dicionários (CUI, dict_resultados do 2_0 e farol_indicadores.xlsx) de 09/08/2026; revisão do cubo de planejamento (27/07/2026); revisão da produção do PDDE (12/09/2026), que recomenda confirmar com a CGGE o layout das colunas; base Secadi de 28/08/2026, que repetia a edição anterior e chegou a ser publicada, substituída pela de 02/09/2026.");
  }

  // 21. Gargalos 2
  {
    const s = content("Pontos de atenção", "8  ·  PONTOS DE ATENÇÃO", "Gargalos e pontos sensíveis: arquitetura e governança");
    await grid(s, [
      ["FaSchool", "Volume do Painel de Escolas", "Atenção", "Arquivo de 10,8 GB e cadeia longa (4.0 a 4.3.x): qualquer correção exige reexecução completa. Mudanças na planilha do BI quebram o painel, como na carga de 23/09/2026."],
      ["FaCopy", "Formatos heterogêneos", "Atenção", "O Contexto segue em tabelas por tela e a unificação em cubo foi interrompida; cada painel tem sua própria rotina de carga."],
      ["FaTrafficLight", "Faróis e escalas", "Atenção", "Cortes calibrados numa distribuição valem para anos diferentes; indicadores da Secadi, e ETI e EPT no Painel de Escolas, seguem sem farol."],
      ["FaShieldAlt", "Continuidade", "Alta prioridade", "A produção ainda depende da consultoria; há duas cópias do código (OneDrive e Team Channel); a conversão para SQL precisa preservar regras implícitas do R."],
    ]);
    s.addNotes("Fontes: revisão completa do Painel de Escolas (09/08/2026), contrato da planilha de indicadores (25/09/2026), caso do farol do IN em Alagoas (14/09/2026), revisão Secadi (farois ausentes para ID_SEQ 143 a 159) e sincronização do 1_code (21/10/2026). Na conversão para SQL, atenção ao tratamento de ausentes, tipos de variável e níveis de fatores, que o R aplica de forma implícita.");
  }

  // 22. Recomendações
  {
    const s = content("Pontos de atenção", "8  ·  PONTOS DE ATENÇÃO", "Recomendações para a gestão");
    const rec = [
      "Adotar a CUI como chave única em painéis, planejamento e BI, com de-para oficial e versionado para o planejamento",
      "Formalizar, via Segape, um calendário anual de acesso aos microdados do Censo e às variáveis adicionais junto ao Inep",
      "Dirigir o cubo de planejamento só pela Estrutura Base, incluindo Contexto, sem imputar zero; validar o intervalo das metas no sistema",
      "Retomar a unificação de Contexto e Resultados em cubo, já no ambiente institucional",
      "Migrar de R para SQL com baterias de validação cruzada e uma única cópia versionada do código",
      "Pactuar com CGGE e Secadi layout, dicionário e conferência das bases antes de cada carga; controlar versões da planilha de controle",
    ];
    const cw = 5.95, gx = W - 2 * cw;
    rec.forEach((t, i) => {
      const col = Math.floor(i / 3), row = i % 3;
      const x = L + col * (cw + gx), y = 1.65 + row * 1.72;
      card(s, x, y, cw, 1.52, C.background2, "recomendacao-" + i);
      numBadge(s, x + 0.25, y + 0.4, 0.72, C.accent1, i + 1, 20, "num-recomendacao-" + i);
      txt(s, t, { x: x + 1.2, y, w: cw - 1.45, h: 1.52, fontSize: 15, valign: "middle" });
    });
    s.addNotes("Recomendações derivadas dos achados das revisões de 2026 e das etapas futuras registradas nos relatórios técnicos: governança e infraestrutura institucional, documentação e protocolos de manutenção, e validação cruzada como condição para concluir cada etapa da migração.");
  }

  // =====================================================================
  // ENCERRAMENTO
  // =====================================================================
  pres.addSection({ title: "Encerramento" });
  {
    const s = pres.addSlide({ masterName: "FECHO", sectionTitle: "Encerramento" });
    s.addText("Acervo de referência", { placeholder: "title", fontFace: HEAD });
    const items = [
      ["Planilha de controle", "0_data/0_arquivos_auxiliares/20250110_Diagnóstico PAR_Indicadores.xlsx"],
      ["Codificação", "Dicionarios/CUI - Codigo Unico de Indicadores.xlsx"],
      ["Planejamento", "Planejamento/Estrutura Base de Indicadores.xlsx"],
      ["Códigos de produção", "1_code (cópia sincronizada em 21/10/2026)"],
      ["Notas Técnicas", "NT Equipe Dados Novo Par"],
      ["Ofícios", "Ofícios e contestações"],
      ["Transição", "Transicao_STIC e Transicao_SEGAPE"],
      ["Relatórios técnicos", "Documentos/6 - Produtos Consultorias (OEI e UNESCO)"],
    ];
    items.forEach(([k, v], i) => {
      const y = 1.75 + i * 0.6;
      txt(s, k, { x: L, y, w: 2.6, h: 0.45, fontSize: 14, bold: true, color: C.accent2, valign: "middle" });
      txt(s, v, { x: L + 2.7, y, w: 6.0, h: 0.45, fontSize: 14, color: C.background1, valign: "middle" });
    });
    txt(s, "Pastas no Team Channel do Painel PAR5, salvo indicação.", { x: L, y: 6.6, w: 8, h: 0.3, fontSize: 11, color: C.accent4 });
    s.addImage({ path: BRASAO, x: 9.75, y: 2.0, w: 2.7, h: 2.714, objectName: "brasao-fecho" });
    s.addNotes("Onde encontrar os materiais citados. Os relatórios técnicos da consultoria estão em '0 - PAR5 - pasta Victor/3_docs' (OEI e UNESCO) e as revisões de 2026 em 'Novo PAR - Dados'.");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("ok", OUT);
})().catch(e => { console.error(e); process.exit(1); });
