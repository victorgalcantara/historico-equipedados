const { chromium } = require("/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright");
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const pg = await b.newPage({ viewport: { width: 1440, height: 810 } });
  const errs = []; pg.on("pageerror", e => errs.push(e.message));
  await pg.goto("file:///tmp/claude-0/web/site/docs/index.html#/2");
  await pg.waitForFunction(() => window.Reveal && Reveal.isReady()); await pg.waitForTimeout(600);
  const click = async (slide, key, out) => {
    await pg.keyboard.press("Escape"); await pg.evaluate(s => Reveal.slide(s - 1), slide); await pg.waitForTimeout(500);
    const h = pg.locator(`.present .pp-hit[data-key="${slide}|${key}"]`).first();
    await h.hover(); await pg.waitForTimeout(200);
    if (out.endsWith("hover")) { await pg.screenshot({ path: `shots/i_${out}.png` }); return; }
    await h.click(); await pg.waitForTimeout(300);
    await pg.screenshot({ path: `shots/i_${out}.png` });
  };
  await click(3, "marco-2", "s3_fev");
  await pg.keyboard.press("Escape"); await pg.waitForTimeout(200);
  const still = await pg.evaluate(() => [document.querySelectorAll(".pp-pop").length, Reveal.isOverview()]);
  console.log("after esc pops/overview", still);
  await click(4, "barra-3", "s4_bar");
  await click(4, "marco-0-0", "s4_dia");
  await click(4, "barra-9", "s4_hover");
  await click(9, "etapa-5", "s9");
  await click(25, "acervo-3", "s25");
  await click(2, "estatistica-0", "s2");
  // mobile-ish
  await pg.setViewportSize({ width: 800, height: 450 }); await pg.waitForTimeout(500);
  await click(3, "marco-9", "s3_small");
  console.log("errors", errs);
  await b.close();
})();
