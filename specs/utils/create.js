// @ts-check

export async function createTask(page, taskTitle, taskDescription){ 
    await page.getByRole('link', { name: "New Task" }).click();

    await page.locator('input[ name="title" ]').fill(taskTitle);
    await page.locator('textarea[ name="description" ]').fill(taskDescription);
    await page.getByRole('button', { name: "Create Task" }).click();
};