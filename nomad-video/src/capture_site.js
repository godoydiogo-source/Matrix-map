// Captura de tela do site projectnomad.us (Playwright/Chromium local) para o cartão da cena 3.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  try {
    await page.goto('https://projectnomad.us/', { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'assets/projectnomad_site.png' });
    console.log('captured', await page.title());
  } catch (e) { console.error('capture failed:', e.message); process.exit(1); }
  await browser.close();
})();
