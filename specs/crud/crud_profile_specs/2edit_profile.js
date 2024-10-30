// // @ts-check
import { test, expect } from '@playwright/test';
import { 
    editProfileUser, 
    newPassword, 
    password,
    preferredName, 
    url
} from '../../environment';
import { loginForm } from '../../utils/login';

export const editProfileTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // update profile
    test('update profile', async ({ page }) => {
        // login
        await loginForm(page, editProfileUser, password);
        expect(page.url()).toBe(`${url}/`);
        
        await page.getByRole('link', { name: "Profile" }).click();
        
        await page.getByRole('textbox', { name: "Preferred Name:" }).fill(preferredName);
        await page.getByRole('textbox', { name: "Current Password:" }).fill(password);
        await page.getByPlaceholder('New password', { exact: true }).fill(newPassword);
        await page.getByPlaceholder('Confirm new password', { exact: true }).fill(newPassword);
        // await page.getByLabel('Profile Picture:').click();
        // await page.locator('input[name="file-upload-button]').click();
        // await page.getByLabel('Profile Picture:').setInputFiles('./specs/images/pfp_raeliz.jpeg');
        
        await page.getByRole('button', { name: "Update" }).click();
        
        // verifying new name and new image is visible across site
        await expect(page.getByText(`Welcome, ${preferredName}!`)).toBeVisible();
        // await expect(page.getByRole('image', { name: 'Profile Picture' })).toBeVisible();
        
        await page.getByRole('link', { name: "New Task" }).click();
        await expect(page.getByText(`Welcome, ${preferredName}!`)).toBeVisible();
        // await expect(page.getByRole('image', { name: 'Profile Picture' })).toBeVisible();
        
        await page.getByRole('link', { name: "Profile", exact: true }).click();
        await expect(page.getByText(`Welcome, ${preferredName}!`)).toBeVisible();
        // await expect(page.getByRole('image', { name: 'Profile Picture' })).toBeVisible();
    });

    // login using new password
    test('login using new password', async ({ page }) => {
        // login
        await loginForm(page, editProfileUser, newPassword);
        
        expect(page.url()).toBe(`${url}/`);
    });
    
    // login with old password
    test('login using old password', async ({ page }) => {
        // login
        await loginForm(page, editProfileUser, password);

        await expect(page.getByText("Please check your login details and try again.")).toBeVisible();
    });
};
