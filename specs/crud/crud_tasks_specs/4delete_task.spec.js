// @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, username, password, taskTitle, editedTaskTitle } from '../../environment'
import { loginForm } from '../../utils/login';

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
    await loginForm(page, username, password)
    await expect(page.url()).toBe(`${url}/`)
    
    await page.getByRole('button', { name: "Delete" }).click()
    
    await expect(page.getByText(taskTitle)).toBeHidden()
    await expect(page.getByText(editedTaskTitle)).toBeHidden()
    
    await page.getByRole('link', { name: "Logout" }).click()
    
    expect(page.url()).toBe(loginQueryPath)
    
    await page.close()
});