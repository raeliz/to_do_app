// // @ts-check
import { test, expect } from '@playwright/test';
import { 
    deleteProfileUser,
    password,
    url
} from '../../environment';
import { loginForm } from '../../utils/login';

export const deleteProfileTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // delete account
    test('delete account', async ({ page }) => {
        page.once('dialog', dialog => {
            dialog.accept().catch(() => { });
        });
        
        // login
        await loginForm(page, deleteProfileUser, password);

        await page.getByRole('link', { name: "Profile" }).click();
        await page.getByRole('button', { name: "Delete Account" }).click();
        
        await expect(page.getByText("Your account has been deleted!")).toBeVisible();
    });

    // try to login with old credentials
    test('login with deleted credentials', async ({ page }) => {
        // login
        await loginForm(page, deleteProfileUser, password);

        await expect(page.getByText("Please check your login details and try again.")).toBeVisible();
    });
};
