> Copied from the model's own run folder (`report-assets/BUILD-LOG.md`) for the public benchmark. App, environment and account identifiers are withheld; everything else is as the model wrote it. Selected process images are in [`process/`](process/).

# BUILD-LOG - Cologne Cathedral Explorer (Track A, procedural geometry)

Model: Claude Sonnet 5.5 (GitHub Copilot app, autopilot). Track A: every vertex is generated in code at load time.

## Timing
- First prompt: 2026-11-19T13:26:56Z
- Skeleton deployed and hosted-verified: ~13:44Z. Full-UI build deployed 16:22Z. Final build deployed **16:47:46Z**
  (commit `5445328d90634a49a1c5c00c71941142516cbf0d`), hosted-verified 16:48-16:50Z.
- Finish (self-check table delivered): **~16:55Z**. **Wall-clock total: ~3 h 28 min (~208 min)** from first prompt to finish;
  3 h 21 min from first prompt to the final deploy.
- Model vs tool breakdown (local session store `assistant_usage_events`, this session only, read at 16:51Z):

  | Bucket | Requests | Time | Note |
  |---|---|---|---|
  | Agent main loop (model generation) | 349 | **172.2 min** (~83% of wall-clock) | longest single request 514 s |
  | Context compaction (history summarisation) | **28** | 53.0 min | longest 289 s; overlaps other activity (request time sums to ~225 min vs ~208 min wall-clock) |
  | User turn | 1 | 0.1 min | the kickoff prompt; no further user input (autopilot) |
  | Tool execution and waiting (derived) | n/a | **~36 min** (= wall-clock - main-loop generation) | builds (~0.2 s), `ms app deploy` (~7 s each), headed-Edge QA runs (a hosted run takes ~60 s incl. a ~15 s account sign-in), screenshot specs, file I/O; derived by subtraction, not timed per call |

  Tokens, as of 16:42Z: 49.0 M input (46.1 M served from cache), 1.86 M output (1.05 M of it reasoning).
  The cloud `tool_executions` view only covered up to 15:12Z (198 calls, 6.2 min) because the long QA runs were async
  and overlapped model time, so it understates tool time; the subtraction above is the better estimate.
- Compactions: **28** (the store counts 28 compaction requests; I saw 27 checkpoint summaries). Continuity across them came from
  files, not memory: `BUILD-LOG.md`, the `tools\*.mjs` harnesses/specs, and the `iterations\` outputs.

## Iteration 0 - orientation + hosted skeleton (13:26-13:45Z)
- Read BRIEF / RUBRIC / RESEARCH-LINKS; studied references (E01, X01, X05, X17, S01, S02, I01, I26, plan P02).
- Measured the pier grid from the P02 plan image (script in session files): bay pitch ~7.85 m, central nave 15.7 m c/c,
  four-row pier layout (5 aisles), wall inner face +-22.6 m, transept end walls +-39.2 m, 7-chapel chevet.
- Official figures (koelner-dom.de): towers 157.22/157.18 m, length 144.58 m, transept width 86.25 m, nave 43.35 m high,
  crossing tower 109.12 m, 533 steps to platform at 97.25 m.
- Scaffolded `ms app create` project, replaced template with vanilla-JS Vite + three.js.
- Deployed a spinning-cube skeleton: `ms app deploy` takes ~6 s; hosted-player check (Playwright + Edge, headed,
  anti-throttle flags) proved WebGL + bundled three + CSP (`script-src 'self'`, no workers/eval) all work.
  Screenshot: `iterations/000-skeleton-player.png`.
- Decision log: custom flat-shaded GeoBuilder (no external models), canvas-generated textures, shader patches for
  section poche (back-face colour when clipped), local clipping planes for the horizontal and E-W cuts.

## Iteration 1 - first geometry: shell and silhouette (first renders saved 15:17Z)
- Modules: `plan.js` (measured grid), `body.js`, `apse.js`, `towers.js`; twin openwork spires, octagonal belfries, crossing
  flèche, gabled transept ends, 7-chapel chevet, buttresses. Images: `iterations/001/` (aerial, chevet, square, west).
- Reasoning: get the silhouette and plan proportions right first (rubric V1 + V2 = 35 points) before any detail.
- Defects seen: lead roofs too pale, flat grey plaza, no context. Both addressed in Iteration 2.

## Iteration 2 - context, interior, below ground, views, cuts (15:40Z)
- Added terrain, plaza paving, town houses, Hauptbahnhof hall and viaduct, trees, Rhine ribbon and Hohenzollern Bridge
  (`context.js`); nave/aisle/choir vaults, triforium, clerestory (`vault.js`, `interior.js`); crypt and excavations
  (`below.js`); furniture and artwork (`furn.js`); 13 named views; horizontal and longitudinal cut planes with a poche shader.
- Images: `iterations/002/` (aerial, attic, chevet, choir, cut-crypt, cut-exc, cut-long, nave, square, west).
- Triangle budget (final): shell 24,968; vault 17,072; below ground 5,526; furniture 7,298; context 9,490; interior total 42,336.

## Iteration 3 - full UI (16:18-16:20Z)
- Explore dock (Levels, Views, Tour, Cuts, Light, Facts, Climb), Search and info drawer, minimap with Wide mode, hotspots,
  compass/place labels, loading indicator, About/Credits modal, 2D fallback. Contact sheet: `iterations/003-contact.png`
  (tiles in `iterations/003/`).
- Bugs found and fixed here: `Element.append(array)` stringified the array (spread the nodes instead); the poché colour uniform
  must be supplied in LINEAR space (it rendered washed-out); lead tints retuned.

## Iteration 4 - first hosted verification (16:23-16:26Z)
- Played the 16:22Z build in the real hosted player (headed Edge, Windows-account sign-in) at 1440x900 and 1024x768:
  60 fps in exterior, x-ray and interior; clean console. Contact sheets: `iterations/004-hosted-1440-contact.png`,
  `iterations/004-hosted-1024-contact.png`. (The `1440x900-*.png` files in `iterations/004-hosted/` are this pre-fix build;
  the `1440-*` / `1024-*` files are the final build.)

## Iteration 5 - functional, touch and fallback QA (16:28-16:31Z)
- Search, info panel, tab order and visible focus ring, minimap click-to-move, Home/Reset, no storage use, no external requests
  (`iterations/005/`). Touch via CDP emulation: orbit, pinch in/out, two-finger pan (`iterations/005c/`). 2D fallback with WebGL
  stubbed out (`iterations/005d/`); made the fallback card sticky after seeing it scroll away.

## Iteration 6 - the floating-slab artefact in the nave (16:33-16:37Z)
- Symptom: a blue-grey trapezoid and rectangle hovering in the interior nave view. Method: layer bisect (toggle each layer
  mesh, render, diff a region of the canvas) plus `__app.probe(x,y)` for the first hit.
- Root cause: the transept aisle lean-to lead roofs in `body.js` spanned z -40.2..+40.2 and cut through the nave. Fix: four quads
  covering only |z| 8.9..40.2; region diff after the fix = 0. Before/after: `iterations/006-interior-fix-before-after.png`.
- Also: compass/place labels are now occluded by the building in the exterior view (the "Hauptbahnhof" label no longer shows
  through the towers); the apse radial rib that dropped below the springing was fixed.
- Deployed 16:37:01Z (commit 797a6f8a).

## Iteration 7 - hosted verification of the 16:37Z build (16:38-16:42Z)
- 1440x900 and 1024x768, real player, Adreno X1-85 via ANGLE/D3D11: 10 s exterior 60 fps (601 frames), 10 s x-ray 60 fps,
  interior 60 fps; app loads in ~1.4-1.6 s (the ~15 s the harness reports includes sign-in); loading indicator seen
  (`loadingShown:true`, "Starting"); only platform iframe/auth debug lines in the console.
- Stats: 36,320 tris, 49 draw calls, 77 geometries, 16 textures in the default exterior; ~85k tris in the interior.
  Contact sheets: `iterations/007-hosted-1440-contact.png`, `iterations/007-hosted-1024-contact.png`; logs `007-hosted-*.txt`.
- Progress overview: `process/01_progress-strip.jpg` (first aerial -> second aerial -> final default view).

## Iteration 8 - M8 audit and fix: the Rhine and the bridge (16:44-16:50Z)
- Audit (`iterations/008/`): geometry for the Rhine and the Hohenzollern Bridge existed (river ribbon x 300..640, quay, stone
  viaduct, three lattice arches, labels, Wide minimap), but two views missed them: the "Rhine bank" preset (key 0) stood behind the
  river's west edge and showed no water, and the bridge hotspot focus flew into a view full of rooftops.
- Candidates (`iterations/009/`) -> fix: key-0 view now stands on the Deutz bank and looks west across the water
  (pos 636,30,20 -> 10,52,-75); the bridge hotspot sits on the first arch crown (361,32,-205) with a focus offset that frames the
  spans from the south-west bank. Before/after: `iterations/010-m8-before-after.png`.
- Deployed **16:47:46Z** (commit 5445328d). Hosted check (`iterations/011-hosted/`, `011-hosted-1440.txt`, `011b-hosted-1440.txt`):
  60.1 fps exterior (10 s), 60.1 fps in the Rhine view, 60 fps interior; console clean; bridge hotspot lands on the arch; key 0
  flies to the Rhine view in the hosted player. (First attempt "missed" key 0 only because the harness had not given the iframe
  keyboard focus; after one click inside the app it worked, as for a real user.)

## Final measurements
- Bundle: JS 652.42 KB (180.81 KB gzip), CSS 14.41 KB, no external requests, no storage use.
- Local ready ~2.0 s; hosted app load ~1.4-1.6 s. Local fps 41-60 (interior 41-51 on the dev harness, adaptive pixel ratio);
  hosted fps 60 in every mode at both viewport sizes.
- Bugs fixed during the build: `append(array)` stringification, poché colour space, lead tints, transept lean-to roof
  intruding into the nave, label occlusion, apse rib, sticky fallback card, hosted loading indicator, Rhine/bridge views.

## Known gaps (accepted and disclosed)
- The Richter window mosaic reads as noise at close range; far terrain beyond the town is flat green and the dark ground-slab edge
  shows from low angles; the "Domplatte" label can sit under the left dock at 1440 px.
- Hotspot buttons come before the top bar in tab order; the minimap hotspot markers are small.
- Several artwork, crypt, treasury and excavation positions and the interior levels (triforium, attic, crypt, excavations) are
  approximate and labelled as such; the 533-step climb is a schematic route, not a literal helix.
- Fallback was verified with WebGL stubbed out, not with WebGL actually disabled; touch was verified with CDP emulation, not on a
  real device.
- The model is an approximate interpretation, not a survey-accurate reconstruction.
