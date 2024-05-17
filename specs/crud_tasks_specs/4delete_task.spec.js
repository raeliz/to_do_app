// @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, username, password, taskTitle, taskDescription, editedTaskTitle, editedTaskDescription } from '../environment'

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
})

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
});

// delete task
test('delete task', async ({ page }) => {
    // login
    await page.locator('input#test-username').fill(username)
    await page.locator('input#test-password').fill(password)
    await page.locator('button#test-login-button').click()
    await expect(page.url()).toBe(`${url}/`)
    
    await page.getByRole('button', { name: "Delete" }).click()
    
    await expect(page.getByText(taskTitle)).toBeHidden()
    await expect(page.getByText(editedTaskTitle)).toBeHidden()
    
    await page.getByRole('link', { name: "Logout" }).click()
    
    expect(page.url()).toBe(loginQueryPath)
    
    await page.close()
});