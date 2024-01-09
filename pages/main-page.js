import {BasePage} from "./base-page"
import {EntitySearchPage} from "./entity-search-page"

export class MainPage extends BasePage {
    #searchDescription = 'quick-search h1'
    #searchInput = 'quick-search input'
    #searchSubmit = 'quick-search button[type=\'submit\']'

    async loadPage() {
        await this.page.goto('/')
        return this
    }

    async search(value) {
        await this.page.locator(this.#searchInput).fill(value)
        await this.page.locator(this.#searchSubmit).click()
        return new EntitySearchPage(this.page)
    }

    get searchDescription() {
        return this.page.locator(this.#searchDescription).textContent()
    }
}
