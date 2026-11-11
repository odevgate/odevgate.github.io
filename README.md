# oDevGate

Responsive coding-school course catalog built with React, TypeScript, and Vite. Khmer is the default language. Visitors can switch to English.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

For Telegram enrollment, copy `.env.example` to `.env.local` and set `VITE_TELEGRAM_URL` to the school's real HTTPS Telegram link on `t.me`. Restart Vite after changing it. An unset or invalid URL shows an enrollment notice in place of the link.

```sh
npm run build
npm run preview
```

## Source map

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Navigation, course catalog, curriculum, and enrollment |
| `src/components/CodeEditor.tsx` | Hero typing animation and reduced-motion support |
| `src/content/courses.ts` | Course prices, upcoming courses, and weekly curriculum |
| `src/content/copy.ts` | Khmer and English interface text |
| `src/styles.css` | Colors, type, and responsive layout |
| `public/logo.png` | Original oDevGate logo and favicon |
| `.github/workflows/deploy.yml` | GitHub Pages build and deployment |

## Deploy to GitHub Pages

1. Add this project at the root of a GitHub repository and use `main` as the deployment branch.
2. In repository **Settings → Pages**, select **GitHub Actions** as the source.
3. In **Settings → Secrets and variables → Actions → Variables**, add the repository variable `VITE_TELEGRAM_URL` with the real link.
4. Push to `main`, or run **Deploy oDevGate to GitHub Pages** manually in the Actions tab. Rerun the workflow after updating the link.

Vite uses a relative base so the build works under a repository path or a root domain. The site uses in-page anchors.
