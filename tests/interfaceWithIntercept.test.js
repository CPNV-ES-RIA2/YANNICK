import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

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
        //GIVEN 
        const mockApiResponse = {
            Labels: [
                { Name: 'Sphere', Confidence: 99.83799743652344 },
                { Name: 'Art', Confidence: 93.20249938964844 },
                { Name: 'Graphics', Confidence: 93.20249938964844 },
                { Name: 'Smoke Pipe', Confidence: 70.8271255493164 }
            ],
            LabelModelVersion: '3.0',
            numberOfLabel: 4,
            MinConfidence: 70,
            averageConfidence: 89.26753044128418,
            url: "https://picsum.photos/id/237/200/300"
        };

        await page.route('**/api/analyze', route => route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockApiResponse)
        }));

        await page.waitForSelector('#formDataInput');
        await page.setInputFiles('#fileUpload', 'tests/images/valid.jpg');

        //WHEN
        await page.click('#analyzeButton');
        await page.waitForSelector('#labels', { timeout: 5000 });

        //THEN
        await expect(page.locator('#labels')).toBeVisible();
    });

    test('attempt to submit form without an image', async ({ page }) => {
        //GIVEN

        //WHEN
        await page.click('#analyzeButton');
        await page.waitForSelector('#error');

        //THEN
        const color = await page.evaluate(() => window.getComputedStyle(document.querySelector('#error')).color);
        expect(color).toBe('rgb(255, 0, 0)');
        await expect(page.locator('#error')).toBeVisible();
    });

    test('attempt to upload a non-image file', async ({ page }) => {
        //GIVEN
        await page.setInputFiles('#fileUpload', 'tests/images/test-document.txt');

        //WHEN
        await page.click('#analyzeButton');
        await page.waitForSelector('#error');

        //THEN
        const color = await page.evaluate(() => window.getComputedStyle(document.querySelector('#error')).color);
        expect(color).toBe('rgb(255, 0, 0)');
        await expect(page.locator('#error')).toBeVisible();
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

    test('submit form with changed values for maxLabel and minConfidence', async ({ page }) => {
        //GIVEN
        await page.setInputFiles('#fileUpload', 'tests/images/valid.jpg');
        await page.fill('#maxLabel', '5');
        await page.fill('#minConfidence', '80');

        //WHEN
        await page.click('#analyzeButton');
        await page.waitForSelector('#labels');

        //THEN
        await expect(page.locator('#labels')).toBeVisible();
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