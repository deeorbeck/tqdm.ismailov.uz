const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({ width: 1920, height: 1080 });

  // Load the page
  await page.goto('file:///var/www/tqdm.ismailov.uz/index.html', {
    waitUntil: 'networkidle0'
  });

  // Take screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  // Take dark mode screenshot
  await page.evaluate(() => {
    document.body.classList.add('dark-mode');
  });
  await page.screenshot({ path: 'screenshot-dark.png', fullPage: true });

  await browser.close();

  console.log('Screenshots saved: screenshot.png, screenshot-dark.png');
})();
