import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

// TEST  WITH MOCKED API
test.describe('Access Website BDD Tests', () => {
    test('access website', async ({ page }) => {
        //GIVEN
        await page.goto(process.env.VITE_BASE_URL);
        //WHEN

        //THEN
        expect(page.url()).toBe(process.env.VITE_BASE_URL + '/');
    });
});

test.describe('React View BDD Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.VITE_BASE_URL);
        await page.selectOption('#language', 'en');
    });

    test('submit analysis with an existing image and default values', async ({ page }) => {
        // GIVEN 
        const mockApiResponse = {
            Labels: [
                { Name: 'Sphere', Confidence: 99.83799743652344 },
                { Name: 'Art', Confidence: 93.20249938964844 },
                { Name: 'Graphics', Confidence: 93.20249938964844 },
                { Name: 'Smoke Pipe', Confidence: 70.8271255493164 }
            ],
            numberOfLabel: 4,
            MinConfidence: 70,
            averageConfidence: 89.26753044128418,
            url: "https://picsum.photos/id/237/200/300"
        };

        await page.route('**/api/upload', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    url: 'mockImageUrl',
                    status: 200
                })
            });
        });

        // Intercept API calls for analyze
        await page.route('**/api/analyze', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: mockApiResponse, // Use mockApiResponse as the response data
                    status: 200
                })
            });
        });
        await page.setInputFiles('#fileUpload', 'tests/images/valid.jpg');

        // WHEN
        await page.click('#analyzeButton');

        await page.waitForSelector('#labels');
        // THEN
        const sphereRow = page.locator('tr', { has: page.locator('td', { hasText: 'Sphere' }) });
        await expect(sphereRow.locator('td:first-child')).toHaveText('Sphere');
        await expect(sphereRow.locator('td:nth-child(2)')).toHaveText('99.84%');


    });
});

test.describe('Form Submission Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.VITE_BASE_URL);
    });

    test('submit form with non-conform minConfidence value', async ({ page }) => {
        //GIVEN
        await page.setInputFiles('#fileUpload', 'tests/images/valid.jpg');
        await page.fill('#maxLabel', '10');
        await page.fill('#minConfidence', '101');

        //WHEN
        await page.click('#analyzeButton');
        await page.waitForSelector('#error');

        //THEN
        const color = await page.evaluate(() => window.getComputedStyle(document.querySelector('#error')).color);
        expect(color).toBe('rgb(255, 0, 0)');
        await expect(page.locator('#error')).toBeVisible();
        await expect(page.locator('#error')).toHaveText('Min confidence must be between 0 and 100')
    });


    test('submit form with honney pot value filled', async ({ page }) => {
        //GIVEN
        await page.setInputFiles('#fileUpload', 'tests/images/valid.jpg');
        await page.evaluate(() => document.querySelector('#potHonney').value = 'test');

        //WHEN
        await page.click('#analyzeButton');
        await page.waitForSelector('#error');

        //THEN
        const color = await page.evaluate(() => window.getComputedStyle(document.querySelector('#error')).color);
        expect(color).toBe('rgb(255, 0, 0)');
        await expect(page.locator('#error')).toHaveText("It's not nice to hack people");
    });
});

test.describe('Language Selection Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.VITE_BASE_URL);
        await page.selectOption('#language', 'fr');
    });

    test('change application language without page reload', async ({ page }) => {
        //GIVEN
        await page.selectOption('#language', 'en');
        //WHEN
        await page.waitForSelector('#analyzeButton');
        //THEN
        await expect(page.locator('#analyzeButton')).toHaveText('Analyze');
    });
});