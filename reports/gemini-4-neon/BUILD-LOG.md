> Copied from the model's own run folder (`report-assets/BUILD-LOG.md`) for the public benchmark. App, environment and account identifiers are withheld; everything else is as the model wrote it. Selected process images are in [`process/`](process/).

# Build Log — Cologne Cathedral Explorer (Kölner Dom 3D, Track A)

- **Model**: Gemini 4 Neon (`gemini-4-neon`)
- **Track**: Track A (100% procedural Three.js geometry & HTML5 Canvas procedural textures, zero external runtime assets)
- **App Name**: `Cologne Cathedral Explorer (Gemini 4 Neon)`
- **App ID**: `(id withheld)`
- **Environment ID**: `(id withheld)`
- **Deployed Commit**: `2f6f50e558ae028c9af988e8050d4a1f5a515a3a` (`main`)
- **Play URL**: `(managed app link withheld)`

## Timing & Session Metrics

| Metric | Value |
| --- | --- |
| First-prompt timestamp (UTC) | `2026-11-23T21:39:51Z` |
| Deploy verified timestamp (UTC) | `2026-11-23T22:21:52Z` |
| Wall-clock total | ~42 min 01 s |
| Context compactions | 1 (immediately prior to TS alignment & visual QA) |
| Build time (`tsc -b && vite build`) | 1.00 s (Pass 2 final), 0 TypeScript errors, 0 ESLint warnings/errors |
| Bundle size | `dist/index.html` 0.49 kB, CSS 15.13 kB (3.57 kB gzip), JS 934.71 kB (255.48 kB gzip) |

## Architectural & Visual Iterations

### Iteration 1 — Full Procedural Cathedral & UI Build (`process/01_contact-sheet-pass1.jpg`)
- Built 1:1 metric Kölner Dom (`src/scene/buildCathedral.ts`, `src/scene/geometryHelpers.ts`, `src/scene/textures.ts`, `src/data/cathedralData.ts`, `src/scene/CathedralViewport.tsx`, `src/App.tsx`, `src/components/*`).
- Verified locally on Edge hardware-accelerated WebGL (`1440×900` and `1024×768`):
  - Initial load: 2.82 s, 60 FPS (exterior & X-ray), 148,608 triangles, 0 console errors, 0 page errors, 0 failed/external requests.
  - Numeric zoom verification passed for on-screen buttons and `+`/`-` keys.
- **Visual & telemetry issues caught by inspecting `process/01_contact-sheet-pass1.jpg` + pixel histograms**:
  1. **Exterior stone too dark (`meanRGB=(57,67,73)`)**: `textures.ts` generated dark sRGB blocks (`baseL=56..102`) which multiplied by `exteriorStone.color (#c2b8aa)` produced ~0.04 linear reflectance, obscuring Gothic piers, buttresses, and tracery in shadow.
  2. **Night floodlighting severely overexposed (`meanRGB=(166,162,154)`)**: Three.js `SpotLight` with `decay=1.4` and `intensity=28000` at ~85 m produced ~55× illuminance, blowing out the towers to pure white.
  3. **Spire tips slightly cropped on default SW / West / East views**: The 157.22 m Kreuzblume finials touched or exceeded the upper viewport edge.
  4. **Longitudinal Section view framing & search input focus**: Selecting a POI from search kept focus in the search `<input>`, blocking subsequent numeric viewpoint hotkeys (`1`–`9`), and toggling Longitudinal Section from an interior close-up did not reframe the full cut profile.
  5. **Below-ground excavations (`L-2`) lighting**: Domgrabung ruins were dim without dedicated museum point lights.
  6. **1024×768 resize responsiveness**: Left rail only auto-collapsed on initial mount rather than dynamic viewport resize.

### Iteration 2 — Material, Lighting, Framing & UX Polish (`process/02_contact-sheet-pass2.jpg`)
- **Material & Texture calibration**: Raised weathered Drachenfels sandstone/trachyte albedo (`baseL=114..166` in `textures.ts`, `#e6dfd4` tint in `geometryHelpers.ts`, matching spire openwork palette `#998f81`–`#c0b5a4`) and daytime hemisphere/fill balance (`0.98` / `0.72`).
- **Night Floodlighting calibration**: Reduced floodlight spotlight intensities from `28000`/`19000` to `1450`/`950` against `#070d1a` starry sky, achieving balanced golden architectural illumination (`meanRGB=(80.8, 74.7, 65.0)`).
- **Camera framing**: Pulled SW default (`hero-sw`), `west-front`, and `chevet-east` viewpoints back ~25% and raised target elevation (`64 m` / `76 m` / `58 m`) so both 157.22 m openwork spires + finials sit cleanly inside the frame.
- **Below-ground museum lighting**: Brightened Roman/Carolingian stone & earth contrast (`#d2b48c` / `#776550`) and added three warm museum `PointLight`s inside Domgrabung and Archbishops' Crypt.
- **Interaction polish**: Blurred active input on POI click, auto-framed side architectural elevation when enabling Longitudinal Section Cut, and added dynamic resize auto-collapse for viewports `< 1120px`.
- **Pass 2 QA Results (`qa-results-pass2.json`)**:
  - Load time: **2.86 s**
  - Performance: **60 FPS** in Exterior and **60 FPS** in X-Ray (`149,530` triangles, `18` procedural textures)
  - Errors/Network: **0** console errors, **0** page errors, **0** failed requests, **0** external network requests (strict `'self'` CSP compliant)
  - Layout bounds: **0** overflows or clipped panels at both `1440×900` and `1024×768`
  - Numeric zoom verification: Before `235.06 m` → 2× Zoom In btn `158.05 m` → 3× Zoom Out btn `287.00 m` → `+` key `241.08 m` → 2× `-` key `341.39 m` → mouse wheel `301.85 m` (`all_verified: true`)

## Saved Report Assets (`report-assets/`)

- `process/01_contact-sheet-pass1.jpg` — Iteration 1 (12-panel overview before lighting/albedo polish)
- `process/02_contact-sheet-pass2.jpg` — Iteration 2 final (12-panel verified release overview)
- `pass2-01-exterior-default.png` — Default SW view (Domplatte, twin spires, Hohenzollern Bridge, Rhine)
- `process/03_pass2-02-west-facade.jpg` — Symmetrical 157.22 m twin-tower West Facade
- `pass2-03-east-chevet.png` — Chevet from East (7 radiating chapels, flying buttresses, pinnacle forest)
- `pass2-04-interior-nave.png` — Interior Nave looking east to 43.35 m rib vaults, High Choir & Shrine of the Three Kings
- `process/04_pass2-05-richter-window.jpg` — Gerhard Richter Window (11,263-square stained glass) + POI detail drawer
- `pass2-06-xray-mode.png` — X-Ray translucent masonry revealing structural skeleton & stained glass (60 FPS)
- `process/05_pass2-07-longitudinal-section.jpg` — Longitudinal section cut revealing 1860 red wrought-iron roof truss & nave section
- `pass2-08-excavations-L-2.png` — Below-ground Level L-2 Archaeological Excavations & Archbishops' Crypt
- `process/06_pass2-09-south-tower-climb.jpg` — South Tower Climb mode (533 steps, translucent stone, glowing helical stair & 97.25 m platform)
- `pass2-10-guided-tour-facts.png` — Guided Tour dock + 3D Key Facts measurement callout
- `process/07_pass2-11-night-floodlighting.jpg` — Night Floodlighting mode with starry sky & glowing stained glass
- `pass2-12-laptop-1024x768.png` — Responsive 1024×768 laptop viewport
- `qa-results.json` / `qa-results-pass2.json` — Raw Playwright telemetry, layout bounds, and pixel statistics
