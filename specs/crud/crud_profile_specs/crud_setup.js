import { test, expect } from '@playwright/test'
import { url, loginQueryPath, username, password, taskTitle, editedTaskTitle } from '../../environment'
import { loginForm } from '../../utils/login';

test.beforeAll(async () => {
    // Create the tasks user
    // login
    console.log("BEFORE ALL RANNNN")
});

test.beforeEach(async () => {
    // navigate to a starting page
});

test.afterAll(async () => {
    // delete the user
});

