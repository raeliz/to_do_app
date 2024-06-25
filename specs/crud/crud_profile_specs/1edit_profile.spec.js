// // @ts-check
// import { test, expect } from '@playwright/test'
// import { url, loginQueryPath, newTaskPath, profilePath, username, preferredName, newPassword, password, taskTitle, taskDescription } from '../../environment'
// import { loginForm } from '../../utils/login';

// // navigating to the site and verifying the url is correct and expected
// test.beforeEach(async ({ page }) => {
//     await page.goto(url)
// })

// // test('my test', async ({ page }) => {
// //     expect(page.url()).toBe(loginQueryPath)
// // });

// //  view profile
// test('view profile', async ({ page }) => {
//     // login
//     await loginForm(page, username, password)
//     await expect(page.url()).toBe(`${url}/`)
    
//     await page.getByRole('link', { name: "Profile" }).click()
    
//     await expect(page.url()).toBe(profilePath)
//     await expect(page.getByText(`Welcome, ${username}!`)).toBeVisible()
// });

// // update profile
// test('update profile', async ({ page }) => {
//     // login
//     await loginForm(page, username, password)
//     await expect(page.url()).toBe(`${url}/`)
    
//     await page.getByRole('link', { name: "Profile" }).click()
//     await expect(page.url()).toBe(profilePath)
    
//     await page.getByRole('textbox', { name: "Preferred Name:" }).fill(preferredName)
    
//     await expect(page.getByText(`Welcome, ${preferredName}!`)).toBeVisible()
// });

