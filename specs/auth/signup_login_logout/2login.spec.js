// // @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, username, password } from '../../environment'

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
})

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
});

// login process
test('login', async ({ page }) => {
    await page.locator('input#test-username').fill(username)
    await page.locator('input#test-password').fill(password)
    
    await page.locator('button#test-login-button').click()
    
    await expect(page.url()).toBe(`${url}/`)
    await expect(page.getByText(`Welcome, ${username}!`)).toBeVisible()
    await expect(page.getByText("You currently have no tasks")).toBeVisible()
    await expect(page.getByRole('link', { name:  "New Task" })).toBeVisible()
    await expect(page.getByRole('link', { name: "Logout" })).toBeVisible()
});

// logging in with invalid credentials
test('login validation', async ({ page }) => {
    await page.locator('input#test-username').fill(`notValid${username}`)
    await page.locator('input#test-password').fill(`notValid${password}`)
    
    await page.locator('button#test-login-button').click()
    
    await expect(page.getByText("Please check your login details and try again.")).toBeVisible()
});