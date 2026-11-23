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
| 1 | GPT-6 Astra | GitHub Copilot app | Max | **7.5** | 100 ✅ | 93 ✅ | 0 | 3,110 | 1 h 20 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/gpt-6-astra/) · [log](reports/gpt-6-astra/BUILD-LOG.md) |
| 2 | GPT-6.2 Astra | GitHub Copilot app | Max | **7.2** | 100 ✅ | 88 ✅ | 0 | 2,548 | 38 min 42 s | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/gpt-6.2-astra/) · [log](reports/gpt-6.2-astra/BUILD-LOG.md) |
| 3 | Gemini 4 Neon | GitHub Copilot app | High | **7.1** | 100 ✅ | 80 ✅ | 0 | 689 | 43 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/gemini-4-neon/) · [log](reports/gemini-4-neon/BUILD-LOG.md) |
| 4 | Gemini 4 Carbon | GitHub Copilot app | High | **7.0** | 100 ✅ | 75 ❌ | 0 | 919 | 2 h 22 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/gemini-4-carbon/) · [log](reports/gemini-4-carbon/BUILD-LOG.md) |
| 5 | Claude Opus 5.5 | GitHub Copilot app | Max | **6.7** | 100 ✅ | 75 ❌ | 0 | 19,830 | 11 h 20 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/claude-opus-5.5/) · [log](reports/claude-opus-5.5/BUILD-LOG.md) |
| 6 | Gemini 4 Argon | GitHub Copilot app | High | **6.4** | 97 ✅ | 75 ❌ | 0 | 716 | 1 h 29 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/gemini-4-argon/) · [log](reports/gemini-4-argon/BUILD-LOG.md) |
| 7 | Claude Sonnet 5.5 | GitHub Copilot app | Max | **5.5** | 96 ✅ | 58 ❌ | 0 | 3,217 | 3 h 28 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/claude-sonnet-5.5/) · [log](reports/claude-sonnet-5.5/BUILD-LOG.md) |
| 8 | Grok 4.7 | GitHub Copilot app | xhigh | **5.4** | 92 ✅ | 53 ❌ | 0 | 3,432 | 3 h 4 min | [launch](https://ryanbowie.github.io/cathedral-benchmarks/builds/grok-4.7/) · [log](reports/grok-4.7/BUILD-LOG.md) |

Pass needs **functional ≥ 85 and visual ≥ 80**. The two are reported separately and never averaged. Track A and Track B (Blender-assisted) have separate leaderboards.

### Benchmark score (0–10)

Seven weighted criteria. They are scored harshly, in the same spirit as the cats: a 10 would be indistinguishable from a survey-grade model of the real building.

| Criterion | Weight | Rubric IDs | GPT-6 Astra | GPT-6.2 Astra | Gemini 4 Neon | Gemini 4 Carbon | Claude Opus 5.5 | Gemini 4 Argon | Claude Sonnet 5.5 | Grok 4.7 |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Architectural likeness | 25% | V1 V2 R4 M1–M3 | 7.5 | 7.0 | 7.0 | 7.0 | 7.0 | 6.5 | 4.5 | 5.0 |
| Gothic detail & materials | 15% | V3 V5 M4 M5 | 6.5 | 6.0 | 7.0 | 6.5 | 5.8 | 6.0 | 4.0 | 4.5 |
| Interior, levels & sections | 15% | V4 F1–F4 M6 M7 | 7.5 | 7.0 | 6.5 | 6.5 | 6.5 | 6.5 | 5.0 | 4.0 |
| Navigation & camera | 10% | N1–N4 F5 | 8.0 | 7.5 | 8.0 | 7.5 | 7.0 | 7.0 | 7.0 | 6.0 |
| Exploration & learning | 15% | I1–I6 Q4 | 7.5 | 7.5 | 8.0 | 7.5 | 7.5 | 8.0 | 7.5 | 6.5 |
| UI & polish | 10% | V6 V7 Q2 Q3 | 8.0 | 8.0 | 6.5 | 6.5 | 6.0 | 5.5 | 4.5 | 5.5 |
| Performance & robustness | 10% | R1–R3 Q1 | 8.0 | 8.0 | 7.0 | 8.0 | 7.0 | 4.5 | 7.5 | 7.5 |
| **Overall** | | | **7.5** | **7.2** | **7.1** | **7.0** | **6.7** | **6.4** | **5.5** | **5.4** |

Revised 23 November 2026: after a second look, Claude Opus 5.5's architectural likeness, Gothic detail and interior scores were each raised by one point (overall 6.2 → 6.7), moving it above Gemini 4 Argon.

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

1. **Fresh, isolated run.** Each run uses a new GitHub Copilot app session on autopilot at the highest reasoning setting the app offers for that model, with a new run folder that holds only the pack and a new managed app. Agent memory is frozen.
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
- **The first run (Claude Opus 5.5) predates the isolation protocol.** Its working folder held the whole benchmark tree, including reviewer-only notes, and it could read earlier session history. Later runs use an isolated folder holding only the pack, but isolation was not perfect: Claude Sonnet 5.5 queried the session store and saw earlier session names (it opened none of their files), and Gemini 4 Carbon, Gemini 4 Neon and Sonnet saw other app names in CLI or folder listings.
- Gemini 4 Carbon was interrupted and resumed, and Grok 4.7 was resumed by the app after an early finish. Neither received new instructions.
- Time, credits and compactions are operator figures. Where a model's own log disagrees, its card and result record say so. Frame rates come from the reviewer's laptop.
- A static mirror is not the managed runtime. Runtime evidence, such as the in-player test results and frame rate, comes from the model's build log.
- Each app is an approximate educational model, not a survey.

## Licences

- Reference images in `pack/references/` are public domain, CC0, CC BY or CC BY-SA. Each one is credited in [`pack/references/ATTRIBUTION.md`](pack/references/ATTRIBUTION.md), with its source and licence in `SOURCES.json`.
- `reports/claude-opus-5.5/research/00_reference-study.jpg` is a collage of those images and is shared under CC BY-SA 4.0. Its credits are in the build log's image index.
- `builds/gemini-4-argon/` and `builds/gemini-4-carbon/` bundle small reference thumbnails from Wikimedia Commons (CC BY / CC BY-SA and similar), credited inside each app.
- Each build's code was written by the named AI model.
