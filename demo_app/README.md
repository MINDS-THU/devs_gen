# Unified DEVS-Gen example viewer

This source tree builds the example viewer shared by the identifiable public project
page and the anonymous reviewer demo.

## Example groups

- **Generation & Evaluation:** Strategic Airlift.
- **Downstream Use:** ICU and Wet-Lab.

Strategic Airlift is the benchmark example. ICU and Wet-Lab illustrate downstream use
and are not reported as benchmark evidence.

## Data provenance

`provenance/anonymous_demo_cases_20260924.json` is a lossless JSON export of the five case objects
embedded in the anonymous demo deployed at `https://demo1.devs-demo.workers.dev/` on
2026-09-24. The source deployment bundle had SHA-256
`9b8b78b7f8e9543e6a62471f604f785dcdadd997555294f4ca42fdb064226526`; the exported
JSON has SHA-256
`71771f5e5ec71b8fdaccba67b65d164985354468c899eacedcffb082815001e2`.

The current viewer loads the Strategic Airlift, ICU, and Wet-Lab objects from
`src/data/showcase_cases/`. They preserve the displayed data while allowing each example
to be downloaded only when selected. Their SHA-256 values are:

- `sa.json`: `427f94eb2f3a618c67155f80fbfd7da8d1c65d2bfffcc18f4cee485ec0d6caee`
- `icu.json`: `0d6a429643cc1d76c33de2f96cd6cadf26aa09a3ee6b9f944406652d3183be7a`
- `wetlab.json`: `c6eecf3fa342495c7328fe1bcef941ca04f79eccf033f078213f400dbe384e29`

For later auditing, `provenance/` preserves the downloaded deployment HTML and the
original compiled JavaScript bundle from which the JSON was extracted. These files are
reference snapshots and are not loaded by the rebuilt viewer.

The viewer does not shorten the displayed specifications, model plans, code excerpts,
traces, checker descriptions, or scores. `src/data/demoCases.js` adds only display
grouping and scope labels needed to distinguish benchmark evidence from downstream-use
examples.

## Build

```bash
npm ci
npm run build
```

The static output is written to `dist/`.

The Strategic Airlift tab expects its poster and video at
`static/images/sa_visualization_poster.jpg` and
`static/videos/strategic_airlift_visualization.mp4`. The public project page already
provides these paths; the anonymous deployment copies sanitized media to the same paths.
