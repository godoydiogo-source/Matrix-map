// Renderiza os frames do overlay (PNG RGBA) com Playwright/Chromium a partir de src/overlay.html.
// Uso: node src/render_overlay.js [--frames 0,120,300 | --start N --end M] [--out dir] [--workers 3]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const TL = JSON.parse(fs.readFileSync(path.join(ROOT, 'build/timeline.json'), 'utf8'));
const outDir = path.resolve(ROOT, opt('--out', 'build/overlay'));
fs.mkdirSync(outDir, { recursive: true });
let frames;
if (opt('--frames')) frames = opt('--frames').split(',').map(Number);
else { const s = +opt('--start', 0), e = +opt('--end', TL.frames - 1); frames = []; for (let f = s; f <= e; f++) frames.push(f); }
const workers = +opt('--workers', 3);
const assets = { site: 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'assets/projectnomad_site.png')).toString('base64') };

(async () => {
  const browser = await chromium.launch();
  const pages = [];
  for (let w = 0; w < workers; w++) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
    page.on('pageerror', e => { console.error('page error:', e.message); process.exit(1); });
    await page.goto('file://' + path.join(ROOT, 'src/overlay.html'));
    const info = await page.evaluate(([tl, as]) => window.setup(tl, as), [TL, assets]);
    if (w === 0) console.log('setup:', JSON.stringify(info));
    pages.push(page);
  }
  const t0 = Date.now(); let done = 0;
  await Promise.all(pages.map(async (page, w) => {
    for (let i = w; i < frames.length; i += workers) {
      const f = frames[i];
      const dataUrl = await page.evaluate(f => window.renderFrame(f), f);
      fs.writeFileSync(path.join(outDir, `f${String(f).padStart(5, '0')}.png`), Buffer.from(dataUrl.split(',')[1], 'base64'));
      if (++done % 100 === 0) console.log(`${done}/${frames.length} frames, ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
  }));
  console.log(`done ${frames.length} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${outDir}`);
  await browser.close();
})();
