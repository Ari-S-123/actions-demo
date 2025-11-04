# Actions Demo

This repository contains a deliberately small Node.js project that demonstrates a complete CI/CD flow using GitHub Actions and GitHub Pages. It is designed for instructional use in workshops or classroom settings where the focus is on understanding how automated testing and deployment work together.

## Prerequisites

- Recent [Node.js](https://nodejs.org/) runtime (>= 20). The workflows install Node 20 automatically, so using the same version locally avoids surprises.
- npm (bundled with Node).
- Access to a GitHub repository with GitHub Pages enabled via GitHub Actions.

## Project Structure

- `src/sum.js` – Pure function with defensive input validation.
- `test/sum.test.js` – Node's built-in test runner exercises the function and its error handling.
- `scripts/build.js` – Generates a static HTML site in `dist/` showing the commit deployed.
- `.github/workflows/ci-pages.yml` – Orchestrates the CI (tests) and CD (Pages deployment) workflow.

## Local Development

Install dependencies (only lint tooling is required):

```sh
npm install
```

Run the automated tests:

```sh
npm test
```

Generate the static site locally to preview what will be published:

```sh
npm run build
open dist/index.html
```

> On Windows, replace `open` with `start`, or manually open the generated file in a browser.

## Continuous Integration (CI)

The `test` job executes on every push and pull request. It:

1. Checks out the repository.
2. Installs dependencies deterministically (`npm ci` if a lockfile exists, otherwise `npm install`).
3. Runs `npm test`, which invokes the Node built-in test runner via `node --test`.

Builds and deployments never start if tests fail, keeping `main` reliable.

## Continuous Deployment (CD)

On pushes to `main` (or manual `workflow_dispatch` runs), two additional jobs run:

1. **build** – Re-runs dependency installation, executes `npm run build`, and uploads the `dist/` directory as the GitHub Pages artifact.
2. **deploy** – Publishes that artifact using `actions/deploy-pages@v4` and exposes the final site URL as an environment output.

Each published page includes the short commit SHA, making it easy to trace which revision is live.

## GitHub Pages Setup

Before the first deployment succeeds, visit **Repository Settings → Pages** and set **Build and deployment** to **GitHub Actions**. After the initial run, the workflow configures the `github-pages` environment automatically, and subsequent pushes to `main` redeploy the site.

## Useful Variations

- Require approval before deployment by adding an environment protection rule on `github-pages`.
- Extend linting by enabling the provided `npm run lint` script in the workflow.
- Swap the `build` script with any static site generator or bundler when presenting more advanced examples.

These extensions demonstrate how easily the workflow scales from this minimal teaching example to production scenarios.
