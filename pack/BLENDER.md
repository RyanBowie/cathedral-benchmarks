# BLENDER - optional Track B (Blender-assisted)

Read this only if the operator has told you to use **Track B**. Track A, procedural in-app geometry, is the main benchmark. Track B is scored on a **separate leaderboard** (`RUBRIC.md` 2.3). As in Track A, the shape, proportions and colours of the cathedral are **your interpretation of the research** in `RESEARCH-LINKS.md` and `references/`. This file gives only the tooling and deployment rules.

## 1. Is Blender free?

Yes, completely. There is **no paid tier, no feature lock and no account**: Cycles, EEVEE, texture baking, Geometry Nodes and the glTF exporter are all in the single free download.
- **Licence:** GNU GPL v2 or later. Models, renders and GLB files you create with it are yours; the GPL covers the Blender program, not your output. See <https://www.blender.org/about/license/>.
- **Version:** the operator uses **Blender 5.2 LTS** (verified with the portable Windows build 5.2.4), headless.
- **Python API:** `bpy` runs inside Blender; headless mode (`--background`) needs no window. Documentation: <https://docs.blender.org/api/current/>. glTF exporter: <https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html>.

## 2. What Blender adds

| Capability | Benefit for this cathedral |
|---|---|
| Modifiers (Array, Mirror, Bevel, Solidify, Boolean) | Repeat bays, buttresses and pinnacles; mirror north and south; bevel stone edges |
| Geometry Nodes and curves | Openwork spire tracery, window tracery (Bézier curves with bevel), crockets and finials |
| Booleans | Real window and portal openings and clean section cuts |
| Baking (Cycles colour or AO) | Textures and soft ambient occlusion baked into images, so the viewer looks good with cheap lighting |
| Decimate | Lighter geometry for performance (Q1) |

## 3. Textures (verified to work)

Blender ships **no** library of stone, lead or glass images. It does include procedural shader nodes (Brick, Noise, Voronoi, Wave, Gradient, Color Ramp, Mix, Bump) and Cycles **texture baking**, which together can generate every surface the cathedral needs from code, with no downloads. You may also write pixels into an image from the script (`numpy` is bundled) for patterns nodes cannot express. Choose the colours and patterns yourself from the reference photos.

**Key rule: bake, then export.** glTF and three.js cannot read Blender node graphs; an unbaked procedural material exports with **no colour texture**. For each textured material:
1. UV-unwrap (`bpy.ops.uv.smart_project`).
2. Add an Image Texture node with a new image and make it the active node.
3. Wire the procedural colour into an Emission shader and run `bpy.ops.object.bake(type="EMIT")` (Cycles, CPU). This captures the pure colour regardless of lighting.
4. Rewire to Image Texture → Principled BSDF (Base Color, and Emission Color for glass), delete the procedural nodes, then `image.pack()`.
5. Export with `export_image_format="JPEG"` (or `"WEBP"`).

Practical tips found in testing:
- **Brick is a 2D texture.** Feed it `(x + y, z)` so courses stay horizontal on walls facing every direction.
- **Emissive glass washes out in daylight.** Bake glass with low emission; let the app raise it for night mode (I5). The exporter writes `KHR_materials_emissive_strength`, which three.js supports.
- **Byte images store sRGB**; node colour inputs are linear.
- **Seed your randomness** so reruns are identical and repairs are comparable.
- **Make output paths absolute** (`os.path.abspath`) before rendering or exporting.
- `bpy.ops.wm.read_factory_settings(use_empty=True)` gives a clean scene with no default cube, camera or light.
- For thousands of parts, build with `bmesh` or `from_pydata` and use linked duplicates or merged meshes rather than many `bpy.ops` calls.

## 4. Constraints (read carefully)

1. **Blender cannot run inside the managed runtime.** It is an offline build step run by the operator. The app only ever loads the web form of your `cathedral.glb` (rule 2).
2. **The managed runtime's content security policy (verified):** `default-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; worker-src 'none'; child-src 'none'`. Consequences:
   a. **Do not load the GLB itself**, or a base64-inlined GLB. three.js decodes embedded GLB images through `blob:` URLs, which the runtime blocks, so every texture goes missing.
   b. The operator converts your `cathedral.glb` into `models/cathedral.gltf`, `models/cathedral.bin` and one image file per texture in the app's `public/models/` folder. **Your app loads `models/cathedral.gltf` with `GLTFLoader` from a relative URL.**
   c. **No inline script.** Bundle three.js into the app's own `.js` files; never use a CDN. Workers and WebAssembly decoders (Draco, KTX2, meshopt) are blocked, so export **uncompressed**.
   d. **Automatic fallback** to the Track A procedural model, with a visible notice, if `models/cathedral.gltf` does not load. The app must also work in this case.
3. **Coordinates:** Blender is Z-up; glTF and three.js are Y-up. Export with `export_yup=True` and make the app and the GLB agree on one frame and unit of your choice.
4. Keep every object **named and tagged**. Set custom properties `zone`, `level` and `kind` on each object and export them with `export_extras=True`, so level reveal, x-ray and hotspots keep working (BRIEF section 5).
5. The procedural fallback must cover the same requirements. A Track B app that only works when the GLB loads fails R2.

## 5. Track B rules

- Write **one** script, `blender/build_cathedral.py`, that writes `cathedral.glb` (and optionally `preview.png`) to the output folder given on the command line. Use only `bpy`, `bmesh`, `mathutils`, `numpy` and the Python standard library: no add-ons to install, no downloads and no external assets. Every texture must be generated and **baked** inside the script (section 3).
- The operator runs it **exactly** like this, from the folder containing `blender/`:

  ```
  blender --background --factory-startup --python blender/build_cathedral.py -- out
  ```

- **No manual GUI modelling.** If the script fails, the operator returns the console log to the model as a repair prompt; each such run counts as a repair (`RUBRIC.md` 1.4).
- The operator records the exit code, run time, GLB size and SHA-256 (`blender` field of the result record), converts the GLB to its web form (rule 4.2b) and commits it with the app. The Blender run time is reported separately and is **not** part of `/cost`.
- Suggested budget: under 10 minutes on an ordinary laptop, GLB under 25 MB, about 1.5 M triangles or fewer.

## 6. What has been verified for this pack

Before this pack was released, Blender-baked stone, lead, stained-glass and gilded materials were exported to GLB, converted to the web form in rule 4.2b, deployed as a real managed app and checked in the authenticated player: WebGL2 rendering, every material textured, zero CSP violations, and working zoom, scene switching and click-to-inspect with `extras` tags. The pipeline in this file therefore works end to end; how good the cathedral looks is up to you.
