import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
const {chromium} = createRequire(import.meta.url)('playwright');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4178';
const browser = await chromium.launch({executablePath: process.env.CHROME_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true});
const page = await browser.newPage({viewport:{width:1440,height:1000}, reducedMotion:'reduce'});
const errors=[]; page.on('pageerror',err=>errors.push(err.message));
await mkdir('tmp/site-qa',{recursive:true});
try {
  for (const lang of ['ko','en']) {
    for (const cmd of ['who','projects','probe','owncanvas','agentcart','byokiyb','pdf']) {
      await page.goto(`${base}/?lang=${lang}&cmd=${cmd}`);
      await page.locator('#terminal-output[data-ready="true"]').waitFor();
      assert.equal(await page.locator('html').getAttribute('lang'),lang);
      const content=await page.locator('#terminal-output').innerText();
      assert.ok(!/AutoHRAnalytics|ParrotKit|AI-Fellowship-Demo/.test(content));
      if(cmd==='projects') for(const name of ['Junho Probe Plate','OwnCanvas','AgentCart','BYOKIYB']) assert.ok(content.includes(name));
    }
  }
  await page.goto(`${base}/?lang=ko&cmd=projects`);
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  await page.screenshot({path:'tmp/site-qa/terminal-desktop.png'});
  await page.getByRole('link',{name:'OwnCanvas 설계와 구현 보기'}).click();
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(new URL(page.url()).searchParams.get('cmd'),'owncanvas');
  await page.locator('#lang-toggle').click();
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  await page.locator('#command-bar').click();
  assert.equal(await page.locator('.palette-item').count(),7);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(new URL(page.url()).searchParams.get('cmd'),'agentcart');
  await page.goto(`${base}/docs/projects.html`);
  await page.locator('.case').nth(3).waitFor();
  assert.equal(await page.locator('.case').count(),4);
  await page.screenshot({path:'tmp/site-qa/cases-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${base}/?lang=ko&cmd=probe`);
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
  await page.screenshot({path:'tmp/site-qa/terminal-mobile.png'});
  await page.goto(`${base}/docs/projects.html`);
  await page.locator('.case').nth(3).waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
  await page.screenshot({path:'tmp/site-qa/cases-mobile.png',fullPage:true});
  const pdf=await page.request.get(`${base}/downloads/baek-junho-portfolio.pdf`);
  assert.equal(pdf.status(),200);
  assert.equal((await pdf.body()).subarray(0,5).toString(),'%PDF-');
  // Exercise actual animation and the skip control separately from reduced motion.
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(`${base}/?lang=ko&cmd=projects`);
  await page.locator('#skip-animation').click();
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.ok((await page.locator('#terminal-output').innerText()).includes('BYOKIYB'));
  assert.deepEqual(errors,[]);
  console.log('PASS: 14 localized routes, project navigation, palette keyboard, language toggle, mobile overflow, skip, PDF and no page errors.');
} finally { await browser.close(); }
