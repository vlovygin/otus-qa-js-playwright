import {test, expect} from '@playwright/test'

test.describe('Some tests for my project', () => {
    test('Main page has title', async ({page}) => {
        await page.goto('/')

        await expect(page).toHaveTitle('ЕФРСБ')
    })

    test('Navigate to login page from features', async ({page}) => {
        await page.goto('/')

        const bankruptsFeatureLink = page.locator('app-features-card a[href="bankrupts"]')
        await bankruptsFeatureLink.click()

        await expect(page.locator('app-root app-bankrupt')).toBeVisible()
    })

    test('Accept cookie', async ({page}) => {
        await page.goto('/')

        const acceptCookieButton = page.locator('app-cookie-disclaimer .btn-accept')
        await acceptCookieButton.click()

        const localStorage = await page.evaluate(() => window.localStorage)
        await expect(localStorage['cookie-accepted']).toBe('true')
    })

    test('Search bankrupt by OGRN', async ({page}) => {
        const bankruptOGRN = '1026400787170'
        await page.goto('/bankrupts')

        await page.locator('app-form-search-string input').fill(bankruptOGRN)
        await page.locator('app-form-search-string button').click()

        await expect(page.locator('app-bankrupt-result-card-company .u-card-result__item-id:nth-child(2) span:nth-child(2)')).toHaveText(bankruptOGRN)
    })

    test('Navigate to trade organization from slider', async ({page}) => {
        await page.goto('/')

        await page.locator('app-search .carousel-indicators li:nth-child(5)').click()
        await page.locator('app-search .carousel-inner > div.active:nth-child(6)').click()

        await expect(page.locator('app-root app-cmp-trade-org')).toBeVisible()
    })

})
