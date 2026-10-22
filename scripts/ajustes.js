// Ajustes da versão web. O deck.json continua como registro do PowerPoint original.
module.exports = function ajustar(D, POP) {
  const cronograma = D.slides[3];
  const fonteFigura = cronograma.items.find(it => it.kind === "text" && Array.isArray(it.text)
    && it.text.some(run => String(run.text).startsWith("Fonte: relatórios técnicos")));
  if (fonteFigura) {
    fonteFigura.o.y = 6.74;
    fonteFigura.o.h = .2;
    fonteFigura.o.fontSize = 8.2;
  }
  const s = D.slides[5]; // tela 6 do deck original
  const pessoas = [
    ["VA", "Victor Alcantara", "Consultor de dados; Censo Escolar. Entrada em dez/2024."],
    ["NP", "Natália Pires", "Consultora de dados; entrada em dez/2024."],
    ["SM", "Sabrina Medeiros", "Consultora de dados; Painel de Resultados."],
    ["SF", "Samuel Franco", "Coordenação técnica da gestão dos dados."],
    ["RA", "Rebert Tomaz de Aquino", "BI do Novo PAR; ponto focal do trabalho em curso."],
    ["JC", "João César", "CGARE/SEB; contexto e gestão do Novo PAR."],
    ["LÍ", "Lívia", "CGARE/SEB; articulação da agenda e do projeto."],
    ["RL", "Radson Lima", "CGARE/SEB; depois assumiu a coordenação da equipe no lugar de João."],
    ["LI", "Lidia", "Núcleo IU; discussão conceitual."],
    ["CA", "Carol", "Núcleo IU; discussão conceitual."],
  ];
  const shape = (name, x, y, w, h, fill, radius = .08) => ({
    kind: "shape", shape: "roundRect",
    o: { x, y, w, h, rectRadius: radius, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: name }
  });
  const text = (value, x, y, w, h, size, extra = {}) => ({
    kind: "text", text: value,
    o: { isTextBox: true, margin: 0, valign: "top", color: "tx1", fontSize: size, x, y, w, h, ...extra }
  });
  const base = s.items.slice(0, 2); // kicker e título
  const left = .6, width = 2.28, gap = .183, top = 1.55, height = 2.16, rowGap = .2;
  pessoas.forEach(([ini, nome, papel], i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = left + col * (width + gap), y = top + row * (height + rowGap);
    base.push(shape("pessoa-" + i, x, y, width, height, "bg2"));
    base.push({ kind: "shape", shape: "ellipse", o: {
      x: x + .14, y: y + .16, w: .47, h: .47,
      fill: { color: i < 3 ? "accent1" : i >= 8 ? "accent2" : "accent3" },
      line: { color: "bg1", width: 0 }, objectName: "iniciais-" + i
    }});
    base.push(text(ini, x + .14, y + .16, .47, .47, 12.5,
      { bold: true, color: "bg1", align: "center", valign: "middle" }));
    base.push(text(nome, x + .7, y + .14, width - .82, .6, 13.8,
      { bold: true, valign: "middle" }));
    base.push(text(papel, x + .17, y + .85, width - .34, 1.12, 11.5,
      { color: "tx1" }));
  });
  base.push(text("Entendemos, na época, que o processo seria orgânico e dinâmico: produção e revisão contínuas, guiadas pelo uso e pela demanda dos usuários e das áreas.",
    .6, 6.35, 12.13, .43, 12.2, { italic: true, fontFace: "+mj-lt", color: "accent3", valign: "middle", objectName: "frase-entendimento" }));
  s.items = base;
  s.notes = "Equipe de Dados: Victor, Natália e Sabrina. Gestão e articulação na CGARE/SEB: João César, depois substituído por Radson Lima na coordenação; Lívia atuou na articulação da agenda e do projeto. Samuel Franco respondeu pela coordenação técnica. Rebert acompanhou o BI. Carol e Lidia, do Núcleo IU, participaram da discussão conceitual. Fabiano Balduino Barbosa e Davidson Clynton das Chagas, da equipe de Lucas Bordin Teles (CGDA/STIC), desenvolveram e carregaram os cubos no Power BI.";

  POP.slides[6]["pessoa-6"] = { t: "Lívia", d: "Equipe CGARE/SEB/MEC; articulação da agenda e do projeto do Novo PAR." };
  POP.slides[6]["pessoa-7"] = { t: "Radson Lima", d: "Equipe CGARE/SEB/MEC. Posteriormente assumiu a coordenação da equipe, substituindo João César." };
  POP.slides[6]["pessoa-8"] = { t: "Lidia", d: "Núcleo IU; participação na discussão conceitual do Novo PAR." };
  POP.slides[6]["pessoa-9"] = { t: "Carol", d: "Núcleo IU; participação na discussão conceitual do Novo PAR." };
  POP.slides[6]["painel-entendimento"].with = ["frase-entendimento"];

  const interlocutores = D.slides[6];
  const grupoGestao = interlocutores.items.find(it => it.kind === "text" && Array.isArray(it.text)
    && it.text.some(run => String(run.text).includes("João César da Fonseca Neto")));
  if (grupoGestao) grupoGestao.text = [
    { text: "João César (CGARE/SEB)", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 1 } },
    { text: "Radson Lima (coordenação posterior); Lívia (articulação)", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 1 } },
    { text: "Samuel Franco (coordenação técnica)", options: { bullet: { indent: 14 } } },
  ];
  if (grupoGestao) grupoGestao.o.fontSize = 12.3;
  const rodape = interlocutores.items.find(it => it.kind === "text" && Array.isArray(it.text)
    && it.text.some(run => String(run.text).includes("Mapeamento de processos:")));
  if (rodape) {
    rodape.text = [
      { text: "Núcleo IU: ", options: { bold: true } },
      { text: "Carol e Lidia na discussão conceitual.  " },
      { text: "Mapeamento de processos: ", options: { bold: true } },
      { text: "Andriênia Rênia Santos de Sousa (FGV)." },
    ];
    rodape.o.fontSize = 10.5;
  }
  POP.slides[7]["grupo-1"].d = "João César da Fonseca Neto atuou na CGARE/SEB; Radson Lima o substituiu posteriormente na coordenação da equipe. Lívia articulou a agenda e o projeto. Samuel Franco respondeu pela coordenação técnica da gestão dos dados.";
  interlocutores.notes += " Carol e Lidia, do Núcleo IU, participaram da discussão conceitual.";
};
