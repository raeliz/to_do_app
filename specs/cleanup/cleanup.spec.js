// @ts-check
import { test, expect } from '@playwright/test'
import { loginForm } from '../utils/login'
import { deleteForm } from '../utils/delete'

test.afterAll('clean up', async() => {

});

// const loginUser = `loginUser`

// test.beforeAll(async ({ browser }) => {
//     page = await browser.newPage()
//     await page.goto(url)
//     // Create the auth user
//     await signupForm(page, loginUser, password)
//     // login
//     // await loginForm(page, signUpUser, password)

//     console.log("♡ ₊˚⊹ auth user created ⋆ ˚｡⋆୨୧˚")
// });