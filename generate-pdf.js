const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const htmlPath = path.resolve(__dirname, 'index.html');
  const outPath = path.resolve(__dirname, '..', 'Kinzal Brochure 2026.pdf');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for fonts and custom elements
  await page.waitForFunction(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1500));

  await page.pdf({
    path: outPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('PDF generado:', outPath);
})();
