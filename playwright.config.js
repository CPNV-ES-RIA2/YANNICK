import { devices, defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    testDir: './tests',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        baseURL: process.env.VITE_BASE_URL,
    },
    projects: [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    workers: process.env.CI ? 1 : undefined
});