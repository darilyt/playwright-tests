import { Page } from "@playwright/test";
import { AccountPage } from "./account.page";
import { BasePage } from "./base.page";
import { CheckoutPage } from "./checkout.page";
import { LoginPage } from "./login.page";
import { HomePage } from "./home.page";
import { PDPPage } from "./pdp.page";


export class AllPages {
    loginPage: LoginPage;
    accountPage: AccountPage;
    basePage: BasePage;
    homePage: HomePage;
    pdpPage: PDPPage;
    checkoutPage: CheckoutPage;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.basePage = new BasePage(page);
        this.homePage = new HomePage(page);
        this.pdpPage = new PDPPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }

}
