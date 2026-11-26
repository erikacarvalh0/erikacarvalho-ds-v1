const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true});
 try {
  const page = await browser.newPage({viewport:{width:800,height:600},deviceScaleFactor:1});
  await page.goto('http://localhost:4173');
  const button = page.getByRole('button',{name:'ECDS visual smoke'});
  await button.waitFor();
  await page.evaluate(() => document.fonts.ready);
  const first = await button.screenshot({animations:'disabled'});
  const second = await button.screenshot({animations:'disabled'});
  assert.ok(first.equals(second),'Unstable screenshot');
  await page.screenshot({path:'visual-smoke.png',animations:'disabled'});
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
