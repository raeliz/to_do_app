// @ts-check

import { test, expect } from '@playwright/test';
import { 
    markAsDoneUser, 
    password,
    taskDescription,
    taskTitle,
    url
} from '../../environment';
import { loginForm } from '../../utils/login';
import { createTask } from '../../utils/create';

export const markTaskDoneTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // mark task as done
    test('mark task as done', async ({ page }) => {
    // login
        await loginForm(page, markAsDoneUser, password);
        expect(page.url()).toBe(`${url}/`);
        await createTask(page, taskTitle, taskDescription);
        
        await page.getByRole('link', { name: "Mark as Done" }).click();
        
        await expect(page.getByText('Status: Done')).toBeVisible();
        await expect(page.getByRole('link', { name: "Mark as Done" })).toBeHidden();
        await expect(page.getByRole('link', { name: "Mark as To Do" })).toBeVisible();
        await expect(page.getByRole('link', { name: "Edit" })).toBeHidden();
    });
};