// // @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, signupPath, loginPath, username, password } from '../../environment'

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
})

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
})

// logout
test('logout', async ({ page }) => {
    await page.locator('input#test-username').fill(username)
    await page.locator('input#test-password').fill(password)

    await page.locator('button#test-login-button').click()
    
    await page.getByRole('link', { name: "Logout" }).click()
    
    await expect(page.url()).toBe(loginQueryPath)
    await expect(page.getByText("Please log in to access this page.")).toBeVisible()
});






// Arrange:



// Act:
// Click "Logout" button

// Assert:
// Assert landed on login page ("Login" button is visible)

// Assert "Please log in to access this page." message is visible

// Assert "SignUp" link is visible

// Assert url contains "login"