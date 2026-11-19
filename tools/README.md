# Tools

Playwright scripts that serve a static mirror locally and drive it in headless **Microsoft Edge** (`channel: 'msedge'`). They need no Chromium download, but recording video does need `npx playwright install ffmpeg`.

```
cd tools
npm install
npx playwright install ffmpeg
node capture.js ../builds/<id> out/<id> <id>   # smoke test (console errors, external requests, 404s, fps) + stills + contact sheet
node clip.js    ../builds/<id> out/<id>-clip   # preview clip (.webm) + poster
node check.js   ../builds/<id>                 # reviewer spot-checks: search, minimap, Home, key figures, sun, free view area
```

Encode the clip for the page with ffmpeg:

```
ffmpeg -i out/<id>-clip/<file>.webm -vf scale=960:-2 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an ../videos/<id>.mp4
```

The interaction steps use element IDs from the build they were written for, such as `#btnLeft`, `#search` and `#minimap`. Every model builds its own UI, so adapt the selectors for each build; the server and smoke-test parts are generic. `capture.js` serves the build from a sub-path to prove that its URLs are relative.
