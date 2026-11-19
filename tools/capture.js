// Serve a static build, verify it, capture stills + a preview clip.
// usage: node capture.js <buildDir> <outDir> <id>
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [buildDir, outDir, id] = process.argv.slice(2);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.wasm': 'application/wasm' };
const srv = http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(buildDir, p);
  if (!f.startsWith(path.resolve(buildDir)) || !fs.existsSync(f)) { s.writeHead(404); return s.end(); }
  s.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  await new Promise(r => srv.listen(0, r)); const port = srv.address().port;
  const base = `http://127.0.0.1:${port}/sub/`; // sub-path proves relative URLs
  // remap /sub/ -> /
  srv.removeAllListeners('request');
  srv.on('request', (q, s) => {
    if (!q.url.startsWith('/sub/')) { s.writeHead(404); return s.end(); }
    let p = decodeURIComponent(q.url.slice(4).split('?')[0]); if (p.endsWith('/')) p += 'index.html';
    const f = path.join(path.resolve(buildDir), p);
    if (!fs.existsSync(f)) { s.writeHead(404); return s.end(); }
    s.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s);
  });
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const report = { errors: [], external: [], notFound: [], checks: {} };
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, recordVideo: { dir: outDir, size: { width: 1280, height: 720 } } });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
  page.on('pageerror', e => report.errors.push('pageerror: ' + e.message));
  page.on('request', r => { if (!r.url().startsWith(`http://127.0.0.1:${port}/`) && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) report.external.push(r.url()); });
  page.on('response', r => { if (r.status() >= 400) report.notFound.push(r.status() + ' ' + r.url()); });
  const t0 = Date.now();
  await page.goto(base);
  await page.waitForFunction(() => { const l = document.getElementById('loader'); return !l || l.hidden || getComputedStyle(l).display === 'none' || getComputedStyle(l).opacity === '0'; }, null, { timeout: 120000 }).catch(() => report.errors.push('loader did not clear'));
  report.checks.loadMs = Date.now() - t0;
  await sleep(2500);
  report.checks.webgl = await page.evaluate(() => { const c = document.getElementById('view'); return !!(c && c.width > 0) && document.getElementById('fallback').hidden; });
  const shot = async n => { await sleep(1800); await page.screenshot({ path: path.join(outDir, n + '.png') }); };
  await shot('01-exterior');
  const click = async sel => { await page.click(sel).catch(e => report.errors.push('click ' + sel + ': ' + e.message.split('\n')[0])); };
  // orbit a bit for the clip
  for (let i = 0; i < 40; i++) { await page.keyboard.down('ArrowRight'); await sleep(60); await page.keyboard.up('ArrowRight'); }
  await shot('02-orbit');
  await click('[data-mode="xray"]'); await shot('03-xray');
  await click('[data-mode="interior"]'); await shot('04-interior');
  await click('[data-mode="exterior"]'); await click('#btnNight'); await shot('05-night');
  await click('#btnNight');
  await click('#tab-sections'); await page.check('#chkEW').catch(() => {}); await click('#btnSecView'); await shot('06-long-section');
  await click('#btnSecClear');
  await click('#tab-climb'); await page.fill('#rngClimb', '533').catch(() => {}); await page.$eval('#rngClimb', e => e.dispatchEvent(new Event('input', { bubbles: true }))).catch(() => {}); await shot('07-climb-top');
  await click('#btnHome'); await sleep(1500);
  await click('#tab-tour'); await click('#btnTourStart'); await sleep(9000); await shot('08-tour');
  await page.keyboard.press('Escape'); await click('#btnHome'); await sleep(1500);
  await click('#btn2d'); await shot('09-plan2d');
  report.checks.plan2dVisible = await page.evaluate(() => !document.getElementById('plan2d').hidden);
  await click('#btnPlanClose');
  report.checks.places = await page.evaluate(() => document.querySelectorAll('#placeList > *').length);
  report.checks.views = await page.evaluate(() => document.querySelectorAll('#viewList > *').length);
  report.checks.levels = await page.evaluate(() => document.querySelectorAll('#levelList > *').length);
  report.checks.tourStops = await page.evaluate(() => document.querySelectorAll('#tourList > *').length);
  // fps sample
  report.checks.fps = await page.evaluate(() => new Promise(r => { let n = 0; const s = performance.now(); const f = () => { n++; if (performance.now() - s < 3000) requestAnimationFrame(f); else r(Math.round(n / 3)); }; requestAnimationFrame(f); }));
  const vid = page.video(); await ctx.close(); fs.renameSync(await vid.path(), path.join(outDir, 'session.webm'));
  // 2D-only mode
  const p2 = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const e2 = []; p2.on('pageerror', e => e2.push(e.message));
  await p2.goto(base + '?mode=2d'); await sleep(4000);
  report.checks.mode2d = await p2.evaluate(() => !document.getElementById('plan2d').hidden);
  await p2.screenshot({ path: path.join(outDir, '10-mode2d.png') }); report.checks.mode2dErrors = e2;
  await browser.close(); srv.close();
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
})().catch(e => { console.error(e); process.exit(1); });

