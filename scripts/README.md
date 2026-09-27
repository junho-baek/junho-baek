# Profile maintenance

`site/portfolio.json` is the shared content for the live terminal, project notes, and Remotion preview. Selected work describes product experience, decisions, outcomes, and lessons; it is not a list of public repositories. A project does not need a public code repository to appear here.

## Preview and check

```bash
python3 -m http.server 4178 --bind 127.0.0.1 --directory site
node --check site/app.js
node --check site/docs/cases.js
git diff --check
```

The optional browser check requires Playwright and Chrome. It checks 12 localized terminal routes, project navigation, keyboard controls, language switching, skip animation, and mobile overflow. It also guards against reintroducing personal document downloads. Provide `NODE_PATH` if using Playwright from a shared runtime, and `CHROME_EXECUTABLE` if Chrome is elsewhere.

```bash
node scripts/verify-site.mjs
```

## Animated preview

```bash
npm ci
npm run render:terminal-gif
```

If Chromium is not bundled, pass `--browser-executable /path/to/chrome` to the `render:terminal-mp4` script before converting the output with FFmpeg. `assets/terminal-preview.gif` is the README preview; `site/` is the interactive experience deployed by GitHub Pages.

Keep personal application documents outside this public repository and its Pages deployment.
