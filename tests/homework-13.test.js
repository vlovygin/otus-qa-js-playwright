import {expect, test} from "@playwright/test"
import {AboutProjectPage} from "../pages/about-project-page"
import {MainPage} from "../pages/main-page"
import {EntitySearchPage} from "../pages/entity-search-page"

test.describe('Some tests with PO pattern', () => {
    test('Navigate to main page from brand logo', async ({page}) => {
        const aboutProjectPage = await new AboutProjectPage(page).loadPage()
        const mainPage = await aboutProjectPage.header.navigateByBrandLogo()

        await expect(mainPage.page).toHaveTitle('Федресурс')
    })

    test('Find company by OGRN from main page', async ({page}) => {
        const companyOgrn = '1177746618576'

        const mainPage = await new MainPage(page).loadPage()
        const entitySearchPage = await mainPage.search(companyOgrn)

        await expect(await entitySearchPage.searchResult.companyOgrn).toEqual(companyOgrn)
    })

    test('Find company by name from entity page', async ({page}) => {
        const companyName = 'ООО "ОТУС ОНЛАЙН-ОБРАЗОВАНИЕ"'

        const entitySearchPage = await new EntitySearchPage(page).loadPage()
        await entitySearchPage.searchByName(companyName)

        await expect(await entitySearchPage.searchResult.companyName).toEqual(companyName)
    })

    test('Find not exists company', async ({page}) => {
        const companyName = 'myNotExistsCompanyName'

        const entitySearchPage = await new EntitySearchPage(page).loadPage()
        await entitySearchPage.searchByName(companyName)

        await expect(await entitySearchPage.searchResult.emptyResultMessage).toBeVisible()
    })

    test('Main page description', async ({page}) => {
        const description = 'Поиск сведений о субъектах экономической деятельности'

        const mainPage = await new MainPage(page).loadPage()

        const searchDescription = await mainPage.searchDescription
        await expect(searchDescription.trim()).toEqual(description)
    })

})
