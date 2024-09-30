// @ts-check

import { test, expect } from '@playwright/test';
import { 
    deleteTaskUser, 
    editedTaskTitle,
    loginQueryPath, 
    password, 
    taskDescription,
    taskTitle, 
    url
} from '../../environment';
import { loginForm } from '../../utils/login';
import { createTask } from '../../utils/create';

export const deleteTaskTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // delete task
    test('delete task', async ({ page }) => {
        // login
        await loginForm(page, deleteTaskUser, password);
        expect(page.url()).toBe(`${url}/`);
        await createTask(page, taskTitle, taskDescription);
        
        await page.getByRole('button', { name: "Delete" }).click();
        
        await expect(page.getByText(taskTitle)).toBeHidden();
        await expect(page.getByText(editedTaskTitle)).toBeHidden();
        
        await page.getByRole('link', { name: "Logout" }).click();
        
        expect(page.url()).toBe(loginQueryPath);
        
        await page.close();
    });
};