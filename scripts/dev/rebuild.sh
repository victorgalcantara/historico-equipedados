#!/bin/bash
cd /tmp/claude-0/web && cp render.js conteudo.js interacao.tpl.html deck.json site/scripts/ && node site/scripts/render.js site/index.qmd >/dev/null && cd site && /tmp/claude-0/q/quarto-1.6.40/bin/quarto render --quiet 2>&1 | grep -i warn | head -3; cd .. && timeout 250 node shot.js $1 2>&1 | tail -1; python3 - <<'PY'
from PIL import Image
import glob,os
for i in range(1,26):
    f=f'/tmp/claude-0/web/shots/s{i:02d}.png'
    a=Image.open(f).convert('RGB')
    b=Image.open(sorted(glob.glob('/tmp/claude-0/web/ref/p-*.png'))[i-1]).convert('RGB').resize(a.size)
    c=Image.new('RGB',(a.width,a.height*2+10),'red'); c.paste(a,(0,0)); c.paste(b,(0,a.height+10)); c.save(f'/tmp/claude-0/web/cmp/c{i:02d}.png')
PY
