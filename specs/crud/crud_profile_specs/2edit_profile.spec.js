// // @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, profilePath, username, preferredName, newPassword, password } from '../../environment'
import { loginForm } from '../../utils/login';

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
});

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
});

// update profile
test('update profile', async ({ page }) => {
    // login
    await loginForm(page, username, password)
    await expect(page.url()).toBe(`${url}/`)
    
    await page.getByRole('link', { name: "Profile" }).click()
    // await expect(page.url()).toBe(profilePath)
    
    await page.getByRole('textbox', { name: "Preferred Name:" }).fill(preferredName)
    await page.getByRole('textbox', { name: "Current Password:" }).fill(password)
    await page.getByPlaceholder('New password', { exact: true }).fill(newPassword)
    await page.getByPlaceholder('Confirm new password', { exact: true }).fill(newPassword)
    
    await page.getByRole('button', { name: "Update" }).click()
    
    // await expect(page.url()).toBe(`${url}/`)
    await expect(page.getByText(`Welcome, ${preferredName}!`)).toBeVisible()
});

// // bug report submitted
// // new name on new task page
// test('new name new task page', async ({ page }) => {
//     // login
//     await loginForm(page, username, password)
    
//     await page.getByRole('link', { name: "New Task" }).click()
    
//     await expect(page.getByText(`Welcome, ${preferredName}!`)).toBeVisible()
// });

// // bug report submitted
// // new name on profile page
// test('new name profile page', async ({ page }) => {
//     // login
//     await loginForm(page, username, password)
    
//     await page.getByRole('link', { name: "Profile" }).click()
    
//     await expect(page.getByText(`Welcome, ${preferredName}!`)).toBeVisible()
// });

// // bug report submitted
// // login using new password
// test('login using new password', async ({ page }) => {
//     // login
//     await loginForm(page, username, newPassword)
    
//     // await expect(page.url()).toBe(`${url}/`)
// });
