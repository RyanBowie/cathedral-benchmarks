> Copied from the model's own run folder (`report-assets/BUILD-LOG.md`) for the public benchmark. App, environment and account identifiers are withheld; everything else is as the model wrote it. Selected process images are in [`process/`](process/).

# Cologne Cathedral Explorer — Track A

Managed app link withheld from the public repo. The `dom-atlas` directory contains the source and build instructions. This is one app, developed from one user kickoff. The research pack was not modified; none of its images is in the deployment.

## What changed during the build

| Stage | Observation and decision | Evidence |
|---|---|---|
| Research | Hasak's plan and P02 distinguish the five-aisled nave from the three-aisled transept. Plan F and the exterior photographs show where square towers become pierced octagons. The choir section and interior photos establish the order of the great arcade, triforium, clerestory and vault. The shared mesh/plan coordinates follow these relationships, not a tracing of an elevation or a downloaded model. | Supplied P01, P02, E01, S01, X01, X03, X05, X17, X21, I01, I04 and I26; fact sources below. |
| First build | The external silhouette read well, but the platform camera looked into its parapet and an attic truss obscured the centre of its plate. Wide exterior views also made the nave too small on the navigator. | `process/01_01-local-overview.jpg`, `process/02_01-local-plates.jpg` (local production build, not native evidence). |
| Architecture and framing | Moved the platform eye to a clear outward view and set the attic eye between trusses. Capped the off-map camera indicator at the plan edge rather than shrinking the plan. Added vault surfaces over the ambulatory and chapels, more depth in the west portals and spire tracery, and a partial cut through the south bell chamber instead of stripping its whole setting. | `process/03_02-local-overview.jpg`, `process/04_02-local-levels.jpg` (local production build). |
| Interaction | An initial emulated touch drag did not move the camera. Testing an unobstructed canvas region and recording trusted pointer events separated an overlay hit from an orbit failure. Pinch, one-finger orbit and two-finger pan all moved the expected camera coordinates. | `native-check-navigation-touch.json`; final evidence is under `verified`. |
| Performance | A ten-second **full-render** measurement returned 60.1 fps outside but **20.8 fps in X-ray**. Replaced textured/lit transparent shell material with an unlit translucent material, dropped minor exterior ornament only in X-ray, and limited X-ray pixel ratio to 1. This kept the internal piers, ribs, trusses and fittings visible. The first optimized check returned 60.0 / 60.1 fps; the final release was measured separately. | `native-check.json` is the original baseline. Use `verified\native-check.json` for the release result. |
| Delivery polish | The first final-image inspection caught a broken header glyph even though the app had no console errors and its assets were same-origin. Embedded the original SVG mark at build time instead of using a separate image request. The final player check decodes the image and verifies its intrinsic dimensions. | `verified\final-managed-app.png`; `brand` in both final JSON files. |

## Reproduce the self-check

Use the live app with its normal managed-player access. The frame meter is in **Scene studio → Measure 10 seconds**. Measure **Exterior** and **X-ray** separately: it renders the actual scene rather than counting idle callbacks. **Home** resets the visit before a new check.

`native-check.py` drives the hosted app via normal Edge/Playwright input in a temporary profile. It does not expose a debug action API, call app handlers, seed records or change permissions. It reads settled camera coordinates and counts from the UI, checks real rendered pixels, and keeps only the final native screenshot. For a repeat, the maker can supply their already-connected account as `DOM_QA_OWNER`; the script contains no credentials.

```powershell
python .\report-assets\native-check.py '<managed app play URL>' .\report-assets\repeat
python .\report-assets\native-check.py '<managed app play URL>' .\report-assets\repeat --fallback
```

The second invocation disables WebGL when launching the browser. It checks the explanatory notice, 24 selectable places, keyboard selection, zoom, pan and a level filter in the plan edition. Touch was emulated, not tested on a physical tablet. Geometry and furnishings are interpretive; the key-facts overlay quotes published dimensions, not measurements inferred from the mesh.

## Final release and timing

The final release, `dd420857ff29442db6bbef607b6c87f9c35933b6`, passed lint and the TypeScript/Vite production build. Edge loaded the matching `index-5Iht-mro.js` and `scene-Zhk-pQRL.js` from the managed application. All 21 normal-player check groups and both disabled-WebGL check groups passed. The normal run recorded no application console warnings, uncaught exceptions or external resource origins. With WebGL disabled the app emitted the expected fallback warning. The final image was inspected at its native 1440 × 852 embedded-app size.

| Time observation | Value |
|---|---|
| First prompt | 2026-11-19 10:29:40.915 UTC |
| Verified app completion (final native results written) | 2026-11-19 11:06:50.785 UTC |
| Elapsed from prompt to verified completion | **37 min 9.87 s** |
| Completed model calls by that instant | 91; **33 min 30.67 s** of recorded request duration |
| Tool-call wall time | **3 min 22.39 s** across the union of call intervals, counting overlaps once |
| Context compactions | 1; **1 min 50.23 s**, with no recorded blocking wait |

These are different clocks: background browser work and compaction can overlap model or tool calls. Do not add the three durations. The finish boundary is the completed app check, not later report writing. No independent reviewer score or cumulative Cowork cost is claimed.

## Section 6 self-check

| ID | Status | How verified |
|---|---|---|
| R1 | Passed | Opened the live release in its embedded player and completed the normal-use checks without an application console warning or uncaught exception. |
| R2 | Passed | Checked the procedural builders and live 3D scene. With WebGL disabled, selected the shrine by keyboard, zoomed and panned the plan, and filtered it to the crypt. |
| R3 | Passed | The final resource trace contained only same-origin scripts and CSS. The original interface mark decoded from embedded SVG; no photo, font or model download was required. |
| R4 | Visually checked | Compared the overview, west and aerial plates with P02, E01, X01 and X17. The west towers dominate the elongated cross; the choir extends well past the short transept. |
| M1 | Visually checked | The west plate and spire level show square bases, eight-sided open stages, daylight through the spire lattice and finials. |
| M2 | Visually checked | Counted the central nave and two aisles on each side in the floor cut. The three-aisled transept, gabled ends and long eastern choir are visible in plan and exterior views. |
| M3 | Visually checked | Followed the curved ambulatory on the plan and counted the seven radiating chapels around the eastern apse. |
| M4 | Visually checked | The overview and eastern chevet show repeated flying arches spanning aisle roofs and landing on pinnacled piers. |
| M5 | Visually checked | The roof and spire views show steep lead roofs meeting beneath the slender crossing tower and its gilded star. |
| M6 | Visually checked | The nave and high choir plates show clustered shafts, ribbed vaults, triforium, coloured clerestory glass and raised choir furnishings. |
| M7 | Passed | Selected both below-ground levels. The excavation walls and walkway differ from the arcaded crypt; the crypt marker flew the camera to −2.7 m. |
| M8 | Visually checked | Inspected the west and south paving, the Rhine east of the cathedral and the arched bridge to the north-east. The navigator labels all four compass directions. |
| N1 | Passed | Mouse, keyboard and emulated touch moved the camera. Pinch reduced eye-to-target distance from 296.33 to 164.63; two-finger pan shifted the target; the above-ground limit stopped at +0.75 m. |
| N2 | Passed | Flew to all nine named viewpoints. Each produced a distinct frame and camera position; a sampled flight had a distinct intermediate position. |
| N3 | Passed | Changed lighting, map and level, then pressed Home. All-level exterior, default controls and the original camera returned, with zero measured camera difference. |
| N4 | Passed | Opened the west-portal marker and used Fly to. Repeated from the shrine index entry and the crypt marker; the camera arrived at the selected subject. |
| F1 | Passed | Selected all nine named levels and read their approximate elevations, from excavations at −8 m to spire tips at +157 m. |
| F2 | Passed | Every level produced a distinct view, cut and filtered marker set. The cathedral floor offered 12 pins; the crypt and bell chamber each offered one. |
| F3 | Passed | Switched between exterior, eye-level interior and X-ray. Each rendered a distinct scene; the translucent shell retained the internal structure. |
| F4 | Passed | Adjusted the horizontal cut to 75 m and toggled the east–west longitudinal section. Full, horizontal-only, vertical-only and combined views produced different frames. |
| F5 | Passed | Checked the level label, plan markers and directional camera arrow. Clicking the navigator moved the camera and its indicator; distant views use an off-map indicator. |
| I1 | Passed | Opened all 24 entries and checked their name, level, zone and fact, including the 17 required subjects. Also opened markers directly in the rendered scene. |
| I2 | Passed | Searched for “Richter”, “shrine” and “bell” and inspected the results under their level and zone headings. |
| I3 | Passed | Visited all eight required stops via Next, used Previous and Restart, observed Play advance, and verified Pause held the current stop. |
| I4 | Passed | Toggled seven model-anchored labels and compared them with the cathedral chapter’s figures, including 157.22 m south tower, 144.58 m length and 43.35 m central-vessel height. |
| I5 | Passed | Compared 06:00, daytime, 18:00 and floodlit night outside, then switched the illuminated glass between day and night from inside the nave. |
| I6 | Passed | Traced the south-tower route through the spiral, bell frame, stair change and 97.25 m platform. Checked the 533 steps against the official climb description. |
| Q1 | Passed on test laptop | Observed the generation indicator. Ten seconds of full renders gave **60.0 fps exterior and 60.0 fps X-ray** at the 1440 × 900 player size. Host graphics: Qualcomm Adreno X1-85. |
| Q2 | Passed | At 1440 × 900 and 1024 × 768 the scene retained 1148 × 604 and 805 × 507 pixels respectively. The controls worked and the document did not overflow. |
| Q3 | Passed in browser | Traversed enabled controls by Tab in eight UI states; verified accessible names, visible focus, the 24-entry DOM list and Escape on dialogs. A reduced-motion flight arrived within 75 ms. |
| Q4 | Passed | Opened About by keyboard; verified seven research links, the no-reference-images statement and the explicit “approximate educational model, not a survey” notice. |
| Q5 | Visually checked | Reviewed the final desktop and tablet layouts and the interior/exterior plates: numbered controls, readable guide hierarchy, weathered stone, grey lead, warm piers and coloured glass. |

## Sources

Cologne Cathedral chapter: [published dimensions](https://www.koelner-dom.de/erleben/der-dom-in-zahlen), [tower climb](https://www.koelner-dom.de/besuchen/turmbesteigung), [art and furnishings](https://www.koelner-dom.de/kunstwerke), [excavations](https://www.koelner-dom.de/erleben/domgrabung). Historical context: [UNESCO](https://whc.unesco.org/en/list/292/) and [building history](https://en.wikipedia.org/wiki/Cologne_Cathedral). Visual references: the pack's [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Cologne_Cathedral) drawings and photographs; file-level credits remain in `cologne-cathedral-pack\references\ATTRIBUTION.md`.
