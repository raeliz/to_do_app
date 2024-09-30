// @ts-check

import { test, expect } from '@playwright/test';
import { 
    loginPath,
    password,
    signupPath,  
    signupUser, 
    url
} from '../../environment';

export const signupTests = () => {
    // navigating to the site and verifying the url is correct and expected
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // clicking the "signup" link on the main page and verifying I am being redirected to the sign-up page
    test('signup redirection', async ({ page }) => {
        await page.getByRole('link', { name: "New user? Sign Up" }).click();

        expect(page.url()).toBe(signupPath);
    });

    // clicking the "login" link on the main page and verifying I am being redirected to the login/main page
    test('login redirection', async ({ page }) => {
        await page.goto(signupPath);
        await page.getByRole('link', { name: "Already have an account? Login" }).click();
        expect(page.url()).toBe(loginPath);
    });

    // signup process
    test('signup', async ({ page }) => {
        await page.getByRole('link', { name: "New user? Sign Up" }).click();

        expect(page.url()).toBe(signupPath);

        await page.locator('input[ name="username" ]').fill(signupUser);
        await page.locator('input[ name="password" ]').fill(password);
        await page.getByRole('button', { name: "Sign Up" }).click();

        await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign Up' })).toBeHidden();
        await expect(page.getByRole('link', { name: 'New user? Sign Up' })).toBeVisible();
        expect(page.url()).toBe(loginPath);
    });

    test('cannot sign up twice', async ({ page }) => {
        await page.goto(signupPath);

        await page.locator('input[ name="username" ]').fill(signupUser);
        await page.locator('input[ name="password" ]').fill(password);
        await page.getByRole('button', { name: "Sign Up" }).click();

        await expect(page.getByText("Username already exists.")).toBeVisible();
    });

};
