export async function signupForm(page, username, password) {
    await page.locator('input[ name="username" ]').fill(username)
    await page.locator('input[ name="password" ]').fill(password)

    await page.getByRole('button', { name: "Sign Up" }).click()
};