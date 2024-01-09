import {MainPage} from "../main-page";
import {BasePage} from "../base-page";

export class Header extends BasePage {
    #brandLogoLink = 'header a.brand'

    async navigateByBrandLogo() {
        await this.page.locator(this.#brandLogoLink).click()
        return new MainPage(this.page)
    }
}

module.exports = Header
