# DEVS-Gen public project page

This directory is the deployable source for the identifiable public project page at
`https://minds-thu.github.io/devs_gen/`.

## Preview locally

Run the following command from this directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. The page is plain static HTML/CSS/JavaScript and
does not require a build step.

## Deploy

Copy the contents of this directory to the root of the GitHub Pages repository. The
included `.nojekyll` file prevents Jekyll processing.

## Current content

- The author block, public code link, and arXiv link remain public and identifiable.
- The paper link intentionally remains the existing arXiv version until the revised
  manuscript is ready.
- Benchmark text and figures reflect the ten-scenario evaluation.
- The `Gallery` button links to the public catalog of generated simulators and
  visualizations.
- The example viewer provides three cases from the shared demo
  source. Strategic Airlift remains the paper's running example and the example used
  by the figure and video.
- The public page can collapse the embedded viewer without unmounting it, so the
  selected example and open panels are retained when it is expanded.
- The video shows event-driven visualization of the timer-based Strategic Airlift
  simulator. Bidirectional physics coupling is presented only as a proposed extension.

## Main files

- `index.html`: page content and metadata.
- `static/css/index.css`: page-specific styling.
- `static/images/`: current diagrams, results, preview image, and video poster.
- `demos/`: the compiled three-example viewer embedded in the project page. Its shared
  source is `demo_app/`.
- `static/videos/strategic_airlift_visualization.mp4`: web-ready demonstration video.
- `static/pdfs/GenAndEvalDEVS_ArXiv.pdf`: existing public paper snapshot; update later
  together with the arXiv release.

The editable viewer source is included in `demo_app/`. Rebuild it with `npm ci` and `npm run build`, then replace `demos/` with the complete `demo_app/dist/` output and update the hashed CSS and JavaScript paths in `index.html`. The page wrapper and its embedded styles are maintained in `index.html`.
