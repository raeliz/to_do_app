// // @ts-check
import { test, expect } from '@playwright/test';
import { 
    url, 
    password,
    viewProfileUser
} from '../../environment';
import { loginForm } from '../../utils/login';

export const viewProfileTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    //  view profile
    test('view profile', async ({ page }) => {
        // login
        await loginForm(page, viewProfileUser, password);
        expect(page.url()).toBe(`${url}/`);

        await page.getByRole('link', { name: "Profile" }).click();
        
        await expect(page.getByRole('link', { name: "Profile" })).toBeEnabled();
        await expect(page.getByText(`Welcome, ${viewProfileUser}!`)).toBeVisible();
        await expect(page.getByRole('textbox', { name: "Preferred Name:" })).toBeVisible();
        await expect(page.getByRole('textbox', { name: "Current Password:" })).toBeVisible();
        await expect(page.getByPlaceholder('New password', { exact: true })).toBeVisible();
        await expect(page.getByPlaceholder('Confirm new password', { exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: "Update" })).toBeVisible();
        await expect(page.getByRole('button', { name: "Delete Account" })).toBeVisible();
    });
};