// @ts-check
import { test, expect } from '@playwright/test'
import { url, loginQueryPath, newTaskPath, username, password, taskTitle, taskDescription } from '../environment'

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
})

test('my test', async ({ page }) => {
    expect(page.url()).toBe(loginQueryPath)
});

// const prefix = `CRUD Task`

test('create task', async ({ page }) => {
    // login
    await page.locator('input#test-username').fill(username)
    await page.locator('input#test-password').fill(password)
    await page.locator('button#test-login-button').click()
    await expect(page.url()).toBe(`${url}/`)
    
    // create new task
    await page.getByRole('link', { name: "New Task" }).click()
    await expect(page.url()).toBe(newTaskPath)
    await page.locator('input[ name="title" ]').fill(taskTitle)
    await page.locator('textarea[ name="description" ]').fill(taskDescription)
    await page.getByRole('button', { name: "Create Task" }).click()
    
    await expect(page.getByText(taskTitle)).toBeVisible()
    await expect(page.getByText(taskDescription)).toBeVisible()
    await expect(page.locator('p.status.todo')).toBeVisible()
    await expect(page.getByRole('link', { name: "Edit" })).toBeVisible()
    await expect(page.getByRole('link', { name: "Edit" })).toBeEnabled()
    await expect(page.getByRole('button', { name: "Delete" })).toBeVisible()
    await expect(page.getByRole('button', { name: "Delete" })).toBeEnabled()
    await expect(page.getByRole('link', { name: "Mark as Done" })).toBeVisible()
    await expect(page.getByRole('link', { name: "Mark as Done" })).toBeEnabled()
});