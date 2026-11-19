# BRIEF - Build "Cologne Cathedral Explorer" as a managed application

> **This is the master prompt.** Give this file, unchanged, to every model under test, together with the rest of this pack.
> Pack version: `cologne-cathedral-pack/2.0`.

---

## 1. What to build

Build an **interactive 3D web application** that runs inside the **Copilot managed runtime** as a managed application (the same kind of app as the Microsoft Offices showcase and booking tool built earlier with Cowork and GitHub Copilot). The app presents **Cologne Cathedral (Kölner Dom)**, the UNESCO World Heritage Gothic cathedral with twin openwork spires beside the Rhine.

A user must be able to:

1. **See the whole cathedral in 3D** and recognise it as *Cologne* rather than a generic church.
2. **Move freely around it**: orbit, pan, zoom and fly between viewpoints.
3. **View it level by level**, from below the floor to the spire tips, and see inside.
4. **Interact**: click hotspots to learn about places, follow a guided tour, cut the building open, and see its key facts.

**First-person walking is *not* required.** Do not spend effort on WASD or pointer-lock walking. Preset *eye-level viewpoints* that the camera flies to are welcome.

## 2. Research is part of the task

This pack gives you **research material, not a specification**. There are no prescribed dimensions, coordinates or colour values. Study the sources, decide how the building is laid out and what it looks like, and build your own interpretation. You have **creative freedom** in how you model, simplify and style it. The goal is a model that people who know the cathedral would recognise, not a survey.

| File | Use it for |
|---|---|
| `RESEARCH-LINKS.md` | Checked links to the official cathedral site, Wikipedia, Wikimedia Commons plans and photos, 360° tours, videos and 3D references. Find the facts here (heights, layout, levels, history, artworks). Look, but ship only licence-clean material. |
| `references/` (97 images) | Historic plans, elevations, sections, details, exterior and interior photographs. Their roles and credits are in `references/ATTRIBUTION.md` and `references/SOURCES.json`. Good starting points: `plans/P02-plan-schematic.png`, `plans/P01-plan-hasak-1911-choir-marked.jpg`, `elevations/E01-west-facade-plan-F-c1370.jpg`, `sections/S01-choir-cross-section-boisseree-tafel-5.jpg`, `photos-exterior/X01`, `X03`, `X05`, `X17`, `X21` and `photos-interior/I01`, `I04`, `I26`. |
| `RUBRIC.md` | How the result will be scored. Read it before you start. |
| `BLENDER.md` | Only for **Track B** (section 8). Ignore it for Track A. |

If you can browse, use the links. If you can read images, study the references. If you can do neither, use what you know about the cathedral. Facts you show to users (heights, dates, step counts and so on) should match published sources; say where they came from in the About panel.

## 3. Hard requirements

### 3.1 Platform and delivery
- **R1.** A working managed application in the Copilot managed runtime. It opens without errors and keeps the console free of uncaught exceptions during normal use.
- **R2.** **Self-contained geometry.** Generate the cathedral **procedurally in code** (Track A). Do not depend on downloading third-party 3D models at runtime. Use WebGL (three.js or similar) if the runtime can load or bundle it. If a library cannot be loaded, fall back gracefully: show a clear message and a working **2D interactive plan view** rather than a blank screen.
- **R3.** **No runtime dependence on external images.** If you display reference photos, bundle only files from `references/` and show their credits (see 3.6). Do not hotlink Google, YouTube, WDR, Sketchfab or koelner-dom.de content.
- **R4.** **Believable proportions.** The building should read as Cologne at a glance: the twin west towers are by far the tallest element; the body is long, with a tall, narrow nave, a short transept and a long choir. Exact measurements are **not** required; choose your own units and coordinate system.

### 3.2 Model content (must be present and recognisable)
- **M1.** Twin west towers: square lower storeys, octagonal belfries and **openwork (pierced) spires** with finials. A plain solid cone does not meet this requirement; tracery may be a lattice, instanced ribs or an alpha-cut texture.
- **M2.** Cruciform plan with a five-aisled nave, a three-aisled transept with gabled end facades, and a long choir, as in the real building.
- **M3.** Chevet: apse, ambulatory and a ring of **radiating chapels**.
- **M4.** **Flying buttresses** and **pinnacles** around the nave and choir, instanced where possible.
- **M5.** Steep **lead roof** with the slender **crossing tower** and its gilded star.
- **M6.** Interior: clustered piers, very tall and narrow vaults, the triforium band, tall clerestory windows with coloured glass, and the high choir.
- **M7.** Below ground: a simplified crypt and the excavation zone.
- **M8.** Context: ground plane, the cathedral square to the west and south, labelled compass directions and, ideally, a simple Rhine and Hohenzollern Bridge to the east and north-east.

### 3.3 Navigation and camera
- **N1.** Orbit, pan and zoom with mouse, touch (pinch and drag) and keyboard, with damping and sensible limits (no going below ground unless a below-ground level is selected).
- **N2.** At least **8 named viewpoints** with smooth fly-to, for example: West front, cathedral square (south-west), Chevet from the east, Aerial from above, Nave looking east (eye level), High choir, South tower viewing platform, Roof attic.
- **N3.** A **Home/Reset** control that restores the default view and state.
- **N4.** Focus on a clicked object or hotspot by double-click or a "Fly to" button.

### 3.4 Floors and levels
- **F1.** A **level selector** with at least **6 named levels** that you research, spanning below ground to the spire tips (for example: excavations, crypt, cathedral floor, triforium, roof attic, tower viewing platform, spire tips). Show an approximate height for each.
- **F2.** Choosing a level **reveals it**: hide or ghost everything above it (horizontal cut) so the user can see that floor, move the camera to a suitable viewpoint, and filter hotspots to that level.
- **F3.** An **exterior / interior / x-ray** mode switch. X-ray ghosts the shell to show interior structure.
- **F4.** **Section planes**: at least one horizontal cut with an adjustable height slider, and one longitudinal (east–west) vertical cut, to show the vault–triforium–clerestory–roof profile.
- **F5.** A **2D plan minimap** (drawn from your own model, not an image) showing the camera position and direction, the current level and the hotspots. Clicking the minimap moves the camera.

### 3.5 Interaction and information
- **I1.** At least **20 points of interest** as 3D hotspots at plausible places in your model, each with name, level and a short fact. Clicking one opens an info panel. They must include: the main west portal, the Shrine of the Three Kings, the high altar, the choir stalls, the Gero Cross, the Milan Madonna, Stefan Lochner's Altarpiece of the City Patrons, the Gerhard Richter window, the Bavarian windows, the St Christopher statue, the swallow's-nest organ, St Peter's Bell (Petersglocke), the crossing tower, the roof truss, the south tower viewing platform, the crypt and the excavations.
- **I2.** A **searchable list** of points of interest, grouped by level and zone.
- **I3.** A **guided tour** of at least 8 stops with next, previous, play and pause. It must include the west portal, nave, crossing, Shrine of the Three Kings, Richter window, chevet chapels, roof truss and viewing platform.
- **I4.** A **key-facts overlay**: at least 5 real-world figures you researched (for example tower height, overall length, vault height, width, number of steps) shown as labelled 3D annotations on the model. These are information for the user; your model's own proportions only need to look right (R4).
- **I5.** **Lighting control**: a time-of-day sun slider and a **night mode** with floodlit facades. Interior glass should glow in colour.
- **I6.** A **tower-climb visualisation**: highlight the route up the south tower to the viewing platform, with its stages and the published step count.

### 3.6 Quality, accessibility and credits
- **Q1. Performance:** interactive (≥30 fps target) on an ordinary laptop. Use instancing, merged geometry and level-of-detail where needed. Show a loading indicator during generation.
- **Q2. Responsive layout** for desktop and tablet widths; panels must not cover the whole 3D view.
- **Q3. Accessibility:** every control is reachable by keyboard and has a visible focus and an accessible name; hotspots are also listed in a DOM list; honour `prefers-reduced-motion`.
- **Q4.** An **About and Credits** panel: the sources you used (for example the official cathedral site, Wikipedia, Wikimedia Commons), and the credit and licence of any bundled image, taken from `references/ATTRIBUTION.md`. State clearly that it is an approximate educational model, not a survey.
- **Q5.** **Visual design:** a polished, modern UI with a coherent theme, readable typography and clear hierarchy. The building should look attractive and true to the photos: study how the exterior stone, roof, interior stone and stained glass actually look, and choose your own colours and textures.

## 4. Scope boundaries
- No sign-in, booking, payments or real external messaging. The app is a viewer.
- Persisting UI preferences (last level, night mode) is optional; if you persist anything, do so locally and add a "Reset app" control.
- Do not claim survey accuracy. Label estimated values as estimates.

## 5. Suggested architecture (advisory, not mandatory)
1. **Data layer:** keep your researched facts (levels, points of interest, tour, key figures) in one data module, separate from geometry.
2. **Geometry builders**, for example `buildTowers()`, `buildNaveAndChoir()`, `buildTransept()`, `buildChevet()`, `buildRoofs()`, `buildCrossingTower()`, `buildBelowGround()` and `buildContext()`. Tag every mesh with `{zone, level, kind}` so level filtering, x-ray and sections are simple.
3. **Instancing** for piers, windows, buttress units, pinnacles and spire tracery.
4. **Clipping planes** (renderer-level local clipping) for horizontal and vertical sections; use the same plane for level reveal.
5. **UI layer:** top bar (title, mode switch, Home), left drawer (levels, viewpoints, tour), right drawer (info panel, search), bottom-right minimap, and a keyboard-help overlay.

## 6. What "done" looks like
Before you finish, check every ID in section 3 (R1–R4, M1–M8, N1–N4, F1–F5, I1–I6, Q1–Q5) yourself in the running app and report a table of **ID → status → how you verified it**. Also list the main sources you used for facts. Be honest: a reviewer will repeat every check independently in the native runtime and score against `RUBRIC.md`. Report anything you could not complete.

## 7. Fidelity ladder (if you must prioritise)
Silhouette and proportions → plan and bay rhythm → levels and sections → hotspots and tour → buttresses and pinnacles → window tracery and glass → lighting and night mode → furnishings. Ship a complete, working app at a lower rung rather than an unfinished one at a higher rung.

## 8. Tracks
- **Track A (default, the main benchmark):** everything is generated in-app from code. Use this unless the operator explicitly tells you Track B.
- **Track B (Blender-assisted, separate leaderboard):** in addition to the app, write a single headless Blender Python script that builds a higher-detail cathedral from your research, generates and **bakes** its stone, lead and glass textures from Blender's built-in procedural nodes, and exports `cathedral.glb`. The app loads the web form of that file (`models/cathedral.gltf`, which the operator produces from your GLB), with the Track A procedural model as an automatic fallback if the file is unavailable. Follow `BLENDER.md` exactly. Track B results are never compared directly with Track A results.
