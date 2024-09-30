// @ts-check

import { test, expect } from '@playwright/test';
import { 
    loginQueryPath, 
    logoutUser,
    password, 
    url
} from '../../environment';

export const logoutTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // logout
    test('logout', async ({ page }) => {
        await page.locator('input#test-username').fill(logoutUser);
        await page.locator('input#test-password').fill(password);
        await page.locator('button#test-login-button').click();

        await page.getByRole('link', { name: "Logout" }).click();

        expect(page.url()).toBe(loginQueryPath);
        await expect(page.getByText("Please log in to access this page.")).toBeVisible();
    });
};
