import { test, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage{
    emailField: Locator = this.page.getByTestId('email');
    passwordField: Locator = this.page.getByTestId('password');
    loginButton: Locator = this.page.getByTestId('login-submit');
    
    async openLoginPage (): Promise<void> {
        await test.step('Open Login page', async () => {
            // Open homepage: https://practicesoftwaretesting.com/auth/login.
                await this.page.goto('/auth/login');
        });
    }
    
    async performLogin (userEmail: string, userPassword: string): Promise<void> {

        await test.step('Fill in email', async () => {
            // Fill in credentials:
            // Email: customer@practicesoftwaretesting.com
            await this.emailField.fill(userEmail);
        });

        await test.step('Fill in password', async () => {
            // Password: welcome01
            await this.passwordField.fill(userPassword);
        });

         await test.step('Click the Login', async () => {
            // Click the Login button.
             await this.loginButton.click(); 
        });
        
    }

    

}