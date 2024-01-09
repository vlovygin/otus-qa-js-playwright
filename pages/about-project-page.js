import {BasePage} from "./base-page"
import {Header} from "./components/header"

export class AboutProjectPage extends BasePage {
    async loadPage() {
        await this.page.goto('/about')
        return this
    }
}
