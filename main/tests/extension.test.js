import {test, expect} from '../framework/fixtures/plugin.mjs'


// test('Check pw extension', async ({page}) => {
//     await page.goto('https://www.cryptopro.ru/sites/default/files/products/cades/demopage/cades_bes_sample.html')
//     await page.waitForTimeout(10000)
//     expect(1).toBe(2)
// })

test('Check pw extension', async ({page}) => {
    await page.goto('https://fedresurs.ru/check')
    await page.click('check button')

    await page.waitForTimeout(10000)
})
