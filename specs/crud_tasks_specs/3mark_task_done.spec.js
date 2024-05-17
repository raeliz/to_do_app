// @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, username, password } from '../environment'

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
})

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
});

// mark task as done
test('mark task as done', async ({ page }) => {
// login
    await page.locator('input#test-username').fill(username)
    await page.locator('input#test-password').fill(password)
    await page.locator('button#test-login-button').click()
    await expect(page.url()).toBe(`${url}/`)
    
    await page.getByRole('link', { name: "Mark as Done" }).click()
    
    await expect(page.locator('p.status.done')).toBeVisible()
    await expect(page.getByRole('link', { name: "Mark as Done" })).toBeHidden()
    await expect(page.getByRole('link', { name: "Mark as To Do" })).toBeVisible()
    await expect(page.getByRole('link', { name: "Edit" })).toBeHidden()
});