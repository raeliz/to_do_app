// @ts-check

import { test, expect } from '@playwright/test';
import { 
    editTaskUser, 
    editedTaskDescription,
    editedTaskTitle, 
    password, 
    taskDescription, 
    taskTitle, 
    url
} from '../../environment';
import { loginForm } from '../../utils/login';
import { createTask } from '../../utils/create';

export const editTaskTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // editing existing task
    test('edit task', async ({ page }) => {
        // login
        await loginForm(page, editTaskUser, password);
        expect(page.url()).toBe(`${url}/`);
        await createTask(page, taskTitle, taskDescription);
        
        // const editButtons = await page.$$('a.btn.edit');
        // for (const button of editButtons) {
            // const href = await button.getAttribute('href');
            // if (href === '/task/1/edit') {
            //     await button.click();
            //     break;
            // }
            
        await page.getByRole('link', { name: "Edit" }).click();
        
        await page.locator('input[ name="title" ]').fill(editedTaskTitle);
        await page.locator('textarea[ name="description" ]').fill(editedTaskDescription);
        await page.getByRole('button', { name: "Update Task" }).click();
        
        await expect(page.getByText(editedTaskTitle)).toBeVisible();
        await expect(page.getByText(taskTitle)).toBeHidden();
        await expect(page.getByText(editedTaskDescription)).toBeVisible();
        await expect(page.getByText(taskDescription)).toBeHidden();
        
        await expect(page.getByText('Status: To Do')).toBeVisible();
        await expect(page.getByRole('link', { name: "Edit" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Edit" })).toBeEnabled();
        await expect(page.getByRole('button', { name: "Delete" })).toBeVisible();
        await expect(page.getByRole('button', { name: "Delete" })).toBeEnabled();
        await expect(page.getByRole('link', { name: "Mark as Done" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Mark as Done" })).toBeEnabled();
    });
};