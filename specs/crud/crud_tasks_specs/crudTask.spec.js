// @ts-check

import { test, chromium } from '@playwright/test'
import { createTaskTests } from './1create_task';
import { deleteForm } from '../../utils/delete'
import { deleteTaskTests } from './4delete_task';
import { editTaskTests } from './2edit_task';
import { markTaskDoneTests } from './3mark_task_done';
import { signupForm } from '../../utils/signup';

test.describe("Task Tests", () => {
    const accounts = {
        createTaskUser: 'password',
        editTaskUser: 'password',
        markAsDoneUser: 'password',
        deleteTaskUser: 'password'
    };
    
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        for (const [username, password] of Object.entries(accounts)) {
            await signupForm(page, username, password);
        };
        console.log("♡ ₊˚⊹ crud task users created ⋆ ˚｡⋆୨୧˚");
    });
    
    createTaskTests();
    editTaskTests();
    markTaskDoneTests();
    deleteTaskTests();
    
    test.afterAll(async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        
        for (const [username, password] of Object.entries(accounts)) {
            await deleteForm(page, username, password);
        };
        
        console.log("♡ ₊˚⊹ crud task users deleted ⋆ ˚｡⋆୨୧˚");
        browser.close();
    });
});
