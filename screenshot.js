const { chromium } = require('playwright');

async function takeScreenshots() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Light mode
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    // Dark mode
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.click('#darkModeToggle');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshot-dark.png', fullPage: true });

    await browser.close();
    console.log('Screenshots saved!');
}

takeScreenshots().catch(console.error);
