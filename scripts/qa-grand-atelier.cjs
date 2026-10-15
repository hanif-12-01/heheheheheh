const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
function playwright() {
  try { return require('playwright'); } catch {
    const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx');
    for (const entry of fs.readdirSync(cache)) {
      const candidate = path.join(cache, entry, 'node_modules/playwright');
      if (fs.existsSync(path.join(candidate, 'package.json'))) return require(candidate);
    }
    throw Error('No cached Playwright runtime');
  }
}
const base = process.argv[2] || 'http://localhost:3012';
const out = 'docs/phase-4d3/after';
const report = { base, timestamp: new Date().toISOString(), checks: [], viewports: [], routes: [], errors: [], failedRequests: [], performance: [], unchangedCopy: {} };
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function main() {
  fs.mkdirSync(out, { recursive: true });
  const browser = await playwright().chromium.launch({ headless: true });
  report.browser = browser.version();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') report.errors.push(msg.text()); });
  page.on('requestfailed', req => { if (!req.failure()?.errorText.includes('ABORTED')) report.failedRequests.push({ url: req.url(), error: req.failure()?.errorText }); });
  async function check(name, fn) { try { await fn(); report.checks.push({ name, passed: true }); } catch(e) { report.checks.push({ name, passed: false, error: e.message }); } }
  async function ready() { await page.waitForSelector('html[data-mode][data-locale]'); await page.evaluate(() => document.fonts.ready); }
  async function locale(value) { await page.locator(`.language-switcher button[lang="${value}"]`).click(); await page.waitForSelector(`html[data-locale="${value}"]`); }
  async function mode(value) { if(await page.getAttribute('html','data-mode') !== value) await page.locator('#mode-toggle-btn').click(); await page.waitForSelector(`html[data-mode="${value}"]`); }
  async function copy() { return page.evaluate(() => {
    const values=[];
    for(const el of document.querySelectorAll('body *:not(script):not(style)')) {
      if(!el.getClientRects().length) continue;
      for(const n of el.childNodes) if(n.nodeType===3 && n.textContent.trim().length>1) values.push(n.textContent.trim().replace(/\s+/g,' '));
      for(const a of ['alt','aria-label','title']) if(el.getAttribute(a)) values.push(el.getAttribute(a));
    }
    return [...new Set(values)];
  }); }
  await page.goto(base,{waitUntil:'networkidle'}); await ready();
  await check('English and Pixel are clean-session defaults',async()=> { assert.equal(await page.getAttribute('html','lang'),'en'); assert.equal(await page.getAttribute('html','data-mode'),'pixel'); });
  await check('Language switch preserves anchor and scroll',async()=> {
    await page.evaluate(()=>{history.replaceState(null,'','#journey');window.scrollTo({top:700,behavior:'instant'});});
    const before=await page.evaluate(()=>({url:location.href,y:scrollY}));
    // Native pointer at the visible sticky control. Locator.click's scrollIntoView
    // moves Chromium's sticky ancestor BEFORE its click event (not a locale change).
    const bounds=await page.locator('.language-switcher button[lang="id"]').boundingBox();
    await page.mouse.click(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.waitForSelector('html[data-locale="id"]');
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    report.scrollPreservation={before,after:await page.evaluate(()=>({url:location.href,y:scrollY}))};
    assert.equal(await page.evaluate(()=>location.href),before.url); assert.ok(Math.abs(await page.evaluate(()=>scrollY)-before.y)<2);
    assert.equal(await page.getAttribute('html','lang'),'id');
  });
  await check('Mode/locale independently persist through refresh',async()=> { await mode('recruiter'); assert.equal(await page.getAttribute('html','lang'),'id'); await page.reload({waitUntil:'networkidle'}); await ready(); assert.equal(await page.getAttribute('html','data-locale'),'id'); assert.equal(await page.getAttribute('html','data-mode'),'recruiter'); await locale('en'); assert.equal(await page.getAttribute('html','data-mode'),'recruiter'); });
  const source=fs.readFileSync('src/data/projects.ts','utf8').split('export const GITHUB_EXPERIMENTS')[0];
  const slugs=[...source.matchAll(/slug:\s*"([^"]+)"/g)].map(x=>x[1]);
  const repos=[...source.matchAll(/githubUrl:\s*"([^"]+)"/g)].map(x=>x[1]);
  for(const m of ['pixel','recruiter']) {
    await mode(m); await locale('en'); const en=await copy(); await locale('id'); const id=await copy();
    report.unchangedCopy[`home-${m}`]=en.filter(x=>id.includes(x));
    for(const l of ['en','id']) {
      await locale(l);
      await check(`${m}/${l}: five semesters, four achievement records, research filters`,async()=> {
        if(m==='pixel') {
          for(let i=1;i<=5;i++) {const b=page.locator(`#semester-selector-${i}`);await b.focus();await page.keyboard.press('Enter');assert.equal(await b.getAttribute('aria-pressed'),'true');assert.ok(await page.locator(`#semester-panel-${i}`).isVisible());}
        } else {
          const buttons=page.locator('#journey nav button');assert.equal(await buttons.count(),5);for(let i=0;i<5;i++){await buttons.nth(i).click();assert.equal(await buttons.nth(i).getAttribute('aria-current'),'step');}
        }
        const trophies=page.locator('[id^="trophy-selector-"]');assert.equal(await trophies.count(),4);for(let i=0;i<4;i++){await trophies.nth(i).focus();await page.keyboard.press('Enter');assert.equal(await trophies.nth(i).getAttribute('aria-pressed'),'true');}
        const filters=page.locator('#research [role="group"] button');assert.equal(await filters.count(),4);for(let i=0;i<4;i++){await filters.nth(i).click();assert.equal(await filters.nth(i).getAttribute('aria-pressed'),'true');}await filters.first().click();
      });
      await check(`${m}/${l}: all CV entry points and actual download`,async()=> {
        const links=page.locator('a[download]');assert.ok(await links.count()>=3);
        for(let i=0;i<await links.count();i++) assert.equal(await links.nth(i).getAttribute('href'),`/cv/M-Hanif-Al-Faiz-CV-${l.toUpperCase()}.pdf`);
        const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#hero a[download]').click()]);
        assert.equal(download.suggestedFilename(),`M-Hanif-Al-Faiz-CV-${l.toUpperCase()}.pdf`);
        assert.equal(hash(fs.readFileSync(await download.path())),hash(fs.readFileSync(`public/cv/${download.suggestedFilename()}`)));
        const prints=page.locator(`a[href="/cv/print-${l.toUpperCase()}.html"]`);assert.ok(await prints.count()>=3);
        const [printPage]=await Promise.all([context.waitForEvent('page'),page.locator(`#hero a[href="/cv/print-${l.toUpperCase()}.html"]`).click()]);await printPage.waitForLoadState('networkidle');assert.equal(await printPage.getAttribute('html','lang'),l);assert.ok((await printPage.locator('body').innerText()).length>5000);await printPage.close();
      });
      await check(`${m}/${l}: navigation, Hero CTA and contact destinations`,async()=>{
        await page.setViewportSize({width:1440,height:900});
        for(const href of await page.locator('header nav a').evaluateAll(els=>els.map(e=>e.getAttribute('href')))){const id=href.split('#')[1];if(id)assert.equal(await page.locator(`[id="${id}"]`).count(),1);}
        await page.locator('#hero a[href="#projects"]').click();assert.equal(new URL(page.url()).hash,'#projects');
        for(const href of ['https://github.com/hanif-12-01','https://www.linkedin.com/in/hanif-faiz-05b36b31a','https://www.instagram.com/a.nippp__05','mailto:mhanifalfaiz@student.telkomuniversity.ac.id'])assert.ok(await page.locator(`#contact a[href="${href}"]`).count()>0);
        assert.equal(await page.locator('a[href="#"]').count(),0);
      });
      await check(`${m}/${l}: current verified repos, no screenshot placeholders`,async()=> {
        assert.ok(slugs.length>0);assert.equal(slugs.length,repos.length);for(let i=0;i<slugs.length;i++){assert.ok(await page.locator(`#projects a[href="${repos[i]}"]`).count()>0);assert.ok(await page.locator(`#projects a[href="/projects/${slugs[i]}"]`).count()>0);}
        assert.equal(await page.locator('#projects [class*="preview"]').count(),0);
      });
      for(const width of [1440,1280,1024,768,430,390,375,320]) {
        await page.setViewportSize({width,height:width<768?844:900});
        await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>requestAnimationFrame(r));}window.scrollTo({top:0,behavior:'instant'});});
        await page.waitForLoadState('networkidle');
        const geometry=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),clipped:[...document.querySelectorAll('a,button,summary')].filter(e=>!e.closest('.sr-only')&&!e.classList.contains('sr-only')).filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left < -1||r.right>innerWidth+1);}).map(e=>e.textContent.trim().slice(0,100))}));
        report.viewports.push({mode:m,locale:l,...geometry});
        if(width===1440||width===390) {
          await page.screenshot({path:`${out}/hero-${m}-${l}-${width}.png`});
          for(const section of ['profile','about','interests','journey','trophies','projects','research','skills','contact']){await page.locator(`#${section}`).evaluate(e=>window.scrollTo({top:e.getBoundingClientRect().top+scrollY-80,behavior:'instant'}));await page.screenshot({path:`${out}/${section}-${m}-${l}-${width}.png`});}
        }
      }
    }
  }
  await check('All 32 mode/locale/viewport layouts fit and load images',async()=>{for(const v of report.viewports){assert.ok(v.scrollWidth<=v.width,JSON.stringify(v));assert.equal(v.clipped.length,0,JSON.stringify(v));assert.equal(v.brokenImages.length,0,JSON.stringify(v));}});
  await page.setViewportSize({width:390,height:844});await locale('id');await mode('pixel');
  await check('Mobile menu Escape returns focus and anchor closes menu',async()=>{const opener=page.getByRole('button',{name:'Buka menu navigasi'});await opener.click();await page.keyboard.press('Escape');assert.equal(await opener.evaluate(e=>document.activeElement===e),true);await opener.click();await page.locator('#mobile-navigation-menu a[href="#projects"]').click();assert.equal(await page.locator('#mobile-navigation-menu').count(),0);});
  await check('Open pet dialogue translates without replay; Escape and visibility',async()=>{
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.locator('.world-companion-button').click();
    const before=await page.locator('.world-companion-button').getAttribute('title');await locale('en');assert.match(await page.locator('.world-companion-button').getAttribute('title'),new RegExp(`${before.match(/(\d+) klik/)[1]} clicks`));
    const bubble=page.getByRole('button',{name:/^Companion dialogue:/});await bubble.focus();await page.keyboard.press('Escape');assert.equal(await bubble.count(),0);
    await page.setViewportSize({width:1440,height:900});await page.getByRole('button',{name:'Toggle pixel companion visibility'}).first().click();assert.equal(await page.locator('.world-companion').count(),0);await page.reload({waitUntil:'networkidle'});await ready();assert.equal(await page.locator('.world-companion').count(),0);await page.getByRole('button',{name:'Toggle pixel companion visibility'}).first().click();
  });
  await check('Keyboard skip link targets main and visible focus',async()=>{await page.goto(base,{waitUntil:'networkidle'});await ready();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'#main-content');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');});
  await check('Reduced motion stops scenery/clouds and smooth scrolling',async()=>{await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.world-clouds').first().evaluate(e=>getComputedStyle(e).animationName),'none');assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior),'auto');});
  for(const slug of slugs)for(const m of ['pixel','recruiter']) {
    const r=await page.goto(`${base}/projects/${slug}`,{waitUntil:'networkidle'});await ready();await mode(m);await locale('en');const en=await copy();const url=page.url();await locale('id');const id=await copy();report.unchangedCopy[`${slug}-${m}`]=en.filter(x=>id.includes(x));
    await check(`Case ${slug}/${m}: URL preserved, title/repo/prose localized`,async()=>{assert.equal(r.status(),200);assert.equal(page.url(),url);assert.ok(await page.locator(`a[href="${repos[slugs.indexOf(slug)]}"]`).count()>0);assert.equal(await page.getAttribute('html','lang'),'id');assert.ok(id.some(x=>!en.includes(x)));});
    report.routes.push({path:`/projects/${slug}`,mode:m,status:r.status()});
  }
  for(const route of ['/projects','/journey']){const r=await page.goto(base+route,{waitUntil:'networkidle'});await ready();await locale('en');const en=await copy();await locale('id');const id=await copy();report.unchangedCopy[route]=en.filter(x=>id.includes(x));report.routes.push({path:route,status:r.status()});}
  await check('History navigation retains locale',async()=>{await page.goto(base+'/projects',{waitUntil:'networkidle'});await page.goto(base+'/journey',{waitUntil:'networkidle'});await page.goBack({waitUntil:'networkidle'});assert.equal(new URL(page.url()).pathname,'/projects');assert.equal(await page.getAttribute('html','lang'),'id');await page.goForward({waitUntil:'networkidle'});assert.equal(new URL(page.url()).pathname,'/journey');});
  for(const route of ['/dev','/pet-test','/asset-test','/projects/nonexistent']){const r=await page.request.get(base+route);report.routes.push({path:route,status:r.status()});assert.equal(r.status(),404);}
  await check('Denied localStorage still permits locale/mode/companion changes',async()=>{
    const c=await browser.newContext({viewport:{width:1440,height:900}});await c.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError');}});});const p=await c.newPage();await p.goto(base,{waitUntil:'networkidle'});await p.locator('.language-switcher button[lang="id"]').click();await p.locator('#mode-toggle-btn').click();assert.equal(await p.getAttribute('html','lang'),'id');assert.equal(await p.getAttribute('html','data-mode'),'recruiter');await p.locator('#mode-toggle-btn').click();await p.getByRole('button',{name:'Tampilkan atau sembunyikan pendamping Pixel Hanif'}).first().click();assert.equal(await p.locator('.world-companion').count(),0);await c.close();
  });
  for(const m of ['pixel','recruiter'])for(const width of [1440,390])for(const l of ['en','id']) {
    const c=await browser.newContext({viewport:{width,height:900}});await c.addInitScript(({locale,mode})=>{localStorage.setItem('hanif_portfolio_mode',mode);localStorage.setItem('hanif_portfolio_locale',locale);window.qaMetrics={lcp:0,cls:0};new PerformanceObserver(list=>{for(const e of list.getEntries())window.qaMetrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qaMetrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});},{locale:l,mode:m});const p=await c.newPage();await p.goto(base,{waitUntil:'networkidle'});await p.waitForTimeout(1800);report.performance.push({mode:m,width,locale:l,coldCache:true,throttling:'none',...(await p.evaluate(()=>({...window.qaMetrics,images:performance.getEntriesByType('resource').filter(e=>/\/pixel\/|\/pet\//.test(e.name)).map(e=>({url:e.name,transferSize:e.transferSize,duration:e.duration}))})))});await c.close();
  }
  await check('Canonical facts and photographs preserved except approved PKM correction',async()=>{
    const locked=JSON.parse(fs.readFileSync('docs/phase-4d2/locked-hashes-before.json','utf8'));for(const [file,digest]of Object.entries(locked))if(!file.endsWith('researchCompetitions.ts'))assert.equal(hash(fs.readFileSync(file)),digest,file);
    const research=fs.readFileSync('src/data/researchCompetitions.ts','utf8');assert.ok(research.includes('Contributed to two faculty-supported PKM initiatives through proposal development and technical prototyping.'));assert.ok(!research.includes('Co-authored two formal scientific project proposals for national review.'));
    assert.equal(hash(research.replace('Contributed to two faculty-supported PKM initiatives through proposal development and technical prototyping.','Co-authored two formal scientific project proposals for national review.')),locked['src/data/researchCompetitions.ts']);
  });
  await check('Phase 4D.3 protected data, photographs, Harvard PDFs and generator unchanged',async()=>{
    const locked=JSON.parse(fs.readFileSync('docs/phase-4d3/baseline-hashes.json','utf8'));
    for(const [file,digest]of Object.entries(locked))if(file.startsWith('src/data/')||file.startsWith('public/cv/')||file==='docs/CONTENT_INTEGRITY.md'||file.endsWith('.jpeg')||['scripts/generate-cv.js','scripts/audit-cv.js','scripts/cv-template.js','scripts/cv-localization.js','scripts/cv-runtime.js'].includes(file))assert.equal(hash(fs.readFileSync(file)),digest,file);
  });
  await check('No console/runtime/network errors',async()=>{assert.equal(report.errors.length,0,JSON.stringify(report.errors));assert.equal(report.failedRequests.length,0,JSON.stringify(report.failedRequests));});
  await browser.close();fs.writeFileSync('docs/phase-4d3/browser-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify({browser:report.browser,checks:report.checks,viewports:report.viewports.filter(v=>v.scrollWidth>v.width||v.clipped.length||v.brokenImages.length),errors:report.errors},null,2));if(report.checks.some(c=>!c.passed))process.exitCode=1;
}
main().catch(e=>{console.error(e);fs.writeFileSync('docs/phase-4d3/browser-results.json',JSON.stringify(report,null,2));process.exitCode=1;});
