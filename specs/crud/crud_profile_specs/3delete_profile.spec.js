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

// delete account
test('delete account', async ({ page }) => {
    // login
    await loginForm(page, username, password)

    await page.getByRole('link', { name: "Profile" }).click()
    await page.getByRole('button', { name: "Delete Account" }).click()

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`)
        dialog.confirm().catch(() => { })
    })
    
    expect(page.url()).toBe(`${profilePath}`)
    await expect(page.getByText("Your account has been deleted!")).toBeVisible()
});
