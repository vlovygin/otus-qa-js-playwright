import {BasePage} from "./base-page"

export class EntitySearchPage extends BasePage {
    #searchInputName = 'input-field[name=\'name\'] input'
    #searchSubmit = 'entity-search button[type=submit]'

    async loadPage() {
        await this.page.goto('/search/entity')
        return this
    }

    async fillSearchName(value) {
        this.page.locator(this.#searchInputName).fill(value)
    }

    async submitSearch() {
        this.page.locator(this.#searchSubmit).click()
    }

    async searchByName(value) {
        await this.fillSearchName(value)
        await this.submitSearch()
        return this
    }

    get searchResult() {
        return new SearchResult(this.page)
    }
}

class SearchResult extends BasePage {
    #searchResultCompanyOgrn = 'entity-search-result .td_name +td div:nth-child(1) .field-value'
    #searchResultCompanyName = 'entity-search-result .td_company_name'

    get companyOgrn() {
        return this.page.locator(this.#searchResultCompanyOgrn).innerText()
    }

    get companyName() {
        return this.page.locator(this.#searchResultCompanyName).innerText()
    }

    get emptyResultMessage() {
        return this.page.getByText('По вашему запросу ни одной записи не найдено')
    }
}
