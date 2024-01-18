import {BasePage} from "./base-page"

export class AboutProjectPage extends BasePage {
    async loadPage() {
        await this.page.goto('/about')
        return this
    }
}
