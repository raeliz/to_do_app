// @ts-check
// require('./auth_setup');
import { test, expect } from '@playwright/test'
import { url, signupPath, loginPath, signUpUser, password } from '../../environment'
import { signupForm } from '../../utils/signup';
import { loginForm } from '../../utils/login';
import { deleteForm } from '../../utils/delete';

// test.describe.configure({ mode: 'serial' });

// navigating to the site and verifying the url is correct and expected
test.beforeEach(async ({ page }) => {
    await page.goto(url)
});

// clicking the "signup" link on the main page and verifying I am being redirected to the sign-up page
test('signup redirection', async ({ page }) => {
    await page.getByRole('link', { name: "New user? Sign Up" }).click()

    expect(page.url()).toBe(signupPath)
});

// clicking the "login" link on the main page and verifying I am being redirected to the login/main page
test('login redirection', async ({ page }) => {
    await page.goto(signupPath)
    await page.getByRole('link', { name: "Already have an account? Login" }).click()
    expect(page.url()).toBe(loginPath)
});

// signup process
test('signup', async ({ page }) => {
    await page.getByRole('link', { name: "New user? Sign Up" }).click()
        
    expect(page.url()).toBe(signupPath)

    await signupForm(page, signUpUser, password)
        
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeHidden()
    await expect(page.getByRole('link', { name: 'New user? Sign Up' })).toBeVisible()
    expect(page.url()).toBe(loginPath)
});

test('cannot sign up twice', async ({ page }) => {
    await page.goto(signupPath)
    
    await signupForm(page, signUpUser, password)
    
    await expect(page.getByText("Username already exists.")).toBeVisible()
});





/** @type {import('@playwright/test').Page} */
let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    // delete the user
    // login
    // await page.goto(url)
    // await loginForm(page, signUpUser, password)
    deleteForm(page, signUpUser, password)
    console.log("♡ ₊˚⊹ auth user deleted ⋆ ˚｡⋆୨୧˚")
});