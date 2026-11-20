> Copied from the model's own run folder (`report-assets/BUILD-LOG.md`) for the public benchmark. App, environment and account identifiers are withheld; everything else is as the model wrote it. Selected process images are in [`process/`](process/).

# Cologne Cathedral Explorer — Track A Benchmark Build Log

- **Model:** Gemini 4 Carbon (`gemini-4-carbon`)
- **Track:** Track A (100% in-app procedural 3D geometry & Canvas2D procedural PBR textures; zero external `.glb`/`.obj`/CDN runtime assets)
- **Managed App Display Name:** `Cologne Cathedral Explorer`
- **App ID:** `(id withheld)`
- **Environment ID:** `(id withheld)`
- **Deployed Commit:** `57c800f407852421b2ab92ae4fd182bee7e58e04`
- **Live Play URL:** `(managed app link withheld)`

---

## 1. Completion Timing & Session Telemetry

| Metric | Value | Notes |
| --- | --- | --- |
| **First Prompt Timestamp** | `2026-11-19T18:46:08.083Z` | Initial Track A benchmark kickoff |
| **Session Interruption & Resume** | Resumed at `2026-11-19T19:21:22.332Z` | Includes operator session interruption gap between initial research/scaffolding and continuation |
| **Live Deployment Timestamp** | `2026-11-19T21:23:36.443Z` | `ms app deploy` completed on platform-managed Git commit `57c800f` |
| **Final Verification Timestamp** | `2026-11-19T21:37:30.871Z` | Live `play.managedapps.cloud.microsoft` WebGL2 + CSP + numeric zoom verification complete |
| **Total Wall-Clock Elapsed** | **2 h 51 m 23 s** (`171.4 min`) | End-to-end wall clock from first prompt (`18:46:08Z`) to verified live app (`21:37:31Z`), including interruption window |
| **Active Build & Verification Time** | **~2 h 22 m** (`~142 min`) | **Tool / Build / Playwright / Cloud Deploy time:** ~54 min · **Model architecture, procedural geometry & visual QA reasoning:** ~88 min |
| **Context Compactions** | `4` | Preserved full file state, todos, and iteration telemetry across 4 automatic context summaries |

---

## 2. Saved Process Visuals (`report-assets/`)

1. **`process/01_01-reference-palette-calibration.jpg`** — Archival photograph & engraving calibration board sampling real-world weathered Drachenfels trachyte/sandstone (`#544b42`–`#8a7e70`), patinated lead roof (`#697684`), warm interior Obernkirchen/Caen limestone (`#ddd1bc`), medieval & 19th-century stained glass, and the 72-colour Gerhard Richter south transept window.
2. **`process/02_02-iteration1-renders.jpg`** — 8-panel Iteration 1 baseline contact sheet capturing initial procedural massing and surfacing specific geometric/camera issues for refinement.
3. **`process/03_03-iteration2-refined-contact-sheet.jpg`** — 12-panel Iteration 2 contact sheet showing the refined cathedral across exterior, interior, longitudinal section, subterranean `L-2` Domgrabung, Night Floodlights, X-Ray 533-step South Tower climb, and `1024×768` tablet layout.
4. **`04-live-managed-app-verification.png`** — Authenticated screenshot of the live deployed app running inside Copilot Managed Runtime at `(managed app link withheld)` ((player host withheld)).
5. **`process/06_05-about-credits-and-csp-qa.jpg`** — Verification capture of the About & Source Credits modal and strict Managed Runtime CSP test (`0` CSP violations, `0` console errors, `0` external network requests).

---

## 3. Iterative Engineering Log (Measurements & Visual Reasoning)

### Phase 1 — Research & Proportional Calibration
- Cross-checked official Cologne Cathedral dimensions (`koelner-dom.de` and Wikipedia): **144.58 m** exterior length, **86.25 m** transept width, **45.19 m** 5-aisled nave width, **61.54 m** West Facade width, **157.22 m** North Tower / **157.18 m** South Tower (`Kreuzblumen` finials), **43.35 m** interior nave vault crown, **~61 m** roof ridge, **109.12 m** crossing ridge turret, **97.25 m** South Tower viewing platform (**533 steps**), **~53 m** bell chamber (*Petersglocke*, 24,000 kg), and **-2 m to -6.5 m** Archiepiscopal Crypt & *Domgrabung* Roman/Carolingian excavations.
- Separated researched architectural data (`src/data/cathedralData.ts` + `src/data/referenceCredits.ts`: 8 vertical levels `ALL` + `L-2..L5`, 24 POIs, 12 camera viewpoints, 10-stop guided tour, 8 3D key-fact dimension leaders, 5 tower-climb stages, and 26 bundled CC/PD reference thumbnails in `public/ref-thumbs/`) cleanly from procedural geometry builders (`src/geometry/*`).

### Phase 2 — Iteration 1 Baseline & Visual Inspection Findings
- Built merged `GeometryBucket` procedural builders (`165.4k` triangles merged by material into `22–39` draw calls) with logarithmic depth buffer (`logarithmicDepthBuffer: true`) to prevent coplanar z-fighting from `2.5 m` sanctuary close-ups out to `400 m` Rhine vistas.
- **Visual findings from `process/02_02-iteration1-renders.jpg`:**
  1. **Köln Hauptbahnhof orientation bug:** `addCylinder` only rotated around `Y`, causing the `96 m` train-shed barrel roof north of the cathedral to stand vertically like a silo instead of lying horizontally along the tracks; similarly the Gero Cross sunburst disc faced vertically rather than West.
  2. **Spire framing & upward gaze clamping:** `OrbitControls.maxPolarAngle = 0.495π` prevented upward camera pitch (`camera.y < target.y`), clamping interior crossing cameras up to `y = 24.9 m` and clipping the upper `157.22 m` finials in tight exterior presets.
  3. **Exterior window & aisle socle fidelity:** Lower aisle windows extended too close to pavement without a High Gothic stone socle/water-table, lacked stone mullions, and stained glass had overly high exterior daylight `emissiveIntensity` (`0.85`).
  4. **Domplatte footprint seams & 3D pin clutter:** Small sky-gaps appeared around the semicircular chevet and SW transept steps when `groundCapMesh` matched only the interior floor polygon, and showing all 24 full-text pill labels simultaneously crowded the West Facade.

### Phase 3 — Iteration 2 Architectural, Material & Performance Refinements
- **Geometry & Precinct Fixes:** Added full `(rotX, rotY, rotZ)` Euler support to `addCylinder` so Köln Hauptbahnhof's barrel-vault roof lies horizontally north of the Domplatte and the Gero Cross golden sunburst faces West. Merged `150 m × 64 m` longitudinal and `42 m × 94 m` transept stone Domplatte aprons into `groundCapMesh` (sealing all exterior sky-gaps while hiding automatically in `L-1` / `L-2` subterranean views).
- **High Gothic Stonework & Sanctuary Detail:** Added `5.4 m` stone socle walls with water-table ledges, 3 stone mullions per aisle/chapel/tower window, vertical blind-tracery shafts (*Blendmaßwerk*) and portal jamb colonnettes on the West Towers, thicker pale-stone double-tier flying buttresses (`0.62 m × 0.85 m` flyers + 3 spandrel struts), painted Gothic choir screens (*Chorschranken*), and micro-colonnettes on the Shrine of the Three Kings.
- **Physically Grounded Glass & Camera Pitch:** Differentiated `setNightFactor(nightFactor, isInterior)` so stained glass reads as dark recessed jewel-toned glass from outside by day (`emissiveIntensity = 0.18–0.28`), glows richly inside (`0.72–1.05`), and illuminates warmly under Night Floodlights (`+1.35`). Relaxed `controls.maxPolarAngle` to `0.85π` (paired with explicit ground-plane `Y` clamping) and linked each named `ViewpointSpec` to a matching `focusPoiId` so both spire tips fit cleanly in frame and the Inspector Drawer updates contextually.
- **60 FPS Rendering Optimization:** Switched `renderer.shadowMap.autoUpdate = false` (triggering shadow-map renders only when solar hour or cutaways change), capped `devicePixelRatio` at `1.5`, and streamlined interior point lights to 2 high-efficiency sources — raising interactive frame rates to **37–60 FPS** across exterior, interior, X-ray, and tablet views (`165,386` triangles, `22–39` draw calls).

### Phase 4 — Cloud Deployment & Managed Runtime Verification
- Cleared shell-injected `GIT_*` config overrides (`credential.interactive=never`), pushed commit `57c800f407852421b2ab92ae4fd182bee7e58e04` to the Power Platform repository, and deployed via `ms app deploy` (`2026-11-19T21:23:36Z`).
- Verified both the packed bundle under strict Copilot Managed Runtime CSP (`default-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; worker-src 'none'`) — **0 CSP violations, 0 console errors, 0 external network requests, numeric scene zoom `242.07 m → 183.97 m → 301.41 m`** — and authenticated directly into the live cloud player at `(managed app link withheld)` (`04-live-managed-app-verification.png`).
