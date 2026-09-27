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
    for (const cmd of ['who','projects','dundun','parrotkit','cofathon','lineage']) {
      await page.goto(`${base}/?lang=${lang}&cmd=${cmd}`);
      await page.locator('#terminal-output[data-ready="true"]').waitFor();
      assert.equal(await page.locator('html').getAttribute('lang'),lang);
      const content=await page.locator('#terminal-output').innerText();
      assert.ok(!/AutoHRAnalytics|AI-Fellowship-Demo|Download portfolio PDF|포트폴리오 PDF 다운로드/.test(content));
      if(cmd==='projects') for(const name of ['든든AI','ParrotKit','OLIVE BETTER','SKT AI Fellowship']) assert.ok(content.includes(name));
    }
  }
  await page.goto(`${base}/?lang=ko&cmd=projects`);
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  await page.screenshot({path:'tmp/site-qa/terminal-desktop.png'});
  await page.getByRole('link',{name:'ParrotKit 설계와 구현 보기'}).click();
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(new URL(page.url()).searchParams.get('cmd'),'parrotkit');
  await page.locator('#lang-toggle').click();
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  await page.locator('#command-bar').click();
  assert.equal(await page.locator('.palette-item').count(),6);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(new URL(page.url()).searchParams.get('cmd'),'cofathon');
  await page.goto(`${base}/docs/projects.html`);
  await page.locator('.case').nth(3).waitFor();
  assert.equal(await page.locator('.case').count(),4);
  await page.screenshot({path:'tmp/site-qa/cases-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${base}/?lang=ko&cmd=cofathon`);
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
  await page.screenshot({path:'tmp/site-qa/terminal-mobile.png'});
  await page.goto(`${base}/docs/projects.html`);
  await page.locator('.case').nth(3).waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
  await page.screenshot({path:'tmp/site-qa/cases-mobile.png',fullPage:true});
  for (const path of ['/', '/docs/projects.html', '/docs/profile.html']) {
    await page.goto(base + path);
    assert.equal(await page.locator('a[href$=".pdf"]').count(), 0);
  }
  const removedDownload=await page.request.get(`${base}/downloads/baek-junho-portfolio.pdf`);
  assert.equal(removedDownload.status(),404);
  // Exercise actual animation and the skip control separately from reduced motion.
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(`${base}/?lang=ko&cmd=projects`);
  await page.locator('#skip-animation').click();
  await page.locator('#terminal-output[data-ready="true"]').waitFor();
  assert.ok((await page.locator('#terminal-output').innerText()).includes('ParrotKit'));
  assert.deepEqual(errors,[]);
  console.log('PASS: 12 localized routes, project navigation, palette keyboard, language toggle, mobile overflow, skip, removed download and no page errors.');
} finally { await browser.close(); }
