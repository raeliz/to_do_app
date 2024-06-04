export async function signupForm(page, signUpUser, password) {
    await page.locator('input[ name="username" ]').fill(signUpUser)
    await page.locator('input[ name="password" ]').fill(password)

    await page.getByRole('button', { name: "Sign Up" }).click()
};