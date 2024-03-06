import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        baseURL: 'http://127.0.0.1:5173/',
    },
    projects: [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'WebKit', use: { ...devices['Desktop Safari'] } },
    ],
});