const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

// Standalone local browser evidence. Does not mutate application source/data.
const base = process.argv.find(a => /^https?:/.test(a)) || 'http://localhost:3012';
const baselineOnly = process.argv.includes('--baseline');
const output = 'docs/atelier-expansion';
const sections = ['profile','about','interests','journey','trophies','projects','research','skills','contact'];
const widths = [1440,1280,1024,768,430,390,375,320];
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const report = { base, timestamp: new Date().toISOString(), baselineOnly, checks: [], viewports: [], routes: [], errors: [], failedRequests: [], httpErrors: [], performance: [] };
function playwright() {
  try { return require('playwright'); } catch {
    const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx');
    for (const item of fs.readdirSync(cache)) {
      const candidate = path.join(cache,item,'node_modules/playwright');
      if (fs.existsSync(path.join(candidate,'package.json'))) return require(candidate);
    }
    throw Error('No installed or cached Playwright runtime');
  }
}
function files(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(`${dir}/${e.name}`):[`${dir}/${e.name}`]) : [];
}
function protectedFiles() {
  return [...new Set([
    ...files('src/data'),
    'src/components/atelier/AtelierHero.tsx',
    'public/profile/hanif-portrait.jpeg',
    'public/Foto Profil hanif.jpeg',
    'public/profile/hanif-portrait-pixel.webp',
    ...files('public/cv'),
    ...files('public/pixel'),
    ...files('public/pet'),
    ...files('src/styles').filter(f=>f.endsWith('.css')&&!f.endsWith('/atelier.css')),
    'docs/CONTENT_INTEGRITY.md',
    'scripts/generate-cv.js','scripts/audit-cv.js','scripts/cv-template.js','scripts/cv-localization.js','scripts/cv-runtime.js',
  ])].filter(f=>fs.existsSync(f));
}
async function createReview(browser,width) {
  const pairs=[['profile','Academic gallery / Galeri akademik'],['trophies','Honors hall / Galeri prestasi'],['research','Research observatory / Observatorium riset']];
  const mobile=width===390;
  const rows=pairs.map(([section,label])=>`<section><h2>${label}</h2><div class="pair">${['before','after'].map(stage=>`<figure><figcaption>${stage==='before'?'BEFORE / SEBELUM':'AFTER / SESUDAH'}</figcaption><img src="data:image/png;base64,${fs.readFileSync(`${output}/${stage}/${section}-recruiter-id-${width}.png`).toString('base64')}" alt="${stage} ${section}" /></figure>`).join('')}</div></section>`).join('');
  const page=await browser.newPage({viewport:{width:width*2+80,height:900},deviceScaleFactor:1});
  await page.setContent(`<html lang="en"><head><style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#0B1020;color:#F1F5F9;font-family:Arial,sans-serif}h1{font-size:${mobile?27:40}px;font-weight:400;margin:0 0 8px}p{font-size:${mobile?16:22}px;color:#94A3B8;margin:0 0 32px}section{margin-top:32px}h2{font-size:${mobile?24:32}px;font-weight:400;margin:0 0 20px;color:#5DE4C7}.pair{display:grid;grid-template-columns:repeat(2,${width}px);gap:24px}figure{margin:0}figcaption{font-size:${mobile?16:24}px;letter-spacing:.12em;color:#FFD166;margin-bottom:16px}img{display:block;width:${width}px;height:auto;border:1px solid #26324D}</style></head><body><h1>HANIF.EXE — Professional architectural expansion</h1><p>Indonesian · ${width}px viewport · unchanged Hero, portrait, CVs and factual data</p>${rows}</body></html>`);
  await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
  await page.screenshot({path:`${output}/${mobile?'review-mobile':'review'}.png`,fullPage:true});await page.close();
}
async function compareHeroes() {
  const sharp=require('sharp');const comparisons=[];
  for(const width of [1440,390])for(const locale of ['en','id']){
    const beforePath=`${output}/before/hero-recruiter-${locale}-${width}.png`;const afterPath=`${output}/after/hero-recruiter-${locale}-${width}.png`;
    const a=await sharp(beforePath).ensureAlpha().raw().toBuffer({resolveWithObject:true});const b=await sharp(afterPath).ensureAlpha().raw().toBuffer({resolveWithObject:true});assert.deepEqual(a.info,b.info);let changedPixels=0,heroChangedPixels=0;const bounds={left:width,top:a.info.height,right:0,bottom:0};
    for(let i=0;i<a.data.length;i+=4)if(a.data[i]!==b.data[i]||a.data[i+1]!==b.data[i+1]||a.data[i+2]!==b.data[i+2]||a.data[i+3]!==b.data[i+3]){const pixel=i/4;const x=pixel%width;const y=Math.floor(pixel/width);changedPixels++;if(y>=65)heroChangedPixels++;bounds.left=Math.min(bounds.left,x);bounds.top=Math.min(bounds.top,y);bounds.right=Math.max(bounds.right,x);bounds.bottom=Math.max(bounds.bottom,y);}
    comparisons.push({width,locale,changedPixels,heroChangedPixels,changedBounds:changedPixels?bounds:null,note:'Hero pixel comparison excludes the 65px navigation; hover/focus may differ between screenshots.'});
  }
  fs.writeFileSync(`${output}/hero-preservation.json`,JSON.stringify(comparisons,null,2));return comparisons;
}
async function main() {
  fs.mkdirSync(`${output}/${baselineOnly?'before':'after'}`,{recursive:true});
  if(process.argv.includes('--hero-check')){console.log(JSON.stringify(await compareHeroes(),null,2));return;}
  if(process.argv.includes('--review')){const browser=await playwright().chromium.launch({headless:true});await createReview(browser,1440);await createReview(browser,390);await browser.close();console.log('Created review.png and review-mobile.png from actual browser screenshots');return;}
  if(baselineOnly) fs.writeFileSync(`${output}/baseline-hashes.json`,JSON.stringify(Object.fromEntries(protectedFiles().map(f=>[f,digest(fs.readFileSync(f))])),null,2));
  const browser=await playwright().chromium.launch({headless:true});report.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
  if(baselineOnly) await context.addInitScript(()=>{localStorage.setItem('hanif_portfolio_mode','recruiter');localStorage.setItem('hanif_portfolio_locale','en');});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  page.on('requestfailed',r=>{if(!r.failure()?.errorText.includes('ABORTED'))report.failedRequests.push({url:r.url(),error:r.failure()?.errorText});});
  page.on('response',r=>{if(r.status()>=400&&!r.url().includes('/projects/nonexistent'))report.httpErrors.push({url:r.url(),status:r.status()});});
  async function check(name,fn){try{await fn();report.checks.push({name,passed:true});}catch(e){report.checks.push({name,passed:false,error:e.message});}}
  async function ready(){await page.waitForSelector('html[data-mode][data-locale]');await page.evaluate(()=>document.fonts.ready);}
  async function locale(l){await page.locator(`.language-switcher button[lang="${l}"]`).click();await page.waitForSelector(`html[data-locale="${l}"]`);}
  async function mode(m){if(await page.getAttribute('html','data-mode')!==m)await page.locator('#mode-toggle-btn').click();await page.waitForSelector(`html[data-mode="${m}"]`);}
  async function settle(){await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>requestAnimationFrame(r));}window.scrollTo({top:0,behavior:'instant'});});await page.waitForLoadState('networkidle');}
  async function screenshots(m,l,w,folder){await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`${output}/${folder}/hero-${m}-${l}-${w}.png`});for(const section of sections){await page.locator(`#${section}`).evaluate(e=>window.scrollTo({top:e.getBoundingClientRect().top+scrollY-80,behavior:'instant'}));await page.screenshot({path:`${output}/${folder}/${section}-${m}-${l}-${w}.png`});}}
  await page.goto(base,{waitUntil:'networkidle'});await ready();
  if(baselineOnly){
    await mode('recruiter');
    for(const l of ['en','id']){await locale(l);for(const width of [1440,390]){await page.setViewportSize({width,height:width===390?844:900});await settle();await screenshots('recruiter',l,width,'before');}}
    report.screenshots=40;report.protectedFiles=Object.keys(JSON.parse(fs.readFileSync(`${output}/baseline-hashes.json`))).length;
    fs.writeFileSync(`${output}/baseline-browser.json`,JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify({baselineCaptured:true,screenshots:40,protectedFiles:report.protectedFiles,errors:report.errors},null,2));return;
  }
  await check('Clean session defaults to English Pixel Mode',async()=>{assert.equal(await page.getAttribute('html','lang'),'en');assert.equal(await page.getAttribute('html','data-mode'),'pixel');});
  await check('Language changes preserve current anchor and scroll',async()=>{
    await page.evaluate(()=>{history.replaceState(null,'','#journey');window.scrollTo({top:700,behavior:'instant'});});const before=await page.evaluate(()=>({url:location.href,y:scrollY}));const bounds=await page.locator('.language-switcher button[lang="id"]').boundingBox();await page.mouse.click(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.waitForSelector('html[data-locale="id"]');await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));const after=await page.evaluate(()=>({url:location.href,y:scrollY}));report.scrollPreservation={before,after};assert.equal(after.url,before.url);assert.ok(Math.abs(after.y-before.y)<2);
  });
  await check('Mode and locale persist independently through refresh',async()=>{await mode('recruiter');assert.equal(await page.getAttribute('html','lang'),'id');await page.reload({waitUntil:'networkidle'});await ready();assert.equal(await page.getAttribute('html','data-mode'),'recruiter');assert.equal(await page.getAttribute('html','lang'),'id');await locale('en');assert.equal(await page.getAttribute('html','data-mode'),'recruiter');});
  const projectSource=fs.readFileSync('src/data/projects.ts','utf8').split('export const GITHUB_EXPERIMENTS')[0];
  const slugs=[...projectSource.matchAll(/slug:\s*"([^"]+)"/g)].map(m=>m[1]);
  const repos=[...projectSource.matchAll(/githubUrl:\s*"([^"]+)"/g)].map(m=>m[1]);
  assert.ok(slugs.length > 0); assert.equal(slugs.length,repos.length);
  for(const m of ['pixel','recruiter'])for(const l of ['en','id']){
    await page.goto(base,{waitUntil:'networkidle'});await ready();await mode(m);await locale(l);
    await check(`${m}/${l}: architectural rooms are mode-specific decorative artwork`,async()=>{
      const scenes=page.locator('.atelier-room-scene');
      if(m==='pixel'){assert.equal(await scenes.count(),0);return;}
      assert.equal(await scenes.count(),8);
      const expected=['arcade','gallery','library','observatory'].map(v=>`/pixel/environment/atelier-${v}.webp`).sort();
      assert.deepEqual([...new Set(await scenes.locator('img').evaluateAll(es=>es.map(e=>e.getAttribute('src'))))].sort(),expected);
      for(let i=0;i<8;i++){const scene=scenes.nth(i);assert.equal(await scene.getAttribute('aria-hidden'),'true');assert.equal(await scene.locator('img').getAttribute('alt'),'');assert.equal(await scene.locator('img').getAttribute('loading'),'lazy');assert.equal(await scene.locator('a,button,input,[tabindex]').count(),0);}
    });
    await check(`${m}/${l}: five semester controls, four trophies, four research filters`,async()=>{
      if(m==='pixel'){for(let i=1;i<=5;i++){const b=page.locator(`#semester-selector-${i}`);await b.focus();await page.keyboard.press('Enter');assert.equal(await b.getAttribute('aria-pressed'),'true');assert.ok(await page.locator(`#semester-panel-${i}`).isVisible());}}
      else{const buttons=page.locator('#journey nav button');assert.equal(await buttons.count(),5);for(let i=0;i<5;i++){await buttons.nth(i).click();assert.equal(await buttons.nth(i).getAttribute('aria-current'),'step');}}
      const trophies=page.locator('[id^="trophy-selector-"]');assert.equal(await trophies.count(),4);for(let i=0;i<4;i++){await trophies.nth(i).focus();await page.keyboard.press('Enter');assert.equal(await trophies.nth(i).getAttribute('aria-pressed'),'true');}
      const filters=page.locator('#research [role="group"] button');assert.equal(await filters.count(),4);for(let i=0;i<4;i++){await filters.nth(i).click();assert.equal(await filters.nth(i).getAttribute('aria-pressed'),'true');}await filters.first().click();
    });
    await check(`${m}/${l}: every CV entry point resolves correct locale and download bytes`,async()=>{
      const links=page.locator('a[download]');assert.ok(await links.count()>=3);for(let i=0;i<await links.count();i++)assert.equal(await links.nth(i).getAttribute('href'),`/cv/M-Hanif-Al-Faiz-CV-${l.toUpperCase()}.pdf`);
      const [d]=await Promise.all([page.waitForEvent('download'),page.locator('#hero a[download]').click()]);assert.equal(d.suggestedFilename(),`M-Hanif-Al-Faiz-CV-${l.toUpperCase()}.pdf`);assert.equal(digest(fs.readFileSync(await d.path())),digest(fs.readFileSync(`public/cv/${d.suggestedFilename()}`)));
      assert.ok(await page.locator(`a[href="/cv/print-${l.toUpperCase()}.html"]`).count()>=3);const [p]=await Promise.all([context.waitForEvent('page'),page.locator(`#hero a[href="/cv/print-${l.toUpperCase()}.html"]`).click()]);await p.waitForLoadState('networkidle');assert.equal(await p.getAttribute('html','lang'),l);assert.ok((await p.locator('body').innerText()).length>5000);await p.close();
    });
    await check(`${m}/${l}: navigation targets, Hero CTA and verified contacts`,async()=>{
      await page.setViewportSize({width:1440,height:900});for(const href of await page.locator('header nav a').evaluateAll(es=>es.map(e=>e.getAttribute('href')))){const id=href.split('#')[1];if(id)assert.equal(await page.locator(`[id="${id}"]`).count(),1);}
      await page.locator('#hero a[href="#projects"]').click();assert.equal(new URL(page.url()).hash,'#projects');for(const href of ['https://github.com/hanif-12-01','https://www.linkedin.com/in/hanif-faiz-05b36b31a','https://www.instagram.com/a.nippp__05','mailto:mhanifalfaiz@student.telkomuniversity.ac.id'])assert.ok(await page.locator(`#contact a[href="${href}"]`).count()>0);assert.equal(await page.locator('a[href="#"]').count(),0);
    });
    await check(`${m}/${l}: current repositories and case-study links, no project screenshot previews`,async()=>{for(let i=0;i<slugs.length;i++){assert.ok(await page.locator(`#projects a[href="${repos[i]}"]`).count()>0);assert.ok(await page.locator(`#projects a[href="/projects/${slugs[i]}"]`).count()>0);}assert.equal(await page.locator('#projects [class*="preview"]').count(),0);});
    for(const width of widths){await page.setViewportSize({width,height:width<768?844:900});await settle();const geometry=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),scenes:[...document.querySelectorAll('.atelier-room-scene')].map(e=>{const i=e.querySelector('img');const r=e.getBoundingClientRect();const s=getComputedStyle(e);return{section:e.closest('section')?.id,currentSrc:i?.currentSrc,complete:i?.complete,naturalWidth:i?.naturalWidth,naturalHeight:i?.naturalHeight,width:r.width,height:r.height,visible:r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};}),clipped:[...document.querySelectorAll('a,button,summary')].filter(e=>!e.closest('.sr-only')&&!e.classList.contains('sr-only')).filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left < -1||r.right>innerWidth+1);}).map(e=>e.textContent.trim().slice(0,100))}));report.viewports.push({mode:m,locale:l,...geometry});if(width===1440||width===390)await screenshots(m,l,width,'after');}
  }
  await check('All 32 mode/locale/viewport combinations fit and load assets',async()=>{assert.equal(report.viewports.length,32);for(const v of report.viewports){assert.ok(v.scrollWidth<=v.width,JSON.stringify(v));assert.equal(v.clipped.length,0,JSON.stringify(v));assert.equal(v.brokenImages.length,0,JSON.stringify(v));}});
  await check('Architectural art resolves responsive native picture sources at every width',async()=>{for(const v of report.viewports){if(v.mode==='pixel'){assert.equal(v.scenes.length,0);continue;}assert.equal(v.scenes.length,8);for(const scene of v.scenes){assert.ok(scene.visible,JSON.stringify({width:v.width,...scene}));assert.equal(scene.complete,true,JSON.stringify(scene));assert.ok(scene.naturalWidth>0,JSON.stringify(scene));assert.equal(scene.currentSrc.includes('-compact.webp'),v.width<=767,JSON.stringify({width:v.width,...scene}));assert.equal(scene.naturalWidth,v.width<=767?480:960);assert.equal(scene.naturalHeight,v.width<=767?320:640);}}});
  await page.setViewportSize({width:390,height:844});await locale('id');await mode('pixel');
  await check('Mobile menu closes on Escape and link selection',async()=>{const opener=page.getByRole('button',{name:'Buka menu navigasi'});await opener.click();await page.keyboard.press('Escape');assert.equal(await opener.evaluate(e=>document.activeElement===e),true);await opener.click();await page.locator('#mobile-navigation-menu a[href="#projects"]').click();assert.equal(await page.locator('#mobile-navigation-menu').count(),0);});
  await check('Companion dialogue locale, Escape and visibility persist',async()=>{await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.locator('.world-companion-button').click();const before=await page.locator('.world-companion-button').getAttribute('title');await locale('en');assert.match(await page.locator('.world-companion-button').getAttribute('title'),new RegExp(`${before.match(/(\d+) klik/)[1]} clicks`));const bubble=page.getByRole('button',{name:/^Companion dialogue:/});await bubble.focus();await page.keyboard.press('Escape');assert.equal(await bubble.count(),0);await page.setViewportSize({width:1440,height:900});await page.getByRole('button',{name:'Toggle pixel companion visibility'}).first().click();assert.equal(await page.locator('.world-companion').count(),0);await page.reload({waitUntil:'networkidle'});await ready();assert.equal(await page.locator('.world-companion').count(),0);await page.getByRole('button',{name:'Toggle pixel companion visibility'}).first().click();});
  await check('Skip link keyboard focus and target',async()=>{await page.goto(base,{waitUntil:'networkidle'});await ready();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'#main-content');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');});
  await check('Reduced-motion stops animated scenery and smooth scrolling',async()=>{await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.world-clouds').first().evaluate(e=>getComputedStyle(e).animationName),'none');assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior),'auto');});
  for(const slug of slugs)for(const m of ['pixel','recruiter']){const response=await page.goto(`${base}/projects/${slug}`,{waitUntil:'networkidle'});await ready();await mode(m);await locale('en');const en=await page.locator('main').innerText();const url=page.url();await locale('id');await check(`Case ${slug}/${m}: URL, repository and localized content`,async()=>{assert.equal(response.status(),200);assert.equal(page.url(),url);assert.ok(await page.locator(`a[href="${repos[slugs.indexOf(slug)]}"]`).count()>0);assert.equal(await page.getAttribute('html','lang'),'id');assert.notEqual(await page.locator('main').innerText(),en);});report.routes.push({path:`/projects/${slug}`,mode:m,status:response.status()});}
  for(const route of ['/projects','/journey']){const response=await page.goto(base+route,{waitUntil:'networkidle'});await ready();await locale('en');const en=await page.locator('main').innerText();await locale('id');await check(`${route}: bilingual route renders`,async()=>{assert.equal(response.status(),200);assert.notEqual(await page.locator('main').innerText(),en);});report.routes.push({path:route,status:response.status()});}
  await check('History back/forward retains language',async()=>{await page.goto(base+'/projects',{waitUntil:'networkidle'});await page.goto(base+'/journey',{waitUntil:'networkidle'});await page.goBack({waitUntil:'networkidle'});assert.equal(new URL(page.url()).pathname,'/projects');assert.equal(await page.getAttribute('html','lang'),'id');await page.goForward({waitUntil:'networkidle'});assert.equal(new URL(page.url()).pathname,'/journey');});
  await check('No development-only or nonexistent project routes',async()=>{for(const route of ['/dev','/pet-test','/asset-test','/projects/nonexistent']){const r=await page.request.get(base+route);report.routes.push({path:route,status:r.status()});assert.equal(r.status(),404);}});
  await check('Unavailable localStorage still permits mode/language/companion',async()=>{const c=await browser.newContext({viewport:{width:1440,height:900}});await c.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError');}});});const p=await c.newPage();await p.goto(base,{waitUntil:'networkidle'});await p.locator('.language-switcher button[lang="id"]').click();await p.locator('#mode-toggle-btn').click();assert.equal(await p.getAttribute('html','lang'),'id');assert.equal(await p.getAttribute('html','data-mode'),'recruiter');await p.locator('#mode-toggle-btn').click();await p.getByRole('button',{name:'Tampilkan atau sembunyikan pendamping Pixel Hanif'}).first().click();assert.equal(await p.locator('.world-companion').count(),0);await c.close();});
  for(const m of ['pixel','recruiter'])for(const width of [1440,390])for(const l of ['en','id']){const c=await browser.newContext({viewport:{width,height:900}});await c.addInitScript(({locale,mode})=>{localStorage.setItem('hanif_portfolio_mode',mode);localStorage.setItem('hanif_portfolio_locale',locale);window.qaMetrics={lcp:0,cls:0};new PerformanceObserver(list=>{for(const e of list.getEntries())window.qaMetrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qaMetrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});},{locale:l,mode:m});const p=await c.newPage();await p.goto(base,{waitUntil:'networkidle'});await p.waitForTimeout(1800);report.performance.push({mode:m,width,locale:l,coldCache:true,throttling:'none',...(await p.evaluate(()=>({...window.qaMetrics,resources:performance.getEntriesByType('resource').filter(e=>/\/pixel\/|\/profile\//.test(e.name)).map(e=>({url:e.name,transferSize:e.transferSize,duration:e.duration}))})))});await c.close();}
  await check('Protected canonical facts, Hero, portraits, Pixel CSS/assets and CV bytes unchanged',async()=>{const locked=JSON.parse(fs.readFileSync(`${output}/baseline-hashes.json`,'utf8'));for(const [file,sha]of Object.entries(locked))assert.equal(digest(fs.readFileSync(file)),sha,file);});
  report.newArchitectureAssets=['library','arcade','gallery','observatory'].flatMap(v=>['','-compact'].map(size=>{const file=`public/pixel/environment/atelier-${v}${size}.webp`;return{file,bytes:fs.statSync(file).size,sha256:digest(fs.readFileSync(file))};}));
  await check('No critical console, runtime, network or asset HTTP errors',async()=>{assert.equal(report.errors.length,0,JSON.stringify(report.errors));assert.equal(report.failedRequests.length,0,JSON.stringify(report.failedRequests));assert.equal(report.httpErrors.length,0,JSON.stringify(report.httpErrors));});
  await browser.close();fs.writeFileSync(`${output}/browser-results.json`,JSON.stringify(report,null,2));console.log(JSON.stringify({browser:report.browser,passed:report.checks.filter(c=>c.passed).length,total:report.checks.length,failed:report.checks.filter(c=>!c.passed),viewportFailures:report.viewports.filter(v=>v.scrollWidth>v.width||v.clipped.length||v.brokenImages.length),errors:report.errors,failedRequests:report.failedRequests,httpErrors:report.httpErrors},null,2));if(report.checks.some(c=>!c.passed))process.exitCode=1;
}
main().catch(e=>{console.error(e);fs.mkdirSync(output,{recursive:true});fs.writeFileSync(`${output}/${baselineOnly?'baseline-browser':'browser-results'}.json`,JSON.stringify(report,null,2));process.exitCode=1;});
