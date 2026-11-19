// Clean hero clip + poster: panels collapsed, slow orbit, x-ray, night.
// usage: node clip.js <buildDir> <outDir>
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [buildDir, outDir] = process.argv.slice(2);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(path.resolve(buildDir), p);
  if (!fs.existsSync(f)) { s.writeHead(404); return s.end(); }
  s.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  await new Promise(r => srv.listen(0, r));
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: outDir, size: { width: 1280, height: 720 } } });
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:${srv.address().port}/`);
  await page.waitForFunction(() => { const l = document.getElementById('loader'); return !l || l.hidden || getComputedStyle(l).display === 'none' || getComputedStyle(l).opacity === '0'; }, null, { timeout: 120000 });
  await sleep(1500);
  await page.click('#btnLeft'); await page.click('#btnRight');
  await page.evaluate(() => { const c = document.getElementById('chkLabels'); if (c && c.checked) c.click(); });
  await sleep(1200);
  for (let i = 0; i < 3; i++) await page.keyboard.press('+'), await sleep(250);
  await sleep(1200);
  await page.screenshot({ path: path.join(outDir, 'poster.png') });
  const orbit = async (ms, key = 'ArrowRight') => { const e = Date.now() + ms; while (Date.now() < e) { await page.keyboard.down(key); await sleep(70); await page.keyboard.up(key); } };
  await orbit(6000);
  await page.click('[data-mode="xray"]'); await sleep(800); await orbit(3500);
  await page.click('[data-mode="interior"]'); await sleep(800); await orbit(3500);
  await page.click('[data-mode="exterior"]'); await page.click('#btnNight'); await sleep(800); await orbit(4500);
  await page.screenshot({ path: path.join(outDir, 'poster-night.png') });
  const v = page.video(); await ctx.close(); fs.renameSync(await v.path(), path.join(outDir, 'hero.webm'));
  await browser.close(); srv.close(); console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
