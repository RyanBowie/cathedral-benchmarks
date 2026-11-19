# Cathedral Benchmarks ⛪

**One research pack, one fixed prompt, many AI models.** Each model builds an interactive 3D **Cologne Cathedral** (Kölner Dom) as a managed app in **Copilot Managed Runtime**. Every build is also published as a **static mirror**, so you can explore it in your browser.

🌐 **Showcase:** <https://ryanbowie.github.io/cathedral-benchmarks/>

Sister project: [cat-benchmarks](https://github.com/RyanBowie/cat-benchmarks), where every model builds an interactive 3D cat from one prompt.

## The prompt (Track A)

The whole [`pack/`](pack/) folder is attached, and then:

> Build the managed application described in BRIEF.md. RESEARCH-LINKS.md and the images in references/ are research material: study them to learn what Cologne Cathedral looks like, then build your own interpretation. Track A: generate all geometry procedurally in the app. First-person walking is not required. When finished, give me the self-check table described in BRIEF.md section 6.

The pack is **research material, not a specification**:
- **Brief:** what to build, plus requirement IDs.
- **Research links:** official site, Wikipedia, Commons, plans, videos and 360° tours.
- **97 images:** openly licensed plans, sections and photos.
- **Rubric.**

It contains no prescribed dimensions, coordinates or colours. Each model researches the building and builds its own interpretation.

## Results

| # | Model | Tool | Reasoning | Score /10 | Functional /100 | Visual /100 | Repairs | AI credits | Time to verified app | Live build |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---|
| 1 | Claude Opus 5.5 | GitHub Copilot app | Max | **6.2** | 100 ✅ | 75 ❌ | 0 | 19,830 | 11 h 20 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/claude-opus-5.5/) · [log](reports/claude-opus-5.5/BUILD-LOG.md) |

Pass needs **functional ≥ 85 and visual ≥ 80**. The two are reported separately and never averaged. Track A and Track B (Blender-assisted) have separate leaderboards.

### Benchmark score (0–10)

Seven weighted criteria. They are scored harshly, in the same spirit as the cats: a 10 would be indistinguishable from a survey-grade model of the real building.

| Criterion | Weight | Rubric IDs | Claude Opus 5.5 |
|---|---:|---|---:|
| Architectural likeness | 25% | V1 V2 R4 M1–M3 | 6.0 |
| Gothic detail & materials | 15% | V3 V5 M4 M5 | 4.8 |
| Interior, levels & sections | 15% | V4 F1–F4 M6 M7 | 5.5 |
| Navigation & camera | 10% | N1–N4 F5 | 7.0 |
| Exploration & learning | 15% | I1–I6 Q4 | 7.5 |
| UI & polish | 10% | V6 V7 Q2 Q3 | 6.0 |
| Performance & robustness | 10% | R1–R3 Q1 | 7.0 |
| **Overall** | | | **6.2** |

The scale runs from 0–2 (missing or broken) through 3–4 (crude), 5–6 (recognisably Cologne) and 7–8 (convincing and detailed) to 9–10 (near survey-grade).

The functional and visual scores out of 100 follow [`pack/RUBRIC.md`](pack/RUBRIC.md) §2. The item-by-item record for each run is in [`results/`](results/).

## Repository layout

| Path | What it is |
|---|---|
| `index.html` | The showcase page. The data lives in its `BUILDS`, `CRITERIA` and `SCORES` blocks. |
| `builds/<model>/` | Static mirror: the app's production bundle (`dist/`), unchanged |
| `videos/<model>.mp4`, `assets/<model>.jpg` | Preview clip and poster, recorded from the static mirror |
| `reports/<model>/` | The model's own build log with iteration screenshots, in-player evidence and timings |
| `results/<model>.json` | Result record (RUBRIC §3), with item scores, cost, time and notes |
| `pack/` | Exactly what every model receives: cologne-cathedral-pack 2.0, SHA-256 `b089d1fc…4a24` |
| `tools/` | Playwright scripts (headless Edge): `capture.js` captures views and runs a smoke test, `clip.js` records the preview clip, `check.js` runs reviewer spot-checks |

## Method

1. **Fresh, isolated run.** Each run uses a new GitHub Copilot app session on autopilot at the highest reasoning setting, with a new run folder that holds only the pack and a new managed app. Agent memory is frozen.
2. **Fixed prompt.** The kickoff prompt above is used unchanged. Any repair prompt is evidenced, counted and disclosed.
3. **The model deploys and verifies its own app** in Copilot Managed Runtime with the `ms` CLI. Credits are the single cumulative cost of the completed app.
4. **Static mirror.** After the run, the operator copies `dist/` into `builds/<model>/` byte for byte, without prompting the model. A headless check confirms there are no console errors and no external requests.
5. **Scoring.** One reviewer scores from three sources: the model's in-player evidence, the static mirror, and the reference photos.

## Add a model

1. Run the benchmark in an isolated run folder, attaching the pack unchanged and using the prompt above.
2. Copy the finished app's `dist/` to `builds/<id>/`. Make sure every path is relative; Vite `base: './'` does this.
3. Smoke-test the static mirror and record a clip and poster with the scripts in [`tools/`](tools/), adapting the selectors to the build. Save them as `videos/<id>.mp4` (H.264, faststart) and `assets/<id>.jpg`.
4. Copy the build log to `reports/<id>/` and write `results/<id>.json`.
5. Add one entry to `BUILDS` and one to `SCORES` in `index.html`, and add a row to the table above. The ranks, charts and stats recalculate automatically.

## Caveats

- One run per model and one reviewer, so luck and taste matter. The scores are provisional.
- **The first run (Claude Opus 5.5) predates the isolation protocol.** Its working folder held the whole benchmark tree, including reviewer-only notes, and it could read earlier session history. Later runs are isolated.
- A static mirror is not the managed runtime. Runtime evidence, such as the in-player test results and frame rate, comes from the model's build log.
- Each app is an approximate educational model, not a survey.

## Licences

- Reference images in `pack/references/` are public domain, CC0, CC BY or CC BY-SA. Each one is credited in [`pack/references/ATTRIBUTION.md`](pack/references/ATTRIBUTION.md), with its source and licence in `SOURCES.json`.
- `reports/claude-opus-5.5/research/00_reference-study.jpg` is a collage of those images and is shared under CC BY-SA 4.0. Its credits are in the build log's image index.
- Each build's code was written by the named AI model.
