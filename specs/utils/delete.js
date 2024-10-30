// @ts-check

import { loginPath } from '../environment';

export async function deleteForm(page, username, password) {
    await page.goto(loginPath)
    
    page.once('dialog', dialog => {
        // console.log(`Dialog message: ${dialog.message()}`)
        dialog.accept().catch(() => { })
    })
    
    await page.locator('input#test-username').fill(username)
    await page.locator('input#test-password').fill(password)
    await page.locator('button#test-login-button').click()
    
    await page.getByRole('link', { name: "Profile", exact: true }).click()
    await page.getByRole('button', { name: "Delete Account" }).click()
};