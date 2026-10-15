const fs = require('node:fs');
const sharp = require('sharp');
async function main() {
  fs.mkdirSync('assets-source/Grand Atelier', { recursive: true });
  const base = 'C:/Users/HP/.codex/generated_images/01a13908-f709-7a92-94a0-edd4b9f9957b/';
  const assets = [
    ['portrait', 'exec-6fb35149-4955-46ae-a9db-805bd394a47b.png', 'public/profile/hanif-portrait-pixel.webp', 256, 320, 48],
    ['grand-gallery', 'exec-1077b74a-33e7-4938-af81-0c6d83eeff49.png', 'public/pixel/environment/grand-atelier.webp', 960, 540, 64],
  ];
  const records = [];
  for (const [name, generated, output, width, height, colours] of assets) {
    const source = `assets-source/Grand Atelier/${name}-original.png`;
    if (!fs.existsSync(source)) fs.copyFileSync(base + generated, source);
    const pixels = await sharp(source).resize(width, height, { kernel: 'nearest', fit: 'fill' }).png({ palette: true, colours, dither: 0 }).toBuffer();
    await sharp(pixels).webp({ lossless: true, effort: 6 }).toFile(output);
    records.push({ source, output, width, height, colours, bytes: fs.statSync(output).size, sourceBytes: fs.statSync(source).size, generator: 'built-in image_gen', ownerApproval: name === 'portrait' ? 'PENDING LIKENESS REVIEW' : 'PENDING VISUAL REVIEW' });
  }
  fs.writeFileSync('docs/phase-4d3/assets.json', JSON.stringify(records, null, 2));
  console.log(records);
}
main().catch(e => { console.error(e); process.exitCode = 1; });
