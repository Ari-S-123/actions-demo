import fs from "node:fs";
import path from "node:path";

/**
 * Create a directory path if it does not already exist.
 *
 * @param {string} targetDir - Absolute path to create.
 * @returns {void}
 */
function ensureDirectory(targetDir) {
  if (typeof targetDir !== "string" || targetDir.length === 0) {
    throw new TypeError("ensureDirectory(targetDir) expects a non-empty string");
  }

  fs.mkdirSync(targetDir, { recursive: true });
}

/**
 * Build the HTML payload that will be deployed to GitHub Pages.
 *
 * @param {string | undefined} commit - Optional commit SHA snippet.
 * @returns {string} Well-formed HTML document.
 */
function renderHtml(commit) {
  if (commit !== undefined && typeof commit !== "string") {
    throw new TypeError("renderHtml(commit) expects a string or undefined");
  }

  const safeCommit = commit && commit.length > 0 ? commit : "local";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GitHub Actions Demo</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 2rem; }
      .tag { display: inline-block; padding: 0.25rem 0.5rem; border: 1px solid #ccc; border-radius: 0.25rem; background: #f7f7f7; }
    </style>
  </head>
  <body>
    <h1>GitHub Actions: CI → CD</h1>
    <p>✅ Tests passed and the Pages site was rebuilt automatically.</p>
    <p>Commit: <span class="tag">${safeCommit}</span></p>
  </body>
</html>`;
}

/**
 * Main build routine.
 *
 * @returns {void}
 */
function build() {
  const distDir = path.join(process.cwd(), "dist");
  ensureDirectory(distDir);

  const shortSha = process.env.GITHUB_SHA ? String(process.env.GITHUB_SHA).slice(0, 7) : "local";
  const html = renderHtml(shortSha);

  const outputPath = path.join(distDir, "index.html");
  fs.writeFileSync(outputPath, html, "utf8");
  console.log(`Built ${outputPath}`);
}

try {
  build();
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
