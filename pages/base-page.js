export class BasePage {
    constructor(page) {
        this.page = page
    }

    get header() {
        const Header = require('./components/header')
        return new Header(this.page)
    }
}
