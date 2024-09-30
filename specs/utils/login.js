// @ts-check

import { loginPath } from "../environment"

export async function loginForm(page, username, password) {
    await page.goto(loginPath)
    
    await page.locator('input#test-username').fill(username)
    await page.locator('input#test-password').fill(password)

    await page.locator('button#test-login-button').click()
};