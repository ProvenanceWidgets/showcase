# Super Widgets (SW) Showcase
A Showcase of Applications Developed using Super Widgets (the V2 generation of ProvenanceWidgets).

## Setup
- Open the command line/terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
- Download and install node, npm from https://nodejs.org/en/download/. Optionally, use the <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Node Version Manager)</a> to quickly install and use different versions of node via the command line. Note the node version used by the CI workflow (`.github/workflows/build.yaml`), which builds with Node 22.x. Vite 6 requires Node 18 or newer.
- `npm install` - installs required libraries from package.json.

## Run
- `npm run start`
- Open the browser at [http://localhost:5173/showcase](http://localhost:5173/showcase).

## Test
- `npm run test` .

## Build
- `npm run build` outputs the build in the `./dist/` folder.

## Deployment
- GitHub Actions is setup via the `.github/workflows/build.yaml` file. On push to `main`, the built files are pushed to the `gh-pages` branch and served via GitHub Pages at [https://provenancewidgets.github.io/showcase](https://provenancewidgets.github.io/showcase).

## Development vs. Building Configurations for base-href
- Both development and build use the single `base: '/showcase/'` option in `vite.config.js` — no per-environment change is needed (unlike the Angular-based PW1.0 showcase, which required a different `<base href>` per environment).
- Development: Vite serves the app at [http://localhost:5173/showcase/](http://localhost:5173/showcase/) (visiting `/` redirects to `/showcase/`). Routing is hash-based (`HashRouter`), so a demo URL looks like `http://localhost:5173/showcase/#/playground`.
- Build: `vite build` emits all assets with `/showcase/`-prefixed paths (visible in `dist/index.html`), and the app is served from `https://provenancewidgets.github.io/showcase/`, e.g. `https://provenancewidgets.github.io/showcase/#/playground`.
