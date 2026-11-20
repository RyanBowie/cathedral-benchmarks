> Copied from the model's own run folder (`report-assets/SELF-CHECK.md`) for the public benchmark. App, environment and account identifiers are withheld; everything else is as the model wrote it. Selected process images are in [`process/`](process/).

# Cologne Cathedral Explorer - Track A self-check

Managed app link withheld from the public repo

All cathedral geometry and textures are generated in the app. The final deployed app passed 22 grouped native-runtime checks with no captured console errors or uncaught exceptions. Sixteen final native screenshots are preserved alongside this report.

**Status convention:** Pass means the author checked the requirement's implementation, not that an independent reviewer has awarded a rubric score. Architectural and visual judgments remain approximate.

| ID | Status | How verified |
|---|---|---|
| R1 | Pass | Opened the deployed managed app and exercised the full native suite; no normal-use console errors or uncaught exceptions. |
| R2 | Pass | Procedural Three.js geometry; disabling WebGL produced a working interactive plan. A local blocked-module check also exercised the library-load fallback. |
| R3 | Pass | Inspected app-origin network requests: no external image/model dependency. Stone, lead, paving and glass textures are generated locally. |
| R4 | Pass | Compared exterior, west and aerial views with the supplied plans/photos: dominant twin towers, elongated body, narrow high nave, short transept and long choir. |
| M1 | Pass | Inspected west/oblique views: square lower towers, octagonal upper stages, pierced lattice spires and finials. Diagnostics report zero solid main-spire faces. |
| M2 | Pass | Inspected aerial and floor-cut views: cruciform plan, five nave aisles, three transept aisles, gabled ends and long choir. |
| M3 | Pass | Inspected chevet and floor-cut views: apse, ambulatory and seven radiating chapels. |
| M4 | Pass | Inspected nave and chevet: repeated flying buttresses and pinnacles; generated with instanced components. |
| M5 | Pass | Inspected exterior/aerial views: steep lead-like roofs, slender crossing turret and gilded star. |
| M6 | Pass | Inspected nave, high choir and longitudinal section: clustered piers, ribbed vaults, triforium, clerestory and coloured glass. |
| M7 | Pass | Selected crypt and excavation levels; both reveal simplified underground spaces. Regression check excludes all above-ground mesh kinds. |
| M8 | Pass | Inspected site context: ground, west/south squares, compass labels, Rhine and schematic north-eastern bridge. |
| N1 | Pass | Exercised mouse, emulated touch and keyboard orbit/pan/zoom; measured camera changes, damping, zoom bounds and above-/below-ground limits. |
| N2 | Pass | Activated all 11 named viewpoints and checked their camera destinations and completed fly-to transitions. |
| N3 | Pass | Changed view, level and overlays, then used Home; default camera and scene state were restored. |
| N4 | Pass | Searched for Richter, opened its information panel and used Fly to this place; verified the live camera reached the window. |
| F1 | Pass | Checked nine named levels with displayed heights, spanning estimated excavations at -6 m through spires at 157.22 m. |
| F2 | Pass | Selected all nine levels; verified cut heights, camera relocation and level-filtered hotspots, including both underground layers. |
| F3 | Pass | Exercised exterior, interior and x-ray; inspected the ghosted shell and visible internal structure. |
| F4 | Pass | Changed horizontal cut height and enabled the east-west longitudinal section; inspected the exposed vertical profile. |
| F5 | Pass | Checked the live plan's level, hotspots and camera direction; pointer and keyboard map actions moved the camera. |
| I1 | Pass | Opened all 26 place panels and verified their facts; all 17 specifically required places are included. |
| I2 | Pass | Searched Richter, shrine and bell; checked level/zone grouping and zone filtering. |
| I3 | Pass | Exercised the eight required tour stops, previous/next, automatic play and pause. |
| I4 | Pass | Enabled six anchored fact labels and checked their figures against the official cathedral sources. |
| I5 | Pass | Changed the sun slider and enabled night lighting; inspected illuminated facades and glowing coloured glass. |
| I6 | Pass | Opened the highlighted south-tower ascent, exercised four stages and checked the published total of 533 steps. |
| Q1 | Pass | Final native 10-second counts: exterior 601 frames (~60 fps), x-ray 589 (~59 fps). Loading UI, instancing and merged geometry are implemented. |
| Q2 | Pass | Checked 1440x900 desktop and 1024x768 tablet layouts; controls and panels leave a usable 3D viewport. |
| Q3 | Pass | Checked named keyboard controls, visible focus, DOM-listed places and keyboard map markers; reduced-motion mode disables animated flights. |
| Q4 | Pass | Opened About/Credits and verified six source links plus the approximate-model statement. No reference images are shipped; bundled libraries have licence notices. |
| Q5 | Pass | Inspected final desktop/tablet, exterior/interior and night views: coherent neutral/rose UI, readable hierarchy and differentiated stone, roof and glass. |

## Main sources

- [Official cathedral figures](https://www.koelner-dom.de/erleben/der-dom-in-zahlen): tower and platform heights, dimensions, vaults, galleries and bell weight.
- [Official tower climb](https://www.koelner-dom.de/besuchen/turmbesteigung): 533 steps and the spiral/metal-stair sequence.
- [Official excavations](https://www.koelner-dom.de/erleben/domgrabung): excavation history and extent.
- [Official cathedral tour](https://www.koelner-dom.de/rundgang): places and interpretation.
- [Wikipedia: Cologne Cathedral](https://en.wikipedia.org/wiki/Cologne_Cathedral): plan, furnishings, glazing and historical context.
- [UNESCO listing 292](https://whc.unesco.org/en/list/292/): heritage designation and construction history.
- Supplied Wikimedia plans, elevations, sections and photographs, credited in `cologne-cathedral-pack\references\ATTRIBUTION.md`, informed the visual interpretation. They are not runtime assets.

## Limits and measurement context

This is an approximate educational interpretation, not a survey or a photorealistic reconstruction. Furnishings, glazing, crypt/excavation layouts, stairs and surrounding city blocks are simplified. Underground depths are estimates. The glass is original procedural art, not a reproduction of Richter's work; the published step total is factual, but individual modeled steps are schematic.

Performance was measured in the real managed runtime using headed Microsoft Edge 157.0.4341.60 on Windows with a Qualcomm Adreno X1-85 GPU. Exterior and x-ray both exceeded the 30 fps target in the final 10-second windows; this does not guarantee every laptop's performance. Native automation used anti-background-throttling flags and browser focus emulation. The page reported visible in both windows; document focus was false for the exterior sample and true for x-ray. Earlier occluded-window measurements are retained separately, not substituted for the final results.

Touch gestures were tested by browser emulation, not on a physical tablet. Keyboard and reduced-motion behavior were checked; this is not a formal accessibility certification. No first-person walking, external messaging, connectors or additional sharing were added.

## Evidence

- `native-final-functional-check.json`: final 22/22 native checks, camera measurements, request inventory and console capture; completed 2026-11-19T13:01:45.098Z.
- `final-native-screenshots.json`: manifest for 16 final native screenshots; completed 2026-11-19T13:03:35.564Z.
- `process/05_final-native-contact.jpg`: selected final app views, with the surrounding player header cropped out.
- `process/01_local-development-contact.jpg`: local visual iterations and architectural corrections.
- `local-04-functional-check.json`: earlier local suite, including a deliberately unavailable scene module.
- `BUILD-LOG.json`: timeline, final deployment identity, evidence hashes and timing methodology.

Final deployed artifact: `eb0d347b3926413eb28ab0d9c9715804805ff839`. No independent rubric score or cost estimate is self-awarded here.
