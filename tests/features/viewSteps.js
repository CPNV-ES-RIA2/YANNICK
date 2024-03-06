const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the main page', async function () {
    await this.page.goto('http://localhost:3000');
});

When('I upload an existing image', async function () {
    await this.page.setInputFiles('#dataSource', 'path/to/test-image.png');
});

When('I click the {string} button', async function (buttonText) {
    await this.page.click(`button >> text=${buttonText}`);
});

Then('I should see the {string} displayed', async function (text) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible();
});

When('I click the "Analyze" button without selecting an image', async function () {
    await this.page.click('button >> text=Analyze');
});

Then('I should see an error message {string}', async function (message) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
});

When('I upload an existing image with maxLabel {string} and minConfidence {string}', async function (maxLabel, minConfidence) {
    await this.page.setInputFiles('#dataSource', 'path/to/test-image.png');
    await this.page.fill('#maxLabel', maxLabel);
    await this.page.fill('#minConfidence', minConfidence);
});

When('I change the language to {string}', async function (language) {
    await this.page.selectOption('#languageSelector', { label: language });
});

Then('the language preference {string} should be stored in localStorage', async function (languageCode) {
    const language = await this.page.evaluate(() => localStorage.getItem('language'));
    expect(language).toBe(languageCode);
});
