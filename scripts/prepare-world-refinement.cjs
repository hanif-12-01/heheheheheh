/* Original Phase 4D.2 scenes; never overwrite archived Phase 4D.1 sources. */
const fs = require('node:fs');
const sharp = require('sharp');
const scenes = [
  ['connected-trail', 'exec-2d3dbea4-b467-4461-86ed-788ecae4eed7.png'],
  ['achievement-hall', 'exec-f8154245-2ef5-4e38-b97a-299cbfb71b88.png'],
  ['engineering-courtyard', 'exec-45c6897c-219c-492c-9d69-15cb5dc27cc8.png'],
];
async function main() {
  const records = [];
  for (const [name, generated] of scenes) {
    const source = `assets-source/Living Pixel World/${name}-original.png`;
    if (!fs.existsSync(source)) fs.copyFileSync(`C:/Users/HP/.codex/generated_images/01a13908-f709-7a92-94a0-edd4b9f9957b/${generated}`, source);
    const logical = await sharp(source).resize(768, 432, { kernel: 'nearest', fit: 'fill' })
      .png({ palette: true, colours: 64, dither: 0 }).toBuffer();
    const output = `public/pixel/environment/${name}.webp`;
    await sharp(logical).webp({ lossless: true, effort: 6 }).toFile(output);
    records.push({ source, output, width: 768, height: 432, sourceBytes: fs.statSync(source).size, bytes: fs.statSync(output).size, colors: 64, dither: 0, original: true, tool: 'built-in image_gen' });
  }
  fs.mkdirSync('docs/phase-4d2', { recursive: true });
  fs.writeFileSync('docs/phase-4d2/environment-assets.json', JSON.stringify(records, null, 2));
  console.log(records);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
