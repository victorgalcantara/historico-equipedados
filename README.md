# Novo PAR · Histórico da construção dos cubos de dados

Apresentação web (Quarto + reveal.js) sobre a construção dos cubos de dados dos painéis da Etapa de Diagnóstico do Novo PAR, de dezembro de 2024 a outubro de 2026. Reproduz as 25 telas da versão em PowerPoint com a mesma geometria e acrescenta interatividade.

**Autor:** Victor Gabriel Alcantara, consultor da Equipe de Dados do Novo PAR (SEB/MEC).

## Como usar

- Abra `docs/index.html` em qualquer navegador; o arquivo é autocontido (fontes, imagens e scripts embutidos).
- Navegação: setas do teclado, barra de espaço ou os controles no canto inferior direito. `F` abre em tela cheia; `S` abre as notas do apresentador.
- Interatividade: passe o mouse sobre um cubo, barra ou cartão para ver o resumo; clique para abrir o painel de detalhes, com descrição, datas, referências online e pastas no repositório do projeto. O elemento selecionado fica em amarelo. Clique de novo, clique fora ou pressione `Esc` para fechar.
- A sequência começa com a capa, seguida pelas telas originais 6 (equipe), 7 (interlocutores) e 5 (o que encontramos em 2024). Depois vêm as demais telas na ordem original.
- A linha do tempo (tela original 3) e o cronograma de processos (tela original 4, agora tela 7) são as figuras interativas principais; as demais telas têm cartões clicáveis.
- No cronograma, clique em **Ampliar período** e mova o controle **Transitar no tempo** para percorrer o eixo horizontal. Arraste a borda inferior com o símbolo ↕ para aumentar a altura da figura. **Visão geral** restaura o enquadramento inicial.

## Publicação no GitHub Pages

1. Crie um repositório público e envie o conteúdo desta pasta.
2. Em *Settings > Pages*, escolha *Deploy from a branch*, ramo `main`, pasta `/docs`.
3. A apresentação ficará em `https://<usuario>.github.io/<repositorio>/`.

## Estrutura

```
_quarto.yml               projeto Quarto (saída em docs/)
index.qmd                 telas em HTML de geometria fixa (gerado por scripts/render.js)
assets/novopar.css        estilos, fontes e interação visual
assets/interacao.html     script dos popups, com o conteúdo embutido (gerado)
assets/fonts/             Carlito, Caladea e Liberation Mono (SIL OFL), métricas compatíveis com Calibri, Cambria e Courier New
assets/brasao.png         Brasão da República
scripts/deck.json         registro do layout do deck (posições em polegadas)
scripts/ajustes.js         alterações da versão web: equipe, interlocutores e posição da nota do cronograma
scripts/conteudo.js       textos dos popups: descrição, referências e pastas
scripts/render.js         converte deck.json + conteudo.js em index.qmd e assets/interacao.html
docs/index.html           apresentação renderizada (publicada no GitHub Pages)
```

## Como atualizar

```bash
node scripts/render.js index.qmd   # regenera index.qmd e assets/interacao.html
quarto render                      # gera docs/index.html
```

Para alterar o texto de um popup, edite `scripts/conteudo.js`. As chaves correspondem aos nomes dos objetos de cada tela original. Os ajustes posteriores da versão web estão em `scripts/ajustes.js`; a ordem de exibição está em `scripts/render.js`.

## Observações

- Em respeito ao período de defeso eleitoral, a apresentação usa apenas o Brasão da República, sem logomarcas de governo.
- Os caminhos de pastas indicados nos popups referem-se ao repositório interno do projeto (`MEC-Ministério da Educação\Team Channel - Painel PAR5`), acessível apenas à equipe; o botão *Copiar* copia o caminho completo.
