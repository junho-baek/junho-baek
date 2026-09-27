# Portfolio maintenance

`site/portfolio.json` is the shared project content for the live terminal, case studies, Remotion preview, and PDF. The four projects link to public source snapshots. Update the commit references when reviewing new implementation details.

## Preview and check

```bash
python3 -m http.server 4178 --bind 127.0.0.1 --directory site
node --check site/app.js
node --check site/docs/cases.js
git diff --check
```

The optional browser check requires Playwright and Chrome. It checks 14 localized terminal routes, project links, keyboard navigation, language switching, skip animation, mobile overflow, and the PDF response. Provide `NODE_PATH` if using Playwright from a shared runtime, and `CHROME_EXECUTABLE` if Chrome is elsewhere.

```bash
node scripts/verify-site.mjs
```

## PDF

Install Python `reportlab` and provide a font directory containing Pretendard-Regular.ttf and Pretendard-Bold.ttf. Fonts are embedded in the generated PDF; the font files themselves are not distributed here.

```bash
python3 scripts/build_portfolio.py --font-dir /path/to/pretendard --output output/pdf/baek-junho-portfolio.pdf
mkdir -p site/downloads
cp output/pdf/baek-junho-portfolio.pdf site/downloads/baek-junho-portfolio.pdf
```

Render and inspect all six pages before publishing. The deployed PDF lives in `site/downloads/` and is linked from the terminal, case studies, profile page, and README.

## Animated preview

```bash
npm ci
npm run render:terminal-gif
```

If Chromium is not bundled, pass `--browser-executable /path/to/chrome` to the `render:terminal-mp4` script before converting the output with FFmpeg. `assets/terminal-preview.gif` is the README preview; `site/` is the actual interactive experience deployed by GitHub Pages.
