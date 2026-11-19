# Cologne Cathedral Explorer - managed-app 3D benchmark pack

A brief and research pack given **unchanged to every AI model** under test. Each model builds the same kind of app in the Copilot managed runtime: an interactive 3D **Cologne Cathedral** (Kölner Dom) with orbit and fly-around navigation, level-by-level reveal, sections, hotspots and a guided tour. First-person walking is **not** required. Results are compared on functionality, visual and architectural quality, and one final completed-app cost.

**The pack is research material, not a specification.** It contains no prescribed dimensions, coordinates or colour values. Each model researches the cathedral from the links and images and builds its own interpretation; it is judged on whether the result is recognisably Cologne and works well.

Pack version: **2.0**. Any change to a file creates a new pack version, and runs are compared only within one version.

- 2.0: research-only pack. The numeric spec, the generated architecture spec, the measured colour targets and the Blender proofs moved to the operator kit (`../operator-kit/`). Exact-dimension scoring was replaced by believable-proportion and fact checks.
- 1.x: spec-driven pack (dimensions as source of truth). Not comparable with 2.0.

## Files

| Path | What it is | Who uses it |
|---|---|---|
| `BRIEF.md` | **The master prompt**: what to build, requirement IDs (R, M, N, F, I, Q), scope, advisory architecture, definition of done, tracks | Model |
| `RESEARCH-LINKS.md` | Every web source, checked live: official site, Wikipedia, Commons categories, plans, videos, 360° tours, 3D references, Blender docs | Model and operator |
| `references/` | 97 public-domain or CC-licensed images in 6 folders: plans 27, elevations 4, sections 8, details 11, exterior photos 21, interior photos 26 | Model |
| `references/SOURCES.json` | One record per image: file, role, Commons page, licence, author, credit, size, SHA-256 | Model and operator |
| `references/ATTRIBUTION.md` | Credits table. Required if the app shows any bundled image (Q4) | Model |
| `BLENDER.md` | Optional **Track B**: Blender is free, texture baking, deployment constraints and rules | Model (Track B only) |
| `RUBRIC.md` | Run protocol, fixed kickoff prompt, weighted scoring, thresholds and result record | Reviewer (the model also sees it) |

## How to run a benchmark

1. Start a **fresh task** in the managed runtime with the selected model. Record its exact native label and reasoning setting.
2. Attach the whole `cologne-cathedral-pack/` folder (or a zip of it) and submit the **fixed kickoff prompt** from `RUBRIC.md` section 1, unchanged. Do **not** attach the operator kit.
3. Score the first output, then optionally make evidenced repairs, then score the final app. Follow `RUBRIC.md` exactly. Record **one final cumulative `/cost`** for the completed app only.
4. Save a result record (`RUBRIC.md` section 3). Pass = **functional ≥ 85 and visual ≥ 80**.

## Track A versus Track B

| | Track A (main) | Track B (Blender-assisted) |
|---|---|---|
| Geometry | Procedural, generated in the app | Offline headless Blender script; the app loads its web-form output |
| Textures and colour | Generated in the app, chosen by the model from the photos | Built-in Blender procedural nodes or script-written pixels, baked into images |
| Who runs Blender | Nobody | The operator, exactly as given in `BLENDER.md`; no GUI modelling |
| Fallback | 2D plan view if WebGL fails | Track A procedural model if the Blender model cannot be loaded |
| Leaderboard | Track A | **Separate**; never pooled with Track A |

Blender cannot run inside the managed runtime, so Track B adds an offline step. It measures whether a model can use a professional tool to reach higher fidelity: tracery, Booleans and baked textures. The Blender-to-managed-app pipeline has been verified end to end in the real runtime (`BLENDER.md` section 6).

## Licensing

- Historic plans and elevations are public domain. Most photos are **CC BY-SA** or **CC BY**: if a model bundles one into an app, the app must show its credit from `ATTRIBUTION.md`.
- Content from the official cathedral site, Google Images, WDR, YouTube and non-commercial Sketchfab models is **linked only, not shipped**, and must not be hotlinked at runtime (R3).
- The app must state that it is an approximate educational model, not a survey.

## Maintenance (operator)

`RESEARCH-LINKS.md` and `references/ATTRIBUTION.md` come from `references/SOURCES.json` and the operator kit. Edit the sources, re-check every SHA-256, and then bump the pack version. Reviewer reference data and the verified Blender proofs are in `../operator-kit/`.
