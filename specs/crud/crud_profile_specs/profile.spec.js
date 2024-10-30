
import { test, chromium } from '@playwright/test';
import { deleteForm } from '../../utils/delete';
import { deleteProfileTests } from './3delete_profile';
import { editProfileTests } from './2edit_profile';
import { signupForm } from '../../utils/signup';
import { viewProfileTests} from './1view_profile';

test.describe("Profile Tests", () => {
    const accounts = {
        viewProfileUser: 'password',
        editProfileUser: 'password',
        deleteProfileUser: 'password'
    };
    
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        for (const [username, password] of Object.entries(accounts)) {
            await signupForm(page, username, password);
        };
        console.log("♡ ₊˚⊹ profile users created ⋆ ˚｡⋆୨୧˚");
    });
    
    viewProfileTests();
    editProfileTests();
    deleteProfileTests();
    
    test.afterAll(async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        
        delete accounts['deleteProfileUser'];
        accounts['editProfileUser'] = 'NEWpassword';

        for (const [username, password] of Object.entries(accounts)) {
            await deleteForm(page, username, password);
        };

        console.log("♡ ₊˚⊹ profile users deleted ⋆ ˚｡⋆୨୧˚");
        browser.close();
    });
});
