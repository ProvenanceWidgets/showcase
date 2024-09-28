# ProvenanceWidgets Showcase
A Showcase of Applications Developed using ProvenanceWidgets.

## Setup
- Open the command line/terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
- Download and install node, npm from https://nodejs.org/en/download/. Optionally, use the <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Node Version Manager)</a> to quickly install and use different versions of node via the command line. Note the compatible node/npm version in package.json > "engines".
- Install compatible Angular `npm install -g @angular/cli@15.2.9`
- `npm install` - installs required libraries from package.json. 

## Run
- `npm run start`
- Open the browser (preferably Chrome) at [http://localhost:4200](http://localhost:4200).

## Test
- `npm run test`

## Build
- `npm run build` outputs the build in the `./dist/` folder.

## Deployment
- GitHub Actions is setup via the `.github/workflows/build.yaml` file. Built files are pushed to `gh-pages` branch and served via GitHub Pages at [https://provenancewidgets.github.io/showcase](https://provenancewidgets.github.io/showcase).

## Development vs. Building Configurations for base-href
- Development: Because the app served from `/` while developing locally, index.html must be configured with `<base href="/" />` and `src/app/applications/home/component.ts` must have the `url` set to `${window.location.origin}/#/${route};`.
- Build: Because the app is eventually served from `/showcase` (and not `/`), index.html must be configured with `<base href="/showcase/" />` and `src/app/applications/home/component.ts` must have the `url` set to `${window.location.origin}/showcase/#/${route};`. In addition, we pass `--base-href /showcase/` in the `ng build` command (already configured to do this as part of `npm run build`, see package.json).