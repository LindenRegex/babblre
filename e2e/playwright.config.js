import { defineConfig } from '@playwright/test';
const PORT = process.env.PORT || 8123;
export default defineConfig({
  testDir: '.', timeout: 120000, fullyParallel: false, workers: 1,
  expect: { timeout: 60000 },
  use: {
    baseURL: `http://localhost:${PORT}`, headless: true,
    launchOptions: { args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] },
  },
  webServer: {
    command: `PORT=${PORT} python3 ../etc/serve.py`, cwd: '.',
    url: `http://localhost:${PORT}/web/index.html`, reuseExistingServer: true, timeout: 30000,
  },
});
