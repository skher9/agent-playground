import fs from "node:fs";
import path from "node:path";

/**
 * The sandbox image ships the Playwright browsers in /ms-playwright, while
 * Playwright by default looks for them in ~/.cache/ms-playwright. When the
 * default location is missing, point Playwright at the browsers that are
 * actually installed so the suite can run.
 */
function findChromiumExecutable(): string | undefined {
  const defaultPath = path.join(
    process.env.HOME ?? "/home/pwuser",
    ".cache/ms-playwright",
    "chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell",
  );
  if (fs.existsSync(defaultPath)) return undefined;

  const root = "/ms-playwright";
  if (!fs.existsSync(root)) return undefined;

  const knownLayouts = [
    "chrome-headless-shell-linux64/chrome-headless-shell",
    "chrome-linux/chrome",
    "chrome-linux64/chrome",
  ];
  for (const dir of fs.readdirSync(root)) {
    if (!dir.startsWith("chromium")) continue;
    for (const layout of knownLayouts) {
      const candidate = path.join(root, dir, layout);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return undefined;
}

const executablePath = findChromiumExecutable();

export const launchOptions = executablePath ? { executablePath } : {};
