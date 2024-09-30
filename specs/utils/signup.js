// @ts-check

import { signupPath } from "../environment"

export async function signupForm(page, signupUser, password) {
    await page.goto(signupPath)
    
    await page.locator('input[ name="username" ]').fill(signupUser)
    await page.locator('input[ name="password" ]').fill(password)

    await page.getByRole('button', { name: "Sign Up" }).click()
};