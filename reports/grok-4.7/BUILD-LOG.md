> Copied from the model's own run folder (`report-assets/BUILD-LOG.md`) for the public benchmark. App, environment and account identifiers are withheld; everything else is as the model wrote it. Selected process images are in [`process/`](process/).

# BUILD-LOG — Cologne Cathedral Explorer (Grok 4.7, Track A)

- First prompt: about 2026-11-19T22:58:15Z (pack created 2026-11-19T22:56:45Z)
- Finish: 2026-11-20T10:20:12Z
- Wall clock: about 11 h 22 min, including the earlier finish at 2026-11-20T01:23:24Z and this continuation
- Compactions: 2
- Model vs tool time: not instrumented. Long tool waits were typecheck/build, Playwright shots, and deploys. The rest was model time, including two compactions.
- App: (id withheld)
- Play: (managed app link withheld)
- Deployed commit: 1b269bbaaa5c431eaff2a0388f7c86b995b4967f
- Account: (tenant account withheld) . A microsoft.com sign-in returns ManagedAppNotFound.

## What changed, and why

1. First silhouette had floating spires, a crumpled white roof, and a blue west window. Square shafts now run into an octagonal openwork stage, then the spire. Roofs are lead slope quads, not rotated boxes. Frames: `process/01_02-west-front.jpg`, `05-aerial.png`.
2. The chevet was a spike over loose slabs. It is now seven radiating chapels with pointed glass and lead hips. Frame: `process/03_04-chevet.jpg`.
3. Richter and Bavarian glass clamped to a vertical seam because ShapeGeometry UVs are raw XY. UVs are normalised from the pane bounds. Frame: `06-south-flank.png`.
4. A hidden fallback canvas sat on top of the view (`display: block` beat `[hidden]`). Hidden canvases are now `display: none`.
5. The crypt camera looked at a floor, and the excavation camera looked up through the cut at tower undersides. The crypt is a low hall with piers and vaults. The excavation is a lidded pit with wall stubs. Frames: `10-crypt.png`, `13-excav.png`.
6. At 820 px both drawers opened as overlays and covered the view. Narrow widths start with both drawers closed, and opening one closes the other. Frames: `12-tablet.png`, `12b-tablet-guide.png`, `14-desktop-1024.png`.
7. A section cut survived a later viewpoint. Viewpoint, level, tour, and climb now reset the south cut. Night west after a section stays whole. Frame: `11-night-west.png`.

Player refresh after the last deploy showed the home view with both openwork towers, fact labels, and the level list.

## Continuation

8. The crossing sat on the roof as a drum, lead skirts and a slender lantern, not a floating spike. The west window is tracery with a figure, not a flat blue pane. West and home cameras were pulled back so both spire tips fit. Frames: `process/02_16-west.jpg`, `17-aerial.png`, `process/07_22-night-west.jpg`.
9. Chevet after Excavations left the excavation level selected. Every viewpoint now sets its own level and clip. Frame: `process/04_20-chevet.jpg`.
10. Underground hotspot sprites were clamped to at least 1.7 m every frame, so the crypt and excavation read as a gold bloom. Markers below y = 1 are now 0.22–0.55 m. Frames: `18-crypt.png`, `19-excav.png`.
11. Redeployed as `1b269bba`. The player showed "New version available"; Refresh rendered the openwork west front, seated crossing star and fact labels with no error overlay.
