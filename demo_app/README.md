# DEVS Demo Web (React Refactor)

Modernized frontend stack for the DEVS demo:

- React + Vite
- Tailwind CSS (via `@tailwindcss/vite`)
- Framer Motion
- Lucide Icons

## Local run

```bash
npm install
npm run dev
```

Open the URL shown by Vite (default `http://localhost:5173`).

## Build

```bash
npm run build
```

Production files are generated in `dist/`.

## Preview production build

```bash
npm run preview -- --host 0.0.0.0 --port 4173
```

## Anonymous-review friendly sharing

### Option A (recommended): share static zip
1. Run `npm run build`.
2. Zip `dist/` and share as artifact (no repo metadata exposed).
3. Reviewer opens `dist/index.html` via any static server.

### Option B: deploy to a static host
Use Netlify/Cloudflare Pages/Vercel static deploy with publish dir `dist`.

Anonymity checklist:
- Use a neutral site name (avoid personal or lab names).
- Do not link to personal GitHub profile in page content.
- Remove analytics/tracking IDs.
- If needed, host from an anonymized account created for submission.
