// @ts-check

import { test, chromium } from '@playwright/test';
import { deleteForm } from '../../utils/delete';
import { loginTests } from './2login';
import { logoutTests } from './3logout';
import { signupForm } from '../../utils/signup';
import { signupTests } from './1signup';

test.describe("Auth Tests", () => {
    const accounts = {
        loginUser: 'password',
        logoutUser: 'password',
    };

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        for (const [username, password] of Object.entries(accounts)) {
            await signupForm(page, username, password);
        }
        console.log("♡ ₊˚⊹ auth users created ⋆ ˚｡⋆୨୧˚");
    });

    signupTests();
    loginTests();
    logoutTests();

    test.afterAll(async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        
        accounts['signupUser'] = 'password';
        
        for (const [username, password] of Object.entries(accounts)) {
            await deleteForm(page, username, password);
        };
        
        console.log("♡ ₊˚⊹ auth users deleted ⋆ ˚｡⋆୨୧˚");
        browser.close();
    });
});
