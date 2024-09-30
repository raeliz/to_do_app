// @ts-check

import { test, expect } from '@playwright/test';
import {
    newTaskPath, 
    password, 
    createTaskUser, 
    taskDescription,
    taskTitle,
    url
} from '../../environment';
import { loginForm } from '../../utils/login';

export const createTaskTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    test('create task', async ({ page }) => {
        // login
        await loginForm(page, createTaskUser, password);
        expect(page.url()).toBe(`${url}/`);
        
        // create new task
        await page.getByRole('link', { name: "New Task" }).click();
        expect(page.url()).toBe(newTaskPath);
        
        // bug report submitted 
        // await expect(page.getByText(`Welcome, ${username}!`)).toBeVisible()
        
        await page.locator('input[ name="title" ]').fill(taskTitle);
        await page.locator('textarea[ name="description" ]').fill(taskDescription);
        await page.getByRole('button', { name: "Create Task" }).click();
        
        await expect(page.getByText(taskTitle)).toBeVisible();
        await expect(page.getByText(taskDescription)).toBeVisible();
        await expect(page.getByText('Status: To Do')).toBeVisible();
        await expect(page.getByRole('link', { name: "Edit" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Edit" })).toBeEnabled();
        await expect(page.getByRole('button', { name: "Delete" })).toBeVisible();
        await expect(page.getByRole('button', { name: "Delete" })).toBeEnabled();
        await expect(page.getByRole('link', { name: "Mark as Done" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Mark as Done" })).toBeEnabled();
    });
};