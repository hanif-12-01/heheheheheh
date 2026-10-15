const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
function browserRuntime(){
 try{return require('playwright')}catch{
  const cache=path.join(process.env.LOCALAPPDATA,'npm-cache','_npx');
  for(const entry of fs.readdirSync(cache)){const candidate=path.join(cache,entry,'node_modules','playwright');if(fs.existsSync(path.join(candidate,'package.json')))return require(candidate)}
  throw Error('Install Playwright or provide a cached browser runtime to run visual QA');
 }
}
const {chromium}=browserRuntime();
const base=process.argv[2]||'http://localhost:3012';
async function main(){
 const browser=await chromium.launch();const report={base,browser:browser.version(),compositions:[],checks:[]};
 const c=await browser.newContext();await c.addInitScript(()=>localStorage.setItem('hanif_portfolio_mode','recruiter'));const p=await c.newPage();
 await p.goto(base,{waitUntil:'networkidle'});await p.waitForSelector('.atelier-hero');
 for(const locale of ['en','id'])for(const width of [1440,1280,1024,768,430,390,375,320]){
  await p.setViewportSize({width,height:width<768?844:1000});await p.locator(`.language-switcher button[lang="${locale}"]`).click();await p.waitForSelector(`html[lang="${locale}"]`);
  const r=await p.evaluate(()=>{
   const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
   const portrait=rect('.atelier-portrait-stage');const identity=rect('.atelier-hero__identity'),intro=rect('.atelier-hero__introduction'),actions=rect('.atelier-hero__actions');
   const overlap=(a,b)=>a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1;
   return {width:innerWidth,portrait,identity,intro,actions,overlaps:[identity,intro,actions].map(x=>overlap(portrait,x)),h1s:document.querySelectorAll('h1').length};
  });report.compositions.push({locale,...r});assert.equal(r.overlaps.some(Boolean),false,JSON.stringify(r));assert.equal(r.h1s,1);
 }
 await p.setViewportSize({width:1440,height:1000});
 await p.locator('#semester-selector-2').click();await p.locator('#trophy-selector-pln-ice-2026').click();await p.locator('#research [role="group"] button').nth(2).click();
 const localeButton=p.locator('.language-switcher button[lang="en"]');await localeButton.focus();await p.keyboard.press('Space');
 assert.equal(await p.locator('#semester-selector-2').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('#trophy-selector-pln-ice-2026').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('#research-records article').count(),2);report.checks.push('Locale change preserves selected semester, honor and research filter');
 for(const control of await p.locator('#hero a').all()){
  await control.evaluate(e=>{const r=e.getBoundingClientRect();scrollTo({top:r.top+scrollY-innerHeight/2,behavior:'instant'})});
  assert.equal(await control.evaluate(e=>{const r=e.getBoundingClientRect();const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return hit===e||e.contains(hit)}),true,'Hero control is obscured');
 }report.checks.push('Every Hero action has an unobscured pointer target');
 assert.equal(await p.locator('#hero img[src="/profile/hanif-portrait-pixel.webp"]').getAttribute('alt'),'Pixel-art portrait of M. Hanif Al Faiz, adapted from his authentic photograph');
 await p.emulateMedia({reducedMotion:'reduce'});const animations=await p.locator('#hero').evaluate(e=>e.getAnimations({subtree:true}).filter(a=>a.playState==='running').length);assert.equal(animations,0);report.checks.push('Professional Hero is static with reduced motion');
 fs.writeFileSync('docs/phase-4d3/composition-results.json',JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify({compositions:report.compositions.length,checks:report.checks},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1});
