// // @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, username, password } from '../../environment'
import { loginForm } from '../../utils/login';

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
})

// logout
test('logout', async ({ page }) => {
    await loginForm(page, username, password)
    
    await page.getByRole('link', { name: "Logout" }).click()
    
    await expect(page.url()).toBe(loginQueryPath)
    await expect(page.getByText("Please log in to access this page.")).toBeVisible()
});