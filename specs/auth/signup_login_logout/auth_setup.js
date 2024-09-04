import { test, expect } from '@playwright/test'
import {
    url,
    signupPath,
    loginQueryPath,
    username,
    password,
    loginPath,
    profilePath,
} from '../../environment'
import { loginForm } from '../../utils/login';
import { signupForm } from '../../utils/signup';

// const loginUser = `loginUser`
// const password = `password`

// test.beforeAll(async ({ page }) => {
//     // Create the auth user
//     await signupForm(page, loginUser, password)
//     // login
//     // await loginForm(page, signUpUser, password)

//     console.log("♡ ₊˚⊹ auth user created ⋆ ˚｡⋆୨୧˚")
// });

// test.beforeAll(async () => {
//     // navigate to a starting page
//     await page.goto(url)
// });

// test.afterAll(async () => {
//     // delete the user
//     // login
//     // console.log("♡ ₊˚⊹ auth user deleted ⋆ ˚｡⋆୨୧˚")
// });


/** @type {import('@playwright/test').Page} */
let page;

// test.beforeAll(async ({ browser }) => {
//     page = await browser.newPage();
// });

// test.afterAll(async () => {
//     // delete the user
    
//     // login
//     await loginForm(page, signUpUser, password)
//     await page.goto(url)
//     deleteForm
//     console.log("♡ ₊˚⊹ auth user deleted ⋆ ˚｡⋆୨୧˚")
// });

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(`${signupPath}`);

    await signupForm(page, "username3", "password3");
});


test.afterAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(`${loginPath}`);

    await loginForm(page, "username3", "password3");
    await expect(page.url()).toBe(`${url}/`);
    await page.goto(`${profilePath}`);

    await page.getByRole('button', { name: "Delete Account" }).click();

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`)
        dialog.confirm().catch(() => { })
    })
});

// test.beforeAll(async ({ browser }) => {
//     const page = await browser.newPage();
//     await page.goto(`${signupPath}`);

//     await signupForm(page, "username3", "password3");
// });


// test.afterAll(async ({ browser }) => {
//     const page = await browser.newPage();
//     await page.goto(`${loginPath}`);

//     await loginForm(page, "username3", "password3");
//     await expect(page.url()).toBe(`${url}/`);
//     await page.goto(`${profilePath}`);

//     await page.getByRole('button', { name: "Delete Account" }).click();

//     page.once('dialog', dialog => {
//         console.log(`Dialog message: ${dialog.message()}`)
//         dialog.confirm().catch(() => { })
//     })
// });