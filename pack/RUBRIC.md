# RUBRIC - Cologne Cathedral Explorer benchmark

Scoring rules for every model run. Requirement IDs refer to `BRIEF.md` section 3. The reviewer, not the model, scores. Every check is done **independently in the native managed runtime** by using the app as an end user would.

## 1. Run protocol

1. **Fresh task, fresh app** for every run. Record the exact model label and reasoning setting as shown in the native model menu.
2. Attach the whole pack (all files, or a zip of `cologne-cathedral-pack/`). Submit the **fixed kickoff prompt** (below) unchanged.
3. Wait for the model to finish. **Seal the first-output evidence** (functional and visual score of the first delivered app) before giving any guidance.
4. Optional **repairs**: the reviewer may send targeted repair prompts that quote only observed, evidenced defects (requirement ID, what happened, expected behaviour). Never paste code or solutions. Record every submitted prompt verbatim, in order, with its SHA-256.
5. Stop when both thresholds are met, or after **two repairs of the same blocker without demonstrated improvement**, or at a platform or authorisation blocker. Never silently restart in a new app.
6. **Cost:** record **one final cumulative `/cost` for the completed app** only (it covers the build and every repair). No interim or per-stage cost readings. An incomplete or blocked app has no completed-app cost.
7. **Evidence:** the native screenshots kept are the final app and the final cost only. Intermediate checks use DOM/ARIA inspection, measured geometry and structured notes. No reviewer source patches, no invoking handlers from the console, no injected fixtures.

**Fixed kickoff prompt (Track A):**

```
Build the managed application described in BRIEF.md. RESEARCH-LINKS.md and the images in references/ are research material: study them to learn what Cologne Cathedral looks like, then build your own interpretation. Track A: generate all geometry procedurally in the app. First-person walking is not required. When finished, give me the self-check table described in BRIEF.md section 6.
```

**Fixed kickoff prompt (Track B):** the same text with `Track A: generate all geometry procedurally in the app.` replaced by `Track B: follow BLENDER.md - write the headless Blender script and make the app load models/cathedral.gltf (the web form of cathedral.glb), with the procedural model as fallback.` The operator then runs the script exactly as described in `BLENDER.md`, records the exit code, run time, GLB size and SHA-256, and converts the GLB with the operator kit's `glb_to_web.py`. Before the first Track B run of a pack version, the operator records the unscored **runtime preflight** (operator kit, `BLENDER-PROOFS.md` section 7). If it fails, Track B is not run for that runtime version.

## 2. Scoring method

Each item scores **0** (absent or broken), **0.5** (partial: present but defective, incomplete or only works in some cases) or **1** (fully meets the requirement), multiplied by its weight.

### 2.1 Functional score (100) - pass at **≥ 85**

| Group | ID | Check performed by the reviewer | Weight |
|---|---|---|---:|
| Platform | R1 | App opens in the managed runtime; no uncaught console errors during the whole test script | 4 |
| | R2 | Geometry is generated in code (Track A) or loaded from the operator-run GLB with a working fallback (Track B); a graceful 2D fallback exists if WebGL fails | 3 |
| | R3 | No runtime hotlinks to non-pack images or models (network panel during use) | 2 |
| | R4 | Believable proportions judged by eye against the plan and photos (P02, E01, X01, X17): twin towers clearly tallest, long body, tall narrow nave, short transept, long choir. No numeric tolerance | 3 |
| Navigation | N1 | Orbit, pan and zoom by mouse, touch emulation and keyboard; damping; ground limit | 5 |
| | N2 | ≥8 named viewpoints, each with a smooth fly-to to a sensible framing | 5 |
| | N3 | Home/Reset restores the default view and state | 2 |
| | N4 | Focus on an object or hotspot | 2 |
| Levels | F1 | Selector lists ≥6 named levels from below ground to the spire tips, each with an approximate height | 4 |
| | F2 | Selecting each level (always including a below-ground level, the cathedral floor and the highest tower level) reveals it (cut or ghost above it), moves the camera and filters hotspots | 8 |
| | F3 | Exterior / interior / x-ray modes all work | 4 |
| | F4 | Adjustable horizontal cut plus a longitudinal vertical cut showing the vault–triforium–clerestory–roof profile | 6 |
| | F5 | Live 2D minimap shows camera position and direction, level and hotspots; clicking it moves the camera | 4 |
| Interaction | I1 | ≥20 hotspots at plausible positions, including all 17 named in BRIEF I1; panel shows name, level and fact | 8 |
| | I2 | Searchable, grouped hotspot list (try "Richter", "shrine", "bell") | 4 |
| | I3 | Guided tour with ≥8 stops including the 8 required ones; next, previous, play and pause | 6 |
| | I4 | Key-facts overlay: ≥5 researched figures as labelled 3D annotations; each figure agrees with a published source (reviewer checks the official site or Wikipedia) | 4 |
| | I5 | Time-of-day slider and night floodlight mode; coloured glass glow | 4 |
| | I6 | South-tower climb route with stages and the published step count (reviewer checks it against the official site) | 4 |
| Quality | Q1 | ≥30 fps on the reference laptop in the default exterior view and in x-ray (measured with a frame counter over 10 s); loading indicator | 6 |
| | Q2 | Usable at 1440×900 and 1024×768; panels never hide the whole view | 4 |
| | Q3 | Keyboard reachability, visible focus and accessible names for all controls; DOM hotspot list; reduced-motion respected | 5 |
| | Q4 | About and Credits panel with sources, image credits and the "approximate model" statement | 3 |
| | | **Total** | **100** |

**Gate:** if R1 scores 0, the functional score is 0.

### 2.2 Visual and architectural score (100) - pass at **≥ 80**

| ID | Check (compare with the named references) | Weight |
|---|---|---:|
| V1 | **Silhouette:** twin towers dominate; correct tower-to-body proportion; openwork spires with finials; crossing tower and star (E01, X01, X17, X21) | 20 |
| V2 | **Plan and massing:** cruciform, five-aisled nave, three-aisled transept, long choir, chevet with radiating chapels; resembles P02 in a top view | 15 |
| V3 | **Gothic articulation:** flying buttresses, pinnacles, gables, window tracery; the chevet looks like X05/X13 rather than a smooth drum | 15 |
| V4 | **Interior:** bundled piers on the grid, very tall, narrow vault proportion, triforium band, tall glazed clerestory, high choir (I01, I04, I26, S01) | 15 |
| V5 | **Materials and light:** dark weathered exterior, warm interior, lead roof, coloured glass; convincing day and night | 10 |
| V6 | **UI design:** coherent, modern, readable, with clear hierarchy (Q5) | 15 |
| V7 | **Render polish:** no z-fighting, gaps, flicker, inside-out faces or clipping artefacts; anti-aliasing; shadows or ambient occlusion | 10 |
| | **Total** | **100** |

**Gate:** if any of M1, M2 or M3 is absent, the visual score is capped at 50.

### 2.3 Result

- **Pass** = functional ≥ 85 **and** visual ≥ 80. Report both numbers; never average them into one score.
- Report the **first-output** scores and the **final** scores separately, together with the number of repair prompts.
- **Track A and Track B are separate leaderboards.** Never pool or rank them together.
- Compare runs only within the same pack version, track and protocol.

## 3. Result record (one per run)

```json
{
  "pack": "cologne-cathedral-pack/2.0",
  "track": "A",
  "model": "<exact native label>",
  "reasoning": "<exact native label or null>",
  "date": "YYYY-MM-DD",
  "prompts": [{"n": 1, "kind": "kickoff", "sha256": "..."}],
  "firstOutput": {"functional": 0, "visual": 0, "cost": null},
  "final": {"functional": 0, "visual": 0, "pass": false},
  "finalCost": "<single cumulative /cost of the completed app, or null if incomplete>",
  "repairs": 0,
  "blender": {"exitCode": null, "seconds": null, "glbBytes": null, "glbSha256": null},
  "itemScores": {"R1": 1, "M1": "present", "...": "..."},
  "notes": "Evidence summary; defects; blockers"
}
```

`blender` is used only for Track B. `itemScores` should include every R, N, F, I, Q and V item, plus M1–M8 presence.
