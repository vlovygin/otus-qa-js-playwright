import {test as base, chromium} from '@playwright/test'
import path from 'path'


export const test = base.extend({
    context: async ({}, use) => {
        const pathToExtension = path.join(__dirname, './CryptoPro-Plug-in')
        const context = await chromium.launchPersistentContext('', {
            headless: false,
            args: [`--disable-extensions-except=${ pathToExtension }`, `--load-extension=${ pathToExtension }`]
        })
        await use(context)
        await context.close()
    }
})
export const expect = test.expect
