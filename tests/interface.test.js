import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test.describe('React View BDD Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://gateway');
        await page.selectOption('#language', 'en');
    });

    test('submit analysis with an existing image and default values', async ({ page }) => {
        //GIVEN 
        await page.waitForSelector('#formDataInput');
        await page.setInputFiles('#fileUpload', 'tests/images/valid.jpg');

        //WHEN
        await page.click('#analyzeButton');
        await page.waitForSelector('#labels');

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
        await expect(page.locator('#error')).toBeVisßible();
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
        await page.goto('http://gateway');
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
        await page.goto('http://gateway');
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