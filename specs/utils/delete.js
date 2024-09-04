import { loginForm } from './login';

export async function deleteForm(page, username, password) {
    await loginForm(page, username, password)
    
    await page.getByRole('link', { name: "Profile" }).click()
    await page.getByRole('button', { name: "Delete Account" }).click()

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`)
        dialog.confirm().catch(() => { })
    })
};