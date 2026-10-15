/* Real Chromium review. Run: rtk proxy node scripts/qa-living-world.cjs [URL] */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
function browserModule() {
  try { return require('playwright'); } catch {
    const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx');
    for (const entry of fs.readdirSync(cache)) {
      const candidate = path.join(cache, entry, 'node_modules', 'playwright');
      if (fs.existsSync(path.join(candidate, 'package.json'))) return require(candidate);
    }
    throw new Error('Playwright is required for browser QA; no cached runtime found.');
  }
}
const base = process.argv[2] || 'http://localhost:3012';
const output = 'docs/visual-review/redesign';
const report = { base, timestamp: new Date().toISOString(), checks: [], viewports: [], consoleErrors: [], warnings: [], failedRequests: [], routes: [], performance: {} };
async function main() {
  fs.mkdirSync(output, { recursive: true });
  const { chromium } = browserModule();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const page = await context.newPage();
  page.on('pageerror', error => report.consoleErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') report.consoleErrors.push(message.text());
    if (message.type() === 'warning') report.warnings.push(message.text());
  });
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(base)) report.failedRequests.push({ url: response.url(), status: response.status() }); });
  async function check(name, action) {
    try { await action(); report.checks.push({ name, passed: true }); }
    catch (error) { report.checks.push({ name, passed: false, error: error.message }); }
  }
  async function ready() { await page.waitForSelector('html[data-mode]'); await page.locator('#hero h1').waitFor(); await page.evaluate(() => document.fonts.ready); }
  async function mode(value) {
    const current = await page.getAttribute('html', 'data-mode');
    if (current !== value) await page.locator('#mode-toggle-btn').click();
    await page.waitForSelector(`html[data-mode="${value}"]`);
  }
  await page.goto(base, { waitUntil: 'networkidle' });
  await ready();
  await page.waitForSelector('.world-companion--docked');
  await check('Single companion docks in hero', async () => {
    assert.equal(await page.locator('[aria-label="Pixel Hanif Companion"]').count(), 1);
    assert.equal(await page.locator('#hero-companion-anchor .world-companion').count(), 1);
  });
  await check('Companion follows when less than a quarter of hero remains visible', async () => {
    await page.locator('#hero').evaluate(element => window.scrollTo({ top: element.offsetTop + element.offsetHeight * .85, behavior: 'instant' }));
    await page.waitForSelector('.world-companion:not(.world-companion--docked)');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForSelector('.world-companion--docked');
  });
  await check('Native companion click and Escape dismissal', async () => {
    await page.locator('.world-companion-button').click();
    const bubble = page.getByRole('button', { name: /^Companion dialogue:/ });
    await bubble.waitFor(); await bubble.focus(); await page.keyboard.press('Escape');
    await bubble.waitFor({ state: 'detached' });
  });
  await check('Companion visibility persists after reload', async () => {
    await page.getByRole('button', { name: 'Toggle pixel companion visibility' }).first().click();
    assert.equal(await page.locator('.world-companion').count(), 0);
    await page.reload({ waitUntil: 'networkidle' }); await ready();
    assert.equal(await page.locator('.world-companion').count(), 0);
    await page.getByRole('button', { name: 'Toggle pixel companion visibility' }).first().click();
    await page.waitForSelector('.world-companion--docked');
  });
  const canonical = fs.readFileSync('src/data/projects.ts', 'utf8').split('export const GITHUB_EXPERIMENTS')[0];
  const repos = [...canonical.matchAll(/githubUrl:\s*"([^"]+)"/g)].map(match => match[1]);
  const slugs = [...canonical.matchAll(/slug:\s*"([^"]+)"/g)].map(match => match[1]);
  await check('Six prominent canonical repository links and case-study links', async () => {
    assert.ok(slugs.length > 0); assert.equal(repos.length, slugs.length);
    for (let i = 0; i < repos.length; i++) {
      const link = page.locator(`#projects a[href="${repos[i]}"]`).first();
      assert.equal(await link.count(), 1); assert.equal(await link.getAttribute('target'), '_blank');
      assert.match(await link.getAttribute('rel'), /noopener/);
      assert.ok(await page.locator(`#projects a[href="/projects/${slugs[i]}"]`).count() > 0);
    }
    assert.equal(await page.locator('#projects [class*="preview"]').count(), 0);
    assert.doesNotMatch(await page.locator('#projects').innerText(), /Screenshot Pending|CAPTURE PENDING|VIEWPORT/i);
  });
  await check('Five semester selections work with native keyboard controls', async () => {
    for (let i = 1; i <= 5; i++) {
      const button = page.locator(`#semester-step-${i} button`); await button.focus(); await page.keyboard.press('Enter');
      await page.waitForSelector(`#semester-step-${i} button[aria-current="step"]`);
      assert.equal(await button.getAttribute('aria-current'), 'step');
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      assert.ok(await page.locator(`#semester-panel-${i}`).isVisible());
    }
    assert.match(await page.locator('#semester-step-5').innerText(), /progress/i);
  });
  await check('Four trophy selections preserve aria-pressed and exact evidence', async () => {
    const buttons = page.locator('[id^="trophy-selector-"]'); assert.equal(await buttons.count(), 4);
    for (let i = 0; i < 4; i++) {
      await buttons.nth(i).focus(); await page.keyboard.press('Enter');
      assert.equal(await buttons.nth(i).getAttribute('aria-pressed'), 'true');
      assert.ok((await page.locator('#achievement-dossier').innerText()).length > 50);
    }
    const shelf = await page.locator('#trophies').innerText();
    for (const result of [/third place|3rd place/i, /top 10/i, /top 5/i, /grant recipient/i]) assert.match(shelf, result);
  });
  await check('Research filters change records and announce selection', async () => {
    const buttons = page.locator('#research [role="group"] button'); assert.equal(await buttons.count(), 4);
    for (let i = 0; i < 4; i++) {
      await buttons.nth(i).click(); assert.equal(await buttons.nth(i).getAttribute('aria-pressed'), 'true');
      assert.ok(await page.locator('#research-records article').count() > 0);
      assert.match(await page.locator('#research [role="status"]').innerText(), /record/);
    }
    await buttons.first().click();
  });
  await check('CV download is the unchanged two-page PDF', async () => {
    await page.locator('#hero').scrollIntoViewIfNeeded();
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#hero a[download]').click()]);
    assert.equal(download.suggestedFilename(), 'M-Hanif-Al-Faiz-CV.pdf');
    const file = await download.path();
    assert.equal(fs.statSync(file).size, fs.statSync('public/cv/M-Hanif-Al-Faiz-CV.pdf').size);
  });
  await check('Mode switching persists and recruiter hides scenery/companion', async () => {
    await mode('recruiter'); assert.equal(await page.locator('.world-companion').count(), 0);
    assert.equal(await page.locator('#hero .world-scene').count(), 0);
    assert.ok(await page.locator('#hero a[download]').isVisible());
    await page.reload({ waitUntil: 'networkidle' }); await ready();
    assert.equal(await page.getAttribute('html', 'data-mode'), 'recruiter'); await mode('pixel');
  });
  for (const value of ['pixel', 'recruiter']) {
    await mode(value);
    for (const width of [1440, 1280, 1024, 768, 430, 390, 375, 320]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      // Scroll through lazy content, then verify actual rendered images and layout.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 800) {
          window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(resolve => requestAnimationFrame(resolve));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForLoadState('networkidle');
      const geometry = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        heroTextArtOverlap: document.documentElement.dataset.mode === 'pixel' && innerWidth <= 768
          ? document.querySelector('.world-hero-copy').getBoundingClientRect().bottom > document.querySelector('#hero .world-scene').getBoundingClientRect().top + 1 : false,
        clippedControls: [...document.querySelectorAll('a,button,summary')].filter(element => {
          if (element.closest('.sr-only') || element.classList.contains('sr-only')) return false;
          const r = element.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
        }).map(element => element.textContent.trim().slice(0, 70)),
        brokenImages: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.src),
      }));
      report.viewports.push({ mode: value, ...geometry });
      if (width === 1440 || width === 390) {
        await page.screenshot({ path: `${output}/hero-${value}-${width}.png` });
        if (width === 1440 && value === 'pixel') for (const id of ['profile', 'about', 'interests', 'journey', 'trophies', 'projects', 'research', 'skills']) {
          await page.locator(`#${id}`).evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 80, behavior: 'instant' }));
          await page.screenshot({ path: `${output}/${id}-desktop.png` });
        }
        if (width === 390 && value === 'pixel') {
          await page.locator('#projects').evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 80, behavior: 'instant' }));
          await page.screenshot({ path: `${output}/projects-mobile.png` });
        }
      }
    }
  }
  await check('All 16 mode/viewport combinations have no overflow, clipped controls or broken images', async () => {
    for (const viewport of report.viewports) {
      assert.ok(viewport.scrollWidth <= viewport.width, JSON.stringify(viewport));
      assert.equal(viewport.clippedControls.length, 0, JSON.stringify(viewport));
      assert.equal(viewport.brokenImages.length, 0, JSON.stringify(viewport));
      assert.equal(viewport.heroTextArtOverlap, false, JSON.stringify(viewport));
    }
  });
  await check('Mobile navigation closes with Escape and returns focus', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    const opener = page.getByRole('button', { name: 'Open navigation menu' }); await opener.click();
    assert.equal(await page.locator('#mobile-navigation-menu').count(), 1);
    await page.keyboard.press('Escape'); assert.equal(await page.locator('#mobile-navigation-menu').count(), 0);
    assert.equal(await opener.evaluate(element => element === document.activeElement), true);
  });
  await check('Skip navigation has a real target and visible keyboard focus', async () => {
    await page.goto(base, { waitUntil: 'networkidle' }); await ready(); await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), '#main-content');
    await page.keyboard.press('Enter'); assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content');
  });
  await mode('pixel'); await page.emulateMedia({ reducedMotion: 'reduce' });
  await check('Reduced-motion scenery is static', async () => {
    assert.equal(await page.locator('.world-clouds').first().evaluate(element => getComputedStyle(element).animationName), 'none');
    assert.equal(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior), 'auto');
  });
  await page.screenshot({ path: `${output}/hero-reduced-motion.png` });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const slug of slugs) {
    const response = await page.goto(`${base}/projects/${slug}`, { waitUntil: 'networkidle' });
    report.routes.push({ path: `/projects/${slug}`, status: response.status(), h1: await page.locator('h1').innerText() });
    await check(`Case study ${slug} contains the canonical repository`, async () => {
      assert.equal(response.status(), 200); assert.ok(await page.locator(`a[href="${repos[slugs.indexOf(slug)]}"]`).count() > 0);
      assert.equal(await page.locator('[class*="preview"]').count(), 0);
      assert.equal(await page.getByRole('navigation', { name: 'Main Navigation', exact: true, includeHidden: true }).locator('a').first().getAttribute('href'), '/#hero');
    });
  }
  for (const route of ['/projects', '/journey']) {
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    report.routes.push({ path: route, status: response.status() });
  }
  for (const route of ['/dev', '/pet-test', '/asset-test']) {
    const response = await page.request.get(base + route); report.routes.push({ path: route, status: response.status() });
  }
  await page.goto(base, { waitUntil: 'networkidle' }); await ready();
  report.performance = await page.evaluate(() => ({
    navigation: performance.getEntriesByType('navigation').map(entry => ({ duration: entry.duration, domContentLoaded: entry.domContentLoadedEventEnd, transferSize: entry.transferSize })),
    images: performance.getEntriesByType('resource').filter(entry => /\/pixel\/|\/pet\//.test(entry.name)).map(entry => ({ url: entry.name, transferSize: entry.transferSize, duration: entry.duration })),
  }));
  const locked = JSON.parse(fs.readFileSync('docs/visual-review/locked-hashes-before.json', 'utf8'));
  await check('All canonical records, original photographs and CV locks remain byte-identical', async () => {
    for (const [file, expected] of Object.entries(locked)) assert.equal(require('node:crypto').createHash('sha256').update(fs.readFileSync(file)).digest('hex'), expected, file);
  });
  fs.writeFileSync('docs/visual-review/browser-results.json', JSON.stringify(report, null, 2) + '\n');
  await browser.close();
  console.log(JSON.stringify({ checks: report.checks, viewports: report.viewports, routes: report.routes, consoleErrors: [...new Set(report.consoleErrors)], warnings: [...new Set(report.warnings)], failedRequests: report.failedRequests }, null, 2));
  if (report.checks.some(check => !check.passed)) process.exitCode = 1;
}
main().catch(error => { console.error(error); fs.writeFileSync('docs/visual-review/browser-results.json', JSON.stringify(report, null, 2)); process.exitCode = 1; });
