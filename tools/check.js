// Independent reviewer spot-checks on the static mirror (no handler invocation, UI only).
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [buildDir] = process.argv.slice(2);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const srv = http.createServer((q, s) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(path.resolve(buildDir), p); if (!fs.existsSync(f)) { s.writeHead(404); return s.end(); } s.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  await new Promise(r => srv.listen(0, r));
  const b = await chromium.launch({ channel: 'msedge', headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist'] });
  const out = {}; const errs = [];
  for (const vp of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }]) {
    const p = await b.newPage({ viewport: vp }); p.on('pageerror', e => errs.push(e.message));
    await p.goto(`http://127.0.0.1:${srv.address().port}/`);
    await p.waitForFunction(() => { const l = document.getElementById('loader'); return l.hidden || getComputedStyle(l).display === 'none' || getComputedStyle(l).opacity === '0'; }, null, { timeout: 120000 });
    await sleep(1500);
    const k = `${vp.width}`;
    // canvas visible fraction not covered by panels
    out[k + '_viewFraction'] = await p.evaluate(() => { const W = innerWidth, H = innerHeight; let free = 0, n = 0; const els = [...document.querySelectorAll('.panel,#topbar')].filter(e => !e.hidden && e.offsetParent); for (let x = 5; x < W; x += 20) for (let y = 5; y < H; y += 20) { n++; const hit = els.some(e => { const r = e.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; }); if (!hit) free++; } return +(free / n).toFixed(2); });
    if (vp.width === 1440) {
      const shot = async () => (await p.locator('#view').screenshot()).length;
      for (const term of ['Richter', 'shrine', 'bell']) { await p.fill('#search', term); await sleep(400); out['search_' + term] = await p.evaluate(() => document.getElementById('placeCount').textContent.trim()); }
      await p.fill('#search', '');
      const a = await p.locator('#view').screenshot(); await p.click('#minimap', { position: { x: 200, y: 60 } }); await sleep(2500); const bb = await p.locator('#view').screenshot();
      out.minimapMovesCamera = !a.equals(bb);
      await p.click('#btnHome'); await sleep(2500); const h1 = await p.locator('#view').screenshot();
      await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft'); await sleep(800); await p.click('#btnHome'); await sleep(2500); const h2 = await p.locator('#view').screenshot();
      out.homeRestores = h1.length && Math.abs(h1.length - h2.length) / h1.length < 0.02;
      await p.click('#btnFigures'); await sleep(1200); out.keyFigureLabels = await p.evaluate(() => [...document.querySelectorAll('#labels *')].map(e => e.textContent.trim()).filter(t => /\d/.test(t)).slice(0, 14));
      await p.click('#btnFigures');
      await p.click('#tab-light'); await p.fill('#rngTime', '8'); await p.$eval('#rngTime', e => e.dispatchEvent(new Event('input', { bubbles: true }))); await sleep(400); out.sunAt8 = await p.evaluate(() => document.getElementById('sunInfo').textContent.trim());
      await p.click('#tab-levels'); const lv = await p.$$('#levelList > *'); out.levelLabels = await p.evaluate(() => [...document.querySelectorAll('#levelList > *')].map(e => e.textContent.replace(/\s+/g, ' ').trim()));
      if (lv.length > 2) { await lv[lv.length - 2].click(); await sleep(2500); out.levelBelowPlaceCount = await p.evaluate(() => document.getElementById('placeCount').textContent.trim()); }
      // keyboard reachability
      out.unnamedButtons = await p.evaluate(() => [...document.querySelectorAll('button,input,select,[tabindex]')].filter(e => e.offsetParent && !(e.getAttribute('aria-label') || e.textContent.trim() || e.labels?.length || e.title)).length);
      await p.click('#btnAbout'); await sleep(500); out.aboutLinks = await p.evaluate(() => document.querySelectorAll('#aboutBody a').length); out.aboutApprox = await p.evaluate(() => /approximate|interpretation/i.test(document.getElementById('aboutBody').textContent));
    }
    await p.close();
  }
  out.errors = errs; console.log(JSON.stringify(out, null, 2)); await b.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
