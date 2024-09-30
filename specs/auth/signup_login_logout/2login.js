// @ts-check

import { test, expect } from '@playwright/test';
import { 
    loginUser, 
    password, 
    url
} from '../../environment';

export const loginTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });


    // login process
    test('login', async ({ page }) => {
        await page.locator('input#test-username').fill(loginUser);
        await page.locator('input#test-password').fill(password);

        await page.locator('button#test-login-button').click();

        expect(page.url()).toBe(`${url}/`)
        await expect(page.getByText(`Welcome, ${loginUser}!`)).toBeVisible();
        await expect(page.getByRole('link', { name: "My Tasks" })).toBeVisible();
        await expect(page.getByRole('link', { name: "New Task" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Profile" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Logout" })).toBeVisible();
        await expect(page.getByText("You currently have no tasks")).toBeVisible();
    });

    // logging in with invalid credentials
    test('login invalid username', async ({ page }) => {
        await page.locator('input#test-username').fill(`notValid${loginUser}`);
        await page.locator('input#test-password').fill(`notValid${password}`);

        await page.locator('button#test-login-button').click();

        await expect(page.getByText("Please check your login details and try again.")).toBeVisible();
    });

    test('login invalid password', async ({ page }) => {
        await page.locator('input#test-username').fill(loginUser);
        await page.locator('input#test-password').fill(`notValid${password}`);

        await page.locator('button#test-login-button').click();

        await expect(page.getByText("Please check your login details and try again.")).toBeVisible();
    });
};
