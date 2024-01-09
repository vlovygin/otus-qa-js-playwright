import {defineConfig, devices} from '@playwright/test';


module.exports = defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    reporter: 'html',

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'https://fedresurs.ru/'
            },
            // testDir: './tests/homework-12.js',
        },
        //
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // }
    ],

});

