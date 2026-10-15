const fs = require('fs');
const path = require('path');

function dependencies() {
  const bundled = process.env.CODEX_WORKSPACE_DEPENDENCIES || path.join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies');
  return {
    python: process.env.CV_PYTHON || (fs.existsSync(path.join(bundled, 'python', 'python.exe')) ? path.join(bundled, 'python', 'python.exe') : 'python'),
    pdftoppm: process.env.CV_PDFTOPPM || (fs.existsSync(path.join(bundled, 'native', 'poppler', 'Library', 'bin', 'pdftoppm.exe')) ? path.join(bundled, 'native', 'poppler', 'Library', 'bin', 'pdftoppm.exe') : 'pdftoppm'),
    playwright: process.env.CV_PLAYWRIGHT || path.join(bundled, 'node', 'node_modules', 'playwright'),
  };
}

function playwright() {
  try { return require('playwright'); } catch { return require(dependencies().playwright); }
}

function loadCanonicalData() {
  const ts = require('typescript');
  const vm = require('vm');
  const result = {};
  for (const name of ['profile', 'projects', 'skills', 'achievements']) {
    const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', `${name}.ts`), 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    const exports = {};
    vm.runInNewContext(compiled, { exports }, { filename: `${name}.ts` });
    Object.assign(result, exports);
  }
  return result;
}

module.exports = { dependencies, playwright, loadCanonicalData };
