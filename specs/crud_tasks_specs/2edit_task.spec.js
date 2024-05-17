// @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, username, password, taskTitle, taskDescription, editedTaskTitle, editedTaskDescription } from '../environment'
import { loginForm } from '../utils/login';

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
})

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
});

// editing existing task
test('edit task', async ({ page }) => {
    // login
    await loginForm(page, username, password)
    await expect(page.url()).toBe(`${url}/`)
    
    await (page.getByRole('link', { name: "Edit" })).click()
    await page.locator('input[ name="title" ]').fill(editedTaskTitle)
    await page.locator('textarea[ name="description" ]').fill(editedTaskDescription)
    await page.getByRole('button', { name: "Update Task" }).click()
    
    await expect(page.getByText(editedTaskTitle)).toBeVisible()
    await expect(page.getByText(taskTitle)).toBeHidden()
    await expect(page.getByText(editedTaskDescription)).toBeVisible()
    await expect(page.getByText(taskDescription)).toBeHidden()
    
    await expect(page.locator('p.status.todo')).toBeVisible()
    await expect(page.getByRole('link', { name: "Edit" })).toBeVisible()
    await expect(page.getByRole('link', { name: "Edit" })).toBeEnabled()
    await expect(page.getByRole('button', { name: "Delete" })).toBeVisible()
    await expect(page.getByRole('button', { name: "Delete" })).toBeEnabled()
    await expect(page.getByRole('link', { name: "Mark as Done" })).toBeVisible()
    await expect(page.getByRole('link', { name: "Mark as Done" })).toBeEnabled()
});