// // @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, profilePath, username, password } from '../../environment'
import { loginForm } from '../../utils/login';

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
});

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
});

//  view profile
test('view profile', async ({ page }) => {
    // login
    await loginForm(page, username, password)
    await expect(page.url()).toBe(`${url}/`)

    await page.getByRole('link', { name: "Profile" }).click()

    // await expect(page.url()).toBe(profilePath)
    
    await expect(page.getByRole('link', { name: "Profile" })).toBeEnabled()
    await expect(page.getByText(`Welcome, ${username}!`)).toBeVisible()
    await expect(page.getByRole('textbox', { name: "Preferred Name:" })).toBeVisible()
    await expect(page.getByRole('textbox', { name: "Current Password:" })).toBeVisible()
    await expect(page.getByPlaceholder('New password', { exact: true })).toBeVisible()
    await expect(page.getByPlaceholder('Confirm new password', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: "Update" })).toBeVisible()
    await expect(page.getByRole('button', { name: "Delete Account" })).toBeVisible()
});