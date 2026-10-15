const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const assert=require('node:assert/strict');
const cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const module={exports:{}};cache.set(file,module.exports);const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;new Function('require','module','exports',code)(name=>load(path.resolve(path.dirname(file),name+'.ts')),module,module.exports);cache.set(file,module.exports);return module.exports;}
const dictionary=load('src/i18n/id.ts').ID;
const fields=new Set(['bio','bioShort','bioExtended','description','shortDescription','longDescription','summary','subtitle','focus','focusAreas','highlights','highlight','keyHighlights','architectureNotes','role','heading','tagline','subtext','problemStatement','architecture','challenge','challenges','solution','outcome','evidence','roleDescription','statusDescription','result','responsibilities','alt']);
const official=new Set(['Full-Stack Web & Modular Architecture','PKM (Program Kreativitas Mahasiswa)','CIVICTWIN Semarang, WattWise AI, Purwokerto Intelligence Layer, Bernas MBG, Lapor Mangan']);
const internalAssetRoles=new Set(['medium-prop','large-landmark','small-item','badge','effect','illustration','featured-illustration','icon']);
const report={dictionaryKeys:Object.keys(dictionary).length,files:[],missing:[],palette:[]};
function walk(value,key,items){if(typeof value==='string'&&fields.has(key)){const normalized=value.trim().replace(/\s+/g,' ');if(key==='role'&&internalAssetRoles.has(normalized))return;if(!dictionary[normalized]&&!official.has(normalized))report.missing.push(value);items.push(normalized);}else if(Array.isArray(value))value.forEach(x=>walk(x,key,items));else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>walk(v,k,items));}
for(const name of ['profile','interests','journey','achievements','researchCompetitions','skills','projects','socials','worldAssets']){const items=[];walk(load(`src/data/${name}.ts`),'',items);report.files.push({file:`src/data/${name}.ts`,descriptiveStrings:items.length});}
function luminance(hex){const c=hex.match(/\w\w/g).map(n=>parseInt(n,16)/255).map(n=>n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
for(const fg of ['F1F5F9','94A3B8','5DE4C7','5AA9FF','A78BFA','FFD166'])for(const bg of ['0B1020','151B2E','1D263D']){const ratio=(luminance(fg)+.05)/(luminance(bg)+.05);report.palette.push({foreground:'#'+fg,background:'#'+bg,contrast:Math.round(ratio*100)/100});assert.ok(ratio>=4.5);}
report.missing=[...new Set(report.missing)];fs.writeFileSync(process.argv[2]||'docs/phase-4d2/i18n-source-audit.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));assert.equal(report.missing.length,0,'Missing canonical descriptive translations');
