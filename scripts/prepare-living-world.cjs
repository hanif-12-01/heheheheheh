/* Reproducible Phase 4D.1 raster preparation. Originals are never overwritten. */
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
  const scenes = [['woodland-workshop', 768, 432], ['workshop-interior', 384, 288]];
  fs.mkdirSync('public/pixel/environment', { recursive: true });
  for (const [name, width, height] of scenes) {
    const source = `assets-source/Living Pixel World/${name}-original.png`;
    // Integer-grid resampling followed by 64-color quantization without dithering.
    const logical = await sharp(source).resize(width, height, { kernel: 'nearest', fit: 'fill' })
      .png({ palette: true, colours: 64, dither: 0 }).toBuffer();
    await sharp(logical).webp({ lossless: true, effort: 6 }).toFile(`public/pixel/environment/${name}.webp`);
  }

  fs.mkdirSync('public/pet/optimized', { recursive: true });
  const states = { idle: 'idle/hanif-idle', wave: 'wave/hanif-wave', walk: 'walk/hanif-walk',
    reading: 'reading/hanif-read', coding: 'coding/hanif-code', trophy: 'trophy/hanif-trophy',
    microphone: 'microphone/hanif-microphone', rocket: 'rocket/hanif-rocket', sleep: 'sleep/hanif-sleep' };
  for (const [state, source] of Object.entries(states)) {
    const logical = await sharp(`public/pet/${source}.png`).trim({ threshold: 5 })
      .resize({ height: 144, kernel: 'nearest' }).png({ palette: true, colours: 64, dither: 0 }).toBuffer();
    await sharp(logical).webp({ lossless: true, effort: 6 }).toFile(`public/pet/optimized/${state}.webp`);
  }

  for (const category of ['journey', 'achievements', 'tech', 'ui']) {
    for (const file of fs.readdirSync(`public/pixel/${category}`).filter(file => file.endsWith('.png'))) {
      const source = `public/pixel/${category}/${file}`;
      const longest = category === 'ui' ? 32 : file.includes('smart-city') || file.includes('sheet') ? 384 : 192;
      const logical = await sharp(source).resize(longest, longest, { fit: 'inside', kernel: 'nearest', withoutEnlargement: true })
        .png({ palette: true, colours: 64, dither: 0 }).toBuffer();
      await sharp(logical).webp({ lossless: true, effort: 6 }).toFile(source.replace('.png', '.webp'));
    }
  }

  // A faithful photographic study for OWNER REVIEW, not a newly invented face.
  // Withheld from public UI because automatic conversion cannot replace manual portrait art.
  fs.mkdirSync('docs/visual-review/portrait-study', { recursive: true });
  const portrait = await sharp('public/profile/hanif-portrait.jpeg')
    .extract({ left: 530, top: 500, width: 650, height: 1000 })
    .resize(104, 160, { kernel: 'nearest', fit: 'fill' })
    .png({ palette: true, colours: 24, dither: 0 }).toBuffer();
  await sharp(portrait).resize(312, 480, { kernel: 'nearest' })
    .png().toFile('docs/visual-review/portrait-study/hanif-portrait-pixel-review.png');

  const files = ['public/pixel/environment', 'public/pet/optimized', 'public/pixel/journey', 'public/pixel/achievements', 'public/pixel/tech', 'public/pixel/ui'].flatMap(dir =>
    fs.readdirSync(dir).filter(f => /\.(webp|svg)$/.test(f)).map(f => path.join(dir, f)));
  const inventory = [];
  for (const file of files) {
    const meta = await sharp(file).metadata();
    inventory.push({ file: file.replaceAll('\\', '/'), width: meta.width, height: meta.height,
      bytes: fs.statSync(file).size, format: meta.format, alpha: meta.hasAlpha });
  }
  fs.writeFileSync('docs/visual-review/asset-inventory.json', JSON.stringify(inventory, null, 2) + '\n');
  console.log(JSON.stringify(inventory, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
