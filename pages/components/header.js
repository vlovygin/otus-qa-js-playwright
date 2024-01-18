import {MainPage} from "../main-page"

export class Header {
    #brandLogoLink = 'header a.brand'

    constructor(page) {
        this.page = page
    }

    async navigateByBrandLogo() {
        await this.page.locator(this.#brandLogoLink).click()
        return new MainPage(this.page)
    }
}
