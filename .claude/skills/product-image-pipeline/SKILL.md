---
name: product-image-pipeline
description: Turn a raw product photo into a transparent cutout and/or a custom generated background that matches the site (what the user previously got from Lovable — e.g. the Jäger and "Monte seu copo" images on 001 da Oeste). Use whenever a new site/section needs product images with clean or custom backgrounds — free tools only, no paid subscriptions.
---

# Product Image Pipeline

Lovable produced two things for this user's sites that plain Claude Code didn't: (1) product photos cut out to a clean transparent PNG, and (2) custom-generated backgrounds behind those products that matched the site's mood (the Jäger bottle scene, the "Monte seu copo" image on 001 da Oeste). This skill replaces both without needing any paid subscription.

**Decided 2026-09-18: the user rejected the Higgsfield/MCP creative-suite path ("muito caro") after learning it requires a $49+/mo subscription with no one-time top-up available.** Do not suggest it, mention its pricing, or offer to use `generate_image`/`outpaint_image`/`remove_background` from the `mcp__3c737897-6377-4fb8-b059-1981fec122a5__` suite again — treat that whole tool as off the table for this user's site work unless they explicitly bring it up themselves first. Use the two free tiers below instead.

## Tier 1 — Background removal (100% free, local, unlimited, commercial-safe)

A local Python pipeline using `rembg` is installed at `C:\Users\Matheus\.claude\tools\bg-removal\venv`, shared across all projects — no per-project setup, no internet dependency after the model is cached, no cost ever.

Run it with:
```
"C:\Users\Matheus\.claude\tools\bg-removal\venv\Scripts\python.exe" "C:\Users\Matheus\.claude\tools\bg-removal\remove_bg.py" <input_image> <output.png>
```

This produces a real transparent RGBA PNG (verified: clean edges, including punched-out negative space like a glass handle, on a real 001 da Oeste product photo).

**License warning — do not skip this:** rembg's own default model as of late 2025/2026 is `bria-rmbg-2.0`, which is CC BY-NC 4.0 (non-commercial only) — using it would put a legal cloud over a client's commercial site. `remove_bg.py` is hardcoded to `model_name="u2net"` instead, which is Apache-2.0 and safe for commercial use. **Never remove that hardcoded model_name or call rembg without specifying it.** If u2net's cutout quality isn't clean enough for a specific hard case (fine hair, complex glass refraction), fall back to Tier 2's `remove_background` tool rather than switching to the bria model.

First run on a machine downloads the ~176MB u2net model to `C:\Users\Matheus\.rembg\models` (one-time, cached after); subsequent runs take under a second.

## Tier 2 — Custom generated backgrounds / product scenes (free, manual)

For an actual generated scene behind the product (what made the Jäger and "Monte seu copo" images look premium — not just a flat color, but a lit, styled environment), there's no free API for this, so it takes a manual step via the Browser pane instead of a one-shot tool call:

- **Canva Magic Media** — this user already has a connected Canva account (separate from the marketing-plugin Canva connector) with design-editing tools available; Canva's free plan includes a limited number of Magic Media AI-image generations per month. Worth trying first since it's already authenticated.
- **Bing Image Creator / Microsoft Designer** (free, DALL-E-based, generous daily quota, just needs a Microsoft account login the user already has) or **Adobe Firefly's free tier** — open via the built-in Browser pane, generate the background scene from a text prompt describing the brief's subject matter (per [[frontend-design]]'s grounding-in-subject-matter step, not a generic "premium dark background" prompt), download the result, then composite the Tier 1 cutout on top with PIL.
- Simplest fallback, zero manual steps at all: a hand-built background in code — solid color, gradient, or a second stock/site photo — using the brief's own token system from [[frontend-design]]. Not as bespoke as a generated scene, but instant and free.

Whichever source, composite with PIL: paste the Tier 1 transparent cutout onto the chosen background, matching scale/lighting direction to what looks natural.

## Workflow for a new product image

1. Get the raw product photo (upload/attached file).
2. Run Tier 1 to get a clean transparent cutout — do this by default, it's free and near-instant.
3. If the brief needs a styled scene (not just the product on the page's flat background), use Tier 2: try Canva Magic Media or a free web image generator for the background, or fall back straight to a hand-built background in code if speed matters more than bespoke-ness.
4. Whatever the source, run the result through [[frontend-design]]'s critique: does the background actually fit this brief's subject matter, or is it a generic default?
