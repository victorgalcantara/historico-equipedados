const { chromium } = require("/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright");
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const pg = await b.newPage({ viewport: { width: 1334, height: 750 }, deviceScaleFactor: 1 });
  const errs = []; pg.on("pageerror", e => errs.push(e.message)); pg.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
  await pg.goto("file:///tmp/claude-0/web/site/docs/index.html");
  await pg.waitForFunction(() => window.Reveal && Reveal.isReady());
  await pg.evaluate(() => document.fonts.ready);
  const only = process.argv[2] ? process.argv[2].split(",").map(Number) : null;
  const n = await pg.evaluate(() => Reveal.getTotalSlides());
  for (let i = 0; i < n; i++) {
    if (only && !only.includes(i + 1)) continue;
    await pg.evaluate(i => Reveal.slide(i), i); await pg.waitForTimeout(450);
    await pg.screenshot({ path: `/tmp/claude-0/web/shots/s${String(i + 1).padStart(2, "0")}.png` });
  }
  console.log("slides", n, "errors", errs);
  await b.close();
})();
