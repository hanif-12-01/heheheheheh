const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const generatedRoot = 'C:/Users/HP/.codex/generated_images/01a13908-f709-7a92-94a0-edd4b9f9957b';
const inputs = {
  library: 'exec-cddab620-61bd-460b-b411-058cffe34cbf.png',
  arcade: 'exec-db788819-0fb8-427b-8e36-2b8ca9597d7c.png',
  gallery: 'exec-8670af67-c0f0-4612-b9e4-83f138ff10a1.png',
  observatory: 'exec-63d0c600-f428-49ee-ad76-fc7c9dd2044a.png',
};

async function main() {
  const sourceDir = 'assets-source/Grand Atelier Expansion';
  fs.mkdirSync(sourceDir, { recursive: true });
  const records = [];
  for (const [room, generated] of Object.entries(inputs)) {
    const source = `${sourceDir}/${room}-original.png`;
    const output = `public/pixel/environment/atelier-${room}.webp`;
    if (!fs.existsSync(source)) fs.copyFileSync(path.join(generatedRoot, generated), source);
    // Match the production scene ratio while keeping sharp pixel clusters and a controlled palette.
    const indexed = await sharp(source).resize(960, 640, { kernel: 'nearest', fit: 'cover' })
      .png({ palette: true, colours: 64, dither: 0 }).toBuffer();
    await sharp(indexed).webp({ lossless: true, effort: 6 }).toFile(output);
    const compactOutput = output.replace('.webp', '-compact.webp');
    const compact = await sharp(source).resize(480, 320, { kernel: 'nearest', fit: 'cover' })
      .png({ palette: true, colours: 64, dither: 0 }).toBuffer();
    await sharp(compact).webp({ lossless: true, effort: 6 }).toFile(compactOutput);
    records.push({ room, source, output, width: 960, height: 640, colours: 64,
      bytes: fs.statSync(output).size, sourceBytes: fs.statSync(source).size,
      compact: { output: compactOutput, width: 480, height: 320, bytes: fs.statSync(compactOutput).size },
      origin: 'Original built-in image_gen artwork; existing Grand Atelier image used as style reference only',
      approval: 'PENDING OWNER VISUAL REVIEW' });
  }
  fs.mkdirSync('docs/atelier-expansion', { recursive: true });
  fs.writeFileSync('docs/atelier-expansion/assets.json', JSON.stringify(records, null, 2));
  console.log(JSON.stringify({ assets: records, totalBytes: records.reduce((sum, a) => sum + a.bytes, 0) }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
