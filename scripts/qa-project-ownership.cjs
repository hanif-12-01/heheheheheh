const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const {loadCanonicalData,dependencies}=require('./cv-runtime');

// Targeted regression for the owner's project-ownership correction.
// Historical visual baselines and protected hashes are intentionally not changed.
const base=process.argv[2]||'http://localhost:3012';
const output='docs/ownership-correction';
const forbidden=/SIMOBS|simobs-bengkel|github\.com\/hanif-12-01\/bengkel/i;
const expected=[
  {slug:'wattwise-ai',title:'WattWise AI',repo:'https://github.com/hanif-12-01/start-up-repo',year:2026,status:'active'},
  {slug:'purwokerto-intelligence-layer',title:'Purwokerto Intelligence Layer',repo:'https://github.com/hanif-12-01/Purwokerto-intelligence-layer',year:2026,status:'active'},
  {slug:'lapor-mangan',title:'Lapor Mangan',repo:'https://github.com/hanif-12-01/LAPORMANGAN',year:2024,status:'completed'},
  {slug:'bernas-mbg',title:'Bernas MBG',repo:'https://github.com/hanif-12-01/Bernas-MBG',year:2025,status:'prototype'},
  {slug:'ai-course-project',title:'Fuzzy Rain Risk Index',repo:'https://github.com/hanif-12-01/Tubes-Dasar-Kecerdasan-Artificial',year:2026,status:'completed'},
];
const report={base,timestamp:new Date().toISOString(),scope:{reason:'Owner confirmed SIMOBS was developed by a friend and must not be attributed to this portfolio.',intentionalChanges:'Removal from canonical projects/profile highlight and presentation/localization; both localized Harvard CVs and the legacy copy regenerated without changing their format.',historicalBaselinesRewritten:false},checks:[],viewports:[],routes:[],downloads:[],printPages:[],errors:[],expectedDiagnostics:[],failedRequests:[],httpErrors:[]};
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function playwright(){try{return require('playwright');}catch{const cache=path.join(process.env.LOCALAPPDATA,'npm-cache','_npx');for(const dir of fs.readdirSync(cache)){const candidate=path.join(cache,dir,'node_modules/playwright');if(fs.existsSync(path.join(candidate,'package.json')))return require(candidate);}throw Error('No cached Playwright runtime');}}
async function check(name,fn){try{await fn();report.checks.push({name,passed:true});}catch(e){report.checks.push({name,passed:false,error:e.message});}}
async function main(){
  fs.mkdirSync(`${output}/screenshots`,{recursive:true});
  const data=loadCanonicalData();
  await check('Canonical catalog has five retained projects in the approved order; academic and achievement facts remain',async()=>{
    assert.equal(data.FEATURED_PROJECTS.length,5);assert.equal(data.GITHUB_EXPERIMENTS.length,3);
    assert.deepEqual(Array.from(data.FEATURED_PROJECTS,p=>p.slug),expected.map(p=>p.slug));
    for(const e of expected){const p=data.FEATURED_PROJECTS.find(p=>p.slug===e.slug);assert.ok(p.title.startsWith(e.title));assert.equal(p.githubUrl,e.repo);assert.equal(p.year,e.year);assert.equal(p.status,e.status);assert.equal(p.featured,true);}
    assert.equal(data.PROFILE_DATA.gpa,'3.66 / 4.00');assert.equal(data.PROFILE_DATA.currentLevel,5);assert.equal(data.PROFILE_DATA.expectedGraduation,2027);assert.equal(data.PROFILE_DATA.university,'Telkom University Purwokerto');
    assert.match(data.FEATURED_PROJECTS[0].achievement,/Top 10 Finalist/);assert.match(data.FEATURED_PROJECTS[1].achievement,/3rd Place/);assert.ok(data.FEATURED_PROJECTS[1].longDescription.includes('simulated municipal datasets'));assert.ok(data.FEATURED_PROJECTS[3].longDescription.includes('proof-of-concept'));
    assert.doesNotMatch(JSON.stringify(data.FEATURED_PROJECTS),forbidden);assert.doesNotMatch(JSON.stringify(data.PROFILE_DATA),forbidden);
    report.catalog=data.FEATURED_PROJECTS.map(p=>({slug:p.slug,title:p.title,year:p.year,status:p.status,githubUrl:p.githubUrl}));
  });
  const browser=await playwright().chromium.launch({headless:true});report.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error'){const diagnostic={text:m.text(),url:m.location().url};if(diagnostic.url.includes('/projects/simobs-bengkel')&&/404/.test(diagnostic.text))report.expectedDiagnostics.push(diagnostic);else report.errors.push(diagnostic);}});page.on('requestfailed',r=>{if(!r.failure()?.errorText.includes('ABORTED'))report.failedRequests.push({url:r.url(),error:r.failure()?.errorText});});page.on('response',r=>{if(r.status()>=400&&!r.url().includes('/projects/simobs-bengkel'))report.httpErrors.push({url:r.url(),status:r.status()});});
  async function ready(){await page.waitForSelector('html[data-mode][data-locale]');await page.evaluate(()=>document.fonts.ready);}
  async function select(m,l){if(await page.getAttribute('html','data-mode')!==m)await page.locator('#mode-toggle-btn').click();await page.waitForSelector(`html[data-mode="${m}"]`);await page.locator(`.language-switcher button[lang="${l}"]`).click();await page.waitForSelector(`html[data-locale="${l}"]`);assert.equal(await page.getAttribute('html','data-mode'),m);}
  async function assertNoClaim(){assert.doesNotMatch(await page.locator('body').innerText(),forbidden);const hrefs=await page.locator('a[href]').evaluateAll(es=>es.map(e=>e.getAttribute('href')).join('\n'));assert.doesNotMatch(hrefs,forbidden);}
  async function geometry(route,m,l,w){const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc||i.src)}));report.viewports.push({route,mode:m,locale:l,...result});assert.ok(result.scrollWidth<=w,JSON.stringify(result));assert.equal(result.brokenImages.length,0,JSON.stringify(result));}
  for(const m of ['pixel','recruiter'])for(const l of ['en','id']){
    for(const width of [1440,390]){
      await page.setViewportSize({width,height:width===390?844:900});await page.goto(base,{waitUntil:'networkidle'});await ready();await select(m,l);
      await check(`${m}/${l}/${width}: home and profile contain five chapters and no removed ownership claim`,async()=>{
        await assertNoClaim();const articles=page.locator('#projects article.project-chapter');assert.equal(await articles.count(),5);const ids=await articles.evaluateAll(es=>es.map(e=>e.getAttribute('aria-labelledby').replace('project-title-','')));assert.deepEqual(ids,expected.map(p=>p.slug));
        for(const p of expected){assert.ok(await page.locator(`#projects a[href="/projects/${p.slug}"]`).count()>=1);assert.equal(await page.locator(`#projects a[href="${p.repo}"]`).count(),1);}
        assert.match(await page.locator('#profile').innerText(),/3\.66/);assert.match(await page.locator('#profile').innerText(),/2027/);assert.match(await page.locator('#profile').innerText(),/Telkom University Purwokerto/);
        assert.match(await page.locator('#projects .project-lab__heading').innerText(),l==='en'?/Five engineering chapters/:/Lima bab/);
        await page.locator('#projects').evaluate(e=>window.scrollTo({top:e.getBoundingClientRect().top+scrollY-80,behavior:'instant'}));await page.waitForLoadState('networkidle');await geometry('/',m,l,width);await page.screenshot({path:`${output}/screenshots/home-projects-${m}-${l}-${width}.png`});
      });
      await page.goto(`${base}/projects`,{waitUntil:'networkidle'});await ready();
      await check(`${m}/${l}/${width}: project directory has five featured and three experiments with total eight`,async()=>{
        assert.equal(await page.getAttribute('html','data-mode'),m);assert.equal(await page.getAttribute('html','lang'),l);await assertNoClaim();const lists=page.locator('.project-directory-list');assert.equal(await lists.count(),2);assert.equal(await lists.nth(0).locator('article').count(),5);assert.equal(await lists.nth(1).locator('article').count(),3);assert.equal(await page.locator('main article.project-chapter').count(),8);
        const ids=await lists.nth(0).locator('article').evaluateAll(es=>es.map(e=>e.getAttribute('aria-labelledby').replace('project-title-','')));assert.deepEqual(ids,expected.map(p=>p.slug));assert.match(await page.locator('#main-content > div').first().locator(':scope > span').innerText(),/\b8\b/);await geometry('/projects',m,l,width);
      });
    }
    await page.setViewportSize({width:1440,height:900});await page.goto(base,{waitUntil:'networkidle'});await ready();
    await check(`${m}/${l}: localized native PDF download matches disk and print page has no removed project`,async()=>{
      assert.equal(await page.getAttribute('html','lang'),l);assert.equal(await page.getAttribute('html','data-mode'),m);const filename=`M-Hanif-Al-Faiz-CV-${l.toUpperCase()}.pdf`;const all=page.locator('a[download]');assert.ok(await all.count()>=3);for(let i=0;i<await all.count();i++)assert.equal(await all.nth(i).getAttribute('href'),`/cv/${filename}`);
      const [d]=await Promise.all([page.waitForEvent('download'),page.locator('#hero a[download]').click()]);assert.equal(d.suggestedFilename(),filename);const downloaded=fs.readFileSync(await d.path());const local=fs.readFileSync(`public/cv/${filename}`);assert.equal(hash(downloaded),hash(local));report.downloads.push({mode:m,locale:l,filename,bytes:downloaded.length,sha256:hash(downloaded),nativeDownload:true});
      const printUrl=`/cv/print-${l.toUpperCase()}.html`;assert.ok(await page.locator(`a[href="${printUrl}"]`).count()>=3);const [printPage]=await Promise.all([context.waitForEvent('page'),page.locator(`#hero a[href="${printUrl}"]`).click()]);await printPage.waitForLoadState('networkidle');assert.equal(await printPage.getAttribute('html','lang'),l);const text=await printPage.locator('body').innerText();assert.doesNotMatch(text,forbidden);assert.ok(text.length>5000);for(const p of ['WattWise AI','Purwokerto Intelligence Layer','Fuzzy Rain Risk Index'])assert.ok(text.includes(p));report.printPages.push({mode:m,locale:l,url:printPage.url(),visibleCharacters:text.length,removedProjectFound:false});await printPage.close();
    });
  }
  for(const l of ['en','id'])for(const p of expected){await page.setViewportSize({width:1440,height:900});const response=await page.goto(`${base}/projects/${p.slug}`,{waitUntil:'networkidle'});await ready();await select(l==='en'?'recruiter':'pixel',l);await check(`Retained case study ${p.slug}/${l} is 200 with correct title and repository`,async()=>{assert.equal(response.status(),200);await assertNoClaim();assert.match(await page.locator('h1').innerText(),new RegExp(p.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));assert.ok(await page.locator(`a[href="${p.repo}"]`).count()>=1);});report.routes.push({path:`/projects/${p.slug}`,locale:l,status:response.status()});}
  await check('Removed route returns HTTP404 and server-rendered HTML contains no project claim/repository',async()=>{
    const response=await page.request.get(`${base}/projects/simobs-bengkel`);assert.equal(response.status(),404);const html=await response.text();const visibleHtml=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');const text=await page.evaluate(html=>new DOMParser().parseFromString(html,'text/html').body.textContent,visibleHtml);assert.doesNotMatch(text,forbidden);assert.doesNotMatch(html.replaceAll('simobs-bengkel','[removed-route-parameter]'),forbidden);assert.ok(html.includes('NEXT_HTTP_ERROR_FALLBACK;404'));assert.ok(html.includes('Project Not Found'));report.removedRoute={status:response.status(),serverVisibleText:text.trim().replace(/\s+/g,' ').slice(0,1500),removedClaimFound:false,rawResponseProjectNotFound:true,rawResponse404Fallback:true,rawRemovedNameOccurrencesAreRouteParametersOnly:true};fs.writeFileSync(`${output}/removed-route-response.html`,html);
  });
  for(const m of ['pixel','recruiter'])for(const l of ['en','id']){const response=await page.goto(`${base}/projects/simobs-bengkel`,{waitUntil:'networkidle'});await ready();await select(m,l);await check(`${m}/${l}: removed project renders localized 404 without attribution`,async()=>{assert.equal(response.status(),404);await assertNoClaim();assert.ok(await page.locator('h1').isVisible());assert.equal(await page.locator('article.project-chapter').count(),0);});}
  await check('Sitemap omits the removed project route',async()=>{const response=await page.request.get(`${base}/sitemap.xml`);assert.equal(response.status(),200);const xml=await response.text();assert.doesNotMatch(xml,forbidden);report.sitemap={status:response.status(),removedRouteFound:false,urlCount:(xml.match(/<loc>/g)||[]).length};});
  await check('Legacy PDF HTTP download matches regenerated disk artifact',async()=>{const filename='M-Hanif-Al-Faiz-CV.pdf';const response=await page.request.get(`${base}/cv/${filename}`);assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/application\/pdf/);const downloaded=await response.body();assert.equal(hash(downloaded),hash(fs.readFileSync(`public/cv/${filename}`)));assert.equal(hash(downloaded),hash(fs.readFileSync('public/cv/M-Hanif-Al-Faiz-CV-EN.pdf')));report.downloads.push({filename,bytes:downloaded.length,sha256:hash(downloaded),httpDownload:true});});
  await check('EN, ID and legacy PDF text excludes removed project and retains selected verified projects',async()=>{
    const paths=['EN','ID','legacy'].map(l=>`public/cv/M-Hanif-Al-Faiz-CV${l==='legacy'?'':`-${l}`}.pdf`);const code='import json,sys\nfrom pypdf import PdfReader\nprint(json.dumps([{ "path": p, "pages": [{ "characters": len(t), "text": t } for t in [page.extract_text() or "" for page in PdfReader(p, strict=True).pages]] } for p in sys.argv[1:]]))';const documents=JSON.parse(execFileSync(dependencies().python,['-c',code,...paths],{encoding:'utf8',maxBuffer:1024*1024}));for(const doc of documents){assert.equal(doc.pages.length,2,doc.path);for(const p of doc.pages){assert.ok(p.characters>500,doc.path);assert.doesNotMatch(p.text,forbidden);}const text=doc.pages.map(p=>p.text).join('\n');for(const name of ['WattWise AI','Purwokerto Intelligence Layer','Fuzzy Rain Risk Index'])assert.ok(text.includes(name),doc.path);}report.pdfTextAudit=documents.map(d=>({path:d.path,pages:d.pages.map(p=>({characters:p.characters})),removedProjectFound:false}));
  });
  await check('No unexpected console, runtime, request or HTTP errors',async()=>{assert.equal(report.errors.length,0,JSON.stringify(report.errors));assert.equal(report.failedRequests.length,0,JSON.stringify(report.failedRequests));assert.equal(report.httpErrors.length,0,JSON.stringify(report.httpErrors));});
  await browser.close();fs.writeFileSync(`${output}/browser-results.json`,JSON.stringify(report,null,2));console.log(JSON.stringify({browser:report.browser,total:report.checks.length,passed:report.checks.filter(c=>c.passed).length,failed:report.checks.filter(c=>!c.passed),viewports:report.viewports.length,downloads:report.downloads.length,errors:report.errors,httpErrors:report.httpErrors},null,2));if(report.checks.some(c=>!c.passed))process.exitCode=1;
}
main().catch(e=>{console.error(e);fs.mkdirSync(output,{recursive:true});fs.writeFileSync(`${output}/browser-results.json`,JSON.stringify(report,null,2));process.exitCode=1;});
