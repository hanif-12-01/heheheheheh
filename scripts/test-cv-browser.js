/** Real browser actions and Chromium print-engine verification; physical printer tests are separate. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { playwright, dependencies } = require('./cv-runtime');

const baseUrl = process.argv[2] || 'http://localhost:3012';
const sha = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const assert = (condition, message) => { if (!condition) throw Error(message); };
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT,'docs','cv-validation','browser');

async function run() {
  fs.mkdirSync(OUT,{recursive:true});
  const { chromium } = playwright();
  const runtime = dependencies();
  const targets = [{name:'Chromium',options:{}}];
  for (const [name, executablePath] of [['Chrome','C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'],['Edge','C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe']]) {
    if (fs.existsSync(executablePath)) targets.push({name,options:{executablePath}});
  }
  const results = [];
  for (const target of targets) {
    const browser = await chromium.launch({headless:true,...target.options});
    try {
      for (const locale of ['en','id']) {
        const language = locale.toUpperCase();
        const pdfUrl = `${baseUrl}/cv/M-Hanif-Al-Faiz-CV-${language}.pdf`;
        const printUrl = `${baseUrl}/cv/print-${language}.html`;
        const page = await browser.newPage({viewport:{width:1280,height:900},acceptDownloads:true});
        await page.addInitScript(() => {
          window.__cvPrintEvents = [];
          addEventListener('beforeprint',()=>window.__cvPrintEvents.push({event:'beforeprint',fonts:document.fonts.status,characters:document.body.innerText.length}));
          addEventListener('afterprint',()=>window.__cvPrintEvents.push({event:'afterprint'}));
        });
        const http = await page.request.get(pdfUrl);
        assert(http.status() === 200, `${pdfUrl}: HTTP ${http.status()}`);
        assert(http.headers()['content-type']?.includes('application/pdf'), 'Incorrect PDF content type');
        const body = await http.body();
        const source = fs.readFileSync(path.join(ROOT,'public','cv',`M-Hanif-Al-Faiz-CV-${language}.pdf`));
        assert(sha(body) === sha(source), 'HTTP output differs from verified PDF bytes');
        const printResponse = await page.goto(printUrl,{waitUntil:'load'});
        assert(printResponse.status() === 200, 'Print document failed to load');
        assert(await page.locator('html').getAttribute('lang') === locale, 'Print document language mismatch');
        assert(await page.locator('h1').innerText() === 'M. HANIF AL FAIZ', 'Visible print content missing');
        await page.locator('#print-cv').click();
        await page.waitForFunction(()=>window.__cvPrintEvents.some(event=>event.event==='beforeprint'));
        const nativeEvents = await page.evaluate(()=>window.__cvPrintEvents);
        assert(nativeEvents.find(event=>event.event==='beforeprint').fonts==='loaded', 'Print called before fonts loaded');
        assert(nativeEvents.find(event=>event.event==='beforeprint').characters>5000, 'Print called on empty container');
        const printed = path.join(OUT,`${target.name}-${language}-printed.pdf`);
        await page.pdf({path:printed,preferCSSPageSize:true,displayHeaderFooter:false,printBackground:true});
        const validationDirectory = path.join(OUT,`${target.name}-${language}`);
        execFileSync(runtime.python,[path.join(__dirname,'validate-cv.py'),'--pdf',printed,'--locale',locale,'--out-dir',validationDirectory],{env:{...process.env,CV_PDFTOPPM:runtime.pdftoppm},stdio:'pipe'});
        await page.screenshot({path:path.join(OUT,`${target.name}-${language}-print-document.png`),fullPage:true});
        const downloadLink = page.locator('a[download]');
        const [download] = await Promise.all([page.waitForEvent('download'),downloadLink.click()]);
        const downloaded = path.join(OUT,`${target.name}-${language}-downloaded.pdf`);
        await download.saveAs(downloaded);
        assert(download.suggestedFilename()===`M-Hanif-Al-Faiz-CV-${language}.pdf`,'Downloaded filename mismatch');
        assert(sha(fs.readFileSync(downloaded))===sha(source),'Download bytes differ');
        // Native PDF viewer may be unavailable in a headless channel; record that explicitly.
        const viewerPage = await browser.newPage();
        let viewer;
        try {
          const response = await viewerPage.goto(pdfUrl,{waitUntil:'load'});
          await viewerPage.waitForTimeout(1200);
          viewer = {status:response?.status(),url:viewerPage.url(),pdfEmbed:await viewerPage.locator('embed[type="application/pdf"]').count()};
          await viewerPage.screenshot({path:path.join(OUT,`${target.name}-${language}-pdf-viewer.png`)});
        } catch(error) { viewer={result:'HEADLESS_VIEWER_UNAVAILABLE',detail:error.message.split('\n')[0]}; }
        const result={browser:target.name,version:browser.version(),locale,pdfUrl,printUrl,httpStatus:http.status(),contentType:http.headers()['content-type'],sha256:sha(source),download:'PASS (bytes + filename)',nativePrintEvents:nativeEvents,printEngine:'PASS (CDP PDF parsed + extracted + independently rendered)',pdfViewer:viewer,physicalPrinter:'NOT TESTED'};
        results.push(result);
        console.log(JSON.stringify(result));
        await viewerPage.close();
        await page.close();
      }
    } finally {await browser.close();}
  }
  fs.writeFileSync(path.join(OUT,'browser-results.json'),JSON.stringify(results,null,2));
}

run().catch(error=>{console.error(error);process.exit(1);});
