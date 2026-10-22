// Conteúdo dos popups da versão web. Cada chave é o nome do objeto na tela (objectName do deck).
// Campos: t título; per período; d descrição; li detalhes; refs links online; pastas caminhos no Team Channel;
// fonte origem documental; with objetos clicáveis; box áreas extras [x,y,w,h] em polegadas; hl objetos a destacar.

const P = (...ps) => ps.map(p => "Team Channel - Painel PAR5\\" + p.replace(/\//g, "\\"));
const PROD = (org, n) => `Documentos/6 - Produtos Consultorias/Victor G Alcantara - ${org}/Produto ${n}`;

const L = {
  np: ["Novo PAR, página oficial do MEC", "https://www.gov.br/mec/pt-br/novo-par"],
  etapa: ["Etapa de Diagnóstico do Novo PAR (documento orientador, MEC)", "https://www.gov.br/mec/pt-br/novo-par/documentos/etapadiagnstico.pdf"],
  ntd: ["Nota Técnica dos dados do Novo PAR (MEC)", "https://www.gov.br/mec/pt-br/novo-par/documentos/notatecnicadados.pdf"],
  enc1: ["Brasil 61: MEC lança o Plano de Ações Articuladas no Encontro de Prefeitos e Prefeitas (12/02/2025)", "https://brasil61.com/n/encontro-de-prefeitos-e-prefeitas-mec-lanca-plano-de-acoes-articuladas-bras2513491"],
  enc2: ["Brasil 61: Encontro de Novos Prefeitos e Prefeitas reúne gestores em Brasília (11/02/2025)", "https://brasil61.com/n/encontro-de-novos-prefeitos-e-prefeitas-evento-em-brasilia-deve-reunir-20-mil-gestores-municipais-bras2513477"],
  ag: ["Agência Gov: abertura do Encontro de Prefeitos e Prefeitas (fev/2025)", "https://agenciagov.ebc.com.br/noticias/202502/lula-prefeitura-alicerce-para-uniao-dar-certo"],
  sin: ["Inep: Sinopses Estatísticas da Educação Básica", "https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/sinopses-estatisticas/educacao-basica"],
  mic: ["Inep: Microdados do Censo Escolar", "https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/censo-escolar"],
  ideb: ["Inep: Índice de Desenvolvimento da Educação Básica (Ideb)", "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb"],
  sidra: ["IBGE/SIDRA: Tabela 9514, Censo Demográfico 2022 (população por idade)", "https://sidra.ibge.gov.br/tabela/9514"],
  plan: ["Planilha de controle no SharePoint do MEC (acesso restrito)", "https://mecbrasil.sharepoint.com/:x:/s/PAR5/EZ-wU20iEP9BlgYYzAm037AB-zNp_CwemnXdVpPxaUljBA"],
};
const F = {
  oei1: "Produto 1 da consultoria OEI (20/01/2025)", oei2: "Produto 2 da consultoria OEI (04/02/2025)", oei3: "Produto 3 da consultoria OEI (19/03/2025)",
  oei4: "Produto 4 da consultoria OEI (07/04/2025)", oei5: "Produto 5 da consultoria OEI (08/05/2025)",
  un1: "Produto 1 da consultoria UNESCO (27/11/2025)", un2: "Produto 2 da consultoria UNESCO (15/01/2026)", un3: "Produto 3 da consultoria UNESCO (20/03/2026)",
  un4: "Produto 4 da consultoria UNESCO (26/05/2026)", un5: "Produto 5 da consultoria UNESCO (11/07/2026)",
};
const PL = {
  controle: "0_data/0_arquivos_auxiliares/20250110_Diagnóstico PAR_Indicadores.xlsx",
  controleIU: "IU_e_FGV/Diagnostico/Indicadores de Insumos",
  cui: "Dicionarios/CUI - Codigo Unico de Indicadores.xlsx",
  guiaEsc: "Dicionarios/Guia_Cubo_Escolas_NovoPAR.docx",
  base: "Planejamento/Estrutura Base de Indicadores.xlsx",
  cuboPlan: "Planejamento/2026/Censo_ds_cubo_planejamento.csv",
  escala: "Planejamento/ajuste escala indicadores",
  cuboIns: "Insumos/00_Fontes_de_Dados/cubo/2025",
  cuboEsc: "Escolas/cubo_escolas/2025",
  invEsc: "Escolas/20251020_Inventário indicadores painel de escolas_vf.xlsx",
  ctx: "Contexto/00_Fontes_de_Dados/Dados Tabelas Contexto",
  res: "Resultados/00_Fontes_de_Dados/cubo",
  nt: "NT Equipe Dados Novo Par",
  ofi: "Ofícios e contestações",
  stic: "Transicao_STIC", segape: "Transicao_SEGAPE",
  met: "Documentos/2 - Metodologias",
  code: "1_code",
};

const slides = {};

// ---------- 2. Síntese ----------
slides[2] = {
  "estatistica-0": { t: "252 indicadores de rede na CUI", d: "A Codificação Única de Indicadores (CUI) cataloga os indicadores de rede dos painéis de diagnóstico: 186 de Insumos, 54 de Contexto e 12 de Resultados. Cada código informa o painel agregador, o painel fonte, a base de origem e o número do indicador.", li: ["Planilha criada por Natália Pires em 31/07/2025", "Referência para o Painel de Escolas: 154 dos 252 indicadores têm abertura por escola", "Exemplo: 2111001 é o indicador 001 do Censo Escolar, de Insumos, no Painel de Escolas", "Detalhes na tela 20"], pastas: P(PL.cui) },
  "estatistica-1": { t: "Três edições do Censo Escolar", d: "As rotinas em R processaram três edições do Censo Escolar desde o lançamento. A cada ciclo, o prazo passou a depender mais do acesso aos microdados do que da produção dos indicadores.", li: ["Censo 2023: bases recebidas via STIC em 17/12/2024; painéis publicados em 10/02/2025", "Censo 2024: dados em 06/05/2025; painéis atualizados em 05/06/2025 (Ofício Circular nº 42/2025/SEB)", "Censo 2025: VPN pedida em 03/03/2026; dados em 22/03; base ajustada em 10/04; painéis em 16/04/2026"], refs: [L.mic, L.sin], pastas: P(PL.cuboIns) },
  "estatistica-2": { t: "229 milhões de linhas no cubo de Escolas", d: "O cubo do Painel de Escolas reúne, no nível da escola, os indicadores de Insumos, Resultados e Contexto. A carga de 10/08/2026 tem 229.261.886 linhas e 127 indicadores.", li: ["CSV de 10,8 GB e Parquet de 4,0 GB (set/2026)", "Mais de 1 bilhão de células (cerca de 229 mi linhas × 10 colunas)", "A versão de 09/01/2026 tinha cerca de 120 mi linhas", "Detalhes na tela 19"], pastas: P(PL.cuboEsc, PL.guiaEsc) },
  "estatistica-3": { t: "24 ofícios e contestações", d: "Demandas formais recebidas de 23 redes de ensino e da Undime, registradas por ente e respondidas com análise técnica referida ao código de produção.", li: ["Temas: taxa de atendimento, tempo integral, escolas e matrículas", "Respostas padrão: taxa de atendimento (23/02/2026) e tempo integral (24/02/2026)", "Detalhes na tela 17"], pastas: P(PL.ofi, "Documentos/outros/contestacoes") },
  "mensagem-0-circulo": { t: "Produção orgânica", box: [1.45, 3.9, 11.28, 0.8], d: "A lista de indicadores foi construída ao mesmo tempo em que os dados eram produzidos. A planilha de controle, elaborada pelo núcleo do IU com as áreas do MEC, a Undime e o Consed, recebeu novos indicadores ao longo da produção.", li: ["18/12/2024: 84 indicadores mapeados; mar/2025: 115", "Revisões guiadas pelo uso dos painéis e pela demanda das áreas"], refs: [L.plan], pastas: P(PL.controle, PL.controleIU) },
  "mensagem-1-circulo": { t: "Arquitetura em R", box: [1.45, 4.85, 11.28, 0.8], d: "Os códigos mestres em R executam a cadeia de extração, cálculo e exportação de cada painel, com de-paras externos em Excel e validação contra a Sinopse do Inep.", li: ["Dois consumidores: os painéis no Power BI e o sistema de planejamento", "Detalhes nas telas 11 e 12"], refs: [L.sin], pastas: P(PL.code) },
  "mensagem-2-circulo": { t: "Pontos sensíveis", box: [1.45, 5.8, 11.28, 0.8], d: "Identificação dos indicadores, alinhamento entre painéis e planejamento, acesso aos microdados e institucionalização em estágio inicial concentram os riscos para a gestão.", li: ["Detalhes nas telas 21 a 24"] },
};

// ---------- 3. Linha do tempo ----------
const tl = (i, o) => ({ kind: "cube", with: [`marco-${i}`, `rotulo-marco-${i}`], hl: [`marco-${i}`], ...o });
slides[3] = {
  "fase-0": { t: "Fase 1: construção e lançamento", per: "dez/2024 a fev/2025", d: "Da assinatura do contrato à publicação dos painéis no lançamento do Novo PAR. A lista de indicadores ainda estava em definição e os painéis estavam montados com dados fictícios.", fonte: [F.oei1, F.oei2, F.oei3] },
  "fase-1": { t: "Fase 2: Censo 2024 e planejamento", per: "mar a set/2025", d: "Lacunas preenchidas após o lançamento, primeira Nota Técnica, atualização com o Censo 2024 e montagem do cubo do sistema de planejamento.", fonte: [F.oei4, F.oei5] },
  "fase-2": { t: "Fase 3: Escolas, CUI e STIC", per: "out/2025 a mar/2026", d: "Construção do Painel de Escolas, adoção da Codificação Única de Indicadores (CUI) e início do repasse dos scripts à STIC.", fonte: [F.un1, F.un2, F.un3] },
  "fase-3": { t: "Fase 4: revisão e institucionalização", per: "abr a out/2026", d: "Censo 2025 nos painéis, harmonização e revisão do Painel de Escolas, diagnóstico da escala das metas do planejamento e interlocução com a Segape.", fonte: [F.un4, F.un5] },
  ...Object.fromEntries([
    ["dez/2024: início da produção", "13 a 31/12/2024", "Contrato da consultoria (OEI) assinado em 13/12/2024. Em 17/12 chegaram, via STIC, as bases do Censo Escolar 2023 e o acesso às contas e pastas do MEC; a produção dos indicadores de Insumos começou no mesmo dia.",
      ["Bases recebidas: escolas (180.230 registros), turmas (2,6 mi), matrículas (52,7 mi) e docentes (7,5 mi)", "18/12/2024: 27 dos 84 indicadores mapeados já calculados", "Formato de cubo definido por Fabiano Balduino Barbosa (CGDA/STIC) e Rebert Tomaz de Aquino (BI)", "Painéis já desenvolvidos com dados fictícios aguardavam a carga real"],
      [L.mic], [PL.controle, PROD("OEI", 1)], [F.oei1]],
    ["jan/2025: primeira versão para a prévia", "09/01/2025", "Entrega da primeira versão do cubo de Insumos para a prévia do Novo PAR: 99 dos 113 indicadores mapeados estavam calculados. A base da Secadi chegou em 05/01 e a de gestores em 10/01.",
      ["04/01/2025: 59 de 86 indicadores", "09/01/2025: 99 de 113 (entrega da prévia)", "20/01/2025: 100 de 111, após revisão da lista", "Sala segura do Sedap/Inep agendada para 20 a 24/01 e descartada com a chegada das bases"],
      [L.plan], [PL.controle, PL.cuboIns.replace("/2025", ""), PROD("OEI", 1)], [F.oei1]],
    ["fev/2025: lançamento do Novo PAR", "07 a 13/02/2025", "Dados homologados com as equipes de BI e da SEB em 07/02 e painéis publicados em 10/02/2025. O lançamento ocorreu no Encontro de Novos Prefeitos e Prefeitas, promovido pelo governo federal com a Associação Brasileira de Municípios (ABM), no Centro de Convenções Ulysses Guimarães, em Brasília, de 11 a 13/02/2025.",
      ["Validação iniciada em 27/01, dez dias antes da homologação", "Totais de escolas conferidos com a Sinopse do Censo (178.476 escolas)", "Cálculo conferido passo a passo na UF de SP, no município de SP e em Monte Santo do Tocantins", "Retrato da EI (29/01) e CNCA (07/02) recebidos na reta final"],
      [L.enc2, L.enc1, L.ag, L.np], [PROD("OEI", 2), PROD("OEI", 3)], [F.oei2, F.oei3]],
    ["mai/2025: NT v1, contestações e Censo 2024", "maio de 2025", "Primeira versão da Nota Técnica da Equipe de Dados (05/05/2025), primeiras contestações das redes e recebimento dos dados do Censo 2024 em 06/05/2025.",
      ["NT v1 com a tipologia de cálculo e as fichas dos indicadores de Insumos", "Nota explicativa dos indicadores 75 e 76 (abr/2025)", "Contestações registradas por ente na pasta de ofícios"],
      [L.ntd], [PL.nt, "Documentos/outros/Nota Explicativa - Dados e Indicadores", PL.ofi], [F.oei5]],
    ["jun a set/2025: Censo 2024 e planejamento", "jun a set/2025", "Com as rotinas automatizadas, o Censo 2024 foi reprocessado em cerca de dois dias e os painéis foram atualizados em 05/06/2025 (Ofício Circular nº 42/2025/SEB). No mesmo período foi montado o cubo do sistema de planejamento.",
      ["4.060 escolas sem matrícula identificadas pela base de turmas", "Primeira carga do cubo de planejamento em 18/07/2025", "Validações do planejamento em 25/08, 02/09 e 15/09/2025", "CUI criada por Natália Pires em 31/07/2025"],
      [], ["Documentos/outros/Ofício Circular SEBMEC 03062025 - Informes Novo PAR.pdf", PL.base, "Planejamento"], []],
    ["out/2025 a jan/2026: Painel de Escolas", "20/10/2025 a 09/01/2026", "Inventário da área negocial em 20/10/2025 (223 itens), primeira versão do cubo entregue à STIC em 12/12/2025 e reconstrução em arquivo único com a CUI em 09/01/2026, com cerca de 120 mi linhas.",
      ["Inventário reúne Contexto, Resultados e Insumos no nível da escola", "A CUI resolveu a colisão de códigos entre painéis", "Detalhes na tela 19"],
      [], [PL.invEsc, PL.cuboEsc, PL.guiaEsc], [F.un1, F.un2]],
    ["fev a mar/2026: repasse à STIC", "09/02 a 20/03/2026", "Reunião de repasse dos scripts em R à STIC em 09/02/2026, gravada, com o Painel de Resultados como piloto. Em março, acesso ao banco Oracle por VPN para produzir em ambiente institucional.",
      ["VPN pedida em 03/03, liberada em 13/03/2026", "Máquina de 16 GB disponível em 20/03/2026", "R conectado ao Oracle (DBeaver)"],
      [], [PL.stic, "Reuniões"], [F.un3]],
    ["abr/2026: painéis com o Censo 2025", "16/04/2026", "Dados do Censo 2025 recebidos em 22/03, base ajustada em 10/04 e painéis atualizados em 16/04/2026, já com as mudanças do IFTP na Educação Profissional.",
      ["Metodologias de Tempo Integral e de Educação Profissional revistas", "Cubo de Insumos do Censo 2025: Censo_ds_cubo_insumos.csv (810 MB)"],
      [L.sin, L.mic], [PL.cuboIns, PL.met], [F.un4]],
    ["jul a ago/2026: harmonização e revisão", "27/07 a 10/08/2026", "Harmonização em 27/07/2026: nove pares de scripts de Insumos (3.x) e do Painel de Escolas (4.3.x) passaram a ter o mesmo cálculo. Revisão completa do Painel de Escolas em 09/08 (19 achados) e nova carga em 10/08/2026.",
      ["Carga de 10/08/2026: 229.261.886 linhas e 127 indicadores", "Cada correção exige reexecução da cadeia 4.0 a 4.3.x"],
      [], [PL.code + "/3_painel_insumos", PL.code + "/4_painel_escolas", PL.cuboEsc], []],
    ["set a out/2026: metas, Segape e PDDE", "set a out/2026", "Diagnóstico da escala das metas do planejamento e preparação, em setembro, da correção das metas do IN para a STIC. Interlocução com a Segape sobre a Plataforma EducaDados e Nota Técnica dos indicadores do PDDE (09/10/2026).",
      ["77,6% dos entes (4.338 de 5.593) com ao menos uma meta fora da escala (extração de 06/08/2026)", "Visão Geral do Painel de Escolas (12 a 14/09/2026) e contrato fixo da planilha do BI (25/09/2026)"],
      [], [PL.escala, PL.segape, "Documentos/outros/EducaDados", PL.nt], []],
  ].map(([t, per, d, li, refs, pastas, fonte], i) => {
    const [quando, oque] = t.split(": ");
    const titulo = oque.charAt(0).toUpperCase() + oque.slice(1);
    return [`marco-${i}`, tl(i, { t: titulo, per: per === quando ? quando : `${quando} · ${per}`, d, li, refs, pastas: P(...pastas), fonte })];
  })),
};

// ---------- 4. Gantt ----------
const barY = [2.28, 2.65, 3.02, 3.39, 3.76, 4.13, 4.49, 4.86, 5.23, 5.6];
const bar = (i, o) => ({ kind: "bar", with: [`barra-${i}`], box: [0.6, barY[i] - 0.1, 2.85, 0.41], hl: [`barra-${i}`], ...o });
const dia = (i, k, o) => ({ kind: "dia", z: 2, with: [`marco-${i}-${k}`, `rotulo-marco-${i}-${k}`], hl: [`marco-${i}-${k}`], ...o });
slides[4] = {
  "barra-0": bar(0, { t: "Cubo Insumos", per: "Produção · dez/2024 em diante", d: "Cubo do Painel de Insumos, o primeiro carregado no formato de cubo, desde o lançamento. Reúne indicadores do Censo Escolar, do Diagnóstico das Escolas (PDDE), do Diagnóstico de Equidade (Secadi), da CGTI/MEC, do SIMEC/CNCA e de outras fontes.", li: ["Planilha de controle: 186 indicadores, 163 feitos, 17 pendentes e 6 excluídos", "Primeira versão (jan/2025): 12,5 mi linhas e 100 indicadores", "Atualizado com os Censos 2024 (05/06/2025) e 2025 (16/04/2026)", "Scripts 3.0 a 3.11"], pastas: P(PL.cuboIns, PL.code + "/3_painel_insumos", PL.controle), fonte: [F.oei1, F.oei3] }),
  "marco-0-0": dia(0, 0, { t: "Marco: lançamento", per: "10/02/2025", d: "Painéis publicados em 10/02/2025 e lançados no Encontro de Novos Prefeitos e Prefeitas, no Centro de Convenções Ulysses Guimarães, em Brasília (11 a 13/02/2025).", li: ["Homologação com as equipes de BI e da SEB em 07/02", "105 de 115 indicadores do Censo produzidos em mar/2025 (96,5%)"], refs: [L.enc2, L.enc1, L.np], pastas: P(PROD("OEI", 2), PROD("OEI", 3)) }),
  "marco-0-1": dia(0, 1, { t: "Marco: Censo 2025", per: "16/04/2026", d: "Painéis atualizados com o Censo Escolar 2025, seis semanas após o pedido de VPN (03/03/2026), com as mudanças do IFTP na Educação Profissional.", li: ["Dados em 22/03; base ajustada em 10/04/2026"], refs: [L.sin], pastas: P(PL.cuboIns, PL.met) }),
  "barra-1": bar(1, { t: "Planilhas Contexto", per: "Produção · fev/2025 em diante", d: "O Painel de Contexto é alimentado por 14 tabelas por tela (arquivos tab_contexto_*), guardadas no SharePoint. A conversão para cubo unificado foi iniciada e depois interrompida pela prioridade à institucionalização.", li: ["129 IDs de Contexto no sistema de planejamento; 41 produzidos", "NT do Painel de Contexto em 22/07/2026"], pastas: P(PL.ctx, PL.code + "/1_painel_contexto") }),
  "marco-1-0": dia(1, 0, { t: "Marco: Censo 2024", per: "05/06/2025", d: "Tabelas de Contexto e demais painéis atualizados com o Censo 2024, cerca de um mês após o recebimento dos dados (06/05/2025).", li: ["Rotinas reexecutadas em cerca de dois dias", "Comunicado às redes pelo Ofício Circular nº 42/2025/SEB"], pastas: P("Documentos/outros/Ofício Circular SEBMEC 03062025 - Informes Novo PAR.pdf") }),
  "barra-2": bar(2, { t: "Cubo Resultados", per: "Produção · jul/2025 em diante", d: "Conversão do Painel de Resultados, antes alimentado por planilhas, para o formato de cubo, com indicadores de acesso, rendimento e aprendizagem. O cubo foi produzido e validado e serve de piloto da transição na STIC, já com a CUI.", li: ["Scripts 2_0 a 2_5", "Dicionários divergem sobre os IDs 8, 9 e 10; decisão pendente com a DAGE"], refs: [L.ideb], pastas: P(PL.res, PL.code + "/2_painel_resultados") }),
  "marco-2-0": dia(2, 0, { t: "Marco: piloto STIC", per: "09/02/2026", d: "Reunião de repasse dos scripts em R aos engenheiros de dados da STIC, gravada, tomando o Painel de Resultados como piloto da produção institucional.", pastas: P(PL.stic) }),
  "barra-3": bar(3, { t: "Cubo Planejamento", per: "Produção · mar/2025 em diante", d: "Cubo agregado por ente que alimenta o sistema de planejamento. Parte da Estrutura Base de Indicadores (criada por Sérgio Henrique de Sousa Silva em 07/03/2025) e de um de-para entre o ID do planejamento e os IDs dos painéis.", li: ["Um valor por ente e ID, em CSV", "Riscos alertados na época: identificação diferente e desalinhamento entre painéis e sistema", "Detalhes nas telas 14 e 15"], pastas: P(PL.base, PL.cuboPlan, PL.code + "/4_dados_planejamento") }),
  "marco-3-0": dia(3, 0, { t: "Marco: primeira carga", per: "18/07/2025", d: "Primeira carga do cubo de planejamento entregue à equipe do sistema, seguida de rodadas de validação em 25/08, 02/09 e 15/09/2025.", pastas: P("Planejamento") }),
  "barra-4": bar(4, { t: "Cubo Escolas", per: "Produção · out/2025 em diante", d: "Painel agregador no nível da escola, que reúne Contexto, Resultados e Insumos. Partiu do inventário da área negocial (20/10/2025) e chegou a cerca de 229 mi linhas na carga de 10/08/2026.", li: ["CSV de 10,8 GB e Parquet de 4,0 GB", "154 dos 252 indicadores de rede com abertura por escola", "Scripts 4.0 a 4.3.x"], pastas: P(PL.cuboEsc, PL.invEsc, PL.guiaEsc, PL.code + "/4_painel_escolas") }),
  "marco-4-0": dia(4, 0, { t: "Marco: versão com CUI", per: "09/01/2026", d: "Cubo reconstruído em arquivo único com a Codificação Única de Indicadores, com cerca de 120 mi linhas e 8 colunas.", pastas: P(PL.cui, PL.cuboEsc) }),
  "barra-5": bar(5, { t: "CUI: Codificação Única de Indicadores", per: "Melhoria · jul/2025 em diante", d: "Código numérico de sete dígitos criado por Natália Pires (31/07/2025) para identificar cada indicador por painel agregador, painel fonte, base fonte e número. Resolveu a colisão de códigos no Painel de Escolas.", li: ["Estrutura: painel agregador (1 dígito), painel fonte (1), base fonte (2) e indicador (3)", "Exemplo: 2111001", "Detalhes na tela 20"], pastas: P(PL.cui) }),
  "barra-6": bar(6, { t: "Institucionalização", per: "Melhoria · abr/2025 em diante", d: "Interlocução com a STIC para levar a produção ao ambiente institucional e, em 2026, com a Segape para a gestão dos dados do MEC. O estágio ainda é inicial, com avanço expressivo nos últimos meses.", li: ["Arquitetura medalhão: conversão de R para SQL com validação cruzada", "Mapeamento dos processos com o apoio de Andriênia Rênia Santos de Sousa (FGV)", "Detalhes na tela 21"], pastas: P(PL.stic, PL.segape, "Documentos/outros/Acesso Dados SEGAPE") }),
  "marco-6-0": dia(6, 0, { t: "Marco: repasse dos scripts", per: "09/02/2026", d: "Reunião de repasse dos scripts em R à STIC (gravação \"Scripts R Novo PAR\").", pastas: P(PL.stic) }),
  "barra-7": bar(7, { t: "Validações e contestações", per: "Validação · jan/2025 em diante", d: "Conferência dos dados com a Sinopse do Inep e com as fontes oficiais a cada edição, além da análise de ofícios e contestações das redes e das revisões internas.", li: ["Validação para o lançamento iniciada em 27/01/2025", "24 demandas formais registradas por ente", "Scripts de validação em 8_validacoes"], refs: [L.sin], pastas: P(PL.code + "/8_validacoes", PL.ofi, "Documentos/outros/contestacoes") }),
  "marco-7-0": dia(7, 0, { t: "Marco: respostas padrão", per: "23 e 24/02/2026", d: "Respostas padrão para os temas mais recorrentes: taxa de atendimento (23/02/2026) e tempo integral (24/02/2026).", pastas: P(PL.ofi) }),
  "barra-8": bar(8, { t: "Notas Técnicas", per: "Documentação · abr/2025 em diante", d: "Documentação dos indicadores para gestores e equipes técnicas: tipologia de cálculo, fichas dos indicadores e orientação de leitura. Indicadores secundários remetem à fonte oficial.", li: ["NT v1 (05/05/2025) e v2 (mai a jun/2025)", "NT de Resultados e Insumos (versão sem logo em 28/05/2026)", "NT do Painel de Contexto (22/07/2026)", "Detalhes na tela 16"], refs: [L.ntd], pastas: P(PL.nt, "Documentos/outros/Nota Técnica - Indicadores Insumos") }),
  "marco-8-0": dia(8, 0, { t: "Marco: Nota Técnica v1", per: "05/05/2025", d: "Primeira versão da Nota Técnica da Equipe de Dados, com tipologia de cálculo e fichas dos indicadores de Insumos.", refs: [L.ntd], pastas: P(PL.nt) }),
  "marco-8-1": dia(8, 1, { t: "Marco: NT do PDDE", per: "09/10/2026", d: "Nota Técnica dos indicadores do Diagnóstico das Escolas (PDDE), fonte pré-calculada com problemas de série identificados na base de dez/2025.", pastas: P(PL.nt) }),
  "barra-9": bar(9, { t: "Análises sob demanda", per: "Atendimento · mar/2025 em diante", d: "Estudos, recortes e extrações para as áreas do MEC: priorização de entes, fatores associados às desigualdades educacionais e diagnóstico da escala das metas do planejamento.", li: ["Painel de priorização (5_painel_priorizacao)", "Produto 4 da consultoria UNESCO: fatores associados às desigualdades (26/05/2026)"], pastas: P(PL.code + "/6_outras_demandas", PL.code + "/7_analise_indicadores", PL.code + "/5_painel_priorizacao", "Gerenciamento") }),
  "marco-9-0": dia(9, 0, { t: "Marco: escala das metas", per: "31/08/2026", d: "Revisão das metas digitadas no sistema de planejamento: 77,6% dos entes (4.338 de 5.593) tinham ao menos uma meta fora da escala do indicador; 660 divergências de campo entre a aba mestre e as abas por painel da Estrutura Base.", li: ["Correção das metas do IN preparada para a STIC em set/2026"], pastas: P(PL.escala, PL.base) }),
};

// ---------- 5. Ponto de partida ----------
slides[5] = {
  "cartao-0": { t: "Planilha de controle", d: "A planilha 20250110_Diagnóstico PAR_Indicadores.xlsx foi elaborada pelo núcleo do IU após discussão com as áreas do MEC, a Undime e o Consed. Registra lista, regra de cálculo e situação de cada indicador, e seguiu recebendo indicadores durante a produção.", li: ["Aba Insumos hoje: 186 indicadores (163 feitos, 17 pendentes, 6 excluídos)", "Cópia de trabalho do IU e FGV em IU_e_FGV"], refs: [L.plan], pastas: P(PL.controle, PL.controleIU) },
  "cartao-1": { t: "Formato de cubo", d: "Estrutura acordada entre Fabiano Balduino Barbosa (CGDA/STIC, equipe de Lucas Bordin Teles) e Rebert Tomaz de Aquino (BI): uma linha por território, rede, etapa, modalidade e indicador, com o valor calculado. Dimensões ficam em tabelas auxiliares.", li: ["Primeira versão: IBGE_MUNICIPIO, TP_DEPENDENCIA, id_modalidade, id_etapa, id_indicador, VALOR", "Detalhes na tela 13"], pastas: P(PL.cuboIns.replace("/2025", "")) },
  "cartao-2": { t: "Painéis com dados fictícios", d: "Os painéis já tinham sido desenvolvidos no Power BI e alimentados com arquivos de teste no formato de cubo. Arquivos marcados como FAKE ainda constam nas pastas de fontes do Contexto e do Resultados.", pastas: P("Contexto/00_Fontes_de_Dados", "Resultados/00_Fontes_de_Dados") },
  "faixa-missao": { t: "Missão", d: "Substituir os dados fictícios por dados reais, calculados e validados com fontes oficiais, em cerca de oito semanas entre o acesso às bases (17/12/2024) e a publicação (10/02/2025).", refs: [L.etapa], fonte: [F.oei1] },
};

// ---------- 6. Equipe inicial ----------
slides[6] = {
  "pessoa-0": { t: "Victor Gabriel Alcantara", d: "Consultor de dados da Equipe de Dados do Novo PAR desde dez/2024, pela OEI e depois pela UNESCO. Responsável pelos indicadores com fonte no Censo Escolar e pela arquitetura dos códigos em R.", pastas: P("Documentos/6 - Produtos Consultorias") },
  "pessoa-1": { t: "Natália Pires", d: "Consultora de dados, com entrada junto com Victor em dez/2024. Criou a Codificação Única de Indicadores (CUI) para o Painel de Escolas.", pastas: P(PL.cui) },
  "pessoa-2": { t: "Sabrina Medeiros", d: "Consultora de dados já em atuação em dez/2024, responsável pelos dados do Painel de Resultados.", pastas: P(PL.res) },
  "pessoa-3": { t: "Samuel Franco", d: "Coordenação técnica da gestão dos dados do Novo PAR; referência para avançar na produção e nas prioridades." },
  "pessoa-4": { t: "Rebert Tomaz de Aquino", d: "BI do Novo PAR à época e ponto focal sobre o que estava em andamento. Definiu com Fabiano o formato de cubo. Hoje na CGIPEME/DICOPE/SASE/MEC." },
  "pessoa-5": { t: "João César da Fonseca Neto", d: "CGARE/SEB; referência sobre o contexto e a gestão do Novo PAR.", refs: [L.np] },
  "painel-entendimento": { t: "Entendimento inicial", d: "O processo foi entendido como orgânico e dinâmico: produção e revisão contínuas, guiadas pelo uso e pela demanda dos usuários e das áreas. O desenvolvimento do BI coube a Fabiano Balduino Barbosa e Davidson Clynton das Chagas (PRIMEUP), da equipe de Lucas Bordin Teles (CGDA/STIC), responsáveis pela carga dos cubos no Power BI.", pastas: P("Integração BI - Sistema") },
};

// ---------- 7. Interlocutores ----------
slides[7] = {
  "grupo-0": { t: "Equipe de Dados (SEB)", d: "Victor Gabriel Alcantara, Natália Pires e Sabrina Medeiros, consultores responsáveis pela produção dos indicadores e cubos dos painéis de diagnóstico.", pastas: P(PL.code) },
  "grupo-1": { t: "Gestão do Novo PAR (SEB)", d: "João César da Fonseca Neto (CGARE/SEB) e Samuel Franco (coordenação técnica): área negocial que aprova as publicações e define prioridades.", refs: [L.np] },
  "grupo-2": { t: "BI dos painéis", d: "Rebert Tomaz de Aquino, consultor, hoje na CGIPEME/DICOPE/SASE/MEC. Definiu o formato de cubo e acompanhou a homologação das primeiras cargas." },
  "grupo-3": { t: "Desenvolvimento e carga (STIC/CGDA)", d: "Lucas Bordin Teles (SE/STIC/CGDA, servidor), com Fabiano Balduino Barbosa e Davidson Clynton das Chagas (SE/STIC/CGDA/PRIMEUP, terceirizados), responsáveis pela carga dos cubos no Power BI e pela transição dos scripts.", pastas: P(PL.stic, "Integração BI - Sistema") },
  "grupo-4": { t: "Sistema de planejamento", d: "Sergio Henrique de Sousa Silva (UNESCO/CGARE/SEB) e Gabriela Miranda dos Santos (SE/STIC/CGSA/G4F, terceirizada), responsáveis pela Estrutura Base de Indicadores e pela carga no sistema.", pastas: P(PL.base, "Planejamento") },
  "grupo-5": { t: "Gestão de dados do MEC (Segape/DMAPE)", d: "Lucas Evencio Soares Dutra e Camila Porto Fasolo (DMAPE/SEGAPE/MEC, servidores): Data Lake, Plataforma EducaDados e pedido formal de microdados ao Inep.", pastas: P(PL.segape, "Documentos/outros/Acesso Dados SEGAPE", "Documentos/outros/EducaDados") },
};

// ---------- 8. Crescimento da lista ----------
slides[8] = {
  "grafico-crescimento": { t: "Indicadores mapeados e calculados", d: "Indicadores de Insumos com fonte no Censo Escolar ao longo da produção. O total mapeado variou porque a planilha de controle seguiu recebendo, revendo e excluindo indicadores.", li: ["18/12/2024: 27 de 84", "04/01/2025: 59 de 86", "09/01/2025: 99 de 113 (prévia)", "20/01/2025: 100 de 111", "mar/2025: 105 de 115 (96,5%)"], pastas: P(PROD("OEI", 1), PROD("OEI", 3)), fonte: [F.oei1, F.oei3] },
  "painel-planilha-hoje": { t: "Planilha de controle hoje", d: "Aba Insumos com 186 indicadores: 163 feitos, 17 pendentes e 6 excluídos. O Censo Escolar responde por 117; o Diagnóstico das Escolas (PDDE), por 36; o Diagnóstico de Equidade (Secadi), por 17.", li: ["CGTI/MEC: 4; SIMEC/CNCA: 4; outras fontes: 8"], refs: [L.plan], pastas: P(PL.controle) },
};

// ---------- 9. Prazo curto ----------
slides[9] = {
  "etapa-0": { t: "17/12/2024: bases do Censo", d: "Bases do Censo Escolar 2023 recebidas via STIC: escolas (180.230), turmas (2,6 mi), matrículas (52,7 mi) e docentes (7,5 mi).", refs: [L.mic], fonte: [F.oei1] },
  "etapa-1": { t: "jan/2025: prévia", d: "Base da Secadi (05/01) e de gestores (10/01). Primeira versão entregue em 09/01/2025 para a prévia, com 99 de 113 indicadores.", fonte: [F.oei1] },
  "etapa-2": { t: "27/01: início da validação", d: "Validação iniciada dez dias antes da homologação, com indicadores ainda em elaboração e dados chegando.", fonte: [F.oei2] },
  "etapa-3": { t: "29/01 e 07/02: bases finais", d: "Retrato da Educação Infantil (29/01) e CNCA (07/02) recebidos; pendências produzidas na reta final.", fonte: [F.oei2] },
  "etapa-4": { t: "07/02: homologação", d: "Homologação dos dados com as equipes de BI e da SEB no ambiente de teste do Power BI.", fonte: [F.oei2] },
  "etapa-5": { t: "10/02/2025: publicação e lançamento", d: "Painéis publicados em 10/02 e lançados no Encontro de Novos Prefeitos e Prefeitas, no Centro de Convenções Ulysses Guimarães, em Brasília, de 11 a 13/02/2025.", refs: [L.enc2, L.enc1, L.ag], fonte: [F.oei3] },
  "painel-validacao": { t: "Estratégias de validação sob prazo", d: "Três frentes garantiram consistência em pouco tempo: restrição das combinações de etapa e modalidade às ofertas possíveis em cada escola, conferência dos totais com a Sinopse (178.476 escolas) e verificação passo a passo em três recortes territoriais.", refs: [L.sin], pastas: P(PL.code + "/8_validacoes"), fonte: [F.oei2] },
  "painel-percalcos": { t: "Percalços", d: "O acesso aos dados foi negociado com as áreas. A sala segura do Sedap/Inep foi agendada de 20 a 24/01 e descartada com a chegada das bases. Até a semana de 27/01 ainda havia indicadores em elaboração.", pastas: P("Documentos/outros/Acesso Dados SEGAPE"), fonte: [F.oei1, F.oei2] },
};

// ---------- 10. Após o lançamento ----------
slides[10] = {
  "coluna-0": { t: "Lacunas preenchidas", d: "Indicadores de Educação Infantil e alfabetização (25, 27, 42, 44 e 46) com o Retrato da EI e o CNCA; Educação Especial em classe comum e exclusiva (36 e 37) e AEE (194 a 196). Em mar/2025, 96,5% dos indicadores do Censo estavam produzidos.", pastas: P(PL.controle), fonte: [F.oei3, F.oei4] },
  "coluna-1": { t: "Regras revistas", d: "Regular passou a Geral (Urbana), tornando exclusivas as modalidades da escola. Educação Bilíngue de Surdos foi suspensa por falta de ID_TURMA para ligar matrícula e turma. EPT alinhada à Sinopse 2025 (IFTP) e tempo integral revisto.", pastas: P(PL.met), refs: [L.sin] },
  "coluna-2": { t: "Atualizações anuais", d: "Censo 2024: dados em 06/05/2025, rotinas reexecutadas em cerca de dois dias e painéis em 05/06/2025; 4.060 escolas sem matrícula identificadas pela base de turmas. Censo 2025: VPN pedida em 03/03/2026, base ajustada em 10/04 e painéis em 16/04/2026.", pastas: P(PL.cuboIns), refs: [L.mic] },
  "faixa-licao": { t: "Lição do período", d: "Com códigos documentados e automatizados, atualizar os painéis leva poucos dias; o prazo passou a depender do acesso aos dados." },
};

// ---------- 11. Esteira ----------
const passo = (n, t, d, pastas = [], refs = []) => [`passo-${n}`, { t: `${n}. ${t}`, d, pastas: P(...pastas), refs }];
slides[11] = Object.fromEntries([
  passo(1, "Planilha de controle", "Lista, regra de cálculo e situação de cada indicador; ponto de partida e de retorno da esteira.", [PL.controle], [L.plan]),
  passo(2, "Importação", "Microdados do Censo via STIC e bases das áreas (PDDE, Secadi, CNCA, Retrato da EI, Escolas Conectadas), além de dados públicos do Inep e do IBGE.", ["0_data", PL.code + "/0_etl_dados"], [L.mic]),
  passo(3, "Códigos em R", "ETL, regras e cálculo por painel, executados por scripts mestres que gravam metadados de cada etapa.", [PL.code]),
  passo(4, "Produção e validação", "Conferência com a Sinopse do Inep e com as fontes oficiais a cada edição.", [PL.code + "/8_validacoes"], [L.sin]),
  passo(5, "Exportação", "Cubos em CSV e Parquet e planilhas de dimensão (etapa, modalidade, dependência, geografia, indicadores e faróis).", [PL.cuboIns, PL.cuboEsc, PL.res]),
  passo(6, "Carga no Power BI", "Feita pelos desenvolvedores da CGDA/STIC.", ["Integração BI - Sistema"]),
  passo(7, "Homologação", "Conferência dos dados no ambiente de teste do painel."),
  passo(8, "Aprovação da SEB", "Validação pela área negocial antes da publicação."),
  passo(9, "Produção", "Atualização do BI publicado."),
  passo(10, "Link público", "Painéis disponíveis aos entes na página do Novo PAR.", [], [L.np, L.etapa]),
]);

// ---------- 12. Arquitetura ----------
slides[12] = {
  "camada-fontes": { t: "Fontes", d: "Censo Escolar (microdados via STIC), Diagnóstico das Escolas (PDDE), Diagnóstico de Equidade (Secadi), CNCA, Retrato da EI, Escolas Conectadas (15/09/2025), dados públicos do Inep e do IBGE.", refs: [L.mic, L.sin, L.sidra], pastas: P("0_data", "Insumos/00_Fontes_de_Dados") },
  "camada-etl": { t: "0_etl_dados", d: "Extração e rotulagem das bases, oferta por etapa e modalidade (matrículas, turmas, profissionais) e composição das escolas. Base comum a todos os painéis.", pastas: P(PL.code + "/0_etl_dados") },
  "painel-codigo-0": { t: "Contexto", d: "Rotinas que geram as tabelas por tela do Painel de Contexto.", pastas: P(PL.code + "/1_painel_contexto", PL.ctx) },
  "painel-codigo-1": { t: "Resultados", d: "Scripts 2_0 a 2_5: acesso, rendimento e aprendizagem.", pastas: P(PL.code + "/2_painel_resultados", PL.res), refs: [L.ideb] },
  "painel-codigo-2": { t: "Insumos", d: "Scripts 3.0 a 3.11: indicadores de oferta, infraestrutura e profissionais.", pastas: P(PL.code + "/3_painel_insumos", PL.cuboIns) },
  "painel-codigo-3": { t: "Escolas", d: "Scripts 4.0 a 4.3.x: cubo agregador no nível da escola, harmonizado com Insumos em 27/07/2026.", pastas: P(PL.code + "/4_painel_escolas", PL.cuboEsc) },
  "camada-saidas": { t: "Saídas", d: "Cubos em CSV e Parquet, planilhas de indicadores e de dimensões, faróis e o cubo do sistema de planejamento (4_dados_planejamento).", pastas: P(PL.cuboIns, PL.cuboEsc, PL.cuboPlan, PL.code + "/4_dados_planejamento") },
  "painel-convencoes": { t: "Convenções", d: "Estrutura padrão de pastas (0_data, 1_code, 2_outp e 3_docs), scripts mestres com metadados de execução, de-paras em Excel fora do código e caminho do drive resolvido para qualquer usuário.", li: ["Código de referência: 21 scripts de ETL, 12 de Resultados, 15 de Insumos e 34 do Painel de Escolas", "Cópia do Team Channel sincronizada em 21/10/2026 (109 arquivos: 31 novos e 78 atualizados)"], pastas: P(PL.code) },
};

// ---------- 13. Formato de cubo ----------
slides[13] = {
  "especificacao-0": { t: "Cubo do Painel de Insumos", per: "primeira versão, jan/2025", d: "Uma linha por município, dependência administrativa, modalidade, etapa e indicador, com o valor calculado. 12,5 mi linhas e 100 indicadores na primeira versão.", pastas: P(PL.cuboIns) },
  "especificacao-1": { t: "Cubo do Painel de Escolas", per: "cubo consolidado, 2026", d: "Acrescenta ano, código da escola (CO_ENTIDADE), geografia, painel de origem e farol. Cerca de 229 mi linhas, com a CUI como identificador.", pastas: P(PL.cuboEsc, PL.guiaEsc) },
  "especificacao-2": { t: "Cubo do sistema de planejamento", per: "agregado por ente", d: "Um valor por ente (cod_ibge) e ID do planejamento, com fonte, csd, ano, formato e farol.", pastas: P(PL.cuboPlan, PL.base) },
};

// ---------- 14. Planejamento ----------
slides[14] = {
  "fluxo-planejamento-0": { t: "Cubos dos painéis", d: "Ponto de partida: indicadores desagregados por etapa, modalidade e csd.", pastas: P(PL.cuboIns, PL.res) },
  "fluxo-planejamento-1": { t: "Estrutura Base de Indicadores", d: "De-para por ID do planejamento, criado por Sérgio Henrique de Sousa Silva em 07/03/2025 e mantido à mão.", pastas: P(PL.base) },
  "fluxo-planejamento-2": { t: "Montagem em R", d: "4_cubo_planejamento.R aplica regras e faróis e monta o cubo.", pastas: P(PL.code + "/4_dados_planejamento") },
  "fluxo-planejamento-3": { t: "Cubo do planejamento", d: "Um valor por ente e ID, em CSV.", pastas: P(PL.cuboPlan) },
  "fluxo-planejamento-4": { t: "Sistema de planejamento", d: "Carga feita pela equipe do sistema (STIC/CGSA). Primeira carga em 18/07/2025." },
  "faixa-chave": { t: "Chave do planejamento", d: "O ID do planejamento combina indicador, modalidade, etapa e csd. Exemplo: a taxa de abandono nos Anos Finais do Ensino Fundamental na Educação do Campo corresponde ao indicador 4, etapa 5 e modalidade 3.", pastas: P(PL.base) },
  "painel-construcao": { t: "Como foi construído", d: "Sérgio Henrique de Sousa Silva (UNESCO/CGARE/SEB), com a equipe de Gabriela Miranda dos Santos (STIC/CGSA), enviou o levantamento de indicadores já agregados por etapa e modalidade. A Equipe de Dados montou o de-para para puxar os indicadores dos cubos dos painéis.", li: ["Validações em 25/08, 02/09 e 15/09/2025"], pastas: P("Planejamento") },
  "painel-riscos": { t: "Riscos alertados na época", d: "IDs do planejamento e dos painéis não coincidem; quando um lado é atualizado sem o outro, painéis de origem e sistema se desalinham. Os achados de 2026 confirmaram os dois riscos (tela 15)." },
};

// ---------- 15. Achados 2026 ----------
slides[15] = {
  "achado-0": { t: "41 de 129 IDs de Contexto", d: "Só 41 dos 129 IDs de Contexto do planejamento são produzidos; os demais entram zerados ou herdados do ciclo anterior.", pastas: P(PL.base) },
  "achado-1": { t: "15 IDs sem de-para", d: "IDs do planejamento sem linha correspondente nas abas por painel da Estrutura Base.", pastas: P(PL.base) },
  "achado-2": { t: "660 divergências", d: "Divergências de campo entre a aba mestre e as abas por painel, na revisão de 31/08/2026.", pastas: P(PL.base) },
  "achado-3": { t: "77,6% dos entes com metas fora da escala", d: "4.338 dos 5.593 entes têm ao menos uma meta digitada fora da escala do indicador (extração de Olinda de 06/08/2026), por exemplo percentual num índice de 0 a 5 ou de 0 a 10. A linha de base está correta.", li: ["Correção das metas do IN preparada para a STIC em set/2026, com regras de divisão por faixa"], pastas: P(PL.escala) },
};

// ---------- 16. Notas Técnicas ----------
const doc = (i, o) => ({ with: [`ponto-documento-${i}`], box: [0.6, 1.7 + i * 0.83, 6.9, 0.72], ...o });
slides[16] = {
  "ponto-documento-0": doc(0, { t: "Nota Técnica da Equipe de Dados", per: "v1 em 05/05/2025; v2 em mai a jun/2025", d: "Tipologia de cálculo e fichas dos indicadores de Insumos.", refs: [L.ntd], pastas: P(PL.nt, "Documentos/outros/Nota Técnica - Indicadores Insumos", "Documentos/outros/Nota Técnica") }),
  "ponto-documento-1": doc(1, { t: "Nota explicativa dos indicadores 75 e 76", per: "abr/2025", d: "Explica os indicadores 75 e 76 e registra os ajustes feitos após o lançamento.", pastas: P("Documentos/outros/Nota Explicativa - Dados e Indicadores") }),
  "ponto-documento-2": doc(2, { t: "NT dos Painéis de Resultados e de Insumos", per: "fev/2026; versão sem logo em 28/05/2026", d: "Documentação metodológica dos Painéis de Resultados e de Insumos, com versão sem logo publicada em 28/05/2026.", pastas: P(PL.nt) }),
  "ponto-documento-3": doc(3, { t: "Metodologias de Tempo Integral e de Educação Profissional", per: "2026 (Censo 2025)", d: "Definições adotadas para o tempo integral (35 horas semanais ou mais) e para a Educação Profissional com as mudanças do IFTP.", pastas: P(PL.met) }),
  "ponto-documento-4": doc(4, { t: "NT do Painel de Contexto", per: "22/07/2026", d: "Documentação das tabelas por tela do Painel de Contexto.", pastas: P(PL.nt) }),
  "ponto-documento-5": doc(5, { t: "NT dos indicadores do PDDE", per: "09/10/2026", d: "Indicadores do Diagnóstico das Escolas, fonte pré-calculada cuja base de dez/2025 não reproduz a série publicada.", pastas: P(PL.nt) }),
  "principio-0": { t: "Orientação de leitura", d: "Sempre que possível, cada indicador traz orientação de leitura para gestores e equipes técnicas.", refs: [L.ntd] },
  "principio-1": { t: "Indicadores secundários", d: "Indicadores calculados por outros órgãos recebem referência e link para a fonte oficial, sem reescrever a metodologia.", refs: [L.ideb, L.sin, L.sidra] },
  "principio-2": { t: "Tipologia de cálculo", d: "Razão simples, razão composta, somatório e indicadores sintéticos.", pastas: P(PL.met) },
  "principio-3": { t: "Documento vivo", d: "Cada revisão registra o que mudou e por quê.", pastas: P(PL.nt) },
};

// ---------- 17. Ofícios ----------
slides[17] = {
  "painel-oficios": { t: "24 demandas formais", d: "Ofícios e contestações de 23 redes de ensino e da Undime, além de pedidos de dados por cidadãos e órgãos, registrados por ente.", pastas: P(PL.ofi, "Documentos/outros/contestacoes") },
  "tema-0": { t: "Taxa de atendimento", d: "Tema mais recorrente. A resposta padrão (23/02/2026) explica a fórmula e as fontes oficiais.", pastas: P(PL.ofi + "/resposta_padrao_tx_atendimento.docx"), refs: [L.sidra] },
  "tema-1": { t: "Tempo integral", d: "Escola com oferta tem ao menos uma matrícula de 35 horas semanais ou mais; o Novo PAR não reclassifica. Resposta padrão de 24/02/2026.", pastas: P(PL.ofi + "/resposta_padrao_tempo_integral.docx", PL.met) },
  "tema-2": { t: "Escolas e matrículas", d: "Contagens por etapa e modalidade, condições de oferta e divergências com outras plataformas.", refs: [L.sin] },
  "formula-atendimento": { t: "Fórmula da taxa de atendimento", d: "Matrículas da faixa etária na etapa adequada (Censo Escolar) divididas pela população da faixa etária (Censo Demográfico 2022), vezes 100.", refs: [L.sin, L.sidra] },
  "procedimento-0": { t: "Registro por ente", d: "Cada demanda é registrada na pasta de ofícios, por ente.", pastas: P(PL.ofi) },
  "procedimento-1": { t: "Análise técnica", d: "A resposta cita o código de produção do indicador contestado.", pastas: P(PL.code) },
  "procedimento-2": { t: "Correção quando procedente", d: "Ajustes entram nos códigos e na planilha de controle, com registro." },
  "procedimento-3": { t: "LGPD", d: "Dados são fornecidos apenas agregados." },
};

// ---------- 18. Planilhas para cubo ----------
slides[18] = {
  "painel-0": { t: "Insumos: cubo", d: "Primeiro painel com carga pelo arquivo em formato de cubo, desde o lançamento.", pastas: P(PL.cuboIns) },
  "painel-1": { t: "Resultados: cubo em transição", d: "Cubo produzido e validado; piloto da transição na STIC, já com a CUI.", pastas: P(PL.res) },
  "painel-2": { t: "Contexto: planilhas", d: "Alimentado por 14 tabelas por tela, guardadas no SharePoint.", pastas: P(PL.ctx) },
  "painel-3": { t: "Escolas: cubo", d: "Nasceu como cubo único no nível da escola.", pastas: P(PL.cuboEsc) },
  "painel-4": { t: "Planejamento: cubo próprio", d: "Agregado por ente, montado a partir dos painéis.", pastas: P(PL.cuboPlan) },
  "etapa-unificacao-0": { t: "Ponto de partida", d: "Muitas planilhas no SharePoint alimentavam Contexto e Resultados, com complexidade de organização e de carga.", pastas: P(PL.ctx) },
  "etapa-unificacao-1": { t: "Conversão iniciada", d: "A conversão para um cubo unificado seguiu o modelo do Painel de Insumos.", pastas: P(PL.res) },
  "etapa-unificacao-2": { t: "Iniciativa interrompida", d: "A prioridade passou a ser institucionalizar a produção na STIC e na Segape. A retomada no ambiente institucional é uma das recomendações (tela 24).", pastas: P(PL.stic, PL.segape) },
};

// ---------- 19. Painel de Escolas ----------
const esc = (i, o) => ({ kind: "cube", with: [`marco-escolas-${i}`], box: [4.65, 1.7 + i * 0.83, 8.08, 0.75], hl: [`marco-escolas-${i}`], ...o });
slides[19] = {
  "escolas-estatistica-0": { t: "Mais de 1 bilhão de células", d: "Cerca de 229 mi linhas × 10 colunas no cubo publicado (carga de 10/08/2026: 229.261.886 linhas).", pastas: P(PL.cuboEsc) },
  "escolas-estatistica-1": { t: "10,8 GB em CSV", d: "Cubo publicado em CSV em set/2026; 4,0 GB em Parquet. O volume obriga a reexecução completa a cada correção.", pastas: P(PL.cuboEsc) },
  "escolas-estatistica-2": { t: "154 de 252 indicadores por escola", d: "Indicadores de rede com abertura por escola, na lista de ago/2026.", pastas: P(PL.cuboEsc + "/indicadores_cubo_escolas.xlsx", PL.cui) },
  "marco-escolas-0": esc(0, { t: "Inventário da área negocial", per: "20/10/2025", d: "223 itens reúnem Contexto, Resultados e Insumos no nível da escola.", pastas: P(PL.invEsc) }),
  "marco-escolas-1": esc(1, { t: "Primeira versão do cubo", per: "12/12/2025", d: "Entregue à STIC para iniciar a construção da página.", pastas: P(PL.cuboEsc), fonte: [F.un2] }),
  "marco-escolas-2": esc(2, { t: "Versão com CUI", per: "09/01/2026", d: "Cubo reconstruído em arquivo único com a CUI: cerca de 120 mi linhas e 8 colunas.", pastas: P(PL.cui, PL.guiaEsc), fonte: [F.un2] }),
  "marco-escolas-3": esc(3, { t: "Harmonização", per: "27/07/2026", d: "Nove pares de scripts 3.x (Insumos) e 4.3.x (Escolas) passam a ter o mesmo cálculo.", pastas: P(PL.code + "/3_painel_insumos", PL.code + "/4_painel_escolas") }),
  "marco-escolas-4": esc(4, { t: "Revisão completa e nova carga", per: "09 e 10/08/2026", d: "Revisão com 19 achados e nova carga com 229.261.886 linhas e 127 indicadores.", pastas: P(PL.cuboEsc) }),
  "marco-escolas-5": esc(5, { t: "Visão Geral e contrato da planilha", per: "set/2026", d: "Visão Geral por etapa e ano, com ID de 9 dígitos (12 a 14/09/2026), e contrato fixo da planilha do BI (25/09/2026), depois de a carga de 23/09/2026 quebrar o painel.", pastas: P(PL.cuboEsc, "Integração BI - Sistema") }),
};

// ---------- 20. CUI ----------
slides[20] = {
  "codigo-0": { t: "ID_ORIGEM", d: "Sequencial da planilha de controle (coluna ID_ORIGINAL), usado desde o lançamento.", pastas: P(PL.controle) },
  "codigo-1": { t: "10a, 10b, 10c", d: "Tentativa de identificar indicadores derivados com letras. Barrada porque a regra de carga só aceita códigos numéricos.", with: ["codigo-1", "etiqueta-barrada"], hl: ["codigo-1"] },
  "codigo-2": { t: "ID_SEQ", d: "Nova sequência numérica criada para atender à regra de carga." },
  "codigo-3": { t: "CUI", d: "Código único por painel e fonte, desenvolvido por Natália Pires para o Painel de Escolas (31/07/2025).", pastas: P(PL.cui) },
  "anatomia-cui": { t: "Anatomia da CUI", d: "Sete dígitos: painel agregador (0 nenhum, 1 Planejamento, 2 Escolas), painel fonte (1 Insumos, 2 Resultados, 3 Contexto, 4 Financiamento), base fonte com dois dígitos (20 bases, de 01 Diagnóstico das Escolas a 20 PIB dos Municípios; 11 é o Censo Escolar) e indicador com três dígitos.", li: ["2111001: Painel de Escolas · Insumos · Censo Escolar · indicador 001"], pastas: P(PL.cui) },
  "nota-identificadores": { t: "Três identificadores convivendo", d: "O arquivo de Insumos carrega ID_ORIGEM, ID_SEQ e CUI, convertidos nos códigos de produção; a planilha ainda tem IDs como 6.1, 11.1 e 109.1. Adotar a CUI como chave única é a primeira recomendação (tela 24).", pastas: P(PL.cuboIns, PL.controle) },
};

// ---------- 21. Institucionalização ----------
slides[21] = {
  "estagio-0": { t: "Apoio à STIC", d: "Regras de cálculo repassadas aos engenheiros de dados; Resultados como piloto; reunião de repasse dos scripts em 09/02/2026.", pastas: P(PL.stic) },
  "estagio-1": { t: "Ambiente institucional", d: "Produção em máquinas da STIC, com o R conectado ao banco Oracle (DBeaver) por VPN desde março de 2026 (pedido em 03/03, liberação em 13/03 e máquina de 16 GB em 20/03).", pastas: P(PL.stic) },
  "estagio-2": { t: "Arquitetura medalhão", d: "Camadas bronze, prata e ouro; conversão de R para SQL com validação cruzada indicador a indicador, preservando as regras implícitas do R.", pastas: P(PL.stic) },
  "estagio-3": { t: "Segape", d: "Gestão dos dados do MEC: Data Lake, Plataforma EducaDados (anunciada em mar/2026) com fichas de qualificação e pedido formal de microdados ao Inep.", pastas: P(PL.segape, "Documentos/outros/EducaDados", "Documentos/outros/Acesso Dados SEGAPE") },
  "trilha": { t: "Estágio atual", d: "Inicial, com avanço expressivo nos últimos meses. Próximos passos: execução paralela de R e SQL, produção institucional e consultoria em apoio. Processo mapeado com o apoio de Andriênia Rênia Santos de Sousa (FGV).", with: ["trilha", "trilha-avanco", "marcador-hoje"], hl: ["trilha"] },
};

// ---------- 22 e 23. Gargalos ----------
slides[22] = {
  "ponto-0": { t: "Acesso aos microdados", d: "Os dados públicos não bastam; cada edição depende de STIC, Segape e Inep. Em 2026, do pedido de VPN (03/03) aos painéis (16/04) foram seis semanas. Sem ID_TURMA na base de matrículas, modalidades como a Bilíngue de Surdos não podem ser calculadas.", pastas: P("Documentos/outros/Acesso Dados SEGAPE", PL.segape), refs: [L.mic] },
  "ponto-1": { t: "Identificadores múltiplos", d: "ID_ORIGEM, ID_SEQ, CUI, ID do planejamento e ID derivado convivem. Dicionários divergem sobre os IDs 8, 9 e 10 de Resultados; a decisão está pendente com a DAGE.", pastas: P(PL.cui, "Dicionarios") },
  "ponto-2": { t: "Painéis e planejamento", d: "O de-para é mantido à mão; 88 IDs de Contexto sem produção e 15 sem de-para. O campo de meta do sistema aceita valores fora da escala do indicador.", pastas: P(PL.base, PL.escala) },
  "ponto-3": { t: "Fontes pré-calculadas", d: "PDDE: a base de dez/2025 não reproduz a série publicada e 18 de 35 indicadores saem com 99,8% das escolas em 1. Secadi: nomes de colunas mudam a cada divulgação.", pastas: P(PL.nt, "Insumos/00_Fontes_de_Dados") },
};
slides[23] = {
  "ponto-0": { t: "Volume do Painel de Escolas", d: "Arquivo de 10,8 GB e cadeia longa (4.0 a 4.3.x): qualquer correção exige reexecução completa. Mudanças na planilha do BI quebram o painel, como na carga de 23/09/2026.", pastas: P(PL.cuboEsc, PL.code + "/4_painel_escolas") },
  "ponto-1": { t: "Formatos heterogêneos", d: "O Contexto segue em tabelas por tela e a unificação em cubo foi interrompida; cada painel tem sua própria rotina de carga.", pastas: P(PL.ctx) },
  "ponto-2": { t: "Faróis e escalas", d: "Cortes calibrados numa distribuição valem para anos diferentes; indicadores da Secadi, e ETI e EPT no Painel de Escolas, seguem sem farol." },
  "ponto-3": { t: "Continuidade", d: "A produção ainda depende da consultoria; há duas cópias do código (OneDrive e Team Channel); a conversão para SQL precisa preservar regras implícitas do R.", pastas: P(PL.code, PL.stic) },
};

// ---------- 24. Recomendações ----------
slides[24] = {
  "recomendacao-0": { t: "1. CUI como chave única", d: "Adotar a CUI em painéis, planejamento e BI, com de-para oficial e versionado para o planejamento. Responde aos gargalos das telas 20 e 22.", pastas: P(PL.cui, PL.base) },
  "recomendacao-1": { t: "2. Calendário de acesso aos microdados", d: "Formalizar, via Segape, um calendário anual de acesso aos microdados do Censo e às variáveis adicionais junto ao Inep (por exemplo, ID_TURMA na base de matrículas).", pastas: P(PL.segape) },
  "recomendacao-2": { t: "3. Planejamento dirigido pela Estrutura Base", d: "Montar o cubo de planejamento só pela Estrutura Base, incluindo Contexto, sem imputar zero, e validar o intervalo das metas no sistema.", pastas: P(PL.base, PL.escala) },
  "recomendacao-3": { t: "4. Retomar a unificação em cubo", d: "Converter Contexto e Resultados em cubo, já no ambiente institucional.", pastas: P(PL.ctx, PL.res) },
  "recomendacao-4": { t: "5. Migração de R para SQL", d: "Migrar com baterias de validação cruzada e manter uma única cópia versionada do código.", pastas: P(PL.code, PL.stic) },
  "recomendacao-5": { t: "6. Pactuação com as áreas fornecedoras", d: "Pactuar com CGGE e Secadi layout, dicionário e conferência das bases antes de cada carga; controlar versões da planilha de controle.", pastas: P(PL.controle) },
};

// ---------- 25. Acervo ----------
const ac = (i, t, d, pastas) => [`acervo-${i}`, { t, d, with: [], hl: [], box: [0.6, 1.75 + i * 0.6, 8.7, 0.45], pastas: P(...pastas) }];
slides[25] = Object.fromEntries([
  ac(0, "Planilha de controle", "Lista, regra e situação de cada indicador.", [PL.controle]),
  ac(1, "Codificação", "Codificação Única de Indicadores (CUI) e guia do cubo de Escolas.", [PL.cui, PL.guiaEsc]),
  ac(2, "Planejamento", "Estrutura Base de Indicadores, cubo do sistema e ajuste de escala das metas.", [PL.base, PL.cuboPlan, PL.escala]),
  ac(3, "Códigos de produção", "Scripts em R por painel: 0_etl_dados, 1_painel_contexto, 2_painel_resultados, 3_painel_insumos, 4_dados_planejamento, 4_painel_escolas, 5_painel_priorizacao, 6_outras_demandas, 7_analise_indicadores e 8_validacoes.", [PL.code]),
  ac(4, "Notas Técnicas", "Versões das Notas Técnicas da Equipe de Dados.", [PL.nt, "Documentos/outros/Nota Técnica - Indicadores Insumos"]),
  ac(5, "Ofícios", "Demandas por ente e respostas padrão.", [PL.ofi]),
  ac(6, "Transição", "Scripts, dados e gravações do repasse à STIC e à Segape.", [PL.stic, PL.segape]),
  ac(7, "Relatórios técnicos", "Produtos 1 a 5 (OEI, 2025) e 1 a 6 (UNESCO, 2025 e 2026).", ["Documentos/6 - Produtos Consultorias/Victor G Alcantara - OEI", "Documentos/6 - Produtos Consultorias/Victor G Alcantara - UNESCO"]),
]);

const hints = {};
[2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].forEach(n => hints[n] = "Clique nos cartões para ver detalhes, referências e pastas");
hints[3] = "Clique em um cubo para ver os detalhes do marco";
hints[4] = "Clique em uma barra ou em um marco para ver os detalhes";

module.exports = { slides, hints, root: "MEC-Ministério da Educação" };
